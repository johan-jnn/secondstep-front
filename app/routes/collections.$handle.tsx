import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import '../styles/collections.$handle.scss';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import type {
  CollectionFragment,
  ProductCardFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import LoadMore from '~/components/loadMoreContent';
import ProductGrid from '~/components/ProductGrid';
import DropBanner from '~/components/dropBanner';
import SearchForm from '~/components/searchForm';
import searchOptionsValues from '~/lib/constants/searchOptionsValues';
import type {Not} from '~/lib/types';
import type {ValidBrands} from '~/components/BrandLogo';
import {
  COLLECTION_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from '~/lib/constants/fragments/defaults';
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Minero | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 16,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const [collectionResponse, dropProductResponse] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
    storefront.query(DROP_PRODUCT_QUERY, {
      variables: {},
    }),
  ]);

  const collection = collectionResponse.collection;
  const dropCollection = dropProductResponse.collection;

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  const description = collection.description;
  const collectionNames = description.split(',');
  const featuredCollections = await Promise.all(
    collectionNames.map(async (name) => {
      const featuredCollectionResponse = await storefront.query(
        FEATURED_COLLECTION_QUERY,
        {
          variables: {handle: name},
        },
      );
      return featuredCollectionResponse.collection;
    }),
  ).then((collections) =>
    collections.filter((c): c is Not<typeof c, null> => c !== null),
  );

  return json({collection, dropCollection, featuredCollections});
}

export default function Collection() {
  const {collection, dropCollection, featuredCollections} =
    useLoaderData<typeof loader>();

  const vendors = new Set(collection.products.nodes.map((p) => p.vendor));
  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <SearchForm
        options={searchOptionsValues}
        current={{
          brands: Array.from(vendors) as ValidBrands[],
          q: collection.title,
        }}
      />
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <LoadMore
              direction="previous"
              isLoading={isLoading}
              link={PreviousLink}
            />
            <ProductGrid products={nodes} collections={featuredCollections} />
            <br />
            <LoadMore direction="more" isLoading={isLoading} link={NextLink} />
          </>
        )}
      </Pagination>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;

const DROP_PRODUCT_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query DropProductQuery {
    collection(handle: "Drop") {
      ...Collection
    }
  }
` as const;

const FEATURED_COLLECTION_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query FeaturedCollectionQuery($handle: String!) {
    collection(handle: $handle) {
      ...Collection
    }
  }
` as const;
