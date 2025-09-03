import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const sectionRef = useRef();
  const videoRef = useRef();
  const leftLeafRef = useRef();
  const rightLeafRef = useRef();
  const cocktailLinkRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    // Apply text-gradient before animating
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Intro animations
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.075,
      delay: 0.2,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.09,
      delay: 1,
    });

    gsap.from(sectionRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 1.4,
      ease: "power2.out",
    });

    // Hero body content subtle stagger
    gsap.from(".hero-body > *", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 1.1,
    });

    // Leaves entrance
    gsap.fromTo(
      leftLeafRef.current,
      { autoAlpha: 0, x: -40, rotate: -7 },
      {
        autoAlpha: 1,
        x: 0,
        rotate: 0,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.4,
      }
    );
    gsap.fromTo(
      rightLeafRef.current,
      { autoAlpha: 0, x: 40, rotate: 7 },
      {
        autoAlpha: 1,
        x: 0,
        rotate: 0,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.7,
      }
    );

    // Floating idle
    gsap.to(leftLeafRef.current, {
      y: "+=18",
      rotate: -2,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2,
    });
    gsap.to(rightLeafRef.current, {
      y: "-=12",
      rotate: 1,
      duration: 4.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2.5,
    });

    // Subtle shimmer pulse on title (after main animation ends)
    gsap.to(".title", {
      opacity: 0.95,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2.5,
    });

    // Subtle parallax scroll on title
    gsap.to(".title", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Scroll interactivity for leaves/arrow
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);

    // Video scrubbing animation
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };

    // Cocktail link hover shine
    const link = cocktailLinkRef.current;
    if (link) {
      link.addEventListener("mouseenter", () => {
        gsap.fromTo(
          link.querySelector(".cocktail-shine"),
          { left: "-100%" },
          {
            left: "150%",
            duration: 1.2,
            ease: "power2.out",
          }
        );
        gsap.to(link, {
          scale: 1.04,
          y: -3,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });
      });
    }
  }, [isMobile]);

  return (
    <>
      <section id="hero" className="noisy" ref={sectionRef}>
        <h1 className="title">LUNITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
          ref={leftLeafRef}
          style={{ willChange: "transform, opacity" }}
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
          ref={rightLeafRef}
          style={{ willChange: "transform, opacity" }}
        />

        <div className="hero-body">
          <div className="hero-content">
            {/* Left Content */}
            <div className="space-y-5 hidden md:block">
              <p className="text-lg">Cool. Crisp. Classic.</p>
              <p className="subtitle font-modern-negra text-6xl text-yellow max-w-xl">
                One Sip <br /> Endless Vibes
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Each cocktail is more than a drink — it’s a story of premium
                ingredients, crafted with passion, and served to awaken your
                senses
              </p>
              <a
                href="#cocktails"
                ref={cocktailLinkRef}
                className="cocktail-link"
                tabIndex={0}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  "--cocktail-shine-x": "-30%",
                  WebkitTapHighlightColor: "transparent",
                  display: "inline-block",
                  willChange: "transform",
                }}
              >
                View Cocktails
                <span
                  className="cocktail-shine"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "80px",
                    height: "100%",
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                    transform: "skewX(-20deg)",
                    pointerEvents: "none",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO FIXED BEHIND HERO */}
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
