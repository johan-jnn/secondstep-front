import '~/components/styles/ImageWithCaption.scss';
import Button from './Button';
export interface ImagewithCaptionProps {
  title: string;
  subtitle: string;
  children: JSX.Element;
  buttonText?: string;
  buttonLink?: string;
  imagePlacement: 'left' | 'right';
  image: string;
}

export default function ImageWithCaption({
  title,
  subtitle,
  children,
  buttonText,
  buttonLink,
  imagePlacement,
  image,
}: ImagewithCaptionProps) {
  return (
    <div className="image-caption">
      {imagePlacement === 'left' ? (
        <div className="image-content">
          <img src={image} alt=" " />
        </div>
      ) : null}
      <div className="text-content">
        <h3>{subtitle}</h3>
        <h2>{title}</h2>
        {children}
        {buttonText && buttonLink ? (
          <a href={buttonLink} className="button">
            <Button text={buttonText} />
          </a>
        ) : (
          <br />
        )}
      </div>
      {imagePlacement === 'right' ? (
        <div className="image-content">
          <img src={image} alt=" " />
        </div>
      ) : null}
    </div>
  );
}
