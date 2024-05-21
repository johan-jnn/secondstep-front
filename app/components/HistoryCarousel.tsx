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
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={100}
          navigation={true}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            // when window width is >= 1200px
            1200: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }}
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
