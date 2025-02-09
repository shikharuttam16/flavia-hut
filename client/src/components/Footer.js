


import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import Logo from '../assest/images/logo.png';

const Footer = () => {
  const phoneNumber = "+918950023691";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div className="bg-[#F2F2F2] pt-10 border">
      <div className="container mx-auto px-8 pb-10">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and Social Links */}
          <div className="flex flex-col items-start">
            <img src={Logo} alt="Logo" className="w-25 h-20" />
            <p className="text-sm">"Where Flavor Meets Home".</p>
            <div className="mt-4 flex space-x-3">
              <a href="#" className="text-gray-600"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-600"><FaPinterest size={24} /></a>
              <a href="https://www.instagram.com/flaviahutt?igsh=MXhkbW0zaGJ3NzNmbw==" target="_blank" className="text-gray-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* My Account */}
          <div className="flex flex-col">
            <h6 className="md:text-base text-sm  font-bold text-gray-900">My Account</h6>
            <ul className="mt-4 space-y-2 md:text-base text-sm text-gray-600">
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Order History</a></li>
              <li><a href="#" className="hover:underline">Shopping Cart</a></li>
              <li><a href="#" className="hover:underline">Wishlist</a></li>
            </ul>
          </div>

          {/* Helps */}
          <div className="flex flex-col">
            <h6 className="md:text-base text-sm font-bold text-gray-900">Helps</h6>
            <ul className="mt-4 space-y-2 md:text-base text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Faqs</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Proxy */}
          <div className="flex flex-col">
            <h6 className="md:text-base text-sm font-bold text-gray-900">Proxy</h6>
            <ul className="mt-4 space-y-2 md:text-base text-sm text-gray-600">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">Product</a></li>
              <li><a href="#" className="hover:underline">Track Order</a></li>
            </ul>
          </div>

          {/* WhatsApp */}
          <div className="flex justify-center items-center">
            <a href={whatsappLink} target="_blank" className="text-green-500">
              <FaWhatsapp size={60} />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-4 mt-10">
        <div className="container mx-auto px-8 flex flex-wrap justify-between items-center">
          <p className="text-white text-sm">Flavia hut © 2024. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
