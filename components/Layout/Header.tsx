"use client";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import CountUp from "../Animations/CountUp";
import FadeContent from "../Animations/FadeContent";
import AnimatedContent from "../Animations/AnimatedContent";
import Magnet from "../Animations/Magnet";

const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    console.log("activeLink", activeLink);
  }, [activeLink]);

  const handleCloseSidebar = () => {
    setShowSideBar(false);
  };

  return (
    <header className="sticky top-0 z-40 h-[84px] md:h-[120px] flex justify-center items-center px-4 md:px-[80px] bg-logo text-white md:bg-background">
      <nav className="w-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div>
          <h1 className="w-[180px] font-spicyrice text-[24px] md:text-[50px] text-white md:text-[#6D4C41]">
            <CountUp
              from={1}
              to={100}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />mya
          </h1>
        </div>

        {/* Desktop Navigation Menu */}

        <ul className="hidden md:flex items-center gap-6 bg-[#A28B7C36] p-3 rounded-[10px] w-[452px] justify-center font-montserrat">
          <Link
            to="home"
            smooth={true}
            duration={500}
            onClick={() => setActiveLink("Home")}
          >
            <li
              className={`font-montserrat text-[16px] cursor-pointer p-[10px] rounded-md !w-[124px] text-center text-lg ${activeLink === "Home"
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
              className={`font-montserrat text-[16px] cursor-pointer p-[10px] rounded-md !w-[124px] text-center text-lg ${activeLink === "Work"
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
              className={`font-montserrat text-[16px] cursor-pointer p-[10px] rounded-md !w-[124px] text-center text-lg ${activeLink === "Contact"
                ? "bg-[#8A6C59] text-white"
                : "text-[#6D4C41]"
                }`}
            >
              Contact
            </li>
          </Link>
        </ul>

        {/* Resume Button for Desktop */}
        {/* <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}> */}
        <AnimatedContent
          distance={200}
          direction="horizontal"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
        >
          <div className="hidden md:block">
            <Button text={"Resume"} />
          </div>
        </AnimatedContent>
        {/* </FadeContent> */}

        {/* Hamburger Menu for Mobile */}
        <div
          className="block md:hidden"
          onClick={() => setShowSideBar((prev) => !prev)}>
          <GiHamburgerMenu size={30} className="cursor-pointer md:hidden" />
        </div>

        {/* Overlay and Sidebar for Mobile */}
        {showSideBar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseSidebar}
          ></div>
        )}
        <div
          className={`fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-logo text-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${showSideBar ? "translate-x-0" : "translate-x-full"
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
          <ul className="w-full flex flex-col items-start gap-6 px-6 font-montserrat">
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
                className={`w-full font-montserrat text-[16px] cursor-pointer p-[10px] text-lg ${activeLink === "Home" ? "bg-[#8A6C59] text-white" : ""
                  } hover:bg-background hover:text-logo rounded-md`}
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
                className={`font-montserrat text-[16px] cursor-pointer p-[10px] text-lg ${activeLink === "Work" ? "bg-[#8A6C59] text-white" : ""
                  } hover:bg-background hover:text-logo rounded-md`}
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
                className={`font-montserrat text-[16px] cursor-pointer p-[10px] text-lg ${activeLink === "Contact" ? "bg-[#8A6C59] text-white" : ""
                  } hover:bg-background hover:text-logo rounded-md`}
              >
                Contact
              </li>
            </Link>
          </ul>
          <div className="mt-8 pl-6">
            <Button text={"Resume"} className="text-white !border-white hover:bg-white hover:!text-logo !w-full " />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
