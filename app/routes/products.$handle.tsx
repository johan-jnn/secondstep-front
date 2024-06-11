import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import 'swiper/css/bundle';
import {Virtual, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import '../styles/products.$handle.scss';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import type {ProductFragment} from 'storefrontapi.generated';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {SelectedOption} from '@shopify/hydrogen/storefront-api-types';
import {getVariantUrl} from '~/lib/variants';
import ProductForm from '~/components/ProductForm';
import getProductTitleAndSub from '~/lib/productTitles';
import Certification from '~/components/Certification';
import BrandLogo, {type ValidBrands} from '~/components/BrandLogo';
import Button from '~/components/Button';
import TrustPilotReviews from '~/components/trustPilotReviews';
import ProcessReconditionnement from '~/components/ProcessReconditionnement';
import ProductIRLLooks from '~/components/ProductIRLLooks';
import KitEntretientCTA from '~/components/KitEntretientCTA';
import FAQ from '~/components/FAQ';
import NeufVsSS from '~/components/ComparatifNeufVsSS';
import ProductGrid from '~/components/ProductGrid';
import {
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_FRAGMENT,
} from '~/lib/constants/fragments/defaults';
import ImageWithCaption from '~/components/ImageWithCaption';
import ThomasInspection from '~/assets/images/ThomasInspecting.webp';

export const meta: MetaFunction<typeof loader> = ({data, location}) => {
  return [{title: `Minero | ${data?.product.title ?? ''}`}];
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

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const {productRecommendations} = await storefront.query(
    PRODUCT_RECOMMENDATION_QUERY,
    {
      variables: {
        productId: product.id,
      },
    },
  );

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
    // we redirect to the first variant&apos;s url with it&apos;s selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  return defer({product, productRecommendations});
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
  const {product, productRecommendations} = useLoaderData<typeof loader>();
  return (
    <>
      <div className="product">
        <Galery images={product.images} />
        <div id="buying">
          <ProductForm product={product} />
        </div>
      </div>
      {productRecommendations && (
        <div className="recommendations">
          <h2>Nous vous recommendons également :</h2>
          <ProductGrid products={productRecommendations.slice(0, 4)} />
        </div>
      )}
      <div className="extra">
        {/* <nav role="navigation" className="menu">
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
            <li className="cta">
              <a href="/collections/all">
                <Button type="primary" text="Shopper ma paire" />
              </a>
            </li>
          </ul>
        </nav> */}

        {/* <section id="reviews">
          <TrustPilotReviews />
        </section> */}
        <section id="process">
          <ImageWithCaption
            image={ThomasInspection}
            imagePlacement="right"
            title="Authentification"
            subtitle="Processus"
          >
            <>
              <p>
                Chez <b>SecondStep</b>, l&apos;authenticité des produits
                constitue le pilier fondamental de notre philosophie
                d&apos;entreprise. Nous comprenons à quel point il est essentiel
                pour nos clients de se sentir en confiance lors de leurs achats.
              </p>
              <br />
              <p>
                C&apos;est pourquoi nous avons instauré un processus de
                vérification rigoureux pour chaque article proposé sur notre
                plateforme.
              </p>
              <br />
              <h5>UN PROCESSUS DE VÉRIFICATION RIGOUREUX</h5>
              <br />
              <p>
                Avant qu&apos;un produit ne parvienne entre les mains de nos
                clients, il passe par les{' '}
                <strong>mains expertes de notre équipe de contrôle</strong>. Ces
                professionnels hautement qualifiés sont spécialement formés pour
                déceler les contrefaçons et garantir ainsi que seuls les
                produits authentiques sont mis en vente.
              </p>
              <br />
              <p>
                Chez SecondStep, nous croyons fermement que l&apos;authenticité
                est la clé de relations durables avec nos clients. Nous nous
                engageons à maintenir cet <b>engagement</b> et à vous offrir une
                expérience d&apos;achat sereine et fiable à chaque fois que vous
                choisissez de faire confiance à notre plateforme
              </p>
            </>
          </ImageWithCaption>
        </section>
        <section id="looks">
          <ProductIRLLooks product={product} />
        </section>
        <section id="allies">
          <KitEntretientCTA for={product} />
        </section>
        {/* <section id="neuf-vs-recond">
          <NeufVsSS />
        </section> */}
        <section id="faq">
          <FAQ />
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
        <BrandLogo brand={brand as ValidBrands} />
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
      <section id="certification">
        <Certification />
      </section>
    </div>
  );
}

function Galery(props: {images: ProductFragment['images']}) {
  return (
    <div id="galery">
      {props.images.nodes.length ? (
        <>
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={1}
            centeredSlides={false}
            spaceBetween={10}
            pagination={{clickable: true}}
            navigation={false}
            loop={false}
            grabCursor={true}
            autoplay={{
              delay: 5000,
            }}
          >
            {props.images.nodes.map(({url, altText}, index) => (
              <SwiperSlide key={url}>
                <div className="image-card">
                  <img src={url} alt={altText || 'No alt defined...'} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <p>L&apos;article ne contient pas d&apos;image...</p>
      )}
    </div>
  );
}

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

const PRODUCT_RECOMMENDATION_QUERY = `#graphql
query Recommendations(
  $productId: ID!
) {
  productRecommendations(productId: $productId) {
    ...ProductCard
  }
}
${PRODUCT_CARD_FRAGMENT}
`;
