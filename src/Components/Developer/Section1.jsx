import React, { useEffect, useState } from "react";
import LogoAJS from "../../Assets/Logo AJS.png";
import "../../App.css";

function Section1() {
  const [developerData, setDeveloperData] = useState([]);
  const [clusterList, setClusterList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/developer")
      .then((res) => res.json())
      .then((data) => setDeveloperData(data))
      .catch((err) => console.error("Fetch Developer Error:", err));

    fetch("http://localhost:5002/api/cluster")
      .then((res) => res.json())
      .then((data) => setClusterList(data))
      .catch((err) => console.error("Fetch Cluster Error:", err));
  }, []);

  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col items-center py-20 px-10 lg:px-20 xl:px-60">
      <img
        src={LogoAJS}
        alt="Logo AJS"
        className="h-15 w-30 mb-7"
        data-aos="fade-up"
      />

      {developerData[1] && (
        <>
          <h1
            className="text-4xl font-semibold text-center mb-2"
            data-aos="fade-up"
          >
            {developerData[1].title}
          </h1>
          <p
            className="text-md text-center text-gray-600 mb-10 max-w-xl"
            data-aos="fade-up"
          >
            {developerData[1].paragraph}
          </p>
        </>
      )}

      {/* Dynamic Cluster Cards */}
      <div className="grid gap-6 my-10 w-full object-cover grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {clusterList.map((cluster) => (
          <div
            key={cluster.id}
            className="relative w-full h-90 lg:h-120 shadow-2xl overflow-hidden group"
            data-aos="fade-up"
          >
            <img
              src={cluster.background_header || ""}
              alt={cluster.title}
              className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-lg bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-30"></div>
            <div className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-6 mb-5">
              <h1 className="font-semibold text-white text-xl text-center shadow-2xl">
                {cluster.title}
              </h1>
              <button className="text-sm font-regular text-white shadow-2xl bg-[#DEB06B] px-7 py-2 mt-3 rounded-4xl hover:bg-[#C99A5A] transition duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">
                <a href={`/developer/${slugify(cluster.title)}`}>
                  Info Selengkapnya
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section1;
