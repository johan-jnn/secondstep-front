import './styles/engagements.scss';
import './styles/certification.scss';
import {CarteAuthenticite, Reconditionnement} from './Certification';

function Engagements() {
  return (
    <div className="banner-informations">
      <div className="banner-engagements">
        <h1>Nos Engagements</h1>
        <a href=" ">Découvrez le concept</a>
      </div>
      <div className="banner-rate">
        <h2>Nous sommes notés 4.3/5 sur</h2>
        <img src="app/assets/Trustpilot.png" alt="google rating" />
      </div>
      <ul className="certifications">
        <CarteAuthenticite />
        <Reconditionnement />
      </ul>
    </div>
  );
}

export default Engagements;
