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

export interface FeaturedCollectionProps {
  products: ProductCardFragment[];
  title: string;
}

export default function FeaturedCollection({
  products,
  title,
}: FeaturedCollectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 3000);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="featuredCollection">
      {title ? <h2>{title}</h2> : <h2>Collection mise en avant</h2>}
      <div className="featuredCollection-sub">
        {isMobile ? (
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={4}
            centeredSlides={false}
            spaceBetween={10}
            pagination={{clickable: true}}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1,
              },
              620: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 2,
              },
              740: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 3,
              },
              1250: {
                slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 4,
              },
              1900: {
                slidesPerView: 5,
                spaceBetween: 10,
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
