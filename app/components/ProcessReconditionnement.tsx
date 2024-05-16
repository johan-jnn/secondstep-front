import {type CSSProperties, useState} from 'react';
import {processList} from '~/lib/constants/processList';
import Button from './Button';
import Icon from './Icon';
import {Link} from 'react-router-dom';
import './styles/processReconditionnement.scss';
import VideoButton from './VideoButton';

type setter = React.Dispatch<React.SetStateAction<number>>;

export default function ProcessReconditionnement() {
  const [processID, setProcessID] = useState(0);
  const processData = processList[processID];
  return (
    <div className="reconditionnementProcess">
      <ProgressBar processID={processID} setProcessID={setProcessID} />
      <div className="content">
        <div className="heading">
          <Icon icon={processData.icon} />
          <h3>{processData.title}</h3>
        </div>
        {processData.descriptions}

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
              onClick={(e) => setProcessID(processID + 1)}
            />
          )}
        </nav>
      </div>
      <div className="illustration">
        <img
          src={processData.illustrations.img}
          alt={`Cover for ${processData.title}`}
        />

        {processData.illustrations.vid && (
          <VideoButton url={processData.illustrations.vid} />
        )}
      </div>
    </div>
  );
}

function ProgressBar({
  processID,
  setProcessID,
}: {
  processID: number;
  setProcessID: setter;
}) {
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
          <a
            href="?"
            className="bubble"
            // eslint-disable-next-line react/no-array-index-key
            key={`item_${i}`}
            data-filled={i <= processID || null}
            onClick={(e) => {
              e.preventDefault();
              setProcessID(i);
            }}
          >
            {i + 1}
          </a>
        ))}
    </div>
  );
}
