import './styles/button.scss';

export interface ButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  caption?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={props.type}>
      <p>{props.text}</p>
      {props.caption ? <p>{props.caption}</p> : null}
    </button>
  );
}
