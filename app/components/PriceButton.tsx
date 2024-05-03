export interface PriceButtonProps {
  text: string;
  price: number;
}

export default function Button(props: PriceButtonProps) {
  return (
    <button className="price">
      <p>{props.text}</p>
      <p className="amount">
        {Intl.NumberFormat('FR-fr', {currency: 'EUR'}).format(props.price)}
      </p>
    </button>
  );
}
