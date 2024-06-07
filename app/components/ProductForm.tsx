import type {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import Price from './Price';
import Pastille from './Pastille';
import './styles/productForm.scss';
import PriceButton from './PriceButton';
import {CartForm} from '@shopify/hydrogen';
import {Aside} from './Aside';
import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {Link} from '@remix-run/react';
import {getVariantUrl} from '~/lib/variants';
import getProductTitleAndSub from '~/lib/productTitles';
import Icon from './Icon';
import {DeliveryIcon, CaretDownIcon, CaretUpIcon} from '@shopify/polaris-icons';
import {useState} from 'react';
import Button from './Button';
import FilDarianne from './FilDarianne';
import closeAside from '~/lib/asideCloser';
import {toast} from 'react-toastify';

export interface ProductFormProps {
  product: ProductFragment;
}

export default function ProductForm({product}: ProductFormProps) {
  const metatTitles = product.metafields.find((meta) => meta?.key === 'titres');
  const titles = metatTitles
    ? (JSON.parse(metatTitles.value) as string[])
    : Object.values(getProductTitleAndSub(product.title));

  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(!isOpen);
    e.preventDefault();
  };
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
  const [showSizeChart, setShowSizeChart] = useState(false); // Nouvel état pour la visibilité de la grille de tailles
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
        <FilDarianne />
        <h3>{titles[0]}</h3>
        <p>{titles[1]}</p>

        <section id="price">
          <div id="ss_price" className="priceDisplay">
            <p>
              {' '}
              A partir de&nbsp;
              <span>
                <Price value={product.priceRange.minVariantPrice} />
              </span>
            </p>
          </div>
        </section>
        <section id="taille">
          <a href="#grid-aside">
            <Button type="primary" text="Choisir ma pointure" />
          </a>
          <Aside id="grid-aside" heading="Choisissez votre Taille">
            <p className="size_helper-cta">
              Un doute sur votre pointure ?
              <br />
              Découvrez notre{' '}
              <a href="/checkmark.svg" download={true}>
                guide des tailles{' '}
              </a>
              !
            </p>
            <GrilleTaille
              tailles={product.variants.nodes}
              selected={product.selectedVariant}
              productHandle={product.handle}
            />
            {product.variants.nodes.find(
              (variant) => !variant.currentlyNotInStock,
            ) ? (
              <div className="liv48h">
                <Pastille color="var(--color-primary)" />
                Livraison 48h disponible
              </div>
            ) : null}
            <p>
              Prix :&nbsp;
              <span>
                <Price value={product.selectedVariant.price} />
              </span>
            </p>
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
            <PriceButton
              caption="Ajouter au panier"
              btnType="submit"
              price={product.selectedVariant.price}
              onClick={() => {
                toast.success(
                  `La paire "${product.title}" vient d'être ajouté à votre panier !`,
                );
                window.location.href = window.location.pathname;
              }}
            />
          </Aside>
        </section>
        <hr />
        <div className="description">
          <Link to={''} className="question" onClick={toggleAnswer}>
            <p>Description</p>
            <Icon
              icon={isOpen ? CaretUpIcon : CaretDownIcon}
              classes={'Icon'}
            />
          </Link>
          {isOpen && (
            <div className="description-open">
              <p
                dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
              ></p>
            </div>
          )}
        </div>
      </div>
    </CartForm>
  );
}

export interface GrilleTailleProps {
  tailles: ProductVariantFragment[];
  selected?: ProductVariantFragment;
  productHandle: string;
  fastDelivery?: boolean;
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
                {props.fastDelivery && (
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
