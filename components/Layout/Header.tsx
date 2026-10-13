"use client";
import { Link } from "react-scroll";
import {
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Button from "../Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import CountUp from "../Animations/CountUp";

const SCROLL_RANGE = 120;
const RESUME_URL = "/Saumya-Gautam-Resume.pdf";

function getScrollProgress() {
  return Math.min(1, window.scrollY / SCROLL_RANGE);
}

function subscribeToScroll(onStoreChange: () => void) {
  let rafId = 0;

  const onScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(onStoreChange);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", onScroll);
  };
}

const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [showSideBar, setShowSideBar] = useState(false);
  const scrollProgress = useSyncExternalStore(
    subscribeToScroll,
    getScrollProgress,
    () => 0
  );

  const handleCloseSidebar = () => {
    setShowSideBar(false);
  };

  return (
    <header
      style={{ "--header-p": scrollProgress } as CSSProperties}
      className="sticky top-0 z-40 flex h-[84px] w-full items-center bg-logo px-4 text-white md:fixed md:left-0 md:right-0 md:top-0 md:justify-center md:[height:calc(120px-var(--header-p)*4px)] md:[padding-top:calc(var(--header-p)*16px)] md:[padding-bottom:calc(var(--header-p)*16px)] md:[padding-left:calc(80px-var(--header-p)*40px)] md:[padding-right:calc(80px-var(--header-p)*40px)] md:[background-color:rgb(255_252_242/calc(1-var(--header-p)))]"
    >
      <div className="flex h-full w-full min-w-0 items-center md:box-border md:[height:calc(120px-var(--header-p)*36px)] md:[padding-left:calc(var(--header-p)*32px)] md:[padding-right:calc(var(--header-p)*32px)] md:[border-radius:calc(var(--header-p)*16px)] md:[background-color:rgb(255_252_242/var(--header-p))] md:[border-width:calc(var(--header-p)*1px)] md:[border-style:solid] md:[border-color:rgba(162,139,124,calc(var(--header-p)*0.22))] md:[box-shadow:0_calc(var(--header-p)*12px)_calc(var(--header-p)*40px)_rgba(109,76,65,calc(var(--header-p)*0.22))] md:[backdrop-filter:blur(calc(var(--header-p)*8px))]">
        <nav className="flex w-full min-w-0 items-center justify-between gap-4 md:grid md:grid-cols-[180px_1fr_auto] md:items-center md:gap-6">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="w-[180px] font-spicyrice text-[24px] text-white md:text-[#6D4C41] md:[font-size:calc(50px-var(--header-p)*10px)]">
              <CountUp
                from={1}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
              mya
            </h1>
          </div>

          {/* Desktop Navigation Menu */}
          <ul className="hidden min-w-0 items-center justify-center gap-6 rounded-[10px] bg-[#A28B7C36] p-3 font-montserrat md:flex md:w-full md:max-w-[452px] md:justify-self-center">
            <Link
              to="home"
              smooth={true}
              duration={500}
              onClick={() => setActiveLink("Home")}
            >
              <li
                className={`!w-[124px] cursor-pointer rounded-md p-[10px] text-center font-montserrat text-[16px] text-lg ${
                  activeLink === "Home"
                    ? "bg-[#8A6C59] text-white"
                    : "text-[#6D4C41]"
                }`}
              >
                Home
              </li>
            </Link>
            <Link
              to="work"
              smooth={true}
              duration={500}
              onClick={() => setActiveLink("Work")}
            >
              <li
                className={`!w-[124px] cursor-pointer rounded-md p-[10px] text-center font-montserrat text-[16px] text-lg ${
                  activeLink === "Work"
                    ? "bg-[#8A6C59] text-white"
                    : "text-[#6D4C41]"
                }`}
              >
                Work
              </li>
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              onClick={() => setActiveLink("Contact")}
            >
              <li
                className={`!w-[124px] cursor-pointer rounded-md p-[10px] text-center font-montserrat text-[16px] text-lg ${
                  activeLink === "Contact"
                    ? "bg-[#8A6C59] text-white"
                    : "text-[#6D4C41]"
                }`}
              >
                Contact
              </li>
            </Link>
          </ul>

          {/* Resume Button for Desktop */}
          <div className="hidden shrink-0 justify-self-end md:block">
            <Button text="Resume" href={RESUME_URL} />
          </div>

          {/* Hamburger Menu for Mobile */}
          <div
            className="block md:hidden"
            onClick={() => setShowSideBar((prev) => !prev)}
          >
            <GiHamburgerMenu size={30} className="cursor-pointer" />
          </div>

          {/* Overlay and Sidebar for Mobile */}
          {showSideBar && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
              onClick={handleCloseSidebar}
            />
          )}
          <div
            className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-[300px] bg-logo text-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
              showSideBar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-6">
              <h2 className="font-spicyrice text-[30px] text-white">100mya</h2>
              <IoClose
                size={30}
                className="cursor-pointer"
                onClick={handleCloseSidebar}
              />
            </div>
            <ul className="flex w-full flex-col items-start gap-6 px-6 font-montserrat">
              <Link
                className="w-full"
                to="home"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("Home");
                  handleCloseSidebar();
                }}
              >
                <li
                  className={`w-full cursor-pointer p-[10px] font-montserrat text-[16px] text-lg ${
                    activeLink === "Home" ? "bg-[#8A6C59] text-white" : ""
                  } rounded-md hover:bg-background hover:text-logo`}
                >
                  Home
                </li>
              </Link>
              <Link
                to="work"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("Work");
                  handleCloseSidebar();
                }}
                className="w-full"
              >
                <li
                  className={`cursor-pointer p-[10px] font-montserrat text-[16px] text-lg ${
                    activeLink === "Work" ? "bg-[#8A6C59] text-white" : ""
                  } rounded-md hover:bg-background hover:text-logo`}
                >
                  Work
                </li>
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("Contact");
                  handleCloseSidebar();
                }}
                className="w-full"
              >
                <li
                  className={`cursor-pointer p-[10px] font-montserrat text-[16px] text-lg ${
                    activeLink === "Contact" ? "bg-[#8A6C59] text-white" : ""
                  } rounded-md hover:bg-background hover:text-logo`}
                >
                  Contact
                </li>
              </Link>
            </ul>
            <div className="mt-8 pl-6">
              <Button
                text="Resume"
                href={RESUME_URL}
                className="!w-full !border-white text-white hover:bg-white hover:!text-logo"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
