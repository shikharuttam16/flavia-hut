import React, { useContext, useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import FAQAccordion from "../components/FAQAccordion";
import Context from "../context";
import SummaryApi from "../common";
import Offerings from "../components/Offerings";

const Home = () => {
  const { faqRef, cartProductCount } = useContext(Context);
  const [categories, setCategories] = useState([]);
  async function fetchCategoryHome() {
    const data = await fetch(SummaryApi.getConditionalCategory.url, {
      method: SummaryApi.getConditionalCategory.method,
      body: JSON.stringify({
        renderIn: "home",
      }),
    });
    const jsonData = await data.json();
    console.log("Category json data",jsonData);
    
    setCategories(jsonData);
    // console.log("Json Data", jsonData);
  }



  useEffect(() => {
    fetchCategoryHome();
  }, []);

  // useEffect(() => {
  //   fetchCategoryHome();
  // }, [cartProductCount]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <BannerProduct />
      <div className="w-[95%] ">
        {categories?.map((data,index) => (
          <HorizontalCardProduct
          key={data.slug || index}
            category={data.slug}
            heading1={data.name}
          />
        ))}
      </div>
      <Offerings/>
    </div>
  );
};

export default Home;
