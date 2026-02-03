/*
  # Create Cannabis Vaper Catalog Database

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Price in euros
      - `image_url` (text) - Product image URL
      - `category` (text) - Product category/type
      - `flavor` (text) - Flavor/aroma description
      - `format` (text) - Format (desechable, recargable, etc)
      - `stock` (integer) - Available stock
      - `featured` (boolean) - Featured product
      - `created_at` (timestamptz) - Creation timestamp
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text) - Customer name
      - `customer_email` (text) - Customer email
      - `customer_phone` (text) - Customer phone
      - `items` (jsonb) - Order items array
      - `total` (numeric) - Total order amount
      - `status` (text) - Order status (pending, confirmed, completed, cancelled)
      - `notes` (text) - Additional notes
      - `created_at` (timestamptz) - Order creation timestamp

  2. Security
    - Enable RLS on both tables
    - Allow public read access to products (no auth required)
    - Orders are insert-only for public, full access for admin (future)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'vaper',
  flavor text NOT NULL,
  format text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  items jsonb NOT NULL,
  total numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products policies: Public read access
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Orders policies: Public can insert (create orders)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, flavor, format, stock, featured) VALUES
('Vaper Mango Kush', 'Vaper desechable con terpenos naturales de Mango Kush. Experiencia suave y aromática con notas tropicales.', 29.90, 'https://images.pexels.com/photos/7772498/pexels-photo-7772498.jpeg?auto=compress&cs=tinysrgb&w=800', 'Desechable', 'Mango tropical con toques terrosos', 'Desechable 600 puffs', 50, true),
('Vaper OG Kush', 'Vaper recargable premium con el clásico sabor OG Kush. Ideal para usuarios experimentados.', 39.90, 'https://images.pexels.com/photos/7772499/pexels-photo-7772499.jpeg?auto=compress&cs=tinysrgb&w=800', 'Recargable', 'Cítrico con notas de pino', 'Recargable + cartucho 2ml', 30, true),
('Vaper Lemon Haze', 'Vaper con intenso aroma a limón. Perfecto para el día. 100% legal y natural.', 24.90, 'https://images.pexels.com/photos/7772502/pexels-photo-7772502.jpeg?auto=compress&cs=tinysrgb&w=800', 'Desechable', 'Limón intenso y fresco', 'Desechable 800 puffs', 45, false),
('Vaper Blueberry', 'Dulce y afrutado, con aromas a arándanos frescos. Suavidad garantizada.', 27.90, 'https://images.pexels.com/photos/7772501/pexels-photo-7772501.jpeg?auto=compress&cs=tinysrgb&w=800', 'Desechable', 'Arándanos dulces', 'Desechable 600 puffs', 40, false),
('Vaper Northern Lights', 'Uno de los clásicos más apreciados. Aroma dulce y relajante.', 34.90, 'https://images.pexels.com/photos/7772500/pexels-photo-7772500.jpeg?auto=compress&cs=tinysrgb&w=800', 'Recargable', 'Dulce con toques especiados', 'Recargable + cartucho 2ml', 25, true),
('Vaper Strawberry Cough', 'Sabor a fresa con un toque herbal. Ideal para principiantes.', 26.90, 'https://images.pexels.com/photos/7772503/pexels-photo-7772503.jpeg?auto=compress&cs=tinysrgb&w=800', 'Desechable', 'Fresa dulce', 'Desechable 700 puffs', 35, false);
