/*
  # Create public assets storage bucket

  1. Storage
    - Create `assets` bucket for public images (logo, etc.)
    - Set bucket as public so images are accessible via URL
  2. Security
    - Allow public read access to assets bucket
    - Only authenticated users can upload
*/

INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for assets"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'assets');

CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'assets');
