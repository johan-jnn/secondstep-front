import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer, type footerMenus} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import marquisContent from '~/lib/constants/marquis.json';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footerMenus: Promise<footerMenus>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
};

export function Layout({
  cart,
  children = null,
  footerMenus,
  header,
  isLoggedIn,
}: LayoutProps) {
  return (
    <>
      <CartAside cart={cart} />
      {header && (
        <Header
          marquisTexts={marquisContent}
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
        />
      )}
      <main>{children}</main>
      <ToastContainer position="bottom-right" autoClose={5000} />
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
