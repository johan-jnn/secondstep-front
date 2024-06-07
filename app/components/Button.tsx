import type {MouseEventHandler} from 'react';
import './styles/button.scss';

export interface ButtonProps {
  type?: 'primary' | 'secondary';
  text: string;
  caption?: string;
  btnType?: HTMLButtonElement['type'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={props.type}
      type={props.btnType || 'button'}
      onClick={props.onClick}
    >
      <p>{props.text}</p>
      {props.caption ? <p>{props.caption}</p> : null}
    </button>
  );
}
