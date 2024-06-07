import {Link} from 'react-router-dom';
import './styles/passionate.scss';
import HistoryImage from '../assets/history-img.png';

export default function Passionate() {
  return (
    <div className="passionate-section">
      <div className="passionate-section-img">
        <img src="app/assets/history-img.png" alt=" " />
      </div>
      <div className="card">
        <div className="content">
          <h1>Une Histoire de Passionnés</h1>
          <br />
          <p>
            Depuis nos modestes débuts en tant que passionnés de sneakers, nous
            avons toujours été fascinés par la richesse de l&apos;histoire que
            chaque paire de chaussures portait. C&apos;est cette fascination qui
            nous a conduit à créer notre boutique de sneakers seconde main, avec
            pour objectif principal de redonner une nouvelle vie à ces sneakers
            plaines de caractère.
          </p>
          <br />
          <p>
            Chaque paire que nous acquérons raconte une histoire unique,
            qu&apos;il s&apos;agisse d&apos;une édition limitée qui a marqué une
            époque ou d&apos;un modèle classique qui a accompagné des
            générations de sneakerheads.
          </p>
          <Link to="/pages/nous-d-couvrir">
            <button>Découvrir la team</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
