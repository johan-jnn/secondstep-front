import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import '~/styles/pages.scss';
import FAQ from '~/components/FAQ';
import Icon from '~/components/Icon';
import {
  PlusIcon,
  LogoInstagramIcon,
  EmailIcon,
  ChatIcon,
  ChevronRightIcon,
  PersonFilledIcon,
} from '@shopify/polaris-icons';

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
  console.log(page);
  return (
    <div className="page">
      <h1>{page.title}</h1>
      {page.handle === 'contact' ? (
        <>
          <ContactPage />
        </>
      ) : (
        <div>Page Not Found</div>
      )}
      <FAQ />
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="contact-component">
      <div className="contact-card">
        <a href="mailto:contact@second-step.fr" className="top">
          <Icon
            icon={EmailIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
          <h2>Nous Contacter par mail</h2>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
        </a>
        <p>
          N’hésitez pas à remplir notre formulaire de contact avec tous les
          détails de votre demande.
          <br />
          <br />
          Promis, on vous répondra dans les 24 à 48 heures ouvrables. 😊
        </p>
      </div>
      <div className="contact-card">
        <a href="whatsapp://send?phone=0785838528" className="top">
          <Icon
            icon={ChatIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
          <h2>Discuter sur Whatsapp</h2>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
        </a>
        <p>
          Discutez directement avec notre équipe via le chat ou sur WhatsApp au
          +33 7 85 83 85 28.
          <br />
          <br />
          Nous sommes disponibles du lundi au vendredi, de 09h00 à 19h00 GMT+1.
        </p>
      </div>
      <div className="contact-card">
        <a href="https://www.instagram.com/secondstep.fr/" className="top">
          <Icon
            icon={LogoInstagramIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
          <h2>Slider dans nos DM</h2>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
        </a>
        <p>
          Contactez-nous en DM Instagram sur @seconstep.fr !
          <br />
          <br />
          Nous sommes disponibles du lundi au vendredi, de 09h00 à 19h00 GMT+1.
        </p>
      </div>
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
