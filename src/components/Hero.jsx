import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import React, { useRef, useEffect } from 'react';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const sectionRef = useRef();
  const leftLeafRef = useRef();
  const rightLeafRef = useRef();
  const cocktailLinkRef = useRef();

  useGSAP(() => {
    // Animate split title and subtitle
    const heroSplit = new SplitText('.title', { type: 'chars,words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach(char => {
      char.classList.add('text-gradient');
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.075,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.09,
      delay: 1,
    });

    gsap.timeline({
        scrollTrigger : {
            trigger : '#hero' ,
            start : 'top top' , 
            end: 'bottom top' , 
            scrub : true,
        }
    })
     .to('right-leaf' , { y: 200} , 0)
     .to('left-leaf' , { y: -200} , 0)

    // Parallax fade/slide on leaves
    gsap.fromTo(
      leftLeafRef.current,
      { autoAlpha: 0, x: -40, rotate: -7 },
      { autoAlpha: 1, x: 0, rotate: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 },
    );
    gsap.fromTo(
      rightLeafRef.current,
      { autoAlpha: 0, x: 40, rotate: 7 },
      { autoAlpha: 1, x: 0, rotate: 0, duration: 1.5, ease: 'power3.out', delay: 0.8 },
    );

    // Pop-in for View Cocktails link
    gsap.fromTo(
      cocktailLinkRef.current,
      { scale: 0.92, opacity: 0, y: 22 },
      { scale: 1, opacity: 1, y: 0, duration: 1.3, ease: 'elastic.out(1,0.72)', delay: 1.85 }
    );
  }, []);

  // Add interactive GSAP-powered shine and gentle scale on link hover
  useEffect(() => {
    const link = cocktailLinkRef.current;
    let tl;
    function onEnter() {
      tl = gsap.timeline();
      tl.to(link, {
        scale: 1.06,
        boxShadow: '0 6px 36px 0 rgba(32,32,45,0.18)',
        duration: 0.28,
        ease: 'expo.out',
      }).to(link, {
        '--cocktail-shine-x': '120%',
        duration: 0.6,
        ease: 'power2.out',
      }, 0).to(link, {
        '--cocktail-shine-x': '-30%',
        duration: 0,
        immediateRender: false,
        delay: 0.6,
      });
    }
    function onLeave() {
      if (tl) tl.reverse();
    }
    if (link) {
      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
    }
    return () => {
      if (link) {
        link.removeEventListener('mouseenter', onEnter);
        link.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <section id='hero' className='noisy relative' ref={sectionRef}>
      <h1 className='title'>LUNITO</h1>
      <img
        src="/images/hero-left-leaf.png"
        alt="left leaf"
        className='left-leaf'
        ref={leftLeafRef}
        style={{ willChange: 'transform, opacity' }}
      />
      <img
        src="/images/hero-right-leaf.png"
        alt="right leaf"
        className='right-leaf'
        ref={rightLeafRef}
        style={{ willChange: 'transform, opacity' }}
      />
      <div className='hero-body'>
        <div className='hero-content'>
          {/* Left Content */}
          <div className='space-y-5 hidden md:block'>
            <p className="text-lg">Cool. Crisp. Classic.</p>
            <p className='subtitle font-modern-negra text-6xl text-yellow max-w-xl'>
              One Sip <br /> Endless Vibes
            </p>
          </div>
          <div className='view-cocktails'>
            <p className='subtitle'>
              Each cocktail is more than a drink — it’s a story of premium ingredients, crafted with passion, and served to awaken your senses
            </p>
            <a
              href="#cocktails"
              ref={cocktailLinkRef}
              className="cocktail-link"
              tabIndex={0}
              style={{
                position: 'relative',
                overflow: 'hidden',
                '--cocktail-shine-x': '-30%',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              View Cocktails
              <span className="cocktail-shine" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

