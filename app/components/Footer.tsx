import {NavLink} from '@remix-run/react';
import type {
  FooterGoToQuery,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {useRootLoaderData} from '~/lib/root-data';
import './styles/footer.scss';

export function Footer({
  footer,
  footerGoTo,
  shop,
}: {
  footer: FooterQuery;
  footerGoTo: FooterGoToQuery;
  shop: HeaderQuery['shop'];
}) {
  return (
    <footer className="footer">
      {footer.menu && shop?.primaryDomain?.url && (
        <div>
          <FooterMenu
            menu={footer.menu}
            menuGoto={footerGoTo.menu}
            primaryDomainUrl={shop.primaryDomain.url}
          />
        </div>
      )}
    </footer>
  );
}

function FooterMenu({
  menu,
  menuGoto,
  primaryDomainUrl,
}: {
  menu: FooterQuery['menu'];
  menuGoto: FooterGoToQuery['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <div className="footer_grid">
      <div className="footer_help">
        <h1>Aides & Informations</h1>
        <a href="/"> Nous contacter</a>
        <br />
        <a href="/"> Notre Concept</a>
        <br />
        <a href=" "> contact@secondstep.fr</a>
        <br />
        <a href=" ">Instagram : @secondstep.fr</a>
        <br />
        <a href="/">FAQ</a>
      </div>
      <nav className="footer-menu" role="navigation">
        <h1>Policies</h1>
        {(menu || FALLBACK_FOOTER_MENU_INFO).items.map((item) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return isExternal ? (
            <a
              href={url}
              key={item.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.title}
            </a>
          ) : (
            <div className="footer_infos">
              <NavLink
                end
                key={item.id}
                prefetch="intent"
                style={activeLinkStyle}
                to={url}
              >
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </nav>
      <nav className="footer-menu" role="navigation">
        <h1>Parcourir</h1>
        {(menuGoto || FALLBACK_FOOTER_MENU_INFO).items.map((item) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return isExternal ? (
            <a
              href={url}
              key={item.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.title}
            </a>
          ) : (
            <div className="footer_infos">
              <NavLink
                end
                key={item.id}
                prefetch="intent"
                style={activeLinkStyle}
                to={url}
              >
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </nav>
      <div className="footer_AboutUs">
        <h1>A propos de nous</h1>
        <p>
          Chez Second Step, nous voulons redéfinir la façon dont les sneakers
          sont consommées et perçues dans le monde de la monde. Nous aspirons à
          créer une communauté engagée qui apprécie la valeur des sneakers
          d'occasion.
        </p>
      </div>
      <div className="footer_Socials">
        <h1>Rejoignez nous sur nos réseaux</h1>
        <div className="div_socials">
          <a href="https://www.instagram.com/secondstep.fr/">
            <img
              src="app/assets/Logos/logo-instagram.svg"
              alt="logo insta"
              className="logo_social"
            />
          </a>
          <a href="https://www.instagram.com/secondstep.fr/">
            <img
              src="app/assets/Logos/logo-tiktok.svg"
              alt="logo tiktok"
              className="logo_social"
            />
          </a>
          <a href="https://www.instagram.com/secondstep.fr/">
            <img
              src="app/assets/Logos/logo-linkedin.svg"
              alt="logo linkedin"
              className="logo_social"
            />
          </a>
          <a href="https://www.instagram.com/secondstep.fr/">
            <img
              src="app/assets/Logos/logo-facebook.svg"
              alt="logo facebook"
              className="logo_social"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

const FALLBACK_FOOTER_MENU_INFO = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
