import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import ContactPage from './contact';
import FAQ from '~/components/FAQ';
import NousDecouvrirPage from './nous-decouvrir';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? ''}`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page});
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();
  return (
    <div className="page">
      <h1>{page.title}</h1>
      {page.handle === 'contact' ? (
        <>
          <ContactPage />
        </>
      ) : null}
      {page.handle === 'nous-d-couvrir' ? (
        <>
          <NousDecouvrirPage />
        </>
      ) : null}
      <FAQ />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      handle
      seo {
        description
        title
      }
    }
  }
` as const;
