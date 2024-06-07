import type {AdjustIcon} from '@shopify/polaris-icons';
import type {CSSProperties} from 'react';

export interface IconProps {
  icon: typeof AdjustIcon;
  classes?: string | string[];
  customStyling?: CSSProperties;
}
export default function Icon({
  icon: SVGIcon,
  classes,
  customStyling,
}: IconProps) {
  return (
    <div
      className={['icon', classes]
        .flat()
        .filter((v) => typeof v === 'string')
        .join(' ')}
    >
      <SVGIcon
        style={{
          width: '100%',
          height: '100%',
          ...customStyling,
        }}
      />
    </div>
  );
}
