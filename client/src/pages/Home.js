import React, { useContext } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import FAQAccordion from "../components/FAQAccordion";
import Context from "../context";

const Home = () => {
  const { faqRef } = useContext(Context);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <BannerProduct />
      <div className="w-[95%] ">
        <HorizontalCardProduct
          category={"Featured Products"}
          heading1={"Featured"}
          heading2={"Products"}
        />
        <HorizontalCardProduct
          category={"Best Seller"}
          heading1={"Best"}
          heading2={"Sellers"}
        />
        <HorizontalCardProduct
          category={"New Arrivals"}
          heading1={"New "}
          heading2={"Arrivals"}
        />
        <HorizontalCardProduct
          category={"Combo’s"}
          heading1={"Gift "}
          heading2={"Combos"}
        />
        <div ref={faqRef} className="w-[100%]">
          <FAQAccordion />
        </div>
      </div>
    </div>
  );
};

export default Home;
