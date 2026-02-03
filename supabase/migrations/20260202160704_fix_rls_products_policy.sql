/*
  # Fix RLS policy for products table

  1. Security
    - Add policy to allow anonymous users to read products (public access for catalog)
*/

CREATE POLICY "Public can read products"
  ON products
  FOR SELECT
  TO anon
  USING (true);
