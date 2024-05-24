import {Link} from 'react-router-dom';
import './styles/historyCard.scss';

interface HistoryCardProps {
  imgsrc: string;
  section: string;
  date: string;
  text: string;
  sub: string;
  link: string;
}

export default function HistoryCard({
  imgsrc,
  section,
  date,
  text,
  sub,
  link,
}: HistoryCardProps) {
  return (
    <div className="history-card">
      <div className="history-card-top">
        <img src={imgsrc} alt="" />
        <p className="section">{section}</p>
        <p className="hide-more">Lire Plus</p>
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
