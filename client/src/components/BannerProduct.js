import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import image1 from "../assest/images/banner.png";
import image2 from "../assest/images/Product Image.png";
import image3 from "../assest/banner/img3.jpg";

// Mobile Images
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";

const BannerProduct = () => {
  const desktopImages = [image1, image2, image3];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile];

  return (
    <div className="mx-auto rounded">
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          nav
          dots
          autoplay
          autoplayTimeout={5000}
          smartSpeed={1000}
          items={1}
          navText={["<", ">"]}
        >
          {desktopImages.map((imageUrl, index) => (
            <div className="item" key={index}>
              <img src={imageUrl} className="w-full h-[550px] object-cover" alt={`Slide ${index}`} />
            </div>
          ))}
        </OwlCarousel>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          nav
          dots
          autoplay
          autoplayTimeout={5000}
          smartSpeed={1000}
          items={1}
        >
          {mobileImages.map((imageUrl, index) => (
            <div className="item" key={index}>
              <img src={imageUrl} className="w-full h-[250px] object-cover" alt={`Slide ${index}`} />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default BannerProduct;
