import type {CollectionFragment} from 'storefrontapi.generated';
import './styles/collection.scss';
import {Link} from '@remix-run/react';

export interface CollectionCTAProps {
  collection: CollectionFragment;
}
export default function CollectionCTA({collection}: CollectionCTAProps) {
  return (
    <div
      className="collection-cta"
      style={{
        backgroundImage: `url(${collection.image?.url})`,
      }}
    >
      <div>
        <h3>{collection.title}</h3>

        <Link to={`/collections/${collection.handle}`}>
          Shopper ma paire &gt;
        </Link>
      </div>
    </div>
  );
}
