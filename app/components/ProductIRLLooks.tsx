import type {ProductFragment} from 'storefrontapi.generated';
import './styles/productIRLLooks.scss';
import Button from './Button';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import InstagramPostCard from './InstagramPostCard';

export interface ProductIRLLooksProps {
  product: ProductFragment;
}

export default function ProductIRLLooks({product}: ProductIRLLooksProps) {
  const looksMetafield = product.metafields.find(
    (meta) => meta?.key === 'looks',
  );
  const picturesList: URL[] = [];

  if (looksMetafield) {
    picturesList.push(
      ...(JSON.parse(looksMetafield.value) as string[]).map(
        (url) => new URL(url),
      ),
    );

    console.log(picturesList);
  }
  return (
    <div className="bestLooks">
      <div className="heading">
        <h3>Vos meilleurs Looks</h3>
        <p>
          Partagez-nous vos meuilleurs looks avec la{' '}
          <a
            href={`https://instagram.com/tags/${product.title
              .replaceAll(' ', '-')
              .toLowerCase()}`}
            rel="noreferrer"
            target="_blank"
          >
            {product.title}
          </a>{' '}
          sur Instagram avec le{' '}
          <a
            href={`https://instagram.com/tags/secondstep`}
            rel="noreferrer"
            target="_blank"
          >
            #secondstep
          </a>{' '}
          ou en nous mentionnant directement sur vos posts !
        </p>
        <a
          href="https://www.instagram.com/secondstep.fr/"
          target="_blank"
          rel="noreferrer"
        >
          @secondstep.fr
        </a>
      </div>
      {picturesList.length ? (
        <ul className="galery">
          {picturesList.map((url) => (
            <li key={url.pathname}>
              <InstagramPostCard postURL={url} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="noGalery">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Button
              text="Pas encore de posts pour cette paire..."
              caption="Soit le premier à aller poster !"
              type="primary"
            />
          </a>
        </div>
      )}
    </div>
  );
}
