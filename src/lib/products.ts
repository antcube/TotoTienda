import fallbackProducts from "../data/products.json";
import { isSanityConfigured, sanityClient } from "./sanityClient";

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

  if (!isSanityConfigured || !sanityClient) {
    if (!import.meta.env.DEV) {
      throw new Error("Sanity no está configurado en producción. Revisa VITE_SANITY_PROJECT_ID y VITE_SANITY_DATASET en Vercel.");
    }
    cachedProducts = fallbackProducts as Product[];
    return cachedProducts;
  }

  if (!pendingProducts) {
    pendingProducts = sanityClient.fetch<Product[]>(productsQuery);
  }

  try {
    const products = await pendingProducts;
    cachedProducts = products;
    return products;
  } catch {
    if (!import.meta.env.DEV) {
      throw new Error("No se pudo cargar productos desde Sanity en producción.");
    }
    cachedProducts = fallbackProducts as Product[];
    return cachedProducts;
  } finally {
    pendingProducts = null;
  }
}
