import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/Navbar";
import Section1 from "../Components/About/Section1";
import Section2 from "../Components/About/Section2";
import Section3 from "../Components/About/Section3";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../App.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  console.log("Komponen About telah dirender");

  return (
    <div className="w-full">
      <Navbar />
      <Header title="TENTANG KAMI" subtitle="Ketahui lebih lanjut tentang kami." />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
}

export default About;
