import {Image} from '@shopify/hydrogen';
import Pastille from './Pastille';
import {Link} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import './styles/productCard.scss';
import Price from './Price';
import Stars from './Stars';

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

const title_subtitle_regexp = /(?<title>.*\d.*?)\s+(?<subtitle>.*)/i;

export default function ProductCard({
  informations: {
    availableForSale,
    handle,
    priceRange,
    title: productTitle,
    vendor,
    featuredImage,
    id,
  },
}: ProductCardProps) {
  const {title, subtitle} = title_subtitle_regexp.exec(productTitle)
    ?.groups || {
    title: '',
    subtitle: productTitle,
  };

  const fakeReviewsLength = Math.floor(Math.random() * 25) + 5;
  const maxScore = 1;
  const reviewsAverage =
    new Array(fakeReviewsLength)
      .fill(null)
      .reduce((pre: number, _) => pre + Math.random() * maxScore, 0) /
    fakeReviewsLength;
  return (
    <Link className="product-card" to={`/products/${handle}`} key={id}>
      <div className="top">
        <Image
          src={featuredImage?.url}
          alt={featuredImage?.altText || `Cover image for ${title}`}
          sizes="250"
        />
        <div className="stock">
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
            <Price value={priceRange.minVariantPrice} decimals={0} />
          </span>
        </div>
        <div className="rating">
          <Stars
            max={maxScore}
            value={reviewsAverage}
            stars={5}
            colors={{
              foreground: 'var(--color-primary)',
            }}
          />
          <span className="reviewsCount">({fakeReviewsLength})</span>
        </div>
      </div>
    </Link>
  );
}
