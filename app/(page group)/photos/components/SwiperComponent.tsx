"use client";

import React from "react";
import shortid from "shortid";
import "./shopDisplay.styles.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";

const shopDisplay = ({ photos }: { photos: any[] }) => {
  console.log("photos", photos);
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={false}
      centeredSlides={true}
      slidesPerView={"auto"}
      initialSlide={2}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper my-auto py-10"
    >
      {photos.map((photo) => {
        return (
          <SwiperSlide
            key={shortid.generate()}
            className="h-[500px] w-[300px] rounded-xl border border-black bg-cover bg-center bg-no-repeat drop-shadow-lg sm:h-[550px] sm:w-[350px] md:h-[600px] md:w-[400px]"
            style={{
              backgroundImage: `url(${photo.url})`,
            }}
          ></SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default shopDisplay;
