import './styles/pressSection.scss';
import {useState, useEffect} from 'react';
import {Virtual, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Echos from 'app/assets/PressImages/Echos.png';
import Parisien from 'app/assets/PressImages/parisien.jpg';
import Cnews from 'app/assets/PressImages/CNews.png';

export default function PressSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="press-section">
      <div className="ligne"></div>
      {isMobile ? (
        <Swiper
          modules={[Virtual, Navigation, Pagination]}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{clickable: true}}
          navigation={true}
          loop={true}
        >
          <SwiperSlide>
            <PressCard
              imgsrc={Echos}
              text="&laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
              eiusmod&raquo;"
            />
          </SwiperSlide>
          <SwiperSlide>
            <PressCard
              imgsrc={Parisien}
              text="&laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
              eiusmod&raquo;"
            />
          </SwiperSlide>
          <SwiperSlide>
            <PressCard
              imgsrc={Cnews}
              text="&laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
              eiusmod&raquo;"
            />
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className="press-section-container">
          <PressCard
            imgsrc={Echos}
            text="&laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
              eiusmod&raquo;"
          />
          <PressCard
            imgsrc={Parisien}
            text="&laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
              eiusmod&raquo;"
          />
          <PressCard
            imgsrc={Cnews}
            text="&laquo;Lorem ipsum dolor sit amet, conse adipiscing elit sed do
              eiusmod&raquo;"
          />
        </div>
      )}
      <div className="ligne"></div>
    </div>
  );
}

interface PressCardProps {
  imgsrc: string;
  text: string;
}

export function PressCard({imgsrc, text}: PressCardProps) {
  return (
    <div className="press-card">
      <img src={imgsrc} alt="press-card-img"></img>
      <p>{text}</p>
    </div>
  );
}
