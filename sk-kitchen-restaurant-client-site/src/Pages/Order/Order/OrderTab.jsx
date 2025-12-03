import FoodCart from "../../Shared/FoodCart/FoodCart";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const OrderTab = ({ orderedItem }) => {
  const itemsPerPage = 6;

  // Split the array into chunks of 6
  const chunkedItems = [];
  for (let i = 0; i < orderedItem.length; i += itemsPerPage) {
    chunkedItems.push(orderedItem.slice(i, i + itemsPerPage));
  }

  const pagination = {
    clickable: true,
    // renderBullet: function (index, className) {
    //   return '<span class="' + className + '">' + (index + 1) + "</span>";
    // },
  };

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        {chunkedItems.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="md:grid grid-cols-3 gap-10 mb-16">
              {chunk.map((item) => (
                <FoodCart key={item._id} foodItem={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderTab;
