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

export default function VideoCard({
  backgroundcolor,
  text,
  subtext,
  title,
  textColor,
  num,
  boldKeywords,
}: VideoCardProps) {
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
        {renderTextWithBoldKeywords(text, boldKeywords)}
        <br />
        {renderTextWithBoldKeywords(subtext, boldKeywords)}
      </div>
    </div>
  );
}

function renderTextWithBoldKeywords(text: string, keywords: string[]) {
  const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'i'));
  return (
    <p className="VideoCard-text">
      {parts.map((part, index) => {
        if (keywords.includes(part)) {
          return <b key={part}>{part}</b>;
        } else {
          return part;
        }
      })}
    </p>
  );
}
