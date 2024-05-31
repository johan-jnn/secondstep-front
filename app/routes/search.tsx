import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {getPaginationVariables} from '@shopify/hydrogen';

import {SearchResults, NoSearchResults} from '~/components/Search';
import SearchForm, {searchParser, sortType} from '~/components/searchForm';
import type {ProductFilter} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/constants/fragments';
import type {SearchQuery} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Search`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const filters = searchParser(url.search);
  filters.q ??= ' ';

  const variables: {[key: string]: any} = getPaginationVariables(request, {
    pageBy: 20,
  });

  if (filters.sort) {
    if (filters.sort === sortType['Prix croissant']) {
      variables['sortType'] = 'PRICE';
    } else if (filters.sort === sortType['Prix décroissants']) {
      variables['sortType'] = 'PRICE';
      variables['reverse'] = true;
    } else {
      variables['sortType'] = 'RELEVANCE';
    }
  }

  const colorFilters =
    filters.colors?.map(
      (color): ProductFilter => ({
        productMetafield: {
          key: 'couleurs',
          namespace: 'custom',
          value: color.code,
        },
      }),
    ) || [];
  const brandFilters =
    filters.brands?.map((brand): ProductFilter => ({productVendor: brand})) ||
    [];
  const sizesFilters =
    filters.sizes?.map(
      (size): ProductFilter => ({
        variantOption: {
          name: 'size',
          value: size.toString(),
        },
      }),
    ) || [];
  const priceFilter: ProductFilter[] = filters.prices
    ? [
        {
          price: {
            min: filters.prices.min,
            max: filters.prices.max,
          },
        },
      ]
    : [];
  const {errors, ...data} = await context.storefront.query<SearchQuery>(
    SEARCH_QUERY,
    {
      variables: {
        query: filters.q,
        filters: [
          ...brandFilters,
          ...sizesFilters,
          ...priceFilter,
          ...colorFilters,
        ],
        ...variables,
      },
    },
  );

  if (!data) {
    throw new Error('No search data returned from Shopify API');
  }

  const totalResults = Object.values(data).reduce((total, value) => {
    return total + value.nodes.length;
  }, 0);

  const searchResults = {
    results: data,
    totalResults,
  };

  return defer({
    filters,
    searchResults,
  });
}

export default function SearchPage() {
  const {filters, searchResults} = useLoaderData<typeof loader>();

  return (
    <div className="search">
      <h1>Search</h1>
      <SearchForm current={filters} options={'default'} />
      {!filters || !searchResults.totalResults ? (
        <NoSearchResults />
      ) : (
        <SearchResults results={searchResults.results} filters={filters} />
      )}
    </div>
  );
}

const SEARCH_QUERY = `#graphql
  query search(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $query: String!
    $startCursor: String
    $filters: [ProductFilter!]
    $sortType: SearchSortKeys = RELEVANCE
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    products: search(
      query: $query,
      unavailableProducts: HIDE,
      types: [PRODUCT],
      first: $first,
      sortKey: $sortType,
      reverse: $reverse,
      last: $last,
      before: $startCursor,
      after: $endCursor
      productFilters: $filters
    ) {
      nodes {
        ...on Product {
          __typename
          trackingParameters
          ...ProductCard
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
