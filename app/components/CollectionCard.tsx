import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import './styles/collectionCard.scss';
import {useRef} from 'react';
import BrandLogo, {type ValidBrands} from './BrandLogo';

export interface CollectionCardProps {
  collection: CollectionFragment;
}
export default function CollectionCard({collection}: CollectionCardProps) {
  const [min, max] = [7, 45];
  const fakeViewLength = useRef((min + Math.random() * (max - min)).toFixed(2));
  const firstNode = collection.products.nodes[0];
  const showFeaturedImage = ![
    'Nike',
    'New-Balance',
    'Adidas',
    'Air-Jordan',
  ].includes(collection.title);
  return (
    <Link to={`/collections/${collection.handle}`} className="collectionCard">
      <div className="content">
        <p>{collection.title}</p>
        <span className="views">{fakeViewLength.current}M vues</span>
      </div>
      {showFeaturedImage && firstNode?.featuredImage ? (
        <Image src={firstNode.featuredImage.url} width={'unset'} />
      ) : (
        <Image src={collection.image?.url} width={'unset'} />
      )}
    </Link>
  );
}
