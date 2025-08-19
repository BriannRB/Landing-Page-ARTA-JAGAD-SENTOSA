import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArthaSoreangLiving from "../../assets/Background Home.png";
import BukitCiampeaAsih from "../../assets/BukitCiampeaAsih_DeveloperBG.jpg";
import Logo from "../../assets/Logo AJS.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Section3 = () => {
  const sliderRef = React.useRef(null);
  const [section3Data, setSection3Data] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/home")
      .then((res) => res.json())
      .then((data) => {
        const section3 = data.find((item) => item.id === 3);
        setSection3Data(section3);
      })
      .catch((err) => console.error("❌ Error fetching Section 3:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
    draggable: false,
  };

  const slides = [
    { title: "BUKIT CIAMPEA ASRI", image: BukitCiampeaAsih },
    { title: "PASANGGRAHAN HILL", image: ArthaSoreangLiving },
    { title: "ARTHA SOREANG LIVING", image: ArthaSoreangLiving },
  ];

  return (
    <div
      className="flex flex-col items-center mx-auto md:w-full mb-4 md:mb-0 w-full lg:w-full p-4"
      data-aos="fade-up"
    >
      <div
        id="section-3"
        className="flex flex-col items-center w-full bg-white p-6 md:p-10"
      >
        <img src={Logo} alt="Logo AJS" className="h-12 md:h-16 mb-5" />
        <h2 className="text-center max-w-xl font-semibold text-3xl md:text-4xl lg:text-4xl leading-snug mb-4">
          {section3Data?.title || "Developer"}
        </h2>
        {section3Data?.paragraph && (
          <p className="text-center text-gray-600 mb-6 max-w-2xl">
            {section3Data.paragraph}
          </p>
        )}

        <div className="relative w-full max-w-5xl">
          {/* Tombol Panah Kiri */}
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="mx-4 absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            <FaChevronLeft className="text-[#DEB06B] text-xl" />
          </button>

          {/* Slider */}
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="px-3">
                <div className="relative h-72 md:h-115 rounded-xl overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
                    <div className="absolute w-full h-full bg-black opacity-50 z-0"></div>
                    <h3 className="mx-18 text-center text-white text-lg md:text-3xl font-bold z-10">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Tombol Panah Kanan */}
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="mx-4 absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            <FaChevronRight className="text-[#DEB06B] text-xl" />
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="flex items-center p-2.5 px-8 mt-7 font-semibold px-6 py-3 border-2 border-[#DEB06B] text-[#DEB06B] rounded-lg hover:bg-[#DEB06B] hover:text-white transition duration-200 ease-in-out">
            <a href="/developer">Selengkapnya</a>
          </button>
          <button className="flex items-center p-2.5 px-8 mt-7 font-semibold px-6 py-3 border-3 border-[#DEB06B] text-white bg-[#DEB06B] rounded-lg hover:bg-[#C99A5A] hover:border-[#C99A5A] transition duration-200 ease-in-out">
            <a href="/simulasi-kpr">Simulasi KPR</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section3;
