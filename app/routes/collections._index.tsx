import {useLoaderData, Link} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import '../styles/collections._index.scss';
import CollectionCTA from '~/components/CollectionCTA';
import LoadMore from '~/components/loadMoreContent';
import {COLLECTION_FRAGMENT} from '~/lib/constants/fragments';

export async function loader({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collections">
      <h1>Nos marques</h1>
      <Pagination connection={collections}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <div>
            <LoadMore
              direction="previous"
              isLoading={isLoading}
              link={PreviousLink}
            />
            <CollectionsGrid collections={nodes} />
            <LoadMore direction="more" isLoading={isLoading} link={NextLink} />
          </div>
        )}
      </Pagination>
    </div>
  );
}

function CollectionsGrid({collections}: {collections: CollectionFragment[]}) {
  return (
    <div className="collections-grid">
      {collections.map((collection) => (
        <CollectionCTA key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
