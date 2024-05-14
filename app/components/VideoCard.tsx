import './styles/videoCard.scss';
import {Link} from 'react-router-dom';

interface VideoCardProps {
  backgroundcolor: string;
  textColor: string;
  num: string;
  title: string;
  text: string;
  subtext: string;
  boldKeywords: string[];
}

function VideoCard({
  backgroundcolor,
  text,
  subtext,
  title,
  textColor,
  num,
  boldKeywords,
}: VideoCardProps) {
  function renderTextWithBoldKeywords(text: string) {
    const parts = text.split(new RegExp(`(${boldKeywords.join('|')})`, 'i'));
    return (
      <p className="VideoCard-text">
        {parts.map((part, index) => {
          if (boldKeywords.includes(part)) {
            return <strong key={part}>{part}</strong>;
          } else {
            return <span key={part}>{part}</span>;
          }
        })}
      </p>
    );
  }

  return (
    <div
      className="VideoCard"
      style={{backgroundColor: backgroundcolor, color: textColor}}
    >
      <div className="VideoCard-top">
        <h3>{num}</h3>
        <Link to={' '}>
          <img
            className="VideoCard-img"
            src="app/assets/VideoCard-Btn.png"
            alt=" "
          />
        </Link>
      </div>

      <div className="VideoCard-bottom">
        <h4>{title}</h4>
        {renderTextWithBoldKeywords(text)}
        <p className="VideoCard-sub">{renderTextWithBoldKeywords(subtext)}</p>
      </div>
    </div>
  );
}

export default VideoCard;
