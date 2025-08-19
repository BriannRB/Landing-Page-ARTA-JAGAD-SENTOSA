import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LogoBCG from "../../assets/Logo AJS.png";
import "../../App.css";

function Section1() {
  const [profil, setProfil] = useState(null);
  const [legalitas, setLegalitas] = useState(null);
  const [komitmen, setKomitmen] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch semua data
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5002/api/about-info/1").then((res) => res.json()),
      fetch("http://localhost:5002/api/about-info/2").then((res) => res.json()),
      fetch("http://localhost:5002/api/about-info/3").then((res) => res.json()),
    ])
      .then(([data1, data2, data3]) => {
        setProfil(data1);
        setLegalitas(data2);
        setKomitmen(data3);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, [profil, legalitas, komitmen]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading data Section 1...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center my-20 mx-10">
      <img
        src={LogoBCG}
        alt="Logo BCG"
        className="h-15 w-30 mb-7"
        data-aos="fade-up"
      />
      <h1 className="text-4xl font-semibold mb-20" data-aos="fade-up">
        Siapa Kami?
      </h1>

      {/* PROFIL */}
      {profil && (
        <div className="flex flex-col md:flex-row-reverse items-center max-w-6xl w-full gap-10 mb-16">
          <img
            src={profil.background_image}
            alt={profil.title}
            className="w-full md:w-1/2 h-70 object-cover rounded-lg"
            data-aos="fade-up"
          />
          <div className="w-full md:w-1/2 flex flex-col justify-center" data-aos="fade-up">
            <div className="flex flex-row gap-5">
              <img src={profil.logo} alt="Icon" className="h-8 w-8 object-contain" />
              <h1 className="text-2xl lg:text-3xl font-bold text-secondary-color">
                {profil.title}
              </h1>
            </div>
            <p className="text-sm lg:text-base text-gray-700 mt-4 text-justify">
              {profil.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* LEGALITAS */}
      {legalitas && (
        <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-10 mb-16">
          <img
            src={legalitas.background_image}
            alt={legalitas.title}
            className="w-full md:w-1/2 h-70 object-cover rounded-lg"
            data-aos="fade-up"
          />
          <div className="w-full md:w-1/2 flex flex-col justify-center" data-aos="fade-up">
            <div className="flex flex-row gap-5">
              <img src={legalitas.logo} alt="Icon" className="h-8 w-8 object-contain" />
              <h1 className="text-2xl lg:text-3xl font-bold text-secondary-color">
                {legalitas.title}
              </h1>
            </div>
            <p className="text-sm lg:text-base text-gray-700 mt-4 text-justify">
              {legalitas.paragraph}
            </p>
          </div>
        </div>
      )}

      {/* KOMITMEN */}
      {komitmen && (
        <div className="flex flex-col md:flex-row-reverse items-center max-w-6xl w-full gap-10 mb-16">
          <img
            src={komitmen.background_image}
            alt={komitmen.title}
            className="w-full md:w-1/2 h-70 object-cover rounded-lg"
            data-aos="fade-up"
          />
          <div className="w-full md:w-1/2 flex flex-col justify-center" data-aos="fade-up">
            <div className="flex flex-row gap-5">
              <img src={komitmen.logo} alt="Icon" className="h-8 w-8 object-contain" />
              <h1 className="text-2xl lg:text-3xl font-bold text-secondary-color">
                {komitmen.title}
              </h1>
            </div>
            <p className="text-sm lg:text-base text-gray-700 mt-4 text-justify">
              {komitmen.paragraph}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Section1;
