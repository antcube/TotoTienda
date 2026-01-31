import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  const [searchParams] = useSearchParams();
  const genderFilter = searchParams.get('gender') || undefined;

  return (
    <>
      <Hero />
      <ProductGrid genderFilter={genderFilter} />
    </>
  );
}
