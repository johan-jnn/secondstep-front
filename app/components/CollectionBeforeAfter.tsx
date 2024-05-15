import React from 'react';
import {Link} from '@remix-run/react';
import {ProductCardFragment, RestoredShoesQuery} from 'storefrontapi.generated';
import {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import Banner from './Banner';

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
      <div className="before">
        <img src={product.featuredImage?.url} alt=" " />
        <div className="before-text">
          <p>Before</p>
        </div>
      </div>
      <div className="after">
        <img src={product.featuredImage?.url} alt=" " />
        <div className="after-bottom">
          <p>After</p>
          &nbsp;&nbsp;
          <Banner color="var(--color-light)" />
        </div>
      </div>
    </div>
  );
}
