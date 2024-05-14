import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import '../styles/app.scss';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import ProductCard, {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import {COLLECTION_FRAGMENT} from './collections._index';
import HomePageBanner from '~/components/HomePage-Banner';
import HomePageEngagements from '~/components/HomePageEngagements';
import HomePageCollectionCTA from '~/components/HomePageCollectionCTA';
import VideoCard from '~/components/VideoCard';

export const meta: MetaFunction = () => {
  return [{title: 'Second Step | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HomePageBanner />
      <div className="homepage-featured-collection">
        {data.featuredCollection.map((collection) => (
          <HomePageCollectionCTA key={collection.id} collection={collection} />
        ))}
      </div>
      <HomePageEngagements />
      <RecommendedProducts products={data.recommendedProducts} />
      <div className="video-cards">
        <VideoCard
          backgroundcolor="var(--color-light)"
          textColor=" "
          text=""
          num="01"
          title=""
          subtext=" "
          boldKeywords={[]}
        />
        <VideoCard
          backgroundcolor="var(--color-dark)"
          textColor="var(--color-light)"
          num="02"
          text="Chez SecondStep, l'autheticité des produits constitue un pilier fondamental de notre philosophie d'entreprise. Nous comprenons à quel point il est essentiel pour nos clients de se sentir en confiance lors de leurs achats."
          title="Authentification"
          subtext="C'est pourquoi nous avons instauré un processus de vérification rigoureux pour chaque article proposé sur notre site..."
          boldKeywords={[
            'SecondStep',
            'confiance',
            'processus de vérification rigoureux',
          ]}
        />
        <VideoCard
          backgroundcolor=" "
          textColor=" "
          text="blablablablablablablablabl ablablablablabla "
          title="03"
          boldKeywords={[]}
          subtext=" "
          num=" "
        />
      </div>
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <h1>Nos meilleures ventes</h1>
      <h2>Attention ca part un peu (beaucoup) vite</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <ProductCard informations={product} key={product.id} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...Collection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductCard
      }
    }
  }
` as const;
