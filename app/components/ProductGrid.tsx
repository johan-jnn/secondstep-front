import type {ProductCardFragment} from 'storefrontapi.generated';
import ProductCard from './ProductCard';
import './styles/productGrid.scss';

export interface ProductGridProps {
  products: ProductCardFragment[];
}
export default function ProductGrid(props: ProductGridProps) {
  return (
    <ul className="productGrid">
      {props.products.map((product) => (
        <li key={product.id}>
          <ProductCard informations={product} />
        </li>
      ))}
    </ul>
  );
}
