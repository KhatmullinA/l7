export interface Material {
  value: string;
  label: string;
  price: number;
  imageUrl: string; 
}

export interface ProductType {
  value: string;
  label: string;
}

export interface CartItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
export interface Product {
  label: string;
  price: number;
}
