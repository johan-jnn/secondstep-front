import type {MoneyV2} from '@shopify/hydrogen/customer-account-api-types';
import Price from './Price';
import './styles/button.scss';

export interface PriceButtonProps {
  caption: string;
  price: MoneyV2;
  btnType?: HTMLButtonElement['type'];
}

export default function PriceButton(props: PriceButtonProps) {
  return (
    <button className="price" type={props.btnType || 'button'}>
      <p>{props.caption}</p>
      <hr />
      <p className="amount">
        <Price value={props.price} />
      </p>
    </button>
  );
}
