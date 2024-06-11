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
import {getVariantOption, getVariantSize, getVariantUrl} from '~/lib/variants';
import getProductTitleAndSub from '~/lib/productTitles';
import Icon from './Icon';
import {DeliveryIcon, CaretDownIcon, CaretUpIcon} from '@shopify/polaris-icons';
import {useState} from 'react';
import Button from './Button';
import FilDarianne from './FilDarianne';
import closeAside from '~/lib/asideCloser';
import {toast} from 'react-toastify';

export type Delivery = 'EXPRESS' | 'Standard';
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
  if (!product.selectedVariant)
    product.selectedVariant = product.variants.nodes.find(
      (p) => p.availableForSale,
    );
  const {selectedVariant} = product;
  if (!selectedVariant) throw new Error("No product's variant selected.");

  const joinedVariants = product.variants.nodes.filter(
    (v) => getVariantSize(v.title) === getVariantSize(selectedVariant.title),
  );
  const deliveryVariants = {
    standard: joinedVariants.find(
      (v) =>
        getVariantOption<Delivery>(v.selectedOptions, 'Livraison') ===
        'Standard',
    ),
    express: joinedVariants.find(
      (v) =>
        getVariantOption<Delivery>(v.selectedOptions, 'Livraison') ===
        'EXPRESS',
    ),
  };

  const selectedDelivery = getVariantOption<Delivery>(
    selectedVariant.selectedOptions,
    'Livraison',
  );
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [
          {
            merchandiseId: selectedVariant.id,
          },
        ],
      }}
    >
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
              selectedDelivery={selectedDelivery || 'Standard'}
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
                <Price value={selectedVariant.price} />
              </span>
            </p>
            <section id="livraison">
              <Link
                to={getVariantUrl({
                  handle: product.handle,
                  selectedOptions:
                    deliveryVariants.standard?.selectedOptions || [],
                  pathname: '',
                  searchParams: new URLSearchParams(),
                })}
                preventScrollReset={true}
              >
                <label htmlFor="normalDelivery">
                  <div className="title">
                    <input
                      type="radio"
                      name="fastDelivery"
                      id="normalDelivery"
                      checked={selectedDelivery === 'Standard'}
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
              </Link>

              {deliveryVariants.express && (
                <Link
                  to={getVariantUrl({
                    handle: product.handle,
                    selectedOptions: deliveryVariants.express.selectedOptions,
                    pathname: '',
                    searchParams: new URLSearchParams(),
                  })}
                  preventScrollReset={true}
                >
                  <label htmlFor="fastDelivery">
                    <div className="title">
                      <input
                        type="radio"
                        name="fastDelivery"
                        id="fastDelivery"
                        checked={selectedDelivery === 'EXPRESS'}
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
                </Link>
              )}
            </section>
            <PriceButton
              caption="Ajouter au panier"
              btnType="submit"
              price={selectedVariant.price}
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
  selectedDelivery: Delivery;
}
export function GrilleTaille(props: GrilleTailleProps) {
  // Filtrage pour n'obtenir qu'une poiture sans dupliqués
  const variantTitles = new Set(
    props.tailles.map((v) => getVariantSize(v.title)),
  );

  const sizes = Array.from(variantTitles)
    .sort((a, b) => {
      const nbA = parseFloat(a);
      const nbB = parseFloat(b);
      return nbA - nbB;
    })
    .map((title) => {
      const variants = props.tailles.filter(
        (v) => getVariantSize(v.title) === title,
      );
      const deliveryVariant = variants.find((variant) => {
        const deliveryOpt = getVariantOption<Delivery>(
          variant.selectedOptions,
          'Livraison',
        );
        return deliveryOpt === props.selectedDelivery;
      });
      const variant = deliveryVariant || variants[0];
      variant.title = title;

      return {
        variant,
        EXPRESS_Delivery_Available: !!variants.find(
          (variant) =>
            getVariantOption<Delivery>(variant.selectedOptions, 'Livraison') ===
            'EXPRESS',
        ),
      };
    });

  return (
    <ul id="tailleGrid">
      {sizes.map(({variant, EXPRESS_Delivery_Available}) => (
        <li
          key={variant.title}
          className="variant_card"
          data-selected={
            props.selected &&
            getVariantSize(props.selected.title) === variant.title
          }
        >
          {variant.availableForSale ? (
            <>
              <Link
                to={getVariantUrl({
                  handle: props.productHandle,
                  selectedOptions: variant.selectedOptions,
                  pathname: '',
                  searchParams: new URLSearchParams(),
                })}
                preventScrollReset={true}
              >
                {EXPRESS_Delivery_Available && (
                  <div className="liv48h">
                    <Pastille color="var(--color-primary)" />
                  </div>
                )}
                <p className="variantName">{variant.title}</p>
                <p className="variantPrice">
                  <Price value={variant.price} decimals={0} />
                </p>
              </Link>
            </>
          ) : (
            <>
              <div className="soldout">
                <p className="variantName">
                  {variant.title.match(/.+\d/)?.[0] || variant.title}
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
