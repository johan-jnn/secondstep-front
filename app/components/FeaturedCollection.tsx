import React, {useState, useEffect} from 'react';
import type {ProductCardFragment} from 'storefrontapi.generated';
import ProductCard from './ProductCard';
import './styles/featuredCollection.scss';
import {Virtual, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductGrid from './ProductGrid';

export default function FeaturedCollection({
  products,
}: {
  products: ProductCardFragment[];
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="featuredCollection">
      <h2>Nos meilleures ventes</h2>
      <p>Attention ca part un peu (beaucoup) vite</p>
      <div className="featuredCollection-sub">
        {isMobile ? (
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={50}
            pagination={{clickable: true}}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              620: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              710: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1090: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 100,
              },
            }}
          >
            {products?.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard informations={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
