import React from 'react';
import {Link} from '@remix-run/react';
import {ProductCardFragment, RestoredShoesQuery} from 'storefrontapi.generated';
import {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';

export interface CollectionBAProps {
  collection: NonNullable<RestoredShoesQuery['collection']>;
}

export default function CollectionBA({collection}: CollectionBAProps) {
  return (
    <div className="collection-BA">
      {collection.products.nodes.map((product) => (
        <BACard key={product.id} product={product} />
      ))}
    </div>
  );
}

interface BACardProps {
  product: ProductCardFragment;
}

function BACard({product}: BACardProps) {
  return (
    <div className="collection-BA-card">
      <img src={product.featuredImage?.url} alt=" " />
      <h3>{product.title}</h3>
    </div>
  );
}
