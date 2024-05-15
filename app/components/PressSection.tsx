import './styles/pressSection.scss';

export default function PressSection() {
  return (
    <div className="press-section">
      <div className="ligne"></div>
      <div className="press-section-container">
        <div className="press-section-left">
          <div>
            <img src="app/assets/Echos.png" alt=" " />
          </div>
          <p>
            &laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
            eiusmod&raquo;
          </p>
        </div>
        <div className="press-section-mid">
          <div>
            <img src="app/assets/parisien.jpg" alt=" " />
          </div>
          <p>
            &laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
            eiusmod&raquo;
          </p>
        </div>
        <div className="press-section-right">
          <div>
            <img src="app/assets/CNews.png" alt=" " />
          </div>

          <p>
            &laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
            eiusmod&raquo;
          </p>
        </div>
      </div>
      <div className="ligne"></div>
    </div>
  );
}
