import {useEffect, useRef, type ReactElement} from 'react';
import './styles/starRating.scss';

interface StarsColor {
  foreground: string;
  background: string;
}
export interface StarsProps {
  value: number;
  max: number;
  stars?: number;
  troncate?: boolean;
  colors?: Partial<StarsColor>;
}
export default function Stars({
  value,
  max,
  stars,
  troncate,
  colors: givenColors,
}: StarsProps) {
  if (value > max) throw 'The value is above max value.';
  stars ??= 5;
  troncate ??= true;
  const colors: StarsColor = {
    foreground: givenColors?.foreground || 'var(--color-primary)',
    background: givenColors?.background || '#e2e2e2',
  };

  const ratingID = useRef(0);
  useEffect(() => {
    ratingID.current++;
  });

  const ratio = value / max;
  const filledStars = Math.floor(ratio * stars);
  const semiFilledStarRate =
    filledStars < stars && troncate && (ratio * stars) % 1;
  const emptyStars = Math.max(0, stars - filledStars - +troncate);

  const starsElements: ReactElement[] = [];
  for (const i in new Array(filledStars).fill(null))
    starsElements.push(
      <Star
        filledPourcent={100}
        foreground={colors.foreground}
        background={colors.background}
        key={`filled_${i}`}
      />,
    );

  semiFilledStarRate &&
    starsElements.push(
      <Star
        filledPourcent={semiFilledStarRate * 100}
        foreground={colors.foreground}
        background={colors.background}
        key={`semi`}
      />,
    );
  for (const i in new Array(emptyStars).fill(null))
    starsElements.push(
      <Star
        filledPourcent={0}
        foreground={colors.foreground}
        background={colors.background}
        key={`empty_${i}`}
      />,
    );

  return (
    <div className="stars-rating" key={ratingID.current}>
      {starsElements}
    </div>
  );
}

export interface StarProps {
  filledPourcent: number;
  background: string;
  foreground: string;
}
export function Star({filledPourcent, background, foreground}: StarProps) {
  const gradientID = `stargradient_${Math.floor(filledPourcent * 100)}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <defs>
        <linearGradient id={gradientID}>
          <stop offset={`${filledPourcent}%`} stopColor={foreground} />
          <stop offset={`${filledPourcent}%`} stopColor={background} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientID})`}
        d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
      />
    </svg>
  );
}
