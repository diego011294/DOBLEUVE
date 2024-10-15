// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import '../index.css';


// import required modules
import { Autoplay } from 'swiper/modules';

export default function TendenciasSlider() {
    return (
        <div className='flex flex-col justify-center items-center md:pt-[60px]'>
            <div className='flex flex-col justify-center items-center gap-4 pb-[82px]'>
                <img src="/img/detail2.svg" alt="Detalle naranja" />
                <h1 className='text-[#333333] text-2xl md:text-3xl font-montserrat font-extralight text-center'>
                    MODELOS <span className='text-[#FBC286] font-semibold'>EN TENDENCIA</span>
                </h1>
                <p className='md:text-xl w-80 md:w-[493px] text-center text-[#333333] font-light font-montserrat'>
                    Estos son algunos de los modelos más vendidos a través de nuestra página web
                </p>
            </div>

            <div className='border p-1 border-[#FBC286]'>
                <div className="w-52 md:w-[293px] bg-[#FBC286] text-2xl font-lato font-semibold p-4 text-[#333333] ">
                    <Swiper
                        spaceBetween={50}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <h1 className='text-center opacity-80'>
                                #ARNELA
                            </h1>
                        </SwiperSlide>
                        <SwiperSlide>
                            <h1 className='text-center opacity-80'>
                                #DUBRA
                            </h1>
                        </SwiperSlide>
                        <SwiperSlide>
                            <h1 className='text-center opacity-80'>
                                #SARELA
                            </h1>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
