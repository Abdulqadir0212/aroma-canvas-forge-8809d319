
DROP POLICY IF EXISTS "Anyone can create a cart" ON public.carts;
CREATE POLICY "Anyone can create a cart"
  ON public.carts FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id IS NOT NULL AND user_id IS NULL)
  );
