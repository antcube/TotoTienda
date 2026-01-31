import { pumaSizeGuide } from './puma';
import { adidasSizeGuide } from './adidas';
import { unisexSizeGuide } from './unisex';
import type { Brand, BrandSizeGuide } from './types';

export const sizeGuides: Record<Brand, BrandSizeGuide> = {
  Puma: pumaSizeGuide,
  Adidas: adidasSizeGuide,
  Unisex: unisexSizeGuide,
};

export * from './types';
