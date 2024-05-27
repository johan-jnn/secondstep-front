import {Link} from 'react-router-dom';
import './styles/dropBranner.scss';
import Timer from './timer';

type InfoCardProps = {
  image: string | undefined;
  handle: string | undefined;
  description: string | undefined;
};

export default function DropBanner({
  image,
  handle,
  description,
}: InfoCardProps) {
  // Séparer les parties de la description
  const [dateStr, titleStr, subStr] = description
    ? description.split(/,\s*|,\s*&nbsp;/)
    : [];

  // Extraire la date en supprimant le préfixe "Date : "
  const date = dateStr ? dateStr.replace('Date : ', '') : '';

  // Extraire le titre en supprimant le préfixe "Title : "
  const title = titleStr ? titleStr.replace('Title : ', '') : '';

  // Extraire le sous-titre en supprimant le préfixe "Sub : "
  const sub = subStr ? subStr.replace('Sub : ', '') : '';

  return (
    <div className="drop-banner">
      <Link to={`/collections/${handle}`}>
        <div className="drop-banner-item">
          <img className="drop-banner-img" src={image} alt={title} />
          <div className="drop-banner-timer">
            <Timer targetDate={new Date(date)} />
          </div>
          <div className="drop-banner-text">
            <h1 className="drop-banner-title">{title}</h1>
            <h3 className="drop-banner-sub">{sub}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
