import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  CollectionMenuQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer, type footerMenus} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import marquisContent from '~/lib/constants/marquis.json';
import CollectionAsideContent, {
  type CollectionAsideContentProps,
} from './CollectionsAsideContent';
import SearchForm from './searchForm';
import type {MetaFunction} from '@shopify/remix-oxygen';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footerMenus: Promise<footerMenus>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  collectionMenu: CollectionMenuQuery;
};

export function Layout({
  cart,
  children = null,
  footerMenus,
  header,
  isLoggedIn,
  collectionMenu,
}: LayoutProps) {
  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      {collectionMenu.menu && (
        <>
          <MobileMenuAside
            menu={header?.menu}
            shop={header?.shop}
            collectionMenu={collectionMenu.menu}
          />
          <CollectionAside collectionMenu={collectionMenu.menu} />
        </>
      )}
      {header && (
        <Header
          marquisTexts={marquisContent}
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
        />
      )}
      <main>{children}</main>
      <Await
        resolve={footerMenus}
        errorElement={'Error while loading the footer...'}
      >
        {(data) => data && <Footer menus={data} shop={header?.shop} />}
      </Await>
    </>
  );
}

function CartAside({cart}: {cart: LayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <SearchForm
              onChange={fetchResults}
              onFocus={fetchResults}
              inputRef={inputRef}
            />
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  menu,
  shop,
  collectionMenu,
}: {
  menu: HeaderQuery['menu'];
  shop: HeaderQuery['shop'];
  collectionMenu: CollectionAsideContentProps['menu'];
}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        <HeaderMenu
          menu={menu}
          viewport="mobile"
          primaryDomainUrl={shop.primaryDomain.url}
        />
        <hr />
        <CollectionAsideContent menu={collectionMenu} />
      </Aside>
    )
  );
}

function CollectionAside({
  collectionMenu,
}: {
  collectionMenu: CollectionAsideContentProps['menu'];
}) {
  return (
    <Aside id="collection-aside" heading={collectionMenu.title}>
      <CollectionAsideContent menu={collectionMenu} />
    </Aside>
  );
}
