import './styles/brandImageGrid.scss';
import {Link} from 'react-router-dom';
import img1 from '~/assets/grid-images/dunklow.webp';
import img2 from '~/assets/grid-images/travis.webp';
import img3 from '~/assets/grid-images/NB2002.webp';
import img4 from '~/assets/grid-images/j1long.webp';
import img5 from '~/assets/grid-images/AF1.webp';
import img6 from '~/assets/grid-images/YeezyLarge.webp';
import img7 from '~/assets/grid-images/Yeezy.webp';
import img8 from '~/assets/grid-images/j4.webp';

export default function BrandImageGrid() {
  return (
    <div className="brand-img-grid">
      <div className="brand-img-grid-top">
        <h2>Nos Collections</h2>
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
