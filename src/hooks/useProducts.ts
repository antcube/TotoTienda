import { useEffect, useState } from "react";
import { getProducts, type Product } from "../lib/products";

interface UseProductsOptions {
  includeUnavailable?: boolean;
}

export function useProducts({ includeUnavailable = false }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    getProducts()
      .then((data) => {
        if (isActive) {
          const visibleProducts = includeUnavailable
            ? data
            : data.filter((product) => product.available !== false);
          setProducts(visibleProducts);
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
  }, [includeUnavailable]);

  return { products, isLoading, error };
}
