import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "@smastrom/react-rating/style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { TbNumber66Small } from "react-icons/tb";

const Testimonials = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);
  return (
    <div>
      <SectionTitle
        subHeading="What Our Clients Say"
        heading="TESTIMONIALS"
      ></SectionTitle>

      <div className="flex justify-center text-9xl">
        <TbNumber66Small></TbNumber66Small>
      </div>

      <div className="my-6">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {review.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="text-center  mx-24 flex flex-col items-center gap-5">
                <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
                <p>{review.details}</p>
                <h3 className="text-2xl font-semibold text-yellow-600">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
