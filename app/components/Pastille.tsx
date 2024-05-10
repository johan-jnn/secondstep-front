import type {CSSProperties} from 'react';
import './styles/pastille.scss';

export interface PastilleProps {
  color: 'green' | 'yellow' | string;
}
export default function Pastille(props: PastilleProps) {
  return (
    <div
      className="pastille"
      style={{'--color': props.color} as CSSProperties}
    ></div>
  );
}
