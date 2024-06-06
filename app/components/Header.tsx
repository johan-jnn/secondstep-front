import {Await, Link, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import './styles/header.scss';
import {MenuIcon, OrderIcon, PersonIcon} from '@shopify/polaris-icons';
import Icon from './Icon';
import Banner from '../assets/logo.png';
import SearchForm, {TinySearchBar} from './searchForm';
import useLocalURL from '~/lib/localURL';
import {Aside} from './Aside';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  marquisTexts,
}: HeaderProps & {
  marquisTexts: string[];
}) {
  const {shop, menu, submenu} = header;
  console.log(submenu);

  return (
    <>
      <MobileMenuAside menu={menu} submenu={submenu} shop={shop} />

      <HeaderMarquis texts={marquisTexts} />
      <header>
        <div className="left-side">
          <a className="menu-toggle" href="#mobile-menu-aside">
            <Icon icon={MenuIcon} />
          </a>
          <TinySearchBar onChange={(e) => e.preventDefault()} />
        </div>
        <Link prefetch="intent" to="/" className="logo">
          <img src={Banner} alt="Bannière SecondStep" className="header_Logo" />
        </Link>
        <div className="right-side">
          {menu && (
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={shop.primaryDomain.url}
            />
          )}
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>

        {submenu && (
          <SubMenu
            sub={submenu}
            primaryDomainUrl={header.shop.primaryDomain.url}
          />
        )}
      </header>
    </>
  );
}

export function SubMenu({
  sub,
  primaryDomainUrl,
}: {
  sub: NonNullable<HeaderProps['header']['submenu']>;
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const getLocalURL = useLocalURL(primaryDomainUrl);
  return (
    <div className="sub">
      <nav>
        <ul>
          {sub.items.map((item) => (
            <li key={item.id}>
              <Link to={getLocalURL(item.url || '')}>{item.title}</Link>
              {(item.items.length && (
                <ol className="subitem">
                  {item.items.map((subitem) => (
                    <li key={subitem.id}>
                      <Link to={getLocalURL(subitem.url || '')}>
                        {subitem.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              )) ||
                false}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MobileMenuAside({
  menu,
  shop,
  submenu,
}: {
  menu: HeaderQuery['menu'];
  shop: HeaderQuery['shop'];
  submenu: HeaderQuery['submenu'];
}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        {submenu && (
          <SubMenu sub={submenu} primaryDomainUrl={shop.primaryDomain.url} />
        )}
        <HeaderMenu
          menu={menu}
          viewport="mobile"
          primaryDomainUrl={shop.primaryDomain.url}
        />
        <hr />
        <SearchForm />
      </Aside>
    )
  );
}

export function HeaderMarquis(props: {texts: string[]}) {
  return (
    <div id="headerMarquis">
      {['a', 'b'].map((id) => (
        <ul key={`list_${id}`}>
          {props.texts.map((text) => (
            <li key={`${id}_${text}`}>{text}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
}: {
  menu: NonNullable<HeaderProps['header']['menu']>;
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  viewport: Viewport;
}) {
  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  const getLocalURL = useLocalURL(primaryDomainUrl);

  return (
    <nav role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {menu.items.map((item) => {
        if (!item.url) return null;
        const url = getLocalURL(item.url);

        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <NavLink
        prefetch="intent"
        to="/account"
        style={activeLinkStyle}
        className="login-section"
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? <LogInIcon /> : <LogInIcon />)}
          </Await>
        </Suspense>
      </NavLink>
      <Await resolve={cart}>
        {(res) => <CartBadge count={res?.totalQuantity} />}
      </Await>
    </nav>
  );
}

function LogInIcon() {
  return <Icon icon={PersonIcon} />;
}

function CartBadge({count}: {count?: number}) {
  return (
    <a href="#cart-aside" className="cartOpenner">
      <Icon icon={OrderIcon} />
      {typeof count === 'number' && <span>{count}</span>}
    </a>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
