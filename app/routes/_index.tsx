import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import '../styles/app.scss';
import type {FeaturedProductsquerryQuery} from 'storefrontapi.generated';
import HeroBanner from '~/components/HeroBanner';
import VideoCards from '~/components/VideoCards';
import BrandImageGrid from '~/components/BrandImageGrid';
import OpinionSection from '~/components/OpinionSection';
import FAQ from '~/components/FAQ';
import BlogCarousel from '~/components/BlogCarousel';
import FeaturedCollectionProdcuts from '~/components/FeaturedCollectionProducts';
import FeaturedCollection from '~/components/FeaturedCollection';
import FilDarianne from '~/components/FilDarianne';
import {
  ARTICLE_ITEM_FRAGMENT,
  COLLECTION_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from '~/lib/constants/fragments/defaults';

export const meta: MetaFunction = () => {
  return [{title: 'Minero | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const restoredProducts = storefront.query(RESTORED_PRODUCT_QUERRY);
  const metaObject = await storefront.query(METAOBJECTQUERRY);
  const featuredFirstCollectionData = await storefront.query(
    FEATURED_FIRST_COLLECTION_META,
  );
  const featuredSecondCollectionData = await storefront.query(
    FEATURED_SECOND_COLLECTION_META,
  );
  // const featuredCollectionsData = await storefront.query(
  //   FEATURED_COLLECTION_META,
  // );
  const featuredProductsData =
    await storefront.query<FeaturedProductsquerryQuery>(
      FEATURED_PRODUCTS_QUERY_META,
    );

  const blogData = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: 'infos',
      first: 6,
    },
  });

  if (!blogData.blog?.articles) {
    throw new Response('No articles found', {status: 500});
  }

  return defer({
    restoredProducts,
    blogArticles: blogData.blog.articles.nodes,
    metaObject,
    // featuredCollections: featuredCollectionsData.metaobjects.nodes,
    featuredProducts: featuredProductsData.metaobjects.nodes,
    featuredFirstCollection: featuredFirstCollectionData.metaobject.fields,
    featuredSecondCollection: featuredSecondCollectionData.metaobject.fields,
  });
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  // const featuredCollections = data.featuredCollections;
  const featuredProducts = data.featuredProducts
    .map((metaObject) => {
      const featuredField = metaObject.fields.find(
        (field) => field.key === 'produit',
      );
      return featuredField ? featuredField.reference : null;
    })
    .filter(
      (reference): reference is NonNullable<typeof reference> =>
        reference !== null,
    );
  //FirstQuery
  const featuredFirstProducts = data.featuredFirstCollection
    ?.map((field: any) => field.references?.nodes || [])
    .flat()
    .filter(
      (reference: any): reference is NonNullable<typeof reference> =>
        reference !== null,
    );
  const collectionTitleField = data.featuredFirstCollection.fields?.find(
    (field: any) => field.key === 'titre',
  );
  const collectionTitle = collectionTitleField
    ? collectionTitleField.value
    : null;

  const collectionReferenceField = data.featuredFirstCollection.fields?.find(
    (field: any) => field.reference,
  );
  const collectionHandle = collectionReferenceField
    ? collectionReferenceField.reference.handle
    : '';

  //SecondQuery
  const featuredSecondProducts = data.featuredSecondCollection
    ?.map((field: any) => field.references?.nodes || [])
    .flat()
    .filter(
      (reference: any): reference is NonNullable<typeof reference> =>
        reference !== null,
    );
  const collectionTitleField_2 = data.featuredSecondCollection.fields?.find(
    (field: any) => field.key === 'titre',
  );
  const collectionTitle_2 = collectionTitleField
    ? collectionTitleField_2.value
    : null;

  const collectionReferenceField_2 = data.featuredSecondCollection.fields?.find(
    (field: any) => field.reference,
  );
  const collectionHandle_2 = collectionReferenceField_2
    ? collectionReferenceField_2.reference.handle
    : '';

  return (
    <div className="home">
      {data.metaObject?.metaobject ? (
        <HeroBanner metaObject={data.metaObject.metaobject} />
      ) : null}
      <FilDarianne />
      {/* <div className="homepage-featured-collection">
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
      </div> */}

      {!!featuredProducts.length && (
        <FeaturedCollectionProdcuts products={featuredProducts} />
      )}
      {!!featuredFirstProducts.length && (
        <FeaturedCollection
          products={featuredFirstProducts}
          title={collectionTitle}
          url={collectionHandle}
        />
      )}

      <BrandImageGrid />
      {!!featuredSecondProducts.length && (
        <FeaturedCollection
          products={featuredSecondProducts}
          title={collectionTitle_2}
          url={collectionHandle_2}
        />
      )}
      <VideoCards />
      {/*
      <Await resolve={data.restoredProducts}>
        {({collection}) =>
          collection && <RestoredProduct collection={collection} />
        }
      </Await>*/}
      <OpinionSection />
      <BlogCarousel articles={data.blogArticles} />
      {!!featuredProducts.length && (
        <FeaturedCollectionProdcuts products={featuredProducts} />
      )}
      <FAQ />
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

const FEATURED_COLLECTION_META = `#graphql
${METAOBJECT_FRAGMENT}
query FeaturedCollections {
  metaobjects(type: "featured_collections", first: 50) {
    nodes {
      ...MetaObjectFields
    }
  }
}
` as const;

export const FEATURED_PRODUCTS_QUERY_META = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query FeaturedProductsquerry {
    metaobjects(type: "featured_products", first: 50) {
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

export const FEATURED_FIRST_COLLECTION_META = `#graphql
${PRODUCT_CARD_FRAGMENT}
query FeaturedFirstquerry {
  metaobject(handle: {type: "featured_collection_1", handle: "featured-collection-1"}) {
    fields {
      key
      value
      reference {
        ... on Collection {
          handle
        }
        ... on Product {
          ...ProductCard
        }
      }
      references (first: 10) {
        nodes {
          ... on Product {
            ...ProductCard
          }
        }
      }
    }
  }
}
` as const;

export const FEATURED_SECOND_COLLECTION_META = `#graphql
${PRODUCT_CARD_FRAGMENT}
query FeaturedSecondquerry {
  metaobject(handle: {type: "featured_collection_2", handle: "featured-collection-2"}) {
    fields {
      key
      value
      reference {
        ... on Collection {
          handle
        }
        ... on Product {
          ...ProductCard
        }
      }
      references (first: 10) {
        nodes {
          ... on Product {
            ...ProductCard
          }
        }
      }
    }
  }
}
` as const;
