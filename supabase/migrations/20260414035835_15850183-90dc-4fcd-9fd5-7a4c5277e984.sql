
-- Create a security definer function for atomic order creation
CREATE OR REPLACE FUNCTION public.create_order_with_items(
  _order_id uuid,
  _user_id uuid,
  _customer_name text,
  _customer_email text,
  _customer_phone text,
  _shipping_address text,
  _city text,
  _state text,
  _pincode text,
  _notes text,
  _total_amount numeric,
  _items jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _item jsonb;
  _actual_price numeric;
BEGIN
  -- Validate: authenticated user must match _user_id
  IF auth.uid() IS NOT NULL AND _user_id IS NOT NULL AND auth.uid() != _user_id THEN
    RAISE EXCEPTION 'User ID mismatch';
  END IF;

  -- Insert the order
  INSERT INTO public.orders (id, user_id, customer_name, customer_email, customer_phone, 
    shipping_address, city, state, pincode, notes, total_amount, payment_method, status, payment_status)
  VALUES (_order_id, _user_id, _customer_name, _customer_email, _customer_phone,
    _shipping_address, _city, _state, _pincode, _notes, 0, 'cod', 'pending', 'pending');

  -- Insert order items with server-side price validation
  FOR _item IN SELECT * FROM jsonb_array_elements(_items)
  LOOP
    SELECT price INTO _actual_price FROM public.products 
    WHERE id = (_item->>'product_id')::uuid AND active = true;
    
    IF _actual_price IS NULL THEN
      RAISE EXCEPTION 'Product not found or inactive: %', _item->>'product_id';
    END IF;

    INSERT INTO public.order_items (order_id, product_id, product_name, quantity, unit_price, total_price)
    VALUES (
      _order_id,
      (_item->>'product_id')::uuid,
      _item->>'product_name',
      (_item->>'quantity')::int,
      _actual_price,
      _actual_price * (_item->>'quantity')::int
    );
  END LOOP;

  -- Recalculate total
  UPDATE public.orders 
  SET total_amount = (SELECT COALESCE(SUM(total_price), 0) FROM public.order_items WHERE order_id = _order_id)
  WHERE id = _order_id;

  RETURN _order_id;
END;
$$;

-- Update order_items INSERT policy: only authenticated users can insert directly
-- Guests use the atomic create_order_with_items function instead
DROP POLICY IF EXISTS "Users can insert items for own orders" ON public.order_items;

CREATE POLICY "Authenticated users can insert own order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_items.order_id AND user_id = auth.uid()
  )
);
