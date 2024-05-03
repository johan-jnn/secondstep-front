export interface PastilleProps {
  color: 'green' | 'yellow';
}
export default function Pastille(props: PastilleProps) {
  return <div className="pastille" data-color={props.color}></div>;
}
