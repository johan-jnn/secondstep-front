import {Image} from '@shopify/hydrogen';
import Pastille from './Pastille';
import {Link} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import './styles/productCard.scss';
import Price from './Price';
import Stars from './Stars';
import BrandLogo, {type ValidBrands} from './BrandLogo';
import getProductTitleAndSub from '~/lib/productTitles';
import {useRef} from 'react';
import Product from '~/routes/products.$handle';

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
  metafields(identifiers: {key: "custom"}) {
    key
    value
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
    metafields,
    vendor,
    featuredImage,
    id,
  },
}: ProductCardProps) {
  const subtitle = metafields.find((meta) => meta?.key === 'titres');
  const fakeReviewsLength = useRef(Math.floor(Math.random() * 25) + 5);
  const maxScore = 1;
  // = 60% du meilleur score au minimum
  const fakeMinScore = (75 / 100) * maxScore;
  const reviewsAverage = useRef(
    new Array(fakeReviewsLength.current)
      .fill(null)
      .reduce(
        (pre: number, _) =>
          pre + fakeMinScore + Math.random() * (maxScore - fakeMinScore),
        0,
      ) / fakeReviewsLength.current,
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
          <BrandLogo brand={vendor as ValidBrands} />
        </div>
      </div>
      <div className="bottom">
        <h3>{title}</h3>
        <p>{subtitle?.value}</p>
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
