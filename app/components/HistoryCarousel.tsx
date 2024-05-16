import {Virtual, Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import HistoryCard from './HistoryCard';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles/historyCarousel.scss';

// Importez votre JSON
import data from '../lib/constants/historyCarousel.json';

export default function HistoryCarousel() {
  return (
    <div className="history-carousel">
      <h1>Histoires de Sneakers</h1>
      <div className="history-carousel-sub">
        <Swiper
          modules={[Virtual, Navigation]}
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={30}
          navigation={true}
          virtual
        >
          {data.History.map((item, index) => (
            <SwiperSlide key={index}>
              <HistoryCard
                imgsrc={item.imgsrc}
                section={item.section}
                date={item.date}
                text={item.text}
                sub={item.sub}
                link=" "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
