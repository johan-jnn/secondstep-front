import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import '../styles/app.scss';
import type {
  CollectionFragment,
  ProductCardFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import ProductCard, {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import {COLLECTION_FRAGMENT} from './collections._index';
import HeroBanner from '~/components/HeroBanner';
import Engagements from '~/components/Engagements';
import ProductGrid from '~/components/ProductGrid';
import VideoCards from '~/components/VideoCards';
import RestoredProduct from '~/components/RestoredProduct';
import BrandImageGrid from '~/components/BrandImageGrid';
import Passionate from '~/components/PassionateSection';
import PressSection from '~/components/PressSection';
import OpinionSection from '~/components/OpinionSection';
import FAQ from '~/components/FAQ';
import CarteAuthenticite from '~/components/CarteAuthenticite';
import BlogCarousel from '~/components/BlogCarousel';
import CollectionCard from '~/components/CollectionCard';
import {Not} from '~/lib/types';

export const meta: MetaFunction = () => {
  return [{title: 'Second Step | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const restoredProducts = storefront.query(RESTORED_PRODUCT_QUERRY);
  const metaObject = await storefront.query(METAOBJECTQUERRY);
  const featuredCollectionsData = await storefront.query(
    FEATURED_COLLECTION_QUERY_META,
  );
  const featuredProductsData = await storefront.query(
    FEATURED_PRODUCTS_QUERY_META,
  );
  const blogHandle = 'infos';
  const paginationVariables = {first: 6};
  const blogData = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle,
      ...paginationVariables,
    },
  });

  if (!blogData.blog?.articles) {
    throw new Response('No articles found', {status: 404});
  }

  return defer({
    recommendedProducts,
    restoredProducts,
    blogArticles: blogData.blog.articles.nodes,
    metaObject,
    featuredCollections: featuredCollectionsData.metaobjects.nodes,
    featuredProducts: featuredProductsData.metaobjects.nodes,
  });
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const featuredCollections = data.featuredCollections;
  const featuredProducts = data.featuredProducts
    .map((metaObject) => {
      const featuredField = metaObject.fields.find(
        (field) => field.key === 'featured_products',
      );
      return featuredField ? featuredField.reference : null;
    })
    .filter(
      (reference): reference is NonNullable<typeof reference> =>
        reference !== null,
    );

  return (
    <div className="home">
      {data.metaObject?.metaobject ? (
        <HeroBanner metaObject={data.metaObject.metaobject} />
      ) : null}
      <div className="homepage-featured-collection">
        {featuredCollections.map((metaObject) => {
          if (
            metaObject.fields.find((f) => f.key === 'home-page-use')?.value !==
            'true'
          )
            return null;
          const collection = metaObject.fields.find(
            (field) => field.key === 'featured_collection',
          )?.reference;
          if (!collection) return null;
          return (
            <CollectionCard
              key={metaObject.id}
              collection={collection as CollectionFragment}
            />
          );
        })}
      </div>
      <Engagements />
      <RecommendedProducts products={featuredProducts} />
      <VideoCards />
      <Await resolve={data.restoredProducts}>
        {({collection}) =>
          collection && <RestoredProduct collection={collection} />
        }
      </Await>
      <BrandImageGrid />
      <Passionate />
      <PressSection />
      <OpinionSection />
      <BlogCarousel articles={data.blogArticles} />
      <FAQ />
      <CarteAuthenticite />
    </div>
  );
}

function RecommendedProducts({products}: {products: ProductCardFragment[]}) {
  return (
    <div className="recommended-products">
      <h2>Nos meilleures ventes</h2>
      <p>Attention ca part un peu (beaucoup) vite</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          <ProductGrid products={products} />
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

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
` as const;

export const METAOBJECT_FRAGMENT = `#graphql
  ${COLLECTION_FRAGMENT}
  fragment MetaObjectFields on Metaobject {
    fields {
      value
      key
      reference {
        ... on MediaImage {
          image {
            altText
            url
          }
        }
        ... on Collection {
          ...Collection
        }
      }
      type
    }
    id
  }
` as const;

const METAOBJECTQUERRY = `#graphql
  ${METAOBJECT_FRAGMENT}
  query metaobjectquerry {
    metaobject(handle: {handle: "home-page", type: "hero_header"}) {
      ...MetaObjectFields
    }
  }
` as const;

const FEATURED_COLLECTION_QUERY_META = `#graphql
${METAOBJECT_FRAGMENT}
query FeaturedCollectionsquerry {
  metaobjects(type: "featured_collections", first: 50) {
    nodes {
      ...MetaObjectFields
    }
  }
}
` as const;

const FEATURED_PRODUCTS_QUERY_META = `#graphql
${PRODUCT_CARD_FRAGMENT}
query FeaturedProductsquerry {
  metaobjects(type: "featured_products", first: 5) {
    nodes {
      fields {
        reference {
          ... on Product {
            ...ProductCard
          }
        }
        key
      }
    }
  }
}
` as const;

export const ARTICLE_ITEM_FRAGMENT = `#graphql
  fragment ArticleItemBlog on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    tags
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
` as const;

const BLOGS_QUERY = `#graphql
  ${ARTICLE_ITEM_FRAGMENT}
  query CarouselBlog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItemBlog
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
