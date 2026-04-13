
-- Fix carts SELECT
DROP POLICY IF EXISTS "Users can view own cart" ON public.carts;
CREATE POLICY "Users can view own cart"
  ON public.carts FOR SELECT
  USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

-- Fix carts UPDATE
DROP POLICY IF EXISTS "Users can update own cart" ON public.carts;
CREATE POLICY "Users can update own cart"
  ON public.carts FOR UPDATE
  USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

-- Fix carts DELETE
DROP POLICY IF EXISTS "Users can delete own cart" ON public.carts;
CREATE POLICY "Users can delete own cart"
  ON public.carts FOR DELETE
  USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

-- Fix carts INSERT
DROP POLICY IF EXISTS "Anyone can create a cart" ON public.carts;
CREATE POLICY "Anyone can create a cart"
  ON public.carts FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR (auth.uid() IS NULL AND session_id IS NOT NULL AND user_id IS NULL)
  );

-- Fix cart_items SELECT
DROP POLICY IF EXISTS "Cart items readable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items readable by cart owner"
  ON public.cart_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id IS NOT NULL)
        )
    )
  );

-- Fix cart_items INSERT
DROP POLICY IF EXISTS "Cart items insertable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items insertable by cart owner"
  ON public.cart_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id IS NOT NULL)
        )
    )
  );

-- Fix cart_items UPDATE
DROP POLICY IF EXISTS "Cart items updatable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items updatable by cart owner"
  ON public.cart_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id IS NOT NULL)
        )
    )
  );

-- Fix cart_items DELETE
DROP POLICY IF EXISTS "Cart items deletable by cart owner" ON public.cart_items;
CREATE POLICY "Cart items deletable by cart owner"
  ON public.cart_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
        AND (
          (auth.uid() IS NOT NULL AND carts.user_id = auth.uid())
          OR (auth.uid() IS NULL AND carts.session_id IS NOT NULL)
        )
    )
  );
