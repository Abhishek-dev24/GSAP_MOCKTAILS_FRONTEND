import React from "react";
import { navLinks } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useGSAP(() => {
    // Scroll-trigger blur effect
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
        toggleActions: "play none none reverse", // smooth in/out
      },
    });

    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent", backdropFilter: "blur(0px)" },
      {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );

    // Navbar entrance animation
    gsap.from("nav", {
      y: -50,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
    });

    // Staggered links entrance
    gsap.from("nav ul li", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.4,
    });
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all">
      <div className="flex justify-between items-center p-6 px-22">
        {/* Logo & Brand Name */}
        <a
          href="#home"
          className="flex items-center gap-2 text-white font-semibold text-lg group"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-8 w-auto transform transition-transform duration-300 group-hover:scale-105"
          />
          <span className="transition-transform duration-300 group-hover:scale-105">
            Mocktail Bloom
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <a
                href={`#${link.id}`}
                className="transition-colors duration-300 hover:text-pink-300"
              >
                {link.title}
              </a>
              {/* Elegant underline effect */}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-300 transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
