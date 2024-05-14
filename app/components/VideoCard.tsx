import React from 'react';
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
            return <strong key={index}>{part}</strong>;
          } else {
            return <span key={index}>{part}</span>;
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
      <h1>{num}</h1>
      <Link to={' '}>
        <button className="VideoCard-btn">
          <img src=" " alt=" " />
        </button>
      </Link>
      <div className="VideoCard-bottom">
        <h1>{title}</h1>
        {renderTextWithBoldKeywords(text)}
        <br />
        <p className="VideoCard-sub">{renderTextWithBoldKeywords(subtext)}</p>
      </div>
    </div>
  );
}

export default VideoCard;
