// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_DETAILS_QUERY = `#graphql
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
fragment Address on MailingAddress {
  id
  formatted
  firstName
  lastName
  company
  address1
  address2
  countryCode
  provinceCode
  city
  zip
  phone
}
  query CustomerDetails {
    customer {
      ...Customer
    }
  }
` as const;
