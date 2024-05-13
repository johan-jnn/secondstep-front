import {NavLink} from '@remix-run/react';
import type {
  FooterQuery,
  HeaderQuery,
  MenuFragment,
} from 'storefrontapi.generated';
import {useRootLoaderData} from '~/lib/root-data';
import './styles/footer.scss';
import CardIcon from '../assets/Logos/icons-card.png?url';
import Instagram from '../assets/Logos/logo-instagram.svg?url';
import Facebook from '../assets/Logos/logo-facebook.svg?url';
import Linkedin from '../assets/Logos/logo-linkedin.svg?url';
import Tiktok from '../assets/Logos/logo-tiktok.svg?url';
import EmailInbox from './EmailInBox';

export interface footerMenus {
  main: FooterQuery;
  goto: FooterQuery;
  infos: FooterQuery;
}

export function Footer({
  menus,
  shop,
}: {
  menus: footerMenus;
  shop: HeaderQuery['shop'];
}) {
  const {goto, infos, main} = menus;
  return (
    <footer>
      {main.menu && goto.menu && infos.menu && shop?.primaryDomain?.url && (
        <FooterContent
          menu={main.menu}
          menuGoto={goto.menu}
          menuInfos={infos.menu}
          primaryDomainUrl={shop.primaryDomain.url}
        />
      )}
    </footer>
  );
}

function FooterNav({
  title,
  menu,
  domainUrls,
}: {
  title: string;
  menu?: MenuFragment;
  domainUrls: {
    store: string;
    primary: string;
  };
}) {
  return (
    <div className="nav">
      <h2>{title}</h2>
      <nav className="footer-menu" role="navigation">
        <ul>
          {(menu || FALLBACK_FOOTER_MENU_INFO).items.map((item) => {
            if (!item.url) return null;
            // if the url is internal, we strip the domain
            const url =
              item.url.includes('myshopify.com') ||
              item.url.includes(domainUrls.primary) ||
              item.url.includes(domainUrls.store)
                ? new URL(item.url).pathname
                : item.url;
            const isExternal = !url.startsWith('/');
            return (
              <li key={item.id}>
                {isExternal ? (
                  <a href={url} rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </a>
                ) : (
                  <NavLink
                    end
                    prefetch="intent"
                    style={activeLinkStyle}
                    to={url}
                  >
                    {item.title}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function FooterContent({
  menu,
  menuGoto,
  menuInfos,
  primaryDomainUrl,
}: {
  //Policies Menu QUERY ("footer" on shopify)
  menu: MenuFragment;
  //Redirection Menu QUERY ("footer_Goto" on shopify)
  menuGoto: MenuFragment;
  //Help & infos menu QUERY ("footer_infos" on shopify)
  menuInfos: MenuFragment;
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const {publicStoreDomain} = useRootLoaderData();

  const domainUrls: Parameters<typeof FooterNav>[0]['domainUrls'] = {
    primary: primaryDomainUrl,
    store: publicStoreDomain,
  };
  return (
    <>
      {/*STATIC Footer (payement, shipping infos...)*/}
      <section id="buyingTrust">
        <div>
          <img src={CardIcon} alt="Illustration d'une carte de paiement" />
          <h3>Payement flexible et sécurisé</h3>
          <p>Payez en 2x ou 3x dans frais avec Klarna</p>
        </div>
        <div>
          <img src={CardIcon} alt="Illustration d'une carte de paiement" />
          <h3>Livraison express</h3>
          <p>Certaines paires sont disponibles en 48/72h</p>
        </div>
        <div>
          <img src={CardIcon} alt="Illustration d'une carte de paiement" />
          <h3>Authenticité certifié</h3>
          <p>Toutes nos paires sont identifiées par des experts</p>
        </div>
        <div>
          <img src={CardIcon} alt="Illustration d'une carte de paiement" />
          <h3>Reconditionnées à neuf</h3>
          <p>Nos artistes se chargent de reconditionner</p>
        </div>
      </section>
      {/*DYNANMIC Footer (Menus, Links, Infos ...)*/}
      <section className="navigations">
        <div className="menus">
          {/*HELP & INFOS MENU NAV WITH LINKS (the links (<a/>) are not related to the menu query)*/}
          <FooterNav
            title="Aides & Informations"
            menu={menuInfos}
            domainUrls={domainUrls}
          />
          {/*POLICIES MENU*/}
          <FooterNav title="Policies" menu={menu} domainUrls={domainUrls} />
          {/*GOTO (redirection) MENU*/}
          <FooterNav title="Sitemap" menu={menuGoto} domainUrls={domainUrls} />
        </div>
        {/*ABOUT US DIV*/}
        <div className="aboutus">
          <h2>A propos de nous</h2>
          <p>
            Chez Second Step, nous voulons redéfinir la façon dont les sneakers
            sont consommées et perçues dans le monde de la monde. Nous aspirons
            à créer une communauté engagée qui apprécie la valeur des sneakers
            d&rsquo;occasion
          </p>
        </div>
        <div className="socials">
          <div className="medias">
            <h2>Rejoignez nous sur nos réseaux</h2>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/secondstep.fr/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Instagram}
                    alt="logo insta"
                    className="logo_social"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@secondstep.fr"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Tiktok} alt="logo tiktok" className="logo_social" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/second-step-paris/?viewAsMember=true"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Linkedin}
                    alt="logo linkedin"
                    className="logo_social"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/SecondStep/100091844828034/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Facebook}
                    alt="logo facebook"
                    className="logo_social"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="offers">
            <h2>Recevez nos offres</h2>
            <EmailInbox caption="Ton mail" />
          </div>
        </div>
      </section>
    </>
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
