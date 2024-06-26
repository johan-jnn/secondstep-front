import {Virtual, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import BlogCard from './BlogCard';
import './styles/blogCarousel.scss';
import 'swiper/css/bundle';
import type {ArticleItemBlogFragment} from 'storefrontapi.generated';
import {getContentOfFirstParagraph} from 'app/lib/htmlStringExtractor';
type BlogCarouselProps = {
  articles?: ArticleItemBlogFragment[];
};

export default function BlogCarousel({articles}: BlogCarouselProps) {
  return (
    <div className="history-carousel">
      <h1>Histoires de Sneakers</h1>
      <div className="history-carousel-sub">
        <Swiper
          modules={[Virtual, Navigation, Pagination]}
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={10}
          pagination={{clickable: true}}
          navigation={true}
          loop={false}
          grabCursor={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 30,
              slidesPerGroup: 1,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesPerGroup: 2,
            },
            1050: {
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
              slidesPerGroup: 4,
            },
          }}
        >
          {articles?.map((article) => (
            <SwiperSlide key={article.id}>
              <BlogCard
                imgsrc={article.image?.url}
                section={article.tags[0]}
                date={new Intl.DateTimeFormat('fr', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(article.publishedAt))}
                text={article.title}
                sub={getContentOfFirstParagraph(article.contentHtml)}
                link={`/blogs/${article.blog.handle}/${article.handle}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
