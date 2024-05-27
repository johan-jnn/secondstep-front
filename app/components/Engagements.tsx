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
        <h3>Nous sommes notés 4.3/5 sur</h3>
        <img src="app/assets/Trustpilot.png" alt="google rating" />
      </div>
      <div>
        <CarteAuthenticite />
      </div>
      <div>
        <Reconditionnement />
      </div>
    </div>
  );
}

export default Engagements;
