import {Link} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import '~/styles/$.scss';

export async function loader({request}: LoaderFunctionArgs) {
  return new Response(`${new URL(request.url).pathname} not found`, {
    status: 404,
  });
}

export default function CatchAllPage() {
  return (
    <div id="p404">
      <h1>Aouch !</h1>
      <p>Cette page n&apos;existe pas...</p>
      <Link to="/">{'>> '}Revenir au site</Link>
    </div>
  );
}
