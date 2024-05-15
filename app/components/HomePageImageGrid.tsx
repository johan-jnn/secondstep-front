import './styles/homePageImageGrid.scss';
import {Link} from 'react-router-dom';
export default function homePageImageGrid() {
  return (
    <div className="homePage-img-grid">
      <div className="homePage-img-grid-top"></div>
      <div className="homePage-img-grid-bottom">
        <Link to=" ">
          <div className="img1">
            <h2>Dunk Low</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to=" ">
          <div className="img2"></div>
        </Link>
        <Link to=" ">
          <div className="img3">
            <h2>New Balance</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to=" ">
          <div className="img4"></div>
        </Link>
        <Link to=" ">
          <div className="img5">
            <h2>Nike</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to=" ">
          <div className="img6"></div>
        </Link>
        <Link to=" ">
          <div className="img7">
            <h2>Nike Dunk Low</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
        <Link to=" ">
          <div className="img8">
            <h2>Nike</h2>
            <p>Lorem Ipsum</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
