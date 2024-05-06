import './styles/button.scss';

export interface ButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  caption?: string;
  btnType?: HTMLButtonElement['type'];
}

export default function Button(props: ButtonProps) {
  return (
    <button className={props.type} type={props.btnType || 'button'}>
      <p>{props.text}</p>
      {props.caption ? <p>{props.caption}</p> : null}
    </button>
  );
}
