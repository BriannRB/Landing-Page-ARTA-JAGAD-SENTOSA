import React, { useEffect, useState } from "react";
import LogoBCG from "../../Assets/Logo AJS.png";
import "../../App.css";

function Section2() {
  const [banks, setBanks] = useState([]);
  const [sectionInfo, setSectionInfo] = useState(null);

  useEffect(() => {
    // Fetch logos from simulasi_bank
    fetch("http://localhost:3001/api/simulasi-bank")
      .then((res) => res.json())
      .then((data) => setBanks(data))
      .catch((err) => console.error("❌ Error fetching bank data:", err));

    // Fetch title from simulasi_info (id: 2)
    fetch("http://localhost:3001/api/simulasi")
      .then((res) => res.json())
      .then((data) => {
        const info = data.find((item) => item.id === 2);
        setSectionInfo(info);
      })
      .catch((err) => console.error("❌ Error fetching simulasi_info:", err));
  }, []);

  return (
    <div className="w-full bg-gray-200">
      <div className="flex flex-col items-center justify-center py-20 mx-20 mt-20">
        <img
          src={LogoBCG}
          alt="Logo AJS"
          className="h-15 w-30 mb-7"
          data-aos="fade-up"
        />
        <h1
          className="text-4xl font-semibold text-center mb-5"
          data-aos="fade-up"
        >
          {sectionInfo?.title || "KERJASAMA BANK"}
        </h1>
        {sectionInfo?.paragraph && (
          <p className="text-center text-gray-600 max-w-2xl mb-8" data-aos="fade-up">
            {sectionInfo.paragraph}
          </p>
        )}

        <div
          className="grid justify-center gap-2 my-10 gap-5 sm:gap-15 md:px-5 lg:px-20 lg:gap-20 items-center justify-items-center w-full object-cover grid-cols-3 md:grid-cols-5"
          data-aos="fade-up"
        >
          {banks.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              Loading bank data...
            </p>
          ) : (
            banks.map((bank) => (
              <img
                key={bank.id}
                src={bank.logo}
                alt={`Logo Bank ${bank.id}`}
                className="h-auto w-auto mb-7 max-h-20 object-contain"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Section2;
