import {Await, Link, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/lib/root-data';
import './styles/header.scss';
import {
  MenuIcon,
  OrderIcon,
  PersonIcon,
  SearchIcon,
} from '@shopify/polaris-icons';
import Icon from './Icon';
import Banner from '../assets/logo.png';
import {TinySearchBar} from './searchForm';
import useLocalURL from '~/lib/localURL';

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

        {submenu && <SubMenu sub={submenu} />}
      </header>
    </>
  );
}

export function SubMenu({
  sub,
}: {
  sub: NonNullable<HeaderProps['header']['submenu']>;
}) {
  return (
    <div className="sub">
      <nav>
        <ul>
          {sub.items.map((item) => (
            <li key={item.id}>
              <Link to={item.url || ''}>{item.title}</Link>
              {(item.items.length && (
                <ol className="subitem">
                  {item.items.map((subitem) => (
                    <li key={subitem.id}>
                      <Link to={subitem.url || ''}>{subitem.title}</Link>
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

export function SearchCTA() {
  // <>
  //   <PredictiveSearchForm>
  //     {({fetchResults, inputRef}) => (
  //       <SearchForm
  //         onChange={fetchResults}
  //         onFocus={fetchResults}
  //         inputRef={inputRef}
  //       />
  //     )}
  //   </PredictiveSearchForm>
  //   <PredictiveSearchResults />
  // </>;

  return (
    <Link
      to="/search"
      className="search-toggle"
      title="Recherche ta prochaine paire !"
    >
      <Icon icon={SearchIcon} />
    </Link>
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

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
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
    color: isPending ? 'grey' : 'black',
  };
}
