import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo AJS.png";
import "../../App.css";

function Section2() {
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/home")
      .then((res) => res.json())
      .then((data) => {
        const section2 = data.find((item) => item.id === 2);
        setSectionData(section2);
      })
      .catch((err) => console.error("Fetch Home Section2 Error:", err));
  }, []);

  if (!sectionData) return <p className="text-center mt-10">Loading Section 2...</p>;

  return (
    <div
      id="section-2"
      className="flex flex-col md:items-center md:flex-col lg:flex-col xl:flex-row relative z-0 w-full bg-white mt-30 p-4 md:p-22 gap-4"
      data-aos="fade-up"
    >
      <div className="flex flex-col items-center mx-auto md:mx-20 mb-4 md:mb-0 w-full xl:w-1/2 p-4">
        <img src={Logo} alt="Logo AJS" className="h-15 w-30 mb-7" />
        <h2 className="text-center max-w-xl font-semibold text-3xl md:text-4xl lg:text-4xl leading-snug">
          {sectionData.title}
        </h2>
        <p className="mt-7 max-w-xl text-center leading-relaxed">
          {sectionData.paragraph}
        </p>
        <button
          onClick={() => navigate("/tentang-kami")}
          className="flex items-center p-2.5 px-8 mt-7 font-semibold px-6 py-3 border-2 border-[#DEB06B] text-[#DEB06B] rounded-lg hover:bg-[#DEB06B] hover:text-white transition duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEB06B] focus-visible:ring-offset-2 active:scale-95"
        >
          Selengkapnya
        </button>
      </div>
      <div className="flex flex-col justify-center items-center p-4 md:p-4 mx-auto md:mx-20 w-full xl:w-1/2 h-auto overflow-hidden">
        <img
          src={sectionData.image}
          alt="Illustration"
          className="w-full xl:h-full xl:w-full sm:h-100 sm:w-100 object-cover"
        />
      </div>
    </div>
  );
}

export default Section2;
