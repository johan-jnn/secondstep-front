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
import Icon from './Icon';
import {DeliveryIcon} from '@shopify/polaris-icons';
import {useState} from 'react';

export interface ProductFormProps {
  product: ProductFragment;
}

export default function ProductForm({product}: ProductFormProps) {
  const metatTitles = product.metafields.find((meta) => meta?.key === 'titres');
  const titles = metatTitles
    ? (JSON.parse(metatTitles.value) as string[])
    : Object.values(getProductTitleAndSub(product.title));

  const fastDeliveryAvailable =
    product.metafields.find((meta) => meta?.key === 'fastdelivery')?.value ===
    'true';
  if (!product.selectedVariant)
    product.selectedVariant = product.variants.nodes.find(
      (p) => p.availableForSale,
    );
  if (!product.selectedVariant)
    throw new Error("No product' variant selected.");
  const {selectedVariant} = product;
  const [fastDelivery, setFastDelivery] = useState(false);
  const lines: CartLineInput[] = [
    {
      merchandiseId: selectedVariant.id,
      // ! TODO --> "SellingPlanID" pour obtenir une livraison plus rapide
      // sellingPlanId: fastDelivery ? 'fastDelivery' : undefined,
    },
  ];

  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines}}>
      <div id="productForm">
        <h3>{titles[0]}</h3>
        <p>{titles[1]}</p>

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

        <PriceButton
          caption="Ajouter au panier"
          btnType="submit"
          price={product.selectedVariant.price}
        />

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

        <hr />

        <section id="livraison">
          <label htmlFor="normalDelivery">
            <div className="title">
              <input
                type="radio"
                name="fastDelivery"
                id="normalDelivery"
                onChange={() => setFastDelivery(false)}
                defaultChecked
              />
              Livraison standard offerte - <b>5/15j</b>
            </div>
            <Price
              value={{
                amount: '0',
                currencyCode: 'EUR',
              }}
            />
          </label>

          {fastDeliveryAvailable && (
            <label htmlFor="fastDelivery">
              <div className="title">
                <input
                  type="radio"
                  name="fastDelivery"
                  id="fastDelivery"
                  onChange={() => setFastDelivery(true)}
                />
                <Icon icon={DeliveryIcon} />
                Livraison express - <b>24/48h</b>
              </div>
              <Price
                value={{
                  amount: '9.90',
                  currencyCode: 'EUR',
                }}
              />
            </label>
          )}
        </section>
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
                preventScrollReset={true}
              >
                {info.currentlyNotInStock ? null : (
                  <div className="liv48h">
                    <Pastille color="var(--color-primary)" />
                  </div>
                )}
                <p className="variantName">
                  {info.title.match(/.+\d/)?.[0] || info.title}
                </p>
                <p className="variantPrice">
                  <Price value={info.price} decimals={0} />
                </p>
              </Link>
            </>
          ) : (
            <>
              <div className="soldout">
                <p className="variantName">
                  {info.title.match(/.+\d/)?.[0] || info.title}
                </p>
                <p className="soldout_sub">Epuisé</p>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
