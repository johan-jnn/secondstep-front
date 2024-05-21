import './styles/dropBranner.scss';
import Timer from './timer';
type InfoCardProps = {
  image: string | undefined;
  handle: string | undefined;
  description: string | undefined;
};

export default function dropBanner({
  image,
  handle,
  description,
}: InfoCardProps) {
  return (
    <div className="drop-banner" style={{backgroundImage: `url(${image})`}}>
      <div className="drop-banner-timer">
        <Timer targetDate={new Date(description)} />
      </div>
    </div>
  );
}
