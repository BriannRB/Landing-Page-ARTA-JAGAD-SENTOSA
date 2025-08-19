import React, { useEffect, useState } from "react";

const AccordionItem = ({ title, paragraph }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-gray-300 mb-2 mt-5 rounded-lg overflow-hidden"
      data-aos="fade-up"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-semibold"
      >
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-xl text-gray-500">{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-300 text-sm text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: paragraph }} />
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const [accordionData, setAccordionData] = useState([]);
  const [sectionInfo, setSectionInfo] = useState(null); // untuk judul besar dari simulasi_info

  useEffect(() => {
    // Ambil isi accordion
    fetch("http://localhost:3001/api/simulasi-accordion")
      .then((res) => res.json())
      .then((data) => setAccordionData(data))
      .catch((err) => console.error("❌ Error fetching accordion data:", err));

    // Ambil info section dari simulasi_info (id = 4)
    fetch("http://localhost:3001/api/simulasi")
      .then((res) => res.json())
      .then((data) => {
        const section = data.find((item) => item.id === 4);
        setSectionInfo(section);
      })
      .catch((err) => console.error("❌ Error fetching simulasi_info:", err));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      {/* Judul utama section */}
      {sectionInfo && (
        <div className="mb-6 text-center" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-2">
            {sectionInfo.title || "ISTILAH PENTING KPR"}
          </h2>
          {sectionInfo.paragraph && (
            <p className="text-gray-600">{sectionInfo.paragraph}</p>
          )}
        </div>
      )}

      {/* Accordion list */}
      {accordionData.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">Loading Accordion...</p>
      ) : (
        accordionData.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            paragraph={item.paragraph}
          />
        ))
      )}
    </div>
  );
};

export default Accordion;
