import type {ProductFragment} from 'storefrontapi.generated';
import Price from './Price';
import Logo from '../assets/LOGO_SECSTEP.png';

export interface ProductFormProps {
  product: ProductFragment;
}

const title_subtitle_regexp = /(?<title>.*\d.*?)\s+(?<subtitle>.*)/i;
export default function ProductForm({product}: ProductFormProps) {
  const {title, subtitle} = title_subtitle_regexp.exec(product.title)
    ?.groups || {
    title: '',
    subtitle: product.title,
  };
  if (!product.selectedVariant)
    product.selectedVariant = product.variants.nodes[0];

  return (
    <div id="productForm">
      <h3>{title}</h3>
      <h4>{subtitle}</h4>

      <div id="price">
        {product.selectedVariant.compareAtPrice && (
          <div id="neuf" className="priceDisplay">
            <p>
              <Price value={product.selectedVariant?.compareAtPrice} />
            </p>
            <span>Prix neuf</span>
          </div>
        )}
        <div id="secondstep_price" className="priceDisplay">
          <p>
            <Price value={product.selectedVariant.price} />
          </p>
          <span>
            Prix
            <img src={Logo} alt="Logo SecondStep" />
          </span>
        </div>

        {product.selectedVariant.compareAtPrice && (
          <div id="priceDiff">
            Economise{' '}
            <Price
              value={{
                amount:
                  '' +
                  (parseFloat(product.selectedVariant.compareAtPrice.amount) -
                    parseFloat(product.selectedVariant.price.amount)),
                currencyCode: 'EUR',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
