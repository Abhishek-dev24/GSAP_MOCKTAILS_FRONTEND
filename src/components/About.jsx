import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
    const container = useRef(null);

    useGSAP(() => {
        const titleSplit = SplitText.create('#about h2', { type: 'words' });

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
            },
        });

        // Title words reveal
        scrollTimeline.from(titleSplit.words, {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.05,
        });

        // Badge animation
        scrollTimeline.from('.badge', {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)',
        }, "-=0.5");

        // Paragraph + rating fade-in
        scrollTimeline.from('.sub-content p, .sub-content div', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
        }, "-=0.3");

        // Grid images animation + parallax depth + initial blur
        gsap.utils.toArray('.image-wrapper').forEach((el, i) => {
            const img = el.querySelector('img');

            // Initial blur + fade-in + scale animation when entering viewport
            gsap.fromTo(img,
                { opacity: 0, y: 60, scale: 0.95, filter: 'blur(3px)' },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0.5px)',
                    duration: 0.3,
                    ease: 'power3.out',
                    delay: i * 0.4,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    },
                }
            );

            // PARALLAX subtle vertical motion on the img
            gsap.to(img, {
                yPercent: gsap.utils.random(-8, 8),
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Hover handlers for blur and scale animations
            el.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.06,
                    filter: 'blur(0px)',
                    boxShadow: '0 10px 20px rgba(255, 255, 255, 0.3)',
                    duration: 0.6,
                    ease: 'power3.out',
             });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    filter: 'blur(3px)',
                    boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
                    duration: 0.6,
                    ease: 'power3.out',
                });
            });
        });
    }, []);

    return (
        <div id="about" ref={container}>
            <div className="mb-16 md:px-0 px-5">
                <div className="content">
                    <div className="md:col-span-8">
                        <p className="badge">Best Cocktails</p>
                        <h2>
                            Where every detail matters <span className="text-white">-</span>
                            from muddle to garnish
                        </h2>
                    </div>

                    <div className="sub-content">
                        <p>
                            Every cocktail we serve is a reflection of our obsession with detail —
                            from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
                        </p>
                        <div>
                            <p className="md:text-3xl text-xl font-bold">
                                <span>4.5</span>/5
                            </p>
                            <p className="text-sm text-white-100">
                                More than +12000 customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top grid */}
            <div className="top-grid">
                <div className="md:col-span-3 image-wrapper">
                    <div className="noisy" />
                    <img src="/images/abt1.png" alt="grid-img-1" />
                </div>
                <div className="md:col-span-6 image-wrapper">
                    <div className="noisy" />
                    <img src="/images/abt2.png" alt="grid-img-2" />
                </div>
                <div className="md:col-span-3 image-wrapper">
                    <div className="noisy" />
                    <img src="/images/abt5.png" alt="grid-img-5" />
                </div>
            </div>

            {/* Bottom grid */}
            <div className="bottom-grid">
                <div className="md:col-span-8 image-wrapper">
                    <div className="noisy" />
                    <img src="/images/abt3.png" alt="grid-img-3" />
                </div>
                <div className="md:col-span-4 image-wrapper">
                    <div className="noisy" />
                    <img src="/images/abt4.png" alt="grid-img-4" />
                </div>
            </div>
        </div>
    );
};

export default About;
