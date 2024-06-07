import type {CollectionFragment} from 'storefrontapi.generated';
import './styles/homePageCollectionCTA.scss';
import {Link} from '@remix-run/react';

export interface CollectionCTAProps {
  collection: CollectionFragment;
}
export default function HomePageCollectionCTA({
  collection,
}: CollectionCTAProps) {
  return (
    <div className="homepage-collection-cta">
      <Link to={`/collections/${collection.handle}`}>
        <img src={collection.image?.url} alt=" " />
        <h3>{collection.title}</h3>
      </Link>
    </div>
  );
}
