import React, { useEffect, useState } from "react";
import IconPhone from "../../assets/Icon Phone.png";

const Section4 = () => {
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/home")
      .then((res) => res.json())
      .then((data) => {
        const section4 = data.find((item) => item.id === 4);
        setSectionData(section4);
      })
      .catch((err) => console.error("❌ Error fetching Section 4:", err));
  }, []);

  if (!sectionData)
    return <p className="text-center mt-10">Loading Section 4...</p>;

  return (
    <div
      id="section-4"
      className="flex flex-col text-center items-center w-full mx-auto p-6 mt-15 sm:px-20 md:p-10"
      data-aos="fade-up"
    >
      {/* Background Image */}
      <img
        src={sectionData.image}
        alt="Background"
        className="absolute w-full h-100 object-cover"
      />
      <div className="absolute w-full h-100 bg-black opacity-50"></div>

      {/* Konten */}
      <div className="flex flex-col items-center my-15 p-2 mx-auto z-0 w-full max-w-5xl">
        <img src={IconPhone} alt="Phone" className="mb-5 h-15 w-15" />
        <h1 className="text-white mb-5 text-4xl xl:text-5xl font-semibold z-0">
          {sectionData.title}
        </h1>
        <p className="text-white z-0 md:w-1/2 lg:w-1/2">{sectionData.paragraph}</p>
        <button className="flex items-center p-2.5 px-8 mt-7 font-semibold px-6 py-3 border-3 border-[#DEB06B] text-white bg-[#DEB06B] rounded-lg hover:bg-[#C99A5A] hover:border-[#C99A5A] transition duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A5A] focus-visible:ring-offset-2 active:scale-95">
          <a href="/kontak-kami">KLIK DISINI</a>
        </button>
      </div>
    </div>
  );
};

export default Section4;
