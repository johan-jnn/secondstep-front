import type {ProductFragment} from 'storefrontapi.generated';
import './styles/productIRLLooks.scss';

export interface ProductIRLLooksProps {
  product: ProductFragment;
}
export default function ProductIRLLooks({product}: ProductIRLLooksProps) {
  return (
    <div className="bestLooks">
      <div className="heading">
        <h3>Vos meuilleurs Looks</h3>
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
          className="instLink"
        >
          @secondstep.fr
        </a>
      </div>
      <ul className="galery"></ul>
    </div>
  );
}
