import type {
  ProductCardFragment,
  CollectionFragment,
} from 'storefrontapi.generated';
import ProductCard from './ProductCard';
import './styles/productGrid.scss';
import FeaturedCardCollection from './FeaturedCardCollection';

export interface ProductGridProps {
  products: ProductCardFragment[];
  collections?: CollectionFragment[];
}

export default function ProductGrid(props: ProductGridProps) {
  const nodes = [...props.products];
  const lines: ReturnType<
    typeof ProductLineWithCollection | typeof ProductsLine
  >[] = [];
  props.collections?.forEach((collection) => {
    lines.push(
      <ProductsLine products={nodes.splice(0, 4)} />,

      <ProductLineWithCollection
        products={nodes.splice(0, 2)}
        collection={collection}
      />,

      <ProductsLine products={nodes.splice(0, 4)} />,
    );
  });
  if (nodes.length) lines.push(<ProductsLine products={nodes} />);

  return (
    <div>
      {lines.map((line, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}

export interface ProductLineProps {
  products: ProductCardFragment[];
  collection: CollectionFragment;
}

export function ProductLineWithCollection(props: ProductLineProps) {
  return (
    <ul className="productLine">
      <div className="featured-collection-section">
        <FeaturedCardCollection
          image={props.collection?.image?.url}
          title={props.collection?.title}
          handle={props.collection?.handle}
        />
      </div>
      {props.products.map((product) => (
        <li key={product.id}>
          <ProductCard informations={product} />
        </li>
      ))}
    </ul>
  );
}

export function ProductsLine(props: Omit<ProductLineProps, 'collection'>) {
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
