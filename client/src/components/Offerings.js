import React from 'react';
import offering1 from "../../src/assest/images/offering1.svg";
import offering2 from "../../src/assest/images/offering2.svg";
import offering3 from "../../src/assest/images/offering3.svg";
import offering4 from "../../src/assest/images/offering4.svg";

const Offerings = () => {
  const offerings = [
    { img: offering1, text: 'Free Home Delivery Across India' },
    { img: offering2, text: "7 Day Return If You're Not Happy" },
    { img: offering3, text: '100% Clean, Nutritious Products' },
    { img: offering4, text: 'Enabled by 5000+ Farmers' },
  ];

  return (
    <div className="w-[95%] mx-auto p-4 my-6">
      {/* Grid Layout for Responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offerings.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 sm:flex-row sm:items-center"
          >
            {/* Image */}
            <img 
              src={item.img} 
              alt={item.text} 
              className="w-[30px] h-[30px] object-cover rounded-lg" 
            />

            {/* Text */}
            <p className="text-[14px] font-semibold leading-[22.4px] tracking-[0%] text-[#283B53] font-titillium">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offerings;
