export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  dimensions?: Dimensions;
}

export interface ProductsResponse {
  products: Product[];
  total: number;  // Total de registros
  skip: number; // productos omitidos
  limit: number; // Tamaño de la página
}
