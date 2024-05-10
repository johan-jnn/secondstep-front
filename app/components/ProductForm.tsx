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

export interface ProductFormProps {
  product: ProductFragment;
}

const title_subtitle_regexp = /(?<title>.*\d.*?)\s+(?<subtitle>.*)/i;
export default function ProductForm({product}: ProductFormProps) {
  const {title, subtitle} = title_subtitle_regexp.exec(product.title)
    ?.groups || {
    title: '',
    subtitle: product.title,
  };
  if (!product.selectedVariant)
    product.selectedVariant = product.variants.nodes[0];
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

        <div id="price">
          {product.selectedVariant.compareAtPrice && (
            <div id="neuf" className="priceDisplay">
              <p>
                <Price value={product.selectedVariant?.compareAtPrice} />
              </p>
              <span>Prix neuf</span>
            </div>
          )}
          <div id="secondstep_price" className="priceDisplay">
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
              />
            </div>
          )}
        </div>

        <hr />

        <div id="taille">
          <div className="header">
            <h5>Tailles</h5>
            <a href="/guide_des_tailles.pdf" target="_blank">
              Guide des tailles
            </a>
          </div>

          {product.variants.nodes.find(
            (variant) => !variant.currentlyNotInStock,
          ) ? (
            <>
              <Pastille color="var(--color-primary)" />
              Livraison 48h disponible
            </>
          ) : null}

          <GrilleTaille
            tailles={product.variants.nodes}
            selected={product.selectedVariant}
          />
        </div>

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
              <a href={`?Taille=${info.title}`}>
                {info.currentlyNotInStock ? null : (
                  <div className="livraison48h">
                    <Pastille color="var(--color-primary)" />
                  </div>
                )}
                <p className="variantName">{info.title}</p>
                <p className="variantPrice">
                  <Price value={info.price} decimals={0} />
                </p>
              </a>
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