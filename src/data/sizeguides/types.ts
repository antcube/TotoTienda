export interface SizeRow {
  us: string;
  eu: string;
  cm: string;
  category?: 'baby' | 'child';
}

export interface BrandSizeGuide {
  men?: SizeRow[];
  women?: SizeRow[];
  kids?: SizeRow[] | string; // string for HTML content
  unisex?: SizeRow[];
  kidsHtmlContent?: string; // HTML content for kids section
  menHtmlContent?: string; // HTML content for men section
}

export type Brand = 'Puma' | 'Adidas' | 'Unisex';

export type SizeCategory = 'men' | 'women' | 'kids' | 'unisex' | 'all';
