import { useEffect, useState } from "react";
import { getProducts, type Product } from "../lib/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    getProducts()
      .then((data) => {
        if (isActive) {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (isActive) {
          const message = err instanceof Error ? err.message : "Failed to load products.";
          setError(message);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return { products, isLoading, error };
}
