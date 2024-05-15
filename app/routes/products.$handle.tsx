import {Suspense, useState} from 'react';
import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import '../styles/products.$handle.scss';
import {
  Await,
  Link,
  useLoaderData,
  type MetaFunction,
  type FetcherWithComponents,
} from '@remix-run/react';
import type {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import {
  Image,
  Money,
  VariantSelector,
  type VariantOption,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import type {
  CartLineInput,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import {getVariantUrl} from '~/lib/variants';
import Price from '~/components/Price';
import ProductForm from '~/components/ProductForm';
import getProductTitleAndSub from '~/lib/productTitles';
import Certification from '~/components/Certification';
import BrandLogo, {type ValidLogos} from '~/components/BrandLogo';
import Button from '~/components/Button';
import TrustPilotReviews from '~/components/trustPilotReviews';
import ProcessReconditionnement from '~/components/ProcessReconditionnement';
import BestInstagramLooks from '~/components/BestInstagramLooks';
import KitEntretientCTA from '~/components/KitEntretientCTA';
import NeufVSReconditionne from '~/components/ComparatifNeufVSRecondionne';
import FAQ from '~/components/FAQ';

export const meta: MetaFunction<typeof loader> = ({data, location}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  return defer({product});
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductFragment;
  request: Request;
}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes.find((v) => v.availableForSale);

  if (!firstVariant) return redirect('/');
  else
    return redirect(
      getVariantUrl({
        pathname: url.pathname,
        handle: product.handle,
        selectedOptions: firstVariant.selectedOptions,
        searchParams: new URLSearchParams(url.search),
      }),
      {
        status: 302,
      },
    );
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  return (
    <>
      <div className="product">
        <Infos product={product} />
        <Galery images={product.images} />
        <div id="buying">
          <ProductForm product={product} />
        </div>
      </div>
      <div className="extra">
        <aside className="menu">
          <ul>
            <li>
              <a href="#reviews">Avis</a>
            </li>
            <li>
              <a href="#process">Process Seconde Main</a>
            </li>
            <li>
              <a href="#looks">Vos Looks</a>
            </li>
            <li>
              <a href="#allies">Alliés Indispensable</a>
            </li>
            <li>
              <a href="#neuf-vs-recond">Neuf VS Reconditionné</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="/collections/all">
                <Button type="primary" text="Shopper ma paire" />
              </a>
            </li>
          </ul>
        </aside>

        <section id="reviews">
          <TrustPilotReviews />
        </section>
        <section id="process">
          <ProcessReconditionnement />
        </section>
        <section id="looks">
          <BestInstagramLooks />
        </section>
        <section id="allies">
          <KitEntretientCTA for={product} />
        </section>
        <section id="neuf-vs-recond">
          <NeufVSReconditionne />
        </section>
        <section id="faq">
          <FAQ answers={[]} />
        </section>
      </div>
    </>
  );
}

function Infos({product}: {product: ProductFragment}) {
  const {subtitle} = getProductTitleAndSub(product.title);
  const brand = product.vendor.toLowerCase().replaceAll(' ', '_');

  const data = {
    marque: (
      <>
        <p>{product.vendor.toUpperCase()}</p>
        <BrandLogo logo={brand as ValidLogos} />
      </>
    ),
    modèle: <p>{subtitle}</p>,
  };

  return (
    <div className="infos">
      <section className="def">
        {Object.entries(data).map(([name, element]) => (
          <div key={name} data-def={name}>
            <h3>{name}</h3>
            {element}
          </div>
        ))}
      </section>
      <hr />
      <section className="certification">
        <Certification />
      </section>
    </div>
  );
}

function Galery(props: {images: ProductFragment['images']}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div id="galery">
      <div id="viewer">
        <Image
          src={props.images.nodes[currentIndex].url}
          alt={
            props.images.nodes[currentIndex].altText ||
            `${currentIndex}rd preview of the product`
          }
        />
      </div>
      <div id="selectorWrapper">
        <ul id="selector">
          {props.images.nodes.map(({url, altText}, index) => (
            <li key={url} data-selected={+(index === currentIndex)}>
              <button type="button" onClick={() => setCurrentIndex(index)}>
                <Image
                  src={url}
                  alt={altText || `Select the ${index + 1}rd preview.`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    currentlyNotInStock
    sku
    title
    price {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    images(first: 50) {
      nodes {
        url
        altText
      }
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
