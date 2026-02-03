/*
  # Add promotions table
  
  1. New Tables
    - `promotions`
      - `id` (uuid, primary key)
      - `quantity` (integer) - cantidad mínima de productos
      - `discount_percentage` (numeric) - porcentaje de descuento
      - `discount_amount` (numeric) - cantidad fija de descuento
      - `description` (text) - descripción de la promoción
      - `active` (boolean) - si la promoción está activa
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `promotions` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quantity integer NOT NULL,
  discount_percentage numeric,
  discount_amount numeric,
  description text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promotions"
  ON promotions
  FOR SELECT
  TO public
  USING (active = true);
