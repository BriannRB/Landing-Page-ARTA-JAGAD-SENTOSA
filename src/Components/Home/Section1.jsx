import React, { useEffect, useState } from "react";
import InfoIcon from "../../assets/Icon Information.svg";
import "../../App.css";

function Section1() {
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/home")
      .then((res) => res.json())
      .then((data) => {
        const section1 = data.find((item) => item.id === 1); // ambil id 1
        setSectionData(section1);
      })
      .catch((err) => console.error("Fetch Home Section1 Error:", err));
  }, []);

  const scrollToSection2 = () => {
    document.getElementById("section-2")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!sectionData) return <p className="text-center mt-10">Loading Section 1...</p>;

  return (
    <div className="relative w-full h-screen">
      <img
        src={sectionData.image}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute w-full h-full bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div
          className="flex flex-col mx-6 items-center text-center md:text-left"
          data-aos="fade-up"
        >
          <h1 className="items-center text-white font-extrabold text-5xl lg:text-6xl sm:text-center">
            {sectionData.title}
          </h1>
          <p className="text-xl text-white mt-5 backdrop-opacity-10">
            {sectionData.paragraph}
          </p>
          <button
            className="flex items-center p-2 px-4 mt-5 bg-[#DEB06B] font-bold text-white tracking-wider border-3 rounded-xl transform transition-transform duration-300 hover:scale-105"
            onClick={scrollToSection2}
          >
            <img src={InfoIcon} alt="Info Icon" className="h-7 w-7 mr-2" />
            Lihat Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section1;
