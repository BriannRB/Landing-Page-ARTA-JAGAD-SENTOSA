import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LogoAJS from "../../assets/Logo AJS.png";
import "../../App.css";

function Section2() {
  const [visi, setVisi] = useState(null);
  const [misi, setMisi] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    fetch("http://localhost:5002/api/about")
      .then((res) => res.json())
      .then((data) => {
        const visiData = data.find((item) => item.id == 3);
        const misiData = data.find((item) => item.id == 4);
        setVisi(visiData);
        setMisi(misiData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching about_sections:", err);
        setLoading(false);
      });
  }, []);

  // Refresh AOS ketika data muncul
  useEffect(() => {
    if (visi || misi) {
      AOS.refresh();
    }
  }, [visi, misi]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading VISI & MISI...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 py-20 px-10">
      {/* VISI */}
      {visi ? (
        <div className="flex flex-col items-center text-center mb-16" data-aos="fade-up">
          <img src={LogoAJS} alt="Logo AJS" className="h-14 mb-5" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {visi.title || "VISI"}
          </h2>
          <p className="text-lg max-w-2xl text-gray-700 leading-relaxed">
            {visi.paragraph || "Belum ada konten visi."}
          </p>
        </div>
      ) : (
        <p className="text-red-500 mb-8">VISI tidak ditemukan.</p>
      )}

      {/* MISI */}
      {misi ? (
        <div className="flex flex-col items-center text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {misi.title || "MISI"}
          </h2>
          <p className="text-lg max-w-2xl text-gray-700 leading-relaxed">
            {misi.paragraph || "Belum ada konten misi."}
          </p>
        </div>
      ) : (
        <p className="text-red-500">MISI tidak ditemukan.</p>
      )}
    </div>
  );
}

export default Section2;
