import React, { useEffect, useState } from "react";
import LogoAJS from "../../assets/Logo AJS.png";
import "../../App.css";

function Section3() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5002/api/about-point") // Port dan path untuk company profile API
      .then((res) => res.json())
      .then((data) => {
        setPoints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching about_point:", err);
        setPoints([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center bg-white py-16 px-10" data-aos="fade-up">
      {/* Garis atas */}
      <div className="w-20 border-t-2 border-[#DEB06B] mb-6"></div>

      {/* Logo & Judul */}
      <img src={LogoAJS} alt="Logo AJS" className="h-14 mb-4" />
      <h2 className="text-3xl font-bold text-gray-900 mb-6">NILAI-NILAI</h2>

      {/* Nilai-nilai dari DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-gray-500 text-sm col-span-full text-center">
            Loading...
          </p>
        ) : points.length > 0 ? (
          points.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold text-center"
            >
              {item.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full text-center">
            Tidak ada data nilai-nilai.
          </p>
        )}
      </div>
    </div>
  );
}

export default Section3;
