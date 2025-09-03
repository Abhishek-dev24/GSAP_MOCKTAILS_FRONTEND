import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const textRef = useRef(null);

  return (
    <main>
      <Navbar />
      <Hero />
      
    </main>
  );
};

export default App;
