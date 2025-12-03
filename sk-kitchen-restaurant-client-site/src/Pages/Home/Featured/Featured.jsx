import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./featured.css";

const Featured = () => {
  return (
    <div className="feature-item fixe py-10 my-16 ">
      <div className="text-white">
        <SectionTitle
          subHeading="Check it out"
          heading="featured items"
          textColor="text-white"
        ></SectionTitle>
      </div>

      <div className="md:flex justify-center items-center gap-5 py-20 px-24 text-white">
        <div>
          <img src={featuredImg} alt="" />
        </div>

        <div>
          <h3 className="text-xl font-semibold">March 20, 2023</h3>
          <h3 className="text-xl font-semibold">WHERE CAN I GET SOME?</h3>
          <p className="mb-5">
            SK Kitchen Restaurant is a modern fusion restaurant offering a
            unique blend of global flavors and local ingredients. We create
            unforgettable dining experiences with exceptional service and
            chef-crafted dishes
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
