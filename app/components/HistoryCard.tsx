import './styles/historyCard.scss';

interface HistoryCardProps {
  imgsrc: string;
  section: string;
  date: string;
  text: string;
  sub: string;
}

export default function HistoryCard({
  imgsrc,
  section,
  date,
  text,
  sub,
}: HistoryCardProps) {
  return (
    <div className="history-card">
      <div className="history-card-top">
        <img src={imgsrc} alt=" " />
        <p>{section}</p>
      </div>
      <div className="history-card-bottom">
        <p>{date}</p>
        <p>{text}</p>
        <p>{sub}</p>
      </div>
    </div>
  );
}
