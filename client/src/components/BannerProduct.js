import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import image1 from '../assest/images/banner.png';
import image2 from '../assest/images/Product Image.png';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

const desktopImages = [image1, image2, image3, image4, image5];
const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

const BannerProduct = () => {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop & Tablet Swiper */}
      <div className="hidden md:block">
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={true}
          loop
          className="w-full h-[400px] lg:h-[350px] xl:h-[300px]"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {desktopImages.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img src={imageUrl} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={true}
          loop
          className="w-full h-[250px]"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {mobileImages.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img src={imageUrl} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Dots Styling */}
      <style>
        {`
          .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            border-radius: 12px !important;
            border: 3px solid #ffffff !important;
            background: transparent !important;
            opacity: 1 !important;
            margin: 0 6px !important;
            transition: background 0.3s ease !important;
          }

          .swiper-pagination-bullet-active {
            background: #ffffff !important;
          }
        `}
      </style>
    </div>
  );
};

export default BannerProduct;
