import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LogoAJS from "../../Assets/Logo AJS.png";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
};

const center = {
  lat: -7.036096, 
  lng: 107.538695,
};

function Section1() {
  const [formData, setFormData] = useState({
    title: "",
    namalengkap: "",
    nomorhp: "",
    email: "",
    pesan: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pesan berhasil dikirim!");
        setFormData({
          title: "",
          namalengkap: "",
          nomorhp: "",
          email: "",
          pesan: "",
        });
      } else {
        alert("Gagal mengirim pesan: " + data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim pesan.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 mx-10">
      <img
        src={LogoAJS}
        alt="Logo AJS"
        className="h-16 w-32 mb-7"
        data-aos="fade-up"
      />
      <h1
        className="text-4xl font-semibold text-center mb-5"
        data-aos="fade-up"
      >
        HUBUNGI KAMI
      </h1>
      <p
        className="text-thin text-sm text-center px-5 lg:px-40 xl:px-80"
        data-aos="fade-up"
      >
        Hubungi kami{" "}
        <span className="text-primary-color font-semibold">
          sales marketing
        </span>{" "}
        rumah Arta Jagad Sentosa yang selalu siap membantu anda mendapatkan
        hunian rumah baru di Arta Jagad Sentosa.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:mt-10 w-full max-w-5xl lg:max-w-6xl">
        {/* Lokasi */}
        <div className="flex flex-col w-full lg:w-1/2">
          <div
            className="mt-20 w-full h-[250px] md:h-[300px] rounded-lg shadow-md"
            data-aos="fade-up"
          >
            <LoadScript googleMapsApiKey="AIzaSyBHKGhc_OQTYgpZ9oJocoqtKoInZ6UGkGM">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        {/* Form */}
        <form
          className="flex flex-col mt-10 w-full lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="namalengkap"
            placeholder="Nama Lengkap"
            value={formData.namalengkap}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 mb-4 w-full"
            data-aos="fade-up"
          />
          <input
            type="text"
            name="nomorhp"
            placeholder="Nomor Handphone"
            value={formData.nomorhp}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 mb-4 w-full"
            data-aos="fade-up"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 mb-4 w-full"
            data-aos="fade-up"
          />
          <textarea
            name="pesan"
            placeholder="Pesan anda"
            rows="4"
            value={formData.pesan}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 mb-4 w-full"
            data-aos="fade-up"
          ></textarea>
          <button
            type="submit"
            className="bg-[#DEB06B] text-white py-3 px-6 rounded-md font-semibold w-full transition duration-200 ease-in-out hover:bg-[#C99A5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            data-aos="fade-up"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
}

export default Section1;
