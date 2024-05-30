import CarteAuthenticiteIMG from '~/assets/carte_authenticite.png';
import './styles/carteAuthenticite.scss';

export default function CarteAuthenticite() {
  return (
    <div className="carteAutheticite-bg">
      <div className="carteAuthenticite">
        <div className="content">
          <h3>Premier concept seconde main en France</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere,
            voluptate iure. Sed, fugiat explicabo distinctio rem maxime nostrum
            omnis nemo quae ea vel, nam enim quia veritatis laborum possimus
            delectus.
          </p>
          <a href="/carte-authenticite">
            <button>Découvrir le concept</button>
          </a>
        </div>
        <img
          src={CarteAuthenticiteIMG}
          alt="Carte d'authenticité Second Step"
        />
      </div>
    </div>
  );
}
