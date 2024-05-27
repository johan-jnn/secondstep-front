import '../styles/pages.scss';
import image1 from 'app/assets/history-img.png';
import image2 from 'app/assets/Nousdecimg2.png';
import image3 from 'app/assets/equipe-full.png';
import {Link} from 'react-router-dom';
export default function NousDecouvrirPage() {
  return (
    <div className="nous-dec">
      <div className="nous-dec-first">
        <div className="nous-dec-first-text">
          <h4>Notre Vision</h4>
          <h2>Donner une nouvelle vie aux sneakers</h2>
          <p>
            Depuis nos modestes débuts en tant que passionnés de sneakers, nous
            avons toujours été fascinés par la richesse de l’histoire que chaque
            paire de chaussures portait. C’est cette fascination qui nous a
            conduit à créer notre boutique de sneakers seconde main, avec pour
            objectif principal de redonner une nouvelle vie à ces sneakers
            pleines de caractère.
            <br />
            <br />
            Chaque paire que nous acquérons raconte une histoire unique, qu’il
            s’agisse d’une édition limitée qui a marqué une époque ou d’un
            modèle classique qui a accompagné des générations de sneakerheads.
          </p>
        </div>
        <img src={image1} alt=" " />
      </div>
      <div className="nous-dec-sec">
        <div className="nous-dec-sec-text">
          <h4>Notre Vision</h4>
          <h2>Donner une nouvelle vie aux sneakers</h2>
          <p>
            Depuis nos modestes débuts en tant que passionnés de sneakers, nous
            avons toujours été fascinés par la richesse de l’histoire que chaque
            paire de chaussures portait. C’est cette fascination qui nous a
            conduit à créer notre boutique de sneakers seconde main, avec pour
            objectif principal de redonner une nouvelle vie à ces sneakers
            pleines de caractère.
            <br />
            <br />
            Chaque paire que nous acquérons raconte une histoire unique, qu’il
            s’agisse d’une édition limitée qui a marqué une époque ou d’un
            modèle classique qui a accompagné des générations de sneakerheads.
          </p>
        </div>
        <img src={image2} alt=" " />
      </div>
      <p>
        « Lorsque les gens achètent des chaussures chez Second Step, ils
        n’achètent pas seulement des baskets ; ils adhèrent à une histoire, à un
        mouvement, à un changement. »
      </p>
      <div className="nous-dec-last">
        <p>Notre mission</p>
        <h2>Redéfinir la consommation de sneakers</h2>
        <img src={image3} alt=" " />
      </div>
      <Link to="/contact">
        <button>Nous rejoindre &nbsp; &#x2794;</button>
      </Link>
    </div>
  );
}
