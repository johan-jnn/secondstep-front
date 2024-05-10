import {Image} from '@shopify/hydrogen';

export type ValidLogos = 'nike' | 'new_balance' | 'adidas';

export interface BrandLogoProps {
  logo: ValidLogos;
}
export default function BrandLogo(props: BrandLogoProps) {
  return (
    <img
      src={`/brands_icons/${props.logo}.svg?url`}
      alt={`Logo of ${props.logo}`}
    />
  );
}
