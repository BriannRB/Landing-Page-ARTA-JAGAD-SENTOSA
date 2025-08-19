import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Gunakan Link
import Logo from "../assets/Logo AJS.png";
import IconWA from "../assets/Icon Whatsapp.png";
import "../App.css";

function Navbar() {
  const location = useLocation();
  const [selected, setSelected] = useState("BERANDA");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pathMap = {
      "/": "BERANDA",
      "/tentang-kami": "TENTANG KAMI", // Path diperbaiki
      "/developer": "DEVELOPER",
      "/simulasi-kpr": "SIMULASI KPR",
      "/kontak-kami": "KONTAK KAMI",
    };
    setSelected(pathMap[location.pathname] || "BERANDA");
  }, [location.pathname]);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      setVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "BERANDA", path: "/" },
    { name: "TENTANG KAMI", path: "/tentang-kami" }, // Path diperbaiki
    { name: "DEVELOPER", path: "/developer" },
    { name: "SIMULASI KPR", path: "/simulasi-kpr" },
    { name: "KONTAK KAMI", path: "/kontak-kami" },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
      scrolled ? "bg-white shadow-lg" : "bg-white"
    } ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} className="h-14" alt="Logo AJS" />
        </Link>

        <div className="flex md:order-2 space-x-3">
          <a
            href="https://wa.me/6282311601680"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#2DA239] text-sm font-semibold text-white rounded-lg px-4 py-1.5 hover:scale-105 transition-transform"
          >
            <img src={IconWA} alt="Whatsapp Icon" className="h-7 w-7 mr-2" />
            WHATSAPP
          </a>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 md:hidden hover:bg-gray-100 rounded-lg"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <svg className="w-5 h-5" viewBox="0 0 17 14" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className={`md:flex md:w-auto md:order-1 ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col p-4 md:flex-row md:space-x-8 md:p-0 font-bold tracking-widest">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`block py-2 px-3 text-xs md:p-0 transition-transform ${
                    selected === item.name ? "text-[#DEB06B] font-bold" : "text-gray-700 hover:text-[#DEB06B] hover:scale-105"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
