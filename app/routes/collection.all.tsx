import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import type {ProductCardFragment} from 'storefrontapi.generated';
import ProductCard, {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import '../styles/collections.$handle.scss';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Hydrogen | Products`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {...paginationVariables},
  });

  return json({products});
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="collection">
      <h1>Products</h1>
      <Pagination connection={products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <ProductsGrid products={nodes} />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

function ProductsGrid({products}: {products: ProductCardFragment[]}) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return <ProductCard informations={product} key={product.id} />;
      })}
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/2024-01/objects/product
const CATALOG_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
` as const;
