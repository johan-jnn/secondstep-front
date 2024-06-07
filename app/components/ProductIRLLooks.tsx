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
  const picturesList: {
    image: URL;
    post: URL;
    postID: string;
  }[] = [];
  console.log(looksMetafield);

  // ! Instagram CDN API doesn't allow to get its content be on a different website.
  // if (looksMetafield) {
  //   const urls = JSON.parse(looksMetafield.value) as string[];
  //   for (const url of urls) {
  //     const post = new URL(url, 'https://www.instagram.com/');
  //     const postID = /\/p\/(.+?)(?:\/|$)/.exec(post.pathname)?.[1];
  //     if (!postID) continue;

  //     const image = new URL(post.toString());
  //     image.pathname = (post.pathname + '/media/').replaceAll('//', '/');

  //     picturesList.push({post, image, postID});
  //   }
  // }
  return (
    <div className="bestLooks">
      <InstagramPostCard
        postURL={
          new URL(
            'https://www.instagram.com/p/C76V5fIqEV-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
          )
        }
      />
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
          {picturesList.map(({image, post, postID}) => (
            <li key={postID}>
              <Link to={post.toString()} target="_blank">
                <img
                  src={image.toString()}
                  alt={`First media of the post ${postID}`}
                />
              </Link>
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
