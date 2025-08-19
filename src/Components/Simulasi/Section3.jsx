import React, { useEffect, useState } from "react";
import LogoBCG from "../../Assets/Logo AJS.png";
import Accordion from "./Accordion";

function Section3() {
  const [sectionInfo, setSectionInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/simulasi")
      .then((res) => res.json())
      .then((data) => {
        const info = data.find((item) => item.id === 3);
        setSectionInfo(info);
      })
      .catch((err) => console.error("❌ Error fetching simulasi_info:", err));
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 py-20 px-10 lg:px-30">
      <img
        src={LogoBCG}
        alt="Logo"
        className="h-15 w-30 mb-7"
        data-aos="fade-up"
      />
      <h1
        className="text-4xl font-semibold text-center mb-5"
        data-aos="fade-up"
      >
        {sectionInfo?.title || "ISTILAH PENTING KPR"}
      </h1>
      {sectionInfo?.paragraph && (
        <p
          className="text-center text-gray-600 max-w-2xl mb-8"
          data-aos="fade-up"
        >
          {sectionInfo.paragraph}
        </p>
      )}
      <Accordion />
    </div>
  );
}

export default Section3;
