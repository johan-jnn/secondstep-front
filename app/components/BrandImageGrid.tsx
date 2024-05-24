import './styles/brandImageGrid.scss';
import {Link} from 'react-router-dom';
import img1 from 'app/assets/brandgridimages/dunklow.jpg';
import img2 from 'app/assets/brandgridimages/travis.jpg';
import img3 from 'app/assets/brandgridimages/NB2002.jpg';
import img4 from 'app/assets/brandgridimages/j1long.jpg';
import img5 from 'app/assets/brandgridimages/AF1.jpg';
import img6 from 'app/assets/brandgridimages/YeezyLarge.jpg';
import img7 from 'app/assets/brandgridimages/Yeezy.jpg';
import img8 from 'app/assets/brandgridimages/j4.jpg';
export default function BrandImageGrid() {
  return (
    <div className="brand-img-grid">
      <div className="brand-img-grid-top">
        <Link to="/collections">
          <button>Voir tout</button>
        </Link>
      </div>
      <div className="brand-img-grid-bottom">
        <Link to="/collection/dunk-low">
          <div
            className="img1"
            style={{
              backgroundImage: `url(${img1})`,
            }}
          >
            <h2>Dunk Low</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to="/collections/nike">
          <div
            className="img2"
            style={{
              backgroundImage: `url(${img2})`,
            }}
          ></div>
        </Link>
        <Link to="/collections/new-balance">
          <div
            className="img3"
            style={{
              backgroundImage: `url(${img3})`,
            }}
          >
            <h2>New Balance</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to="/collections/air-jordan">
          <div
            className="img4"
            style={{
              backgroundImage: `url(${img4})`,
            }}
          ></div>
        </Link>
        <Link to="/collections/air-force-1">
          <div
            className="img5"
            style={{
              backgroundImage: `url(${img5})`,
            }}
          >
            <h2>Air Force 1</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to="/collections/adidas">
          <div
            className="img6"
            style={{
              backgroundImage: `url(${img6})`,
            }}
          ></div>
        </Link>
        <Link to="/collections/yeezy">
          <div
            className="img7"
            style={{
              backgroundImage: `url(${img7})`,
            }}
          >
            <h2>Yeezy</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to="/collections/air-jordan">
          <div
            className="img8"
            style={{
              backgroundImage: `url(${img8})`,
            }}
          >
            <h2>Jordan</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
