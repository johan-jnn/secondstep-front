export type ValidBrands =
  | 'Nike'
  | 'New Balance'
  | 'Adidas'
  | 'Air Jordan'
  | 'Salomon'
  | 'Second Step'
  | 'Alexander McQueen';

export interface BrandLogoProps {
  brand: ValidBrands;
}
export default function BrandLogo(props: BrandLogoProps) {
  const logo = props.brand.toLowerCase().replaceAll(' ', '_');
  return <img src={`/brands_icons/${logo}.svg?url`} alt={`Logo of ${logo}`} />;
}
