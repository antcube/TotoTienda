export interface SizeRow {
  us: string;
  eu: string;
  cm: string;
  category?: 'baby' | 'child';
}

export interface BrandSizeGuide {
  men?: SizeRow[];
  women?: SizeRow[];
  kids?: SizeRow[];
}

export type Brand = 'Puma' | 'Adidas';
