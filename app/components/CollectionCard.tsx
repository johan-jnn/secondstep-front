import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import './styles/collectionCard.scss';
import {useRef} from 'react';

export interface CollectionCardProps {
  collection: CollectionFragment;
}
export default function CollectionCard({collection}: CollectionCardProps) {
  const [min, max] = [7, 45];
  const fakeViewLength = useRef((min + Math.random() * (max - min)).toFixed(2));

  return (
    <Link to={`/collections/${collection.handle}`} className="collectionCard">
      <div className="content">
        <p>{collection.title}</p>
        <span className="views">{fakeViewLength.current}M vues</span>
      </div>
      {collection.image && <Image data={collection.image} width={'unset'} />}
    </Link>
  );
}
