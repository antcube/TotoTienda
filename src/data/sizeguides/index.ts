import { pumaSizeGuide } from './puma';
import { adidasSizeGuide } from './adidas';
import type { Brand, BrandSizeGuide } from './types';

export const sizeGuides: Record<Brand, BrandSizeGuide> = {
  Puma: pumaSizeGuide,
  Adidas: adidasSizeGuide,
};

export * from './types';
