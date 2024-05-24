import {Link} from 'react-router-dom';
import './styles/blogCard.scss';

interface BlogCardProps {
  imgsrc: string | undefined;
  section?: string | undefined;
  date: string;
  text: string;
  sub: string;
  link: string;
}

export default function BlogCard({
  imgsrc,
  section,
  date,
  text,
  sub,
  link,
}: BlogCardProps) {
  return (
    <div className="history-card">
      <div
        className="history-card-top"
        style={{
          backgroundImage: `url(${imgsrc})`,
        }}
      >
        <p className="section">{section}</p>
        <Link to={link}>
          <p className="hide-more">Lire Plus</p>
        </Link>
      </div>
      <div className="history-card-bottom">
        <p className="history-card-bottom-date">{date}</p>
        <p className="history-card-bottom-text">{text}</p>
        <p className="history-card-bottom-sub">{sub}</p>
        <Link to={link}>
          <p className="history-card-bottom-more">Lire Plus</p>
        </Link>
      </div>
    </div>
  );
}
