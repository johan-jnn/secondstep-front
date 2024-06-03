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

export const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
` as const;

export const ARTICLE_FRAGMENT = `#graphql
fragment SearchPage on Page {
  __typename
  handle
 id
 title
 trackingParameters
}
fragment SearchArticle on Article {
 __typename
 handle
 id
 title
 trackingParameters
}
` as const;
