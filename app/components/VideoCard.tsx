import React from 'react';
import './styles/videoCard.scss';
import {Link} from 'react-router-dom';

function VideoCard() {
  return (
    <div className="VideoCard">
      <h1>01</h1>
      <Link to={' '}>
        <button className="VideoCard-btn">
          <img src=" " alt=" " />
        </button>
      </Link>
      <p>
        blablablablablablablablablablablablablablablablablablablablablablablablablablablabla
      </p>
    </div>
  );
}

export default VideoCard;
