
-- 1. Fix orders INSERT policy: prevent user_id impersonation
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    user_id IS NULL OR user_id = auth.uid()
  );

-- 2. Fix order_items INSERT policy: only allow inserting for owned orders
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
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

-- 3. Fix carts policies: session_id must match the filter value, not just be NOT NULL
DROP POLICY IF EXISTS "Users can view own cart" ON public.carts;
CREATE POLICY "Users can view own cart"
  ON public.carts FOR SELECT
  USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

DROP POLICY IF EXISTS "Users can update own cart" ON public.carts;
CREATE POLICY "Users can update own cart"
  ON public.carts FOR UPDATE
  USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

DROP POLICY IF EXISTS "Users can delete own cart" ON public.carts;
CREATE POLICY "Users can delete own cart"
  ON public.carts FOR DELETE
  USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

-- 4. Fix cart_items policies: inherit proper session check from carts
DROP POLICY IF EXISTS "Cart items readable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items readable by cart owner"
  ON public.cart_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id = current_setting('request.headers', true)::json->>'x-session-id')
        )
    )
  );

DROP POLICY IF EXISTS "Cart items insertable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items insertable by cart owner"
  ON public.cart_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id = current_setting('request.headers', true)::json->>'x-session-id')
        )
    )
  );

DROP POLICY IF EXISTS "Cart items updatable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items updatable by cart owner"
  ON public.cart_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id = current_setting('request.headers', true)::json->>'x-session-id')
        )
    )
  );

DROP POLICY IF EXISTS "Cart items deletable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items deletable by cart owner"
  ON public.cart_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id = current_setting('request.headers', true)::json->>'x-session-id')
        )
    )
  );
