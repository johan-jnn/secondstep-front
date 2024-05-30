export const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    currentlyNotInStock
    sku
    title
    price {
      amount
      currencyCode
    }
  }
` as const;

export const METAFIELD_FRAGMENT = `#graphql
fragment MetaFieldInfo on Metafield {
  key
  value
  type
  id
  references(first: 8) {
    nodes {
      __typename
      ... on MediaImage {
        id
        image {
          altText
          id
          src
        }
      }
    }
  }
}
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
fragment ProductCard on Product {
  id
  title
  handle
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  featuredImage {
    url
    altText
  }
  metafields(identifiers: [
    {key: "titres", namespace: "custom"},
    {key: "notes", namespace: "custom"},
    {key: "looks", namespace: "custom"},
    {key: "couleur", namespace: "custom"},
    {key: "fastdelivery", namespace: "custom"}
  ]) {
    ...MetaFieldInfo
  }
  availableForSale
  vendor
}
${METAFIELD_FRAGMENT}
`;

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    metafields(identifiers: [
      {key: "titres", namespace: "custom"},
      {key: "notes", namespace: "custom"},
      {key: "looks", namespace: "custom"},
      {key: "couleur", namespace: "custom"},
      {key: "fastdelivery", namespace: "custom"}
    ]) {
      ...MetaFieldInfo
    }
    images(first: 50) {
      nodes {
        url
        altText
      }
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
  ${METAFIELD_FRAGMENT}
` as const;

export const COLLECTION_FRAGMENT = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    description
    image {
      id
      url
      altText
      width
      height
    }
    products(first: 1) {
      nodes {
        featuredImage {
          url
          altText
          src
          id
        }
        vendor
      }
    }
  }`;

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

// https://shopify.dev/docs/api/customer/latest/objects/Order
export const ORDER_ITEM_FRAGMENT = `#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    id
    number
    processedAt
  }
` as const;

// https://shopify.dev/docs/api/customer/latest/objects/Customer
export const CUSTOMER_ORDERS_FRAGMENT = `#graphql
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
  ${ORDER_ITEM_FRAGMENT}
` as const;

// NOTE: https://shopify.dev/docs/api/customer/latest/objects/Customer
export const CUSTOMER_FRAGMENT = `#graphql
  fragment Customer on Customer {
    id
    firstName
    lastName
    defaultAddress {
      ...Address
    }
    addresses(first: 6) {
      nodes {
        ...Address
      }
    }
  }
  fragment Address on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    territoryCode
    zoneCode
    city
    zip
    phoneNumber
  }
` as const;
