import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel3";
import $ from "jquery"; // Ensure jQuery is imported

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Importing images correctly (Ensure your folder is named "assets", not "assest")
import image1 from "../assets/images/banner.png";
import image2 from "../assets/images/Product Image.png";
import image3 from "../assets/banner/img3.jpg";

// Mobile Images
import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";

const BannerProduct = () => {
  const desktopImages = [image1, image2, image3];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile];

  // Ensure jQuery is available before OwlCarousel initializes
  useEffect(() => {
    window.$ = window.jQuery = $;
  }, []);

  // Owl Carousel options
  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    items: 1,
    navText: ["<", ">"],
  };

  return (
    <div className="mx-auto rounded">
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {desktopImages.map((imageUrl, index) => (
            <div className="item" key={index}>
              <img
                src={imageUrl}
                className="w-full h-[550px] object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </OwlCarousel>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {mobileImages.map((imageUrl, index) => (
            <div className="item" key={index}>
              <img
                src={imageUrl}
                className="w-full h-[250px] object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default BannerProduct;
