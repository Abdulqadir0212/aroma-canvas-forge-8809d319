
-- Trigger to validate and enforce correct prices on order_items INSERT
CREATE OR REPLACE FUNCTION public.validate_order_item_price()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actual_price numeric;
BEGIN
  -- Get the actual price from products table
  SELECT price INTO actual_price FROM public.products WHERE id = NEW.product_id AND active = true;
  
  IF actual_price IS NULL THEN
    RAISE EXCEPTION 'Product not found or inactive';
  END IF;
  
  -- Override client-supplied prices with server-side values
  NEW.unit_price := actual_price;
  NEW.total_price := actual_price * NEW.quantity;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_order_item_price
  BEFORE INSERT ON public.order_items
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_order_item_price();

-- Trigger to recalculate order total_amount after order_items changes
CREATE OR REPLACE FUNCTION public.recalculate_order_total()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_total numeric;
BEGIN
  SELECT COALESCE(SUM(total_price), 0) INTO new_total
  FROM public.order_items
  WHERE order_id = NEW.order_id;
  
  UPDATE public.orders SET total_amount = new_total WHERE id = NEW.order_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_recalculate_order_total
  AFTER INSERT ON public.order_items
  FOR EACH ROW
  EXECUTE FUNCTION public.recalculate_order_total();

-- Restrict orders INSERT to only allow default status/payment_status values
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    ((user_id IS NULL) OR (user_id = auth.uid()))
    AND (status = 'pending')
    AND (payment_status = 'pending' OR payment_status IS NULL)
  );
