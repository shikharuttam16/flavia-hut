import React from "react";
import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import aboutus from "../assest/images/aboutus.png";
import image1 from "../assest/images/banner.png";
import aboutus2 from "../assest/images/aboutus2.jpeg";

const AboutUs = () => {
  return (
    <div className=" pb-8">
      {/* Header Section */}
      <div>
        <img
          src={window.innerWidth > 768 ? image1 : image1}
          alt="Macarons"
          className="w-full rounded-lg md:h-[420px] h-[300px] object-fill"
        />
      </div>

      {/* "Who Are We?" Section */}
      <div className="text-center w-[90%] md:w-3/5 mx-auto mt-10 flex flex-col justify-center items-center gap-2.5 ">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#AA0000]">
          Who Are We?
        </h2>
        <p className="leading-relaxed">
          Here's a draft foundation story for Flavia Hut: "Welcome to Flavia
          Hut, where flavor meets nutrition! Founded in 2024, our journey began
          with a simple yet bold vision: to revolutionize the snack industry
          with healthy, crunchy, and delicious options. Tired of unhealthy
          snacks dominating the market, our founders sought to create a brand
          that would empower children and youngsters to make informed choices.
          The name 'Flavia Hut' represents the perfect blend of flavors,
          symbolizing our commitment to serving a diverse range of nutritious
          snacks. Indulge in the crunch and nutrition of Flavia Hut.
        </p>

        <div className="text-center mt-12 mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#AA0000]">
            Get In Touch With Us
          </h2>
          <div className="flex flex-wrap justify-center mt-8 gap-8">
            <div>
              <img
                src={aboutus2}
                alt="Dish Image"
                className="w-[300px] rounded-lg h-[250px] object-cover"
              />
            </div>

            <div className="text-left text-[#AA0000]">
              <div className="flex items-center mb-4">
                <FaPhoneAlt className="mr-2 text-black" />
                <p className="text-base">+91-8950023691</p>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="mr-2 text-black" />
                <a
                  href="mailto:flaviahutcustomercare@gmail.com"
                  className="text-base "
                >
                  flaviahutcustomercare@gmail.com
                </a>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="mr-2 text-black" />
                <a href="mailto:Flaviahutt@gmail.com" className="text-base ">
                  Flaviahutt@gmail.com
                </a>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="mr-2 text-black" />
                <p className="text-base">
                  #985/986 Housing Board Colony Sector 10 Ambala City
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-start mt-8 space-x-4">
                <a href="#" target="_blank">
                  <FaFacebookF className="text-2xl text-blue-600 hover:text-blue-800" />
                </a>
                <a href="#" target="_blank">
                  <FaTwitter className="text-2xl text-blue-400 hover:text-blue-600" />
                </a>
                <a href="#" target="_blank">
                  <FaPinterest className="text-2xl text-red-500 hover:text-red-700" />
                </a>
                <a
                  href="https://www.instagram.com/flaviahutt?igsh=MXhkbW0zaGJ3NzNmbw=="
                  target="_blank"
                >
                  <FaInstagram className="text-2xl text-pink-500 hover:text-pink-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
