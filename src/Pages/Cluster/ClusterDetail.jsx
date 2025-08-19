import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../App.css";
import LogoBCG from "../../assets/Logo AJS.png";

function ClusterDetail() {
  const { slug } = useParams();
  const [cluster, setCluster] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [spesifikasi, setSpesifikasi] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch("http://localhost:5002/api/cluster")
      .then((res) => res.json())
      .then((allClusters) => {
        const foundCluster = allClusters.find((c) =>
          c.title.toLowerCase().replace(/\s+/g, "-") === slug
        );
        if (!foundCluster) return;

        setCluster(foundCluster);

        // Fetch related data
        Promise.all([
          fetch(`http://localhost:5002/api/cluster-gallery/cluster/${foundCluster.id}`).then((res) => res.json()),
          fetch(`http://localhost:5002/api/cluster-spesifikasi/cluster/${foundCluster.id}`).then((res) => res.json()),
        ])
          .then(([gallery, spesifikasiData]) => {
            setGalleryImages(gallery);
            setSpesifikasi(spesifikasiData);
            if (gallery.length > 0) setMainImage(gallery[0].image_cluster);
          });
      })
      .catch((err) => console.error("Error fetching cluster:", err));
  }, [slug]);

  const handlePrevClick = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 3 : prev - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 3 ? 0 : prev + 1
    );
  };

  const displayedImages = galleryImages.slice(currentIndex, currentIndex + 3);

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center mt-20">
        <img
          src={cluster?.background_header}
          alt="Background"
          className="w-full h-110 object-cover"
        />
        <div className="absolute w-full h-full bg-black opacity-50"></div>
        <div className="absolute flex items-center justify-center inset-0" data-aos="fade-up">
          <img
            src={cluster?.logo_header || ""}
            alt="Cluster Logo"
            className="w-32 h-32 bg-white rounded-full p-3 shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-20">
        <img
          src={LogoBCG}
          alt="Logo BCG"
          className="h-15 w-30 mb-7"
          data-aos="fade-up"
        />
        <h1 className="text-4xl font-semibold mb-20" data-aos="fade-up">
          Informasi Cluster
        </h1>

        <div className="flex justify-center max-h-[500px] max-w-6xl mx-auto object-cover">
          <img
            src={mainImage}
            alt="Cluster"
            className="w-3/4 rounded-xl shadow-lg"
            data-aos="fade-up"
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-6" data-aos="fade-up">
          <button onClick={handlePrevClick} className="text-gray-500 hover:text-gray-700">&lt;</button>
          <div className="flex gap-4">
            {displayedImages.map((img, idx) => (
              <img
                key={idx}
                src={img.image_cluster}
                alt={`Gallery ${idx + 1}`}
                className="w-20 h-15 md:w-36 md:h-24 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setMainImage(img.image_cluster)}
              />
            ))}
          </div>
          <button onClick={handleNextClick} className="text-gray-500 hover:text-gray-700">&gt;</button>
        </div>

        <div className="flex justify-center mt-15 border-b border-gray-300" data-aos="fade-up">
          {["Deskripsi", "Spesifikasi"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-lg font-semibold ${activeTab === tab ? "text-[#DEB06B] border-b-2 border-[#DEB06B]" : "text-gray-500"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-3/4 mx-auto mt-5 text-justify text-gray-700" data-aos="fade-up">
          {activeTab === "Deskripsi" ? (
            <div className="max-w-4xl mx-auto" data-aos="fade-up">
              <p>{cluster?.deskripsi}</p>
              <p className="mt-5">{cluster?.deskripsi2}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-5 max-w-4xl mx-auto">
              <div className="lg:col-span-2 lg:mr-40 mx-auto">
                {spesifikasi.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mt-2">
                    <img src={item.icon} alt="icon" className="w-8 h-8" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={cluster?.image_floorplan}
                  alt="Floorplan"
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ClusterDetail;
