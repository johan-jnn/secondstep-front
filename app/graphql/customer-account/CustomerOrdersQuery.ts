// https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_ORDERS_QUERY = `#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillmentStatus
    id
    name
    processedAt
  }
  fragment CustomerOrders on Customer {
    orders(
      sortKey: PROCESSED_AT,
      reverse: true,
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...OrderItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
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
` as const;
