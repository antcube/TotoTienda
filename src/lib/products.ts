import { sanityClient } from "./sanityClient";

export interface Product {
  id: number | string;
  name: string;
  category: string;
  gender: string;
  price: number;
  image: string;
  images: string[];
  brand: string;
  sizes: number[];
  isNew?: boolean;
  isFeatured?: boolean;
  available?: boolean;
  description: string;
}

const productsQuery = `*[_type == "product"]|order(orderRank asc){
  id,
  name,
  category,
  gender,
  price,
  image,
  images,
  brand,
  sizes,
  isNew,
  isFeatured,
  available,
  description
}`;

let cachedProducts: Product[] | null = null;
let pendingProducts: Promise<Product[]> | null = null;

export async function getProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }

  if (!pendingProducts) {
    pendingProducts = sanityClient.fetch<Product[]>(productsQuery);
  }

  const products = await pendingProducts;
  cachedProducts = products;
  pendingProducts = null;
  return products;
}
