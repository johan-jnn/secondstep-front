import {Link} from 'react-router-dom';
import './styles/FeaturedCardCollection.scss';

type InfoCardProps = {
  image: string | undefined;
  handle: string | undefined;
  title: string | undefined;
};

export default function FeaturedCardCollection({
  image,
  handle,
  title,
}: InfoCardProps) {
  return (
    <div className="featured-card">
      <Link to={`/collections/${handle}`}>
        <div className="featured-card-item">
          <img src={image} alt={image} />
          <div className="featured-card-text">
            <h1>{title}</h1>
            <p>Collection spéciale {title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
