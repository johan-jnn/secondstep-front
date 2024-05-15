import {Image} from '@shopify/hydrogen';
import Pastille from './Pastille';
import {Link} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import './styles/productCard.scss';
import Price from './Price';
import Stars from './Stars';
import BrandLogo, {type ValidLogos} from './BrandLogo';
import getProductTitleAndSub from '~/lib/productTitles';
import {useRef} from 'react';

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
    title: productTitle,
    vendor,
    featuredImage,
    id,
  },
}: ProductCardProps) {
  const {title, subtitle} = getProductTitleAndSub(productTitle);

  const fakeReviewsLength = useRef(Math.floor(Math.random() * 25) + 5);
  const maxScore = 1;
  const reviewsAverage = useRef(
    new Array(fakeReviewsLength.current)
      .fill(null)
      .reduce((pre: number, _) => pre + Math.random() * maxScore, 0) /
      fakeReviewsLength.current,
  );
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
        <div className="brand">
          <BrandLogo
            logo={vendor.toLowerCase().replaceAll(' ', '_') as ValidLogos}
          />
        </div>
      </div>
      <div className="bottom">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <div className="price">
          {'Dès '}
          <span>
            <Price value={priceRange.minVariantPrice} decimals={0} />
          </span>
        </div>
        <div className="rating">
          <Stars
            max={maxScore}
            value={reviewsAverage.current}
            stars={5}
            colors={{
              foreground: 'var(--color-dark)',
            }}
            key={id}
          />
          <span className="reviewsCount">({fakeReviewsLength.current})</span>
        </div>
      </div>
    </Link>
  );
}
