
DROP POLICY IF EXISTS "Users can insert items for own orders" ON public.order_items;
CREATE POLICY "Users can insert items for own orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND (
          (auth.uid() IS NOT NULL AND orders.user_id = auth.uid())
          OR (auth.uid() IS NULL AND orders.user_id IS NULL)
        )
    )
  );
