"use client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

interface Banner {
  imageUrl: string;
  link: string;
  title: string;
}

const HeroSection = () => {
  const swiper = useSwiper();

  const banners: Banner[] = [
    {
      imageUrl: "/1.png",
      link: "#",
      title: "Banner 1",
    },
    {
      imageUrl: "/2.png",
      link: "#",
      title: "Banner 2",
    },
    {
      imageUrl: "/3.png",
      link: "#",
      title: "Banner 3",
    },
  ];

  return (
    <>
      <div className="relative w-full ">
        {/* Swiper */}
        <Swiper
          allowSlideNext
          allowSlidePrev
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}>
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Link href={banner.link} rel="noopener noreferrer">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full object-cover object-center h-full max-h-[400px]"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="swiper-button-prev absolute top-1/2 left-4 z-10"
          onClick={() => swiper?.slideNext()}></button>
        <button
          className="swiper-button-next absolute top-1/2 right-4 z-10 "
          onClick={() => swiper?.slidePrev()}></button>
      </div>
    </>
  );
};

export default HeroSection;
