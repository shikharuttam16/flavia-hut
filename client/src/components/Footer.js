import React,{useState,useEffect} from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import SummaryApi from "../common";

const Footer = () => {
  const [footerData, setFooterData] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(SummaryApi.showFooterDescription.url,{
          method: SummaryApi.showFooterDescription.method,
        });
        const data = await response.json();
        if (data.success) {
          setFooterData({
            title: data.offer.title,
            description: data.offer.description, 
          });
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);
  return (
    <div className="bg-[#F2F2F2] py-10 px-6">
      <div className="container mx-auto text-gray-700 text-sm w-[95%]">
        {/* Discount Message */}
        <div className="mb-10 flex flex-col gap-x-20 lg:flex-row lg:w-full">
          <div className="w-[70%] lg:w-full sm:w-full xs:w-full w-full">
            <p className="font-barlow text-[14px] leading-[20px] tracking-[0%] text-customBlue font-600 mt-6">{footerData.title || "You've Hit Rock Bottom!"}</p>
            <p className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal">
            {footerData.description ? (
                footerData.description
              ) : (
                <>
                  You’ve been doing some scrolling - so here’s a reward for that overworked thumb.
                  Get <strong>10% discount</strong> with code <strong>"SECRET"</strong>. Apply it at checkout.
                  Don’t wait! Complete the order - you can thank us later dumdum.
                </>
              )}
            </p>
          </div>
          {/* Our Story and Policies */}
          <div className="flex flex-col space-y-2 text-gray-900 w-[30%] mt-6">
            <p className="font-barlow text-[14px] leading-[20px] tracking-[0%] text-customBlue font-600 w-max">Our Story and Policies</p>
            <a href="#" className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal w-max">About Us</a>
            <a href="#" className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal w-max">Privacy Policy</a>
            <a href="#" className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal w-max">Terms of Service</a>
            <a href="#" className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal w-max">Refund Policy</a>
          </div>
        </div>

        {/* Footer Links & Social Media */}
        <div className="mb-10 flex flex-col gap-x-20 lg:flex-row lg:w-full w-full">
          {/* Company Info */}
          <p className="w-[70%] lg:w-full sm:w-full xs:w-full w-full font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-normal mt-6">
          © 2025 FlaviaHut  Limited
          </p>

          {/* Social Media Icons */}
          <div className="flex flex-col space-y-2 items-start w-[30%]">
            <p className="font-barlow text-[12px] leading-[20px] tracking-[0%] text-customBlue font-600 mt-6">Follow Us</p>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="text-gray-600"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-600"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
