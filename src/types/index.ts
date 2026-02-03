export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  flavor: string;
  format: string;
  stock: number;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: CartItem[];
  total: number;
  status: string;
  notes: string;
  created_at?: string;
}

export interface Promotion {
  id: string;
  quantity: number;
  discount_percentage?: number;
  discount_amount?: number;
  description: string;
  active: boolean;
  created_at: string;
}
