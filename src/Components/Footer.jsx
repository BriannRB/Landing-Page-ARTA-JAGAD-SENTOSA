import React from "react";
import LogoFooter from "../assets/Logo AJS Footer.png";
import IconLinkedin from "../assets/Icon Linkedin.png";
import IconContact from "../assets/Icon Contact.png";
import IconEmail from "../assets/Icon Email.png";

function Footer() {
  return (
    <div data-aos="fade-up">
      {/* Footer */}
      <footer className="flex flex-col lg:flex-row gap-2 items-center justify-between w-full bg-gray-800 text-white text-center py-20 px-20 mt-30">
        {/* Logo */}
        <div className="mb-6 lg:mb-0 flex justify-center lg:justify-start w-full lg:w-auto">
          <img src={LogoFooter} alt="Logo" className="w-38 md:w-40 xl:w-60" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-5 items-center lg:items-start text-left mb-6 lg:mb-0">
          <h5 className="font-bold text-2xl lg:text-lg">Halaman</h5>
          {[
            "Beranda",
            "Tentang Kami",
            "Developer",
            "Simulasi KPR",
            "Kontak Kami",
          ].map((item, index) => (
            <a
              key={index}
              className="font-light text-sm hover:text-gray-300 cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-5 items-center lg:items-start text-left lg:self-start mb-6 lg:mb-0">
          <h5 className="font-bold text-2xl lg:text-lg">Alamat</h5>
          <p className="font-light text-sm text-center lg:text-left max-w-3xs">
            Jl. Bhayangkara ParKen Blok L13 No. 192 Soreang - Kab. Bandung 40238
          </p>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col gap-5 items-center lg:items-start text-left lg:self-start">
          <h5 className="font-bold text-2xl lg:text-lg">Ikuti Kami</h5>
          <div className="flex items-center gap-3">
            <img src={IconLinkedin} alt="LinkedIn" className="w-6 h-6" />
            <a
              href="https://www.linkedin.com/company/pt-bayu-cahaya-gemilang"
              className="text-sm hover:underline"
            >
              PT. ARTA JAGAD SENTOSA
            </a>
          </div>
          <div className="flex items-center gap-3">
            <img src={IconContact} alt="Contact" className="w-6 h-6" />
            <a className="text-sm">+62 822-1556-6677</a>
          </div>
          <div className="flex items-center gap-3">
            <img src={IconEmail} alt="Email" className="w-6 h-6" />
            <a className="text-sm">ajscorporate@gmail.com</a>
          </div>
        </div>
      </footer>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-600 w-full" />

      {/* Copyright */}
      <div className="bg-gray-800 text-white text-center py-8">
        <p className="text-sm mx-16">
          &copy; {new Date().getFullYear()} PT. Arta Jagad Sentosa. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
