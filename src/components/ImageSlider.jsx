import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Icon } from '@iconify/react/dist/iconify.js';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../index.css';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ImageSlider() {
  return (
    
    <div className="relative w-full md:pr-8 lg:pr-8 md:pl-8 lg:pl-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="/img/slider3.jpg" alt="Slide 3" className="w-full h-[400px] md:h-full lg:h-full object-cover opacity-80" />
        </SwiperSlide>
        <SwiperSlide>          
            <img src="/img/slider2.jpg" alt="Slide 2" className="w-full h-[400px] md:h-full lg:h-full object-cover opacity-80" />
        </SwiperSlide>
        <SwiperSlide>          
            <img src="/img/slider1.jpg" alt="Slide 1" className="w-full h-[400px] md:h-full lg:h-full object-cover opacity-80" />
        </SwiperSlide>
      </Swiper>
      <div className="absolute inset-0 gap-2 md:gap-5 lg:gap-5 flex flex-col items-center justify-center z-10">
        <h1 className="text-white text-3xl font-pontano lg:text-7xl dobleuve font-light">
          DOBLEUVE
        </h1>
        <p className='text-white text-l font-lato lg:text-3xl artesania font-light'>
            ARTESANÍA
        </p>
        <Icon className='hidden md:block lg:block text-4xl text-white opacity-60' icon="iconamoon:arrow-down-6-circle-thin" />
      </div>
      <div className='transform right-0 -translate-y-9 -translate-x-30 md:-translate-x-20 lg:-translate-x-20 z-20 absolute'>
        <a href="https://www.instagram.com/dobleuve_artesania/"><img src="/img/IconInsta.svg" alt="Icono instagram" /></a>
      </div>
    </div>
  );
}
