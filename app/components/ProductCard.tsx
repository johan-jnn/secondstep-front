import {Image} from '@shopify/hydrogen';
import Pastille from './Pastille';
import {Link} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import './styles/productCard.scss';
import Price from './Price';
import Stars, {StarsProps} from './Stars';
import BrandLogo, {type ValidBrands} from './BrandLogo';
import getProductTitleAndSub from '~/lib/productTitles';
import {useRef} from 'react';
import Product, {METAFIELD_FRAGMENT} from '~/routes/products.$handle';

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
  metafields(identifiers: [
    {key: "titres", namespace: "custom"},
    {key: "notes", namespace: "custom"},
    {key: "looks", namespace: "custom"},
    {key: "couleur", namespace: "custom"},
    {key: "fastdelivery", namespace: "custom"}
  ]) {
    ...MetaFieldInfo
  }
  availableForSale
  vendor
}
${METAFIELD_FRAGMENT}
`;

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

  let reviewsData: {props: StarsProps; len: number} | null = null;
  const notes = metafields.find((meta) => meta?.key === 'notes');
  if (notes) {
    const parsed = JSON.parse(notes.value) as {
      value: string;
      scale_min: string;
      scale_max: string;
    }[];
    const max = 100;

    const value = parsed.reduce((average, review) => {
      const scale_min = parseFloat(review.scale_min) * max,
        scale_max = parseFloat(review.scale_max) * max,
        value = parseFloat(review.value) * max;
      const note = ((value - scale_min) / (scale_max - scale_min)) * max;
      return ((average || note) + note) / 2;
    }, 0);

    reviewsData = {
      props: {max, value},
      len: parsed.length,
    };
  }
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
          {reviewsData && (
            <>
              <Stars {...reviewsData.props} />
              <span className="reviewsCount">({reviewsData.len})</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
