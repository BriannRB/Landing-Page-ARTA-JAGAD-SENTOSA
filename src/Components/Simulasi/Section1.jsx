import React, { useState, useEffect } from "react";
import LogoBCG from "../../Assets/Logo AJS.png";
import "../../App.css";

function Section1() {
  const [hargaProperti, setHargaProperti] = useState(400000000);
  const [sukuBunga, setSukuBunga] = useState(7.7);
  const [jangkaWaktu, setJangkaWaktu] = useState(15);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/simulasi")
      .then((res) => res.json())
      .then((data) => {
        const section1 = data.find((item) => item.id === 1);
        setSectionData(section1);
      })
      .catch((err) => console.error("❌ Error fetching simulasi_info id=1:", err));
  }, []);

  const dp = hargaProperti * 0.2; // DP = 20%
  const pinjaman = hargaProperti - dp;
  const bungaPerBulan = sukuBunga / 100 / 12;
  const totalBulan = jangkaWaktu * 12;
  const angsuran =
    (pinjaman * bungaPerBulan) /
    (1 - Math.pow(1 + bungaPerBulan, -totalBulan));

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src={LogoBCG}
          alt="Logo BCG"
          className="h-15 w-30 mb-7"
          data-aos="fade-up"
        />
        <h1
          className="text-4xl font-semibold text-center mb-5"
          data-aos="fade-up"
        >
          {sectionData?.title || "SIMULASI"}
        </h1>
        {sectionData?.paragraph && (
          <p
            className="text-center text-gray-600 max-w-2xl"
            data-aos="fade-up"
          >
            {sectionData.paragraph}
          </p>
        )}
      </div>

      {/* Form Simulasi */}
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Harga Properti */}
          <div data-aos="fade-up">
            <label className="block text-gray-700 font-semibold mb-2">
              HARGA PROPERTI
            </label>
            <input
              type="number"
              value={hargaProperti}
              onChange={(e) => setHargaProperti(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Jangka Waktu */}
          <div data-aos="fade-up">
            <label className="block text-gray-700 font-semibold mb-2">
              JANGKA WAKTU
            </label>
            <select
              value={jangkaWaktu}
              onChange={(e) => setJangkaWaktu(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Tahun
                </option>
              ))}
            </select>
          </div>

          {/* Uang Muka */}
          <div data-aos="fade-up">
            <label className="block text-gray-700 font-semibold mb-2">
              UANG MUKA / DP 20%
            </label>
            <input
              type="number"
              value={dp}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Estimasi Suku Bunga */}
          <div data-aos="fade-up">
            <label className="block text-gray-700 font-semibold mb-2">
              ESTIMASI SUKU BUNGA / TAHUN
            </label>
            <input
              type="number"
              value={sukuBunga}
              onChange={(e) => setSukuBunga(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Hasil Simulasi */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6"
          data-aos="fade-up"
        >
          <div className="bg-[#DEB06B] text-white p-4 text-center rounded-lg">
            <h2 className="font-semibold">ANGSURAN PERBULAN</h2>
            <p className="text-lg font-bold">
              Rp {angsuran.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="bg-[#DEB06B] text-white p-4 text-center rounded-lg">
            <h2 className="font-semibold">JUMLAH PINJAMAN</h2>
            <p className="text-lg font-bold">
              Rp {pinjaman.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
