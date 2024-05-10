import type {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import Price from './Price';
import Banner from './Banner';
import Pastille from './Pastille';
import './styles/productForm.scss';
import PriceButton from './PriceButton';
import {CartForm} from '@shopify/hydrogen';
import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {Link} from '@remix-run/react';
import {getVariantUrl} from '~/lib/variants';
import getProductTitleAndSub from '~/lib/productTitles';

export interface ProductFormProps {
  product: ProductFragment;
}

export default function ProductForm({product}: ProductFormProps) {
  const {title, subtitle} = getProductTitleAndSub(product.title);
  if (!product.selectedVariant)
    product.selectedVariant = product.variants.nodes.find(
      (p) => p.availableForSale,
    );
  if (!product.selectedVariant)
    throw new Error("No product' variant selected.");
  const {selectedVariant} = product;
  const lines: CartLineInput[] = [
    {
      merchandiseId: selectedVariant.id,
    },
  ];

  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines}}>
      <div id="productForm">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>

        <section id="price">
          {product.selectedVariant.compareAtPrice && (
            <>
              <div id="neuf" className="priceDisplay">
                <p>
                  <Price value={product.selectedVariant?.compareAtPrice} />
                </p>
                <span>Prix neuf</span>
              </div>
              <hr />
            </>
          )}
          <div id="ss_price" className="priceDisplay">
            <p>
              <Price value={product.selectedVariant.price} />
            </p>
            <span>
              Prix
              <Banner color="var(--color-primary)" />
            </span>
          </div>

          {product.selectedVariant.compareAtPrice && (
            <div id="priceDiff">
              Economise{' '}
              <Price
                value={{
                  amount:
                    '' +
                    (parseFloat(product.selectedVariant.compareAtPrice.amount) -
                      parseFloat(product.selectedVariant.price.amount)),
                  currencyCode: 'EUR',
                }}
                decimals={0}
              />
            </div>
          )}
        </section>

        <hr />

        <section id="taille">
          <div className="heading">
            <h5>Tailles</h5>
            <a href="/guide_des_tailles.pdf" target="_blank">
              Guide des tailles
            </a>
          </div>

          {product.variants.nodes.find(
            (variant) => !variant.currentlyNotInStock,
          ) ? (
            <div className="liv48h">
              <Pastille color="var(--color-primary)" />
              Livraison 48h disponible
            </div>
          ) : null}

          <GrilleTaille
            tailles={product.variants.nodes}
            selected={product.selectedVariant}
            productHandle={product.handle}
          />
        </section>

        <PriceButton
          caption="Ajouter au panier"
          btnType="submit"
          price={product.selectedVariant.price}
        />
      </div>
    </CartForm>
  );
}

export interface GrilleTailleProps {
  tailles: ProductVariantFragment[];
  selected?: ProductVariantFragment;
  productHandle: string;
}
export function GrilleTaille(props: GrilleTailleProps) {
  return (
    <ul id="tailleGrid">
      {props.tailles.map((info) => (
        <li
          key={info.title}
          className="variant_card"
          data-selected={props.selected?.title === info.title}
        >
          {info.availableForSale ? (
            <>
              <Link
                to={getVariantUrl({
                  handle: props.productHandle,
                  selectedOptions: info.selectedOptions,
                  pathname: '',
                  searchParams: new URLSearchParams(),
                })}
              >
                {info.currentlyNotInStock ? null : (
                  <div className="liv48h">
                    <Pastille color="var(--color-primary)" />
                  </div>
                )}
                <p className="variantName">{info.title}</p>
                <p className="variantPrice">
                  <Price value={info.price} decimals={0} />
                </p>
              </Link>
            </>
          ) : (
            <>
              <div className="soldout">
                <p className="variantName">{info.title}</p>
                <p className="soldout_sub">Epuisé</p>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
