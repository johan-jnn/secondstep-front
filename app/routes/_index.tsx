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
import ProductGrid from '~/components/ProductGrid';
import HomePageVideoCards from '~/components/HomePageVideoCards';
import HomePageRestoredProduct from '~/components/HomePageRestoredProduct';
export const meta: MetaFunction = () => {
  return [{title: 'Second Step | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const restoredProducts = storefront.query(RESTORED_PRODUCT_QUERRY);

  return defer({featuredCollection, recommendedProducts, restoredProducts});
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
      <HomePageVideoCards />
      <Await resolve={data.restoredProducts}>
        {({collection}) =>
          collection && <HomePageRestoredProduct collection={collection} />
        }
      </Await>
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
          {({products}) => <ProductGrid products={products.nodes} />}
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

const RESTORED_PRODUCT_QUERRY = `#graphql
${PRODUCT_CARD_FRAGMENT}
query RestoredShoes {
    collection(handle: "Yeezy") {
      description
      products(first: 3) {
        nodes{
            ...ProductCard
        }
      }
    }
  }
  `;
