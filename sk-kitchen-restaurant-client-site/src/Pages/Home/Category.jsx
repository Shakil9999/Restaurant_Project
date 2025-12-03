import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import slider1 from "../../assets/home/slide1.jpg"
import slider2 from "../../assets/home/slide2.jpg"
import slider3 from "../../assets/home/slide3.jpg"
import slider4 from "../../assets/home/slide4.jpg"
import slider5 from "../../assets/home/slide5.jpg"
import SectionTitle from '../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
       <section className='mb-16'>
        <SectionTitle
        subHeading={'From 11:00am to 10:00pm'}
         heading={'ORDER ONLINE'}
         
         >
           
        </SectionTitle>
         <Swiper
        
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper "
      >
        <SwiperSlide>
            <img src={slider1} alt="" />
            <h3 className='text-4xl text-white font-semibold uppercase -mt-16 text-center'>salad</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider2} alt="" />
            <h3 className='text-4xl text-white font-semibold uppercase -mt-16 text-center'>pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider3} alt="" />
            <h3 className='text-4xl text-white font-semibold uppercase -mt-16 text-center'>soup</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider4} alt="" />
            <h3 className='text-4xl text-white font-semibold uppercase -mt-16 text-center'>desert</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider5} alt="" />
            <h3 className='text-4xl text-white font-semibold uppercase  -mt-16 text-center'>salad</h3>
            
        </SwiperSlide>
        
      </Swiper>
       </section>
    );
};

export default Category;