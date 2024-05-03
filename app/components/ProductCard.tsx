import {Image, Money} from '@shopify/hydrogen';
import Pastille from './Pastille';
import {Link} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';

export interface ProductCardProps {
  informations: ProductCardFragment;
}

export const PRODUCT_CARD_FRAGMENT = `#graphql
fragment ProductCard on Product {
  id
  title
  handle
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  featuredImage {
    url
    altText
  }
  availableForSale
  vendor
}`;

export default function ProductCard({
  informations: {
    availableForSale,
    handle,
    priceRange,
    title,
    vendor,
    featuredImage,
    id,
  },
}: ProductCardProps) {
  const subtitle = '';
  return (
    <Link className="product-card" to={`/product/${handle}`} key={id}>
      <div className="top">
        <Image
          src={featuredImage?.url}
          aspectRatio="1 / 1"
          alt={featuredImage?.altText || `Cover image for ${title}`}
        />
        <div id="stock">
          <Pastille color={availableForSale ? 'green' : 'yellow'} />
          <p>{availableForSale ? 'En stock' : 'Epuisé'}</p>
        </div>
      </div>
      <div className="bottom">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <div className="price">
          {'Dès '}
          <span>
            <Money data={priceRange.minVariantPrice} />
          </span>
        </div>
        <div className="rating">{/* todo  */}</div>
      </div>
    </Link>
  );
}
