import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const textRef = useRef(null);

  return (
    <div className="flex-center h-[100vh]">
      <h1>
        Abhishek Meshram
      </h1>
    </div>
  );
};

export default App;
