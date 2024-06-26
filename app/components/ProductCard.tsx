import {Image} from '@shopify/hydrogen';
import Pastille from './Pastille';
import {Link} from '@remix-run/react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import './styles/productCard.scss';
import Price from './Price';
import Stars, {type StarsProps} from './Stars';
import BrandLogo, {type ValidBrands} from './BrandLogo';
import getProductTitleAndSub from '~/lib/productTitles';
import {useRef} from 'react';
import Product from '~/routes/products.$handle';

export interface ProductCardProps {
  informations: ProductCardFragment;
}

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
  const metatTitles = metafields.find((meta) => meta?.key === 'titres');
  const titles = metatTitles
    ? (JSON.parse(metatTitles.value) as string[])
    : Object.values(getProductTitleAndSub(title));

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

  const fastdelivery =
    metafields.find((meta) => meta?.key === 'fastdelivery')?.value === 'true';
  return (
    <Link className="product-card" to={`/products/${handle}`} key={id}>
      <div className="top">
        <Image
          src={featuredImage?.url}
          alt={featuredImage?.altText || `Cover image for ${title}`}
          sizes="250"
        />
        <ul className="pastilles">
          <li>
            <Pastille color={availableForSale ? 'green' : 'yellow'} />
            <p>{availableForSale ? 'En stock' : 'Epuisé'}</p>
          </li>
          {fastdelivery && (
            <li>
              <Pastille color="var(--color-primary)" />
              <p>Livraison 24h/48h</p>
            </li>
          )}
        </ul>
        <div className="brand">
          <BrandLogo brand={vendor as ValidBrands} />
        </div>
      </div>
      <div className="bottom">
        <h3>{titles[0]}</h3>
        <p>{titles[1]}</p>
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
