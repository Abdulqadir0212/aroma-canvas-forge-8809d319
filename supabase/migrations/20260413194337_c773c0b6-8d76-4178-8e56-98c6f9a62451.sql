
-- Create a SECURITY DEFINER function to check if an order belongs to the current user
CREATE OR REPLACE FUNCTION public.is_order_owner(_order_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.orders
    WHERE id = _order_id
      AND (
        (auth.uid() IS NOT NULL AND user_id = auth.uid())
        OR (auth.uid() IS NULL AND user_id IS NULL)
      )
  )
$$;

-- Update order_items INSERT policy to use the function
DROP POLICY IF EXISTS "Users can insert items for own orders" ON public.order_items;
CREATE POLICY "Users can insert items for own orders"
  ON public.order_items FOR INSERT
  WITH CHECK (public.is_order_owner(order_id));
