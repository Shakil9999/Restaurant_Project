import React from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import slider1 from "../../assets/home/slide1.jpg";
import slider2 from "../../assets/home/slide2.jpg";
import slider3 from "../../assets/home/slide3.jpg";

const ChefRecommended = () => {
  return (
    <div>
      <SectionTitle
        subHeading="Should Try"
        heading="CHEF RECOMMENDS"
      ></SectionTitle>
      <div className="md:grid grid-cols-3 gap-3 space-y-2">
        <div className="card bg-base-100 md:w-80 w-full shadow-sm">
          <figure className="mt-5">
            <img src={slider1} alt="Caeser Salad" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Caeser Salad</h2>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div className="card-actions w-full">
              <button className="btn btn-active border-0 border-b-4 mt-4 w-full">Order Now</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 md:w-80 w-full shadow-sm">
          <figure className="mt-5">
            <img src={slider2} alt="Caeser Salad" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Pizza</h2>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div className="card-actions w-full">
              <button className="btn btn-active border-0 border-b-4 mt-4 w-full">Order Now</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 md:w-80 w-full shadow-sm">
          <figure className="mt-5">
            <img src={slider3} alt="Caeser Salad" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Soup</h2>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div className="card-actions ">
              <button className="btn btn-active border-0 border-b-4 mt-4 w-full">Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefRecommended;
