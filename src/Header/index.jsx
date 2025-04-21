// src/components/Header/header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiMail, HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import SVGComponent from "./wave";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const nameArr = Array.from("rodrigo zea");
  const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

  const links = [
    { to: "/about",     label: t("about")     },
    { to: "/interests", label: t("interests") },
    { to: "/works",     label: t("works")     },
    { to: "/contact",   label: t("contact")   },
  ];

  return (
    <header className="relative z-20">
      <div id="header" className="flex items-center justify-between px-4 py-3">
        {/* Name */}
        <div id="name-container">
          <div id="name" className="flex items-center">
            {nameArr.map((char, i) =>
              i === 0 || i === 8 ? (
                <div id={"l"+i} key={i}><span>{char}</span></div>
              ) : (
                <div className="animated" key={i}><span>{char}</span></div>
              )
            )}
            <span id="dev">| developer</span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-lg">
          {links.map(({to, label}) => (
            <Link
              key={to}
              to={to}
              className={`text-yellow-200 hover:text-yellow-300 transition-colors ${
                location.pathname === to ? "font-bold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <select
            id="select-box"
            onChange={changeLanguage}
            className="bg-transparent text-yellow-200"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden text-yellow-200 text-2xl"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#101457] ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col mt-14 gap-4 p-4">
          {links.map(({to, label}) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`text-yellow-200 hover:text-yellow-300 transition-colors border-b border-white pb-2 
                ${
                    location.pathname === to ? "font-bold" : ""
                }`
              }
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between border-b border-white pb-2">
             <span className="text-yellow-200">
               {t('language')}
             </span>
             <select
               onChange={changeLanguage}
               className="bg-transparent text-yellow-200 outline-none"
             >
               <option value="en">EN</option>
               <option value="es">ES</option>
             </select>
           </div>
          
        </nav>
      </div>

      <SVGComponent />
    </header>
  );
}
