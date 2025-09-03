import React from "react";
import { navLinks } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useGSAP(() => {
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
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all">
      <div className="flex justify-between items-center p-6 px-22">
        {/* Logo & Brand Name */}
        <a
          href="#home"
          className="flex items-center gap-2 text-white font-semibold text-lg"
        >
          <img src="/images/logo.png" alt="logo" className="h-8 w-auto" />
          Mocktail Bloom
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="hover:text-pink-300 transition-colors duration-300"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
