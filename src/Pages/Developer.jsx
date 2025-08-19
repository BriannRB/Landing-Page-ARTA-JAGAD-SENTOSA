import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Section1 from "../Components/Developer/Section1";
import Footer from "../Components/Footer";
import "../App.css";

function Developer() {
  const [headerData, setHeaderData] = useState({ title: "", paragraph: "" });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Ambil data developer_info id = 1
    fetch("http://localhost:3001/api/developer")
      .then((res) => res.json())
      .then((data) => {
        const headerContent = data.find((item) => item.id === 1);
        if (headerContent) setHeaderData(headerContent);
      })
      .catch((err) => console.error("Fetch Header Error:", err));
  }, []);

  return (
    <div>
      <Navbar />
      {/* 🔗 Inject data dari database ke komponen Header */}
      <Header title={headerData.title} subtitle={headerData.paragraph} />
      <Section1 />
      <Footer />
    </div>
  );
}

export default Developer;
