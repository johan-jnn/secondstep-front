import {type CSSProperties, useState} from 'react';
import {processList} from '~/lib/processList';
import Button from './Button';
import Icon from './Icon';
import {Link} from 'react-router-dom';
import './styles/processReconditionnement.scss';

export default function ProcessReconditionnement() {
  const [processID, setProcessID] = useState(0);
  const processData = processList[processID];
  return (
    <div className="reconditionnementProcess">
      <div className="processContent">
        <ProgressBar processID={processID} />
        <div className="content">
          <div className="heading">
            <Icon icon={processData.icon} />
            <h3>{processData.title}</h3>
          </div>
          {processData.descriptions}
        </div>
        <div className="illustration">
          <img
            src={processData.illustrations.img}
            alt={`Cover for ${processData.title}`}
          />

          {processData.illustrations.vid && (
            <Link to={processData.illustrations.vid}>
              <img
                className="VideoCard-img"
                src="app/assets/VideoCard-Btn.png"
                alt=" "
              />
            </Link>
          )}
        </div>
      </div>
      <nav className="navigation">
        {processID > 0 && (
          <Button
            text="<<"
            type="secondary"
            onClick={() => setProcessID(processID - 1)}
          />
        )}
        {processID < processList.length - 1 && (
          <Button
            text=">>"
            type="primary"
            onClick={() => setProcessID(processID + 1)}
          />
        )}
      </nav>
    </div>
  );
}

function ProgressBar({processID}: {processID: number}) {
  const onePourcent = 100 / processList.length;
  const progress =
    processID * onePourcent +
    onePourcent / 2 +
    (onePourcent / 2) * +(processID >= processList.length - 1);
  return (
    <div
      className="progressbar"
      style={
        {
          '--progress': progress + '%',
        } as CSSProperties
      }
    >
      {Array(processList.length)
        .fill(null)
        .map((_, i) => (
          <div
            className="bubble"
            // eslint-disable-next-line react/no-array-index-key
            key={`item_${i}`}
            data-filled={i <= processID || null}
          >
            {i + 1}
          </div>
        ))}
    </div>
  );
}
