'use client'
import { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cocktailLists, mockTailLists } from '../../constants/index.js'

gsap.registerPlugin(ScrollTrigger)

const Cocktails = () => {
  useGSAP(() => {
    // 🔹 Leaf Parallax Animation (on scroll)
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#cocktails',
        start: 'top bottom', // animation begins when the section enters viewport
        end: 'bottom top',
        scrub: true,
      },
    })

    parallaxTimeline
      .from('#c-left-leaf', {
        x: -120,
        y: 100,
        opacity: 0,
        ease: 'power2.out',
      })
      .from(
        '#c-right-leaf',
        {
          x: 120,
          y: 100,
          opacity: 0,
          ease: 'power2.out',
        },
        '<'
      )

    // 🔹 Floating Continuous Animation (infinite loop, keeps leaves alive)
    gsap.to('#c-left-leaf', {
      y: '+=20',
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    gsap.to('#c-right-leaf', {
      y: '-=20',
      duration: 4.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    // 🔹 Fade + Slide for Content Blocks
    gsap.utils.toArray('.list > div').forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    })

    // 🔹 Staggered List Items (efficient batching)
    gsap.utils.toArray('.list ul').forEach((ul) => {
      gsap.from(ul.children, {
        scrollTrigger: {
          trigger: ul,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      })
    })
  }, [])

  // 🔹 Smooth Scroll Behavior for the whole page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <section
      id="cocktails"
      className="noisy relative px-6 md:px-20 py-16 md:py-24 overflow-hidden"
    >
      {/* Decorative Leaves */}
      <img
        src="/images/cocktail-left-leaf.png"
        alt="l-leaf"
        id="c-left-leaf"
        className="absolute left-0 top-20 w-32 md:w-48"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
        className="absolute right-0 top-28 w-32 md:w-48"
      />

      {/* Lists */}
      <div className="list relative z-10 max-w-7xl mx-auto">
        {/* Popular Cocktails */}
        <div className="popular mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Most popular cocktails:
          </h2>
          <ul className="space-y-5">
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li
                key={name}
                className="flex items-center justify-between border-b border-gray-200 pb-3"
              >
                <div className="md:me-28">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">
                    {country} | {detail}
                  </p>
                </div>
                <span className="text-base font-medium text-gray-700">
                  - {price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Loved Mocktails */}
        <div className="loved">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Most loved mocktails:
          </h2>
          <ul className="space-y-5">
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li
                key={name}
                className="flex items-center justify-between border-b border-gray-200 pb-3"
              >
                <div className="me-28">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">
                    {country} | {detail}
                  </p>
                </div>
                <span className="text-base font-medium text-gray-700">
                  - {price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Cocktails
