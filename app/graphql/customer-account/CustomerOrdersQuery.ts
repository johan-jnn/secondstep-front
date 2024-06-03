import {CUSTOMER_ORDERS_FRAGMENT} from '~/lib/constants/fragments';

// https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_ORDERS_QUERY = `#graphql
  query CustomerOrders(
    $endCursor: String
    $first: Int
    $last: Int
    $startCursor: String
  ) {
    customer {
      ...CustomerOrders
    }
  }
  ${CUSTOMER_ORDERS_FRAGMENT}
` as const;
