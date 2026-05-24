/**
 * VCA Labs Interactive Experience Engine
 * Orchestrates ordered grid coordinates globally, structures snapping and smooth scrolls
 * across a 2D coordinate grid (Screen 1 Hero -> Screen 2 About -> Screen 3 Products -> Screen 4 Stonksbot),
 * intercepts wheel/touch gestures to guide the user on a physical scroll ladder,
 * and synch-mutes quad video players concurrently.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
  // Videos
  const bgVideoHero = document.getElementById('bg-video-hero');
  const bgVideoAbout = document.getElementById('bg-video-about');
  const bgVideoProducts = document.getElementById('bg-video-products');
  const bgVideoStonks = document.getElementById('bg-video-stonks');
  const bgVideoSandhya = document.getElementById('bg-video-sandhya');
  const bgVideoJimbro = document.getElementById('bg-video-jimbro');
  const bgVideoAgni = document.getElementById('bg-video-agni');
  const bgVideoDoctrine = document.getElementById('bg-video-doctrine');
  const bgVideoIndratir = document.getElementById('bg-video-indratir');
  const bgVideoWtfcharts = document.getElementById('bg-video-wtfcharts');
  const bgVideoKylo = document.getElementById('bg-video-kylo');
  
  // Navigation elements
  const brandContainer = document.getElementById('brand-container');
  const scrollDeck = document.getElementById('scroll-deck');
  
  const heroSection = document.getElementById('section-hero');
  const aboutSection = document.getElementById('section-about');
  const productsSection = document.getElementById('section-products');
  const stonksSection = document.getElementById('section-stonks');
  const sandhyaSection = document.getElementById('section-sandhya');
  const jimbroSection = document.getElementById('section-jimbro');
  const agniSection = document.getElementById('section-agni');
  const doctrineSection = document.getElementById('section-doctrine');
  const indratirSection = document.getElementById('section-indratir');
  const wtfchartsSection = document.getElementById('section-wtfcharts');
  const kyloSection = document.getElementById('section-kylo');
  
  const aboutHeading = document.getElementById('about-heading');
  const aboutSubtext = document.getElementById('about-subtext');
  
  const productsTitle = document.getElementById('products-title');
  
  const stonksCard = document.getElementById('stonks-card');
  const stonksHeading = document.getElementById('stonks-heading');
  const stonksSubtext = document.getElementById('stonks-subtext');
  const stonksSocials = document.getElementById('stonks-socials');

  const sandhyaPositioner = document.getElementById('sandhya-positioner');
  const sandhyaCard = document.getElementById('sandhya-card');
  const sandhyaHeading = document.getElementById('sandhya-heading');
  const sandhyaSubtext = document.getElementById('sandhya-subtext');
  const sandhyaSocials = document.getElementById('sandhya-socials');
  
  const jimbroPositioner = document.getElementById('jimbro-positioner');
  const jimbroCard = document.getElementById('jimbro-card');
  const jimbroHeading = document.getElementById('jimbro-heading');
  const jimbroSubtext = document.getElementById('jimbro-subtext');
  const jimbroSocials = document.getElementById('jimbro-socials');
  
  const agniPositioner = document.getElementById('agni-positioner');
  const agniCard = document.getElementById('agni-card');
  const agniHeading = document.getElementById('agni-heading');
  const agniSubtext = document.getElementById('agni-subtext');
  const agniSocials = document.getElementById('agni-socials');
  
  const doctrinePositioner = document.getElementById('doctrine-positioner');
  const doctrineCard = document.getElementById('doctrine-card');
  const doctrineHeading = document.getElementById('doctrine-heading');
  const doctrineSubtext = document.getElementById('doctrine-subtext');
  const doctrineSocials = document.getElementById('doctrine-socials');
  
  const indratirPositioner = document.getElementById('indratir-positioner');
  const indratirCard = document.getElementById('indratir-card');
  const indratirHeading = document.getElementById('indratir-heading');
  const indratirSubtext = document.getElementById('indratir-subtext');
  const indratirSocials = document.getElementById('indratir-socials');
  
  const wtfchartsPositioner = document.getElementById('wtfcharts-positioner');
  const wtfchartsCardDOM = document.getElementById('wtfcharts-card');
  const wtfchartsHeading = document.getElementById('wtfcharts-heading');
  const wtfchartsSubtext = document.getElementById('wtfcharts-subtext');
  const wtfchartsSocials = document.getElementById('wtfcharts-socials');
  const kyloPositioner = document.getElementById('kylo-positioner');
  const kyloCardDOM = document.getElementById('kylo-card');
  const kyloHeading = document.getElementById('kylo-heading');
  const kyloSubtext = document.getElementById('kylo-subtext');
  const kyloSocials = document.getElementById('kylo-socials');
  
  // Slide Deck Coordinates Configuration
  let currentSlide = 1; // 1 = Hero, 2 = About, 3 = Products, 4 = Stonksbot, 5 = Sandhya, 6 = Jimbro, 7 = Agni, 8 = Doctrine
  let isTransitioning = false;
  
  let aboutAnimated = false;
  let productsAnimated = false;
  let stonksAnimated = false;
  let sandhyaAnimated = false;
  let jbroAnimated = false;
  let agniAnimated = false;
  let doctrineAnimated = false;
  let indratirAnimated = false;
  let wtfchartsAnimated = false;
  let kyloAnimated = false;

  // Interactive Particle Coordinates Configuration
  let particlesArray = [];
  let isMouseActive = false;
  let isCanvasLoopRunning = true;
  let animationFrameId = null;
  
  const mouse = {
    x: null,
    y: null,
    radius: 130, // Repulsion field radius
  };

  // Base physics configurations
  const CONFIG = {
    gridSpacingDesktop: 48,
    gridSpacingMobile: 36,
    springStrength: 0.045, // Pullback tension returning to coordinate anchor
    damping: 0.88,        // Friction to prevent infinite oscillation
    repulsionStrength: 2.8, // Push force away from cursor
    lineMaxDistanceRatio: 1.3, // Connect adjacent dots within spacing ratio
  };

  // 1. Video Initialization
  if (bgVideoHero) {
    // All videos initialize as muted by browser autoplay policy
    bgVideoHero.muted = true;
    if (bgVideoAbout) bgVideoAbout.muted = true;
    if (bgVideoProducts) bgVideoProducts.muted = true;
    if (bgVideoStonks) bgVideoStonks.muted = true;
    if (bgVideoSandhya) bgVideoSandhya.muted = true;
    if (bgVideoJimbro) bgVideoJimbro.muted = true;
    if (bgVideoAgni) bgVideoAgni.muted = true;
    if (bgVideoDoctrine) bgVideoDoctrine.muted = true;
    if (bgVideoIndratir) bgVideoIndratir.muted = true;
    if (bgVideoWtfcharts) bgVideoWtfcharts.muted = true;
    if (bgVideoKylo) bgVideoKylo.muted = true;

  }

  // Set Video 3 playback rate to 1.5x speed as requested
  if (bgVideoProducts) {
    bgVideoProducts.playbackRate = 1.5;
  }

  // 2. Programmatic Horizontal/Vertical Snapping transitions
  function goToSlide(slideNum) {
    if (isTransitioning || currentSlide === slideNum) return;
    isTransitioning = true;

    let targetX = 0;
    let targetY = 0;

    const innerW = window.innerWidth;
    const innerH = window.innerHeight;

    if (slideNum === 1) {
      targetX = 0;
      targetY = 0;
    } else if (slideNum === 2) {
      targetX = 0;
      targetY = innerH;
    } else if (slideNum === 3) {
      targetX = innerW;
      targetY = innerH;
    } else if (slideNum === 4) {
      targetX = innerW;
      targetY = innerH * 2;
    } else if (slideNum === 5) {
      targetX = innerW * 2;
      targetY = innerH * 2;
    } else if (slideNum === 6) {
      targetX = innerW * 2;
      targetY = innerH * 3;
    } else if (slideNum === 7) {
      targetX = innerW * 3;
      targetY = innerH * 3;
    } else if (slideNum === 8) {
      targetX = innerW * 3;
      targetY = innerH * 4;
    } else if (slideNum === 9) {
      targetX = innerW * 2;
      targetY = innerH * 4;
    } else if (slideNum === 10) {
      targetX = innerW * 2;
      targetY = innerH * 5;
    } else if (slideNum === 11) {
      targetX = innerW;
      targetY = innerH * 5;
    }

    // Play/Pause active background loops to conserve resource loading
    if (bgVideoHero && !bgVideoHero.paused && slideNum !== 1) bgVideoHero.pause();
    if (bgVideoAbout && !bgVideoAbout.paused && slideNum !== 2) bgVideoAbout.pause();
    if (bgVideoProducts && !bgVideoProducts.paused && slideNum !== 3) bgVideoProducts.pause();
    if (bgVideoStonks && !bgVideoStonks.paused && slideNum !== 4) bgVideoStonks.pause();
    if (bgVideoSandhya && !bgVideoSandhya.paused && slideNum !== 5) bgVideoSandhya.pause();
    if (bgVideoJimbro && !bgVideoJimbro.paused && slideNum !== 6) bgVideoJimbro.pause();
    if (bgVideoAgni && !bgVideoAgni.paused && slideNum !== 7) bgVideoAgni.pause();
    if (bgVideoDoctrine && !bgVideoDoctrine.paused && slideNum !== 8) bgVideoDoctrine.pause();
    if (bgVideoIndratir && !bgVideoIndratir.paused && slideNum !== 9) bgVideoIndratir.pause();
    if (bgVideoWtfcharts && !bgVideoWtfcharts.paused && slideNum !== 10) bgVideoWtfcharts.pause();
    if (bgVideoKylo && !bgVideoKylo.paused && slideNum !== 11) bgVideoKylo.pause();

    if (slideNum === 1 && bgVideoHero && bgVideoHero.paused) bgVideoHero.play().catch(() => {});
    if (slideNum === 2 && bgVideoAbout && bgVideoAbout.paused) bgVideoAbout.play().catch(() => {});
    if (slideNum === 3 && bgVideoProducts && bgVideoProducts.paused) bgVideoProducts.play().catch(() => {});
    if (slideNum === 4 && bgVideoStonks && bgVideoStonks.paused) bgVideoStonks.play().catch(() => {});
    if (slideNum === 5 && bgVideoSandhya && bgVideoSandhya.paused) bgVideoSandhya.play().catch(() => {});
    if (slideNum === 6 && bgVideoJimbro && bgVideoJimbro.paused) bgVideoJimbro.play().catch(() => {});
    if (slideNum === 7 && bgVideoAgni && bgVideoAgni.paused) bgVideoAgni.play().catch(() => {});
    if (slideNum === 8 && bgVideoDoctrine && bgVideoDoctrine.paused) bgVideoDoctrine.play().catch(() => {});
    if (slideNum === 9 && bgVideoIndratir && bgVideoIndratir.paused) bgVideoIndratir.play().catch(() => {});
    if (slideNum === 10 && bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});
    if (slideNum === 11 && bgVideoKylo && bgVideoKylo.paused) bgVideoKylo.play().catch(() => {});

    // Stagger reveals for elements entering the viewport
    if (slideNum === 2) {
      gsap.killTweensOf([aboutHeading, aboutSubtext]);
      gsap.fromTo([aboutHeading, aboutSubtext],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: "power3.out", delay: 0.25 }
      );
      aboutAnimated = true;
    } else if (slideNum === 3) {
      gsap.killTweensOf([productsTitle, ".product-item"]);
      gsap.fromTo(productsTitle,
        { opacity: 0, y: -20 },
        { opacity: 0.5, y: 0, duration: 1.0, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".product-item",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.35 }
      );
      productsAnimated = true;
    } else if (slideNum === 4) {
      gsap.killTweensOf([stonksCard, stonksHeading, stonksSubtext, stonksSocials]);
      gsap.fromTo(stonksCard,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(stonksHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(stonksSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(stonksSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      stonksAnimated = true;
    } else if (slideNum === 5) {
      gsap.killTweensOf([sandhyaPositioner, sandhyaHeading, sandhyaSubtext, sandhyaSocials]);
      gsap.fromTo(sandhyaPositioner,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(sandhyaHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(sandhyaSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(sandhyaSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      sandhyaAnimated = true;
    } else if (slideNum === 6) {
      gsap.killTweensOf([jimbroPositioner, jimbroHeading, jimbroSubtext, jimbroSocials]);
      gsap.fromTo(jimbroPositioner,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(jimbroHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(jimbroSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(jimbroSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      jbroAnimated = true;
    } else if (slideNum === 7) {
      gsap.killTweensOf([agniPositioner, agniHeading, agniSubtext, agniSocials]);
      gsap.fromTo(agniPositioner,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(agniHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(agniSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(agniSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      agniAnimated = true;
      gsap.killTweensOf([doctrinePositioner, doctrineHeading, doctrineSubtext, doctrineSocials]);
      gsap.fromTo(doctrinePositioner,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(doctrineHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(doctrineSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(doctrineSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      doctrineAnimated = true;
    } else if (slideNum === 9) {
      gsap.killTweensOf([indratirPositioner, indratirHeading, indratirSubtext, indratirSocials]);
      gsap.fromTo(indratirPositioner,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(indratirHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(indratirSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(indratirSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      indratirAnimated = true;
    } else if (slideNum === 10) {
      gsap.killTweensOf([wtfchartsPositioner, wtfchartsHeading, wtfchartsSubtext, wtfchartsSocials]);
      gsap.fromTo(wtfchartsPositioner,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(wtfchartsHeading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(wtfchartsSubtext,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(wtfchartsSocials,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }
      );
      wtfchartsAnimated = true;
    }

    // Pythagoras Theorem for dynamic shortest path duration
    const currentX = window.scrollX;
    const currentY = window.scrollY;
    const dxDist = targetX - currentX;
    const dyDist = targetY - currentY;
    const distance = Math.hypot(dxDist, dyDist);
    
    const baseDistance = Math.max(innerW, innerH);
    let dynamicDuration = (distance / baseDistance) * 0.95;
    
    // Clamp duration so it's not too fast or too slow
    if (distance === 0) dynamicDuration = 0.95;
    else dynamicDuration = Math.max(0.6, Math.min(dynamicDuration, 2.5));

    // Direct programmatic viewport translation
    gsap.to(window, {
      scrollTo: { x: targetX, y: targetY, autoKill: false },
      duration: dynamicDuration,
      ease: "power2.inOut",
      onComplete: () => {
        currentSlide = slideNum;
        isTransitioning = false;
      }
    });

    // Toggle hero-nav links visibility
    const heroNav = document.getElementById('hero-nav');
    if (heroNav) {
      if (slideNum === 1) {
        heroNav.classList.remove('hidden-links');
      } else {
        heroNav.classList.add('hidden-links');
      }
    }
  }

  // Brand entry clicks
  if (brandContainer) {
    brandContainer.addEventListener('click', () => {
      goToSlide(2);
    });
  }

  // Global Logo Tab
  const globalLogoTab = document.getElementById('global-logo-tab');
  if (globalLogoTab) {
    globalLogoTab.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({ slide: 1 }, '', window.location.pathname);
      goToSlide(1);
    });
  }

  // Ensure initial state is recorded for back button
  if (!history.state || !history.state.slide) {
    history.replaceState({ slide: 1 }, '', window.location.pathname);
  }

  // Prevent browser from instantly jumping scroll on back/forward
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Handle Browser Back Arrow perfectly
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.slide) {
      goToSlide(e.state.slide);
    } else {
      goToSlide(1); // Default back to hero
    }
  });

  // Product Lineup Nav Link
  const navLineup = document.getElementById('nav-lineup');
  if (navLineup) {
    navLineup.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({ slide: 3 }, '', window.location.pathname);
      goToSlide(3);
    });
  }

  // Connect all product items to their sections
  document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const target = parseInt(item.getAttribute('data-target'), 10);
      if (target) {
        history.pushState({ slide: target }, '', window.location.pathname);
        goToSlide(target);
      }
    });
  });
  // Tap-anywhere Navigators
  if (aboutSection) {
    aboutSection.addEventListener('click', (e) => {
      if (e.target.closest('.controls-container') || e.target.closest('.hero-nav')) return;
      goToSlide(3);
    });
  }

  if (productsSection) {
    productsSection.addEventListener('click', (e) => {
      if (e.target.closest('.controls-container') || e.target.closest('.hero-nav')) return;
      if (e.target.closest('.product-item')) return;
      goToSlide(2);
    });
  }

  // Wheel Scroll Interceptors for 2D Grid Stairs Ladder
  window.addEventListener('wheel', (e) => {
    // Always prevent default to block native browser scroll and snapping fights
    e.preventDefault();

    if (isTransitioning) return;
    
    const threshold = 10; // Avoid micro-accidental triggers on trackpads
    const dy = e.deltaY;
    const dx = e.deltaX;
    
    if (Math.abs(dy) < threshold && Math.abs(dx) < threshold) return;

    if (dy > 0 || dx > 0) {
      // Scroll Down/Right -> Go forward
      if (currentSlide === 1) goToSlide(2);
      else if (currentSlide === 2) goToSlide(3);
      else if (currentSlide === 3) goToSlide(4);
      else if (currentSlide === 4) goToSlide(5);
      else if (currentSlide === 5) goToSlide(6);
      else if (currentSlide === 6) goToSlide(7);
      else if (currentSlide === 7) goToSlide(8);
      else if (currentSlide === 8) goToSlide(9);
      else if (currentSlide === 9) goToSlide(10);
      else if (currentSlide === 10) goToSlide(11);
      else if (currentSlide === 11) goToSlide(1);
    } else if (dy < 0 || dx < 0) {
      // Scroll Up/Left -> Go backward
      if (currentSlide === 11) goToSlide(10);
      else if (currentSlide === 10) goToSlide(9);
      else if (currentSlide === 9) goToSlide(8);
      else if (currentSlide === 8) goToSlide(7);
      else if (currentSlide === 7) goToSlide(6);
      else if (currentSlide === 6) goToSlide(5);
      else if (currentSlide === 5) goToSlide(4);
      else if (currentSlide === 4) goToSlide(3);
      else if (currentSlide === 3) goToSlide(2);
      else if (currentSlide === 2) goToSlide(1);
      else if (currentSlide === 1) goToSlide(11);
    }
  }, { passive: false });

  // Mobile Touch Swiping Gesture Interceptors for 2D Grid Stairs Ladder
  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    // Always prevent default on touch moves to block native panning and snap glitches
    e.preventDefault();

    if (isTransitioning || e.touches.length === 0) return;
    
    const deltaX = touchStartX - e.touches[0].clientX;
    const deltaY = touchStartY - e.touches[0].clientY;

    const swipeThreshold = 40; // slightly more responsive threshold on mobile

    if (Math.abs(deltaY) > swipeThreshold || Math.abs(deltaX) > swipeThreshold) {
      if (deltaY > swipeThreshold || deltaX > swipeThreshold) {
        // Swiping UP or LEFT -> Advance slide
        if (currentSlide === 1) goToSlide(2);
        else if (currentSlide === 2) goToSlide(3);
        else if (currentSlide === 3) goToSlide(4);
        else if (currentSlide === 4) goToSlide(5);
        else if (currentSlide === 5) goToSlide(6);
        else if (currentSlide === 6) goToSlide(7);
        else if (currentSlide === 7) goToSlide(8);
        else if (currentSlide === 8) goToSlide(9);
        else if (currentSlide === 9) goToSlide(10);
        else if (currentSlide === 10) goToSlide(11);
        else if (currentSlide === 11) goToSlide(1);
      } else if (deltaY < -swipeThreshold || deltaX < -swipeThreshold) {
        // Swiping DOWN or RIGHT -> Retreat slide
        if (currentSlide === 11) goToSlide(10);
      else if (currentSlide === 10) goToSlide(9);
        else if (currentSlide === 9) goToSlide(8);
        else if (currentSlide === 8) goToSlide(7);
        else if (currentSlide === 7) goToSlide(6);
        else if (currentSlide === 6) goToSlide(5);
        else if (currentSlide === 5) goToSlide(4);
        else if (currentSlide === 4) goToSlide(3);
        else if (currentSlide === 3) goToSlide(2);
        else if (currentSlide === 2) goToSlide(1);
        else if (currentSlide === 1) goToSlide(11);
      }
      
      // Reset start coordinates to prevent repeat triggering in same gesture
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: false });


  // 3. Coordinate Mesh Particle Constructor
  class Particle {
    constructor(anchorX, anchorY, color) {
      this.anchorX = anchorX;
      this.anchorY = anchorY;
      
      this.x = anchorX;
      this.y = anchorY;
      
      this.vx = 0;
      this.vy = 0;
      
      this.baseRadius = 0.70;
      this.radius = this.baseRadius;
      
      this.baseAlpha = 0.20;
      this.alpha = this.baseAlpha;
      
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color.replace('ALPHA', this.alpha.toFixed(2));
      ctx.fill();
    }

    update() {
      // Elastic spring coordinate snap back
      const dxAnchor = this.anchorX - this.x;
      const dyAnchor = this.anchorY - this.y;
      this.vx += dxAnchor * CONFIG.springStrength;
      this.vy += dyAnchor * CONFIG.springStrength;

      // Cursor repel displacement
      if (isMouseActive && mouse.x !== null && mouse.y !== null) {
        const dxMouse = mouse.x - this.x;
        const dyMouse = mouse.y - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          const dirX = dxMouse / distMouse;
          const dirY = dyMouse / distMouse;

          this.vx -= dirX * force * CONFIG.repulsionStrength;
          this.vy -= dirY * force * CONFIG.repulsionStrength;

          // Expand size and glow brightness
          this.alpha += (0.75 - this.alpha) * 0.12;
          this.radius += (1.5 - this.radius) * 0.12;
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.08;
          this.radius += (this.baseRadius - this.radius) * 0.08;
        }
      } else {
        this.alpha += (this.baseAlpha - this.alpha) * 0.08;
        this.radius += (this.baseRadius - this.radius) * 0.08;
      }

      this.vx *= CONFIG.damping;
      this.vy *= CONFIG.damping;

      this.x += this.vx;
      this.y += this.vy;

      this.draw();
    }
  }

  // Initialize Coordinate Grid Map
  function initParticles() {
    particlesArray = [];
    const spacing = window.innerWidth < 768 ? CONFIG.gridSpacingMobile : CONFIG.gridSpacingDesktop;
    const color = 'rgba(255, 255, 255, ALPHA)';

    const offsetX = (canvas.width % spacing) / 2;
    const offsetY = (canvas.height % spacing) / 2;

    for (let x = offsetX + spacing / 2; x < canvas.width; x += spacing) {
      for (let y = offsetY + spacing / 2; y < canvas.height; y += spacing) {
        particlesArray.push(new Particle(x, y, color));
      }
    }
  }

  // Draw elastic constellation grid wires
  function connectParticles() {
    const spacing = window.innerWidth < 768 ? CONFIG.gridSpacingMobile : CONFIG.gridSpacingDesktop;
    const maxDistance = spacing * CONFIG.lineMaxDistanceRatio;

    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          let alpha = (1 - distance / maxDistance) * 0.06;
          
          if (isMouseActive && mouse.x !== null && mouse.y !== null) {
            const dxMouse = mouse.x - (particlesArray[a].x + particlesArray[b].x) / 2;
            const dyMouse = mouse.y - (particlesArray[a].y + particlesArray[b].y) / 2;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distMouse < mouse.radius) {
              const boost = (mouse.radius - distMouse) / mouse.radius;
              alpha += boost * 0.08;
            }
          }

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.45;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Resize canvas bounds
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  // Event Listeners for Cursor
  window.addEventListener('mousemove', (e) => {
    isMouseActive = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    isMouseActive = false;
    mouse.x = null;
    mouse.y = null;
  });

  // Mobile / Tablet touch events
  window.addEventListener('touchstart', (e) => {
    isMouseActive = true;
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    isMouseActive = true;
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isMouseActive = false;
    mouse.x = null;
    mouse.y = null;
  });

  // Debounced window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 150);
  });

  // Render Loop Manager
  function animate() {
    if (!isCanvasLoopRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    
    connectParticles();
    
    animationFrameId = requestAnimationFrame(animate);
  }

  // 4. Performance Intersection Observer
  const observerOptions = {
    root: null,
    threshold: 0.35 // Trigger focus transition when 35% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'section-hero') {
          currentSlide = 1;
          if (bgVideoHero && bgVideoHero.paused) bgVideoHero.play().catch(() => {});
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          
        } else if (entry.target.id === 'section-about') {
          currentSlide = 2;
          if (bgVideoAbout && bgVideoAbout.paused) bgVideoAbout.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();

          if (!aboutAnimated) {
            gsap.killTweensOf([aboutHeading, aboutSubtext]);
            gsap.to([aboutHeading, aboutSubtext], {
              opacity: 1,
              y: 0,
              duration: 1.3,
              stagger: 0.22,
              ease: "power3.out"
            });
            aboutAnimated = true;
          }
        } else if (entry.target.id === 'section-products') {
          currentSlide = 3;
          if (bgVideoProducts && bgVideoProducts.paused) bgVideoProducts.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();

          if (!productsAnimated) {
            gsap.killTweensOf([productsTitle, ".product-item"]);
            
            gsap.to(productsTitle, { opacity: 0.5, y: 0, duration: 1.0, ease: "power3.out" });
            gsap.to(".product-item", {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.15,
              ease: "power3.out",
              delay: 0.15
            });
            productsAnimated = true;
          }
        } else if (entry.target.id === 'section-stonks') {
          currentSlide = 4;
          if (bgVideoStonks && bgVideoStonks.paused) bgVideoStonks.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();

          if (!stonksAnimated) {
            gsap.killTweensOf([stonksCard, stonksHeading, stonksSubtext, stonksSocials]);
            
            gsap.to(stonksCard, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(stonksHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(stonksSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(stonksSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            stonksAnimated = true;
          }
        } else if (entry.target.id === 'section-sandhya') {
          currentSlide = 5;
          if (bgVideoSandhya && bgVideoSandhya.paused) bgVideoSandhya.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();

          if (!sandhyaAnimated) {
            gsap.killTweensOf([sandhyaPositioner, sandhyaHeading, sandhyaSubtext, sandhyaSocials]);
            
            gsap.to(sandhyaPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(sandhyaHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(sandhyaSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(sandhyaSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            sandhyaAnimated = true;
          }
        } else if (entry.target.id === 'section-jimbro') {
          currentSlide = 6;
          if (bgVideoJimbro && bgVideoJimbro.paused) bgVideoJimbro.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoAgni && !bgVideoAgni.paused) bgVideoAgni.pause();

          if (!jbroAnimated) {
            gsap.killTweensOf([jimbroPositioner, jimbroHeading, jimbroSubtext, jimbroSocials]);
            
            gsap.to(jimbroPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(jimbroHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(jimbroSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(jimbroSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            jbroAnimated = true;
          }
        } else if (entry.target.id === 'section-agni') {
          currentSlide = 7;
          if (bgVideoAgni && bgVideoAgni.paused) bgVideoAgni.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();
          if (bgVideoDoctrine && !bgVideoDoctrine.paused) bgVideoDoctrine.pause();

          if (!agniAnimated) {
            gsap.killTweensOf([agniPositioner, agniHeading, agniSubtext, agniSocials]);
            
            gsap.to(agniPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(agniHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(agniSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(agniSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            agniAnimated = true;
          }
        } else if (entry.target.id === 'section-doctrine') {
          currentSlide = 8;
          if (bgVideoDoctrine && bgVideoDoctrine.paused) bgVideoDoctrine.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();
          if (bgVideoAgni && !bgVideoAgni.paused) bgVideoAgni.pause();

          if (!doctrineAnimated) {
            gsap.killTweensOf([doctrinePositioner, doctrineHeading, doctrineSubtext, doctrineSocials]);
            
            gsap.to(doctrinePositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(doctrineHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(doctrineSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(doctrineSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            doctrineAnimated = true;
          }
        } else if (entry.target.id === 'section-indratir') {
          currentSlide = 9;
          if (bgVideoIndratir && bgVideoIndratir.paused) bgVideoIndratir.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();
          if (bgVideoAgni && !bgVideoAgni.paused) bgVideoAgni.pause();
          if (bgVideoDoctrine && !bgVideoDoctrine.paused) bgVideoDoctrine.pause();

          if (!indratirAnimated) {
            gsap.killTweensOf([indratirPositioner, indratirHeading, indratirSubtext, indratirSocials]);
            
            gsap.to(indratirPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(indratirHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(indratirSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(indratirSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            indratirAnimated = true;
          }
        } else if (entry.target.id === 'section-wtfcharts') {
          currentSlide = 10;
          if (bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();
          if (bgVideoAgni && !bgVideoAgni.paused) bgVideoAgni.pause();
          if (bgVideoDoctrine && !bgVideoDoctrine.paused) bgVideoDoctrine.pause();
          if (bgVideoIndratir && !bgVideoIndratir.paused) bgVideoIndratir.pause();
          if (bgVideoKylo && !bgVideoKylo.paused) bgVideoKylo.pause();

          if (!wtfchartsAnimated) {
            gsap.killTweensOf([wtfchartsPositioner, wtfchartsHeading, wtfchartsSubtext, wtfchartsSocials]);
            
            gsap.to(wtfchartsPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(wtfchartsHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(wtfchartsSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(wtfchartsSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            wtfchartsAnimated = true;
          }
        } else if (entry.target.id === 'section-kylo') {
          currentSlide = 11;
          if (bgVideoKylo && bgVideoKylo.paused) bgVideoKylo.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();
          if (bgVideoAgni && !bgVideoAgni.paused) bgVideoAgni.pause();
          if (bgVideoDoctrine && !bgVideoDoctrine.paused) bgVideoDoctrine.pause();
          if (bgVideoIndratir && !bgVideoIndratir.paused) bgVideoIndratir.pause();
          if (bgVideoWtfcharts && !bgVideoWtfcharts.paused) bgVideoWtfcharts.pause();

          if (!kyloAnimated) {
            gsap.killTweensOf([kyloPositioner, kyloHeading, kyloSubtext, kyloSocials]);
            
            gsap.to(kyloPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(kyloHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(kyloSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(kyloSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            kyloAnimated = true;
          }
        }
      } else {
        // Reset text values when scrolled completely out of view
        if (entry.target.id === 'section-about') {
          gsap.killTweensOf([aboutHeading, aboutSubtext]);
          gsap.set([aboutHeading, aboutSubtext], { opacity: 0, y: 30 });
          aboutAnimated = false;
        } else if (entry.target.id === 'section-products') {
          gsap.killTweensOf([productsTitle, ".product-item"]);
          gsap.set(productsTitle, { opacity: 0, y: -20 });
          gsap.set(".product-item", { opacity: 0, y: 25 });
          productsAnimated = false;
        } else if (entry.target.id === 'section-stonks') {
          gsap.killTweensOf([stonksCard, stonksHeading, stonksSubtext, stonksSocials]);
          gsap.set(stonksCard, { opacity: 0, y: 30 });
          gsap.set(stonksHeading, { opacity: 0, y: 20 });
          gsap.set(stonksSubtext, { opacity: 0, y: 20 });
          gsap.set(stonksSocials, { opacity: 0, y: 20 });
          stonksAnimated = false;
        } else if (entry.target.id === 'section-sandhya') {
          gsap.killTweensOf([sandhyaPositioner, sandhyaHeading, sandhyaSubtext, sandhyaSocials]);
          gsap.set(sandhyaPositioner, { opacity: 0, y: 30 });
          gsap.set(sandhyaHeading, { opacity: 0, y: 20 });
          gsap.set(sandhyaSubtext, { opacity: 0, y: 20 });
          gsap.set(sandhyaSocials, { opacity: 0, y: 20 });
          sandhyaAnimated = false;
        } else if (entry.target.id === 'section-jimbro') {
          gsap.killTweensOf([jimbroPositioner, jimbroHeading, jimbroSubtext, jimbroSocials]);
          gsap.set(jimbroPositioner, { opacity: 0, y: 30 });
          gsap.set(jimbroHeading, { opacity: 0, y: 20 });
          gsap.set(jimbroSubtext, { opacity: 0, y: 20 });
          gsap.set(jimbroSocials, { opacity: 0, y: 20 });
          jbroAnimated = false;
        } else if (entry.target.id === 'section-agni') {
          gsap.killTweensOf([agniPositioner, agniHeading, agniSubtext, agniSocials]);
          gsap.set(agniPositioner, { opacity: 0, y: 30 });
          gsap.set(agniHeading, { opacity: 0, y: 20 });
          gsap.set(agniSubtext, { opacity: 0, y: 20 });
          gsap.set(agniSocials, { opacity: 0, y: 20 });
          agniAnimated = false;
        } else if (entry.target.id === 'section-doctrine') {
          gsap.killTweensOf([doctrinePositioner, doctrineHeading, doctrineSubtext, doctrineSocials]);
          gsap.set(doctrinePositioner, { opacity: 0, y: 30 });
          gsap.set(doctrineHeading, { opacity: 0, y: 20 });
          gsap.set(doctrineSubtext, { opacity: 0, y: 20 });
          gsap.set(doctrineSocials, { opacity: 0, y: 20 });
          doctrineAnimated = false;
        } else if (entry.target.id === 'section-indratir') {
          gsap.killTweensOf([indratirPositioner, indratirHeading, indratirSubtext, indratirSocials]);
          gsap.set(indratirPositioner, { opacity: 0, y: 30 });
          gsap.set(indratirHeading, { opacity: 0, y: 20 });
          gsap.set(indratirSubtext, { opacity: 0, y: 20 });
          gsap.set(indratirSocials, { opacity: 0, y: 20 });
          indratirAnimated = false;
        } else if (entry.target.id === 'section-wtfcharts') {
          gsap.killTweensOf([wtfchartsPositioner, wtfchartsHeading, wtfchartsSubtext, wtfchartsSocials]);
          gsap.set(wtfchartsPositioner, { opacity: 0, y: 30 });
          gsap.set(wtfchartsHeading, { opacity: 0, y: 20 });
          gsap.set(wtfchartsSubtext, { opacity: 0, y: 20 });
                    gsap.set(wtfchartsSocials, { opacity: 0, y: 20 });
          wtfchartsAnimated = false;
        } else if (entry.target.id === 'section-kylo') {
          gsap.killTweensOf([kyloPositioner, kyloHeading, kyloSubtext, kyloSocials]);
          gsap.set(kyloPositioner, { opacity: 0, y: 30 });
          gsap.set(kyloHeading, { opacity: 0, y: 20 });
          gsap.set(kyloSubtext, { opacity: 0, y: 20 });
          gsap.set(kyloSocials, { opacity: 0, y: 20 });
          kyloAnimated = false;
        }
      }
    });
  }, observerOptions);

  if (heroSection) observer.observe(heroSection);
  if (aboutSection) observer.observe(aboutSection);
  if (productsSection) observer.observe(productsSection);
  if (stonksSection) observer.observe(stonksSection);
  if (sandhyaSection) observer.observe(sandhyaSection);
  if (jimbroSection) observer.observe(jimbroSection);
  if (agniSection) observer.observe(agniSection);
  if (doctrineSection) observer.observe(doctrineSection);
  if (indratirSection) observer.observe(indratirSection);
  if (wtfchartsSection) observer.observe(wtfchartsSection);
  if (kyloSection) observer.observe(kyloSection);

  // Tab visibility backup manager
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isCanvasLoopRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (bgVideoHero) bgVideoHero.pause();
      if (bgVideoAbout) bgVideoAbout.pause();
      if (bgVideoProducts) bgVideoProducts.pause();
      if (bgVideoStonks) bgVideoStonks.pause();
      if (bgVideoSandhya) bgVideoSandhya.pause();
      if (bgVideoJimbro) bgVideoJimbro.pause();
      if (bgVideoAgni) bgVideoAgni.pause();
      if (bgVideoDoctrine) bgVideoDoctrine.pause();
    } else {
      isCanvasLoopRunning = true;
      animate();
      
      if (currentSlide === 1) {
        if (bgVideoHero && bgVideoHero.paused) bgVideoHero.play().catch(() => {});
      } else if (currentSlide === 2) {
        if (bgVideoAbout && bgVideoAbout.paused) bgVideoAbout.play().catch(() => {});
      } else if (currentSlide === 3) {
        if (bgVideoProducts && bgVideoProducts.paused) bgVideoProducts.play().catch(() => {});
      } else if (currentSlide === 4) {
        if (bgVideoStonks && bgVideoStonks.paused) bgVideoStonks.play().catch(() => {});
      } else if (currentSlide === 5) {
        if (bgVideoSandhya && bgVideoSandhya.paused) bgVideoSandhya.play().catch(() => {});
      } else if (currentSlide === 6) {
        if (bgVideoJimbro && bgVideoJimbro.paused) bgVideoJimbro.play().catch(() => {});
      } else if (currentSlide === 7) {
        if (bgVideoAgni && bgVideoAgni.paused) bgVideoAgni.play().catch(() => {});
      } else if (currentSlide === 8) {
        if (bgVideoDoctrine && bgVideoDoctrine.paused) bgVideoDoctrine.play().catch(() => {});
      } else if (currentSlide === 9) {
        if (bgVideoIndratir && bgVideoIndratir.paused) bgVideoIndratir.play().catch(() => {});
      } else if (currentSlide === 10) {
        if (bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});
      } else if (currentSlide === 11) {
        if (bgVideoKylo && bgVideoKylo.paused) bgVideoKylo.play().catch(() => {});
      }
    }
  });

  // Jimbro static offsets locked in style.css, console setup removed

  // Doctrine Layout Console Sliders Setup removed

  // Launch experience
  resizeCanvas();
  animate();

  // Autoplay initialization backup
  if (bgVideoHero) {
    bgVideoHero.play().catch(err => {
      console.log("Autoplay check active");
      bgVideoHero.muted = true;
      bgVideoHero.play().catch(() => {});
    });
  }
  // --- WTF CHARTS DESIGNER CONSOLE LOGIC ---
  const wtfchartsScale = document.getElementById('wtfcharts-scale');
  const wtfchartsX = document.getElementById('wtfcharts-x');
  const wtfchartsY = document.getElementById('wtfcharts-y');
  const wtfchartsCard = document.getElementById('wtfcharts-card');

  if (wtfchartsScale && wtfchartsX && wtfchartsY && wtfchartsCard) {
    function updateWtfchartsLayout() {
      const s = wtfchartsScale.value;
      const x = wtfchartsX.value;
      const y = wtfchartsY.value;
      
      document.getElementById('wtfcharts-scale-val').innerText = s;
      document.getElementById('wtfcharts-x-val').innerText = `${x}px`;
      document.getElementById('wtfcharts-y-val').innerText = `${y}px`;
      document.getElementById('wtfcharts-scale-out').innerText = s;
      document.getElementById('wtfcharts-x-out').innerText = `${x}px`;
      document.getElementById('wtfcharts-y-out').innerText = `${y}px`;

      wtfchartsCard.style.transform = `scale(${s}) translate(${x}px, ${y}px)`;
    }

    wtfchartsScale.addEventListener('input', updateWtfchartsLayout);
    wtfchartsX.addEventListener('input', updateWtfchartsLayout);
    wtfchartsY.addEventListener('input', updateWtfchartsLayout);
  }

});

  const kyloScale = document.getElementById('kylo-scale');
  const kyloX = document.getElementById('kylo-x');
  const kyloY = document.getElementById('kylo-y');
  const kyloCard = document.getElementById('kylo-card');

  if (kyloScale && kyloX && kyloY && kyloCard) {
    function updateKyloLayout() {
      const s = kyloScale.value;
      const x = kyloX.value;
      const y = kyloY.value;
      
      document.getElementById('kylo-scale-val').innerText = s;
      document.getElementById('kylo-x-val').innerText = `${x}px`;
      document.getElementById('kylo-y-val').innerText = `${y}px`;
      document.getElementById('kylo-scale-out').innerText = s;
      document.getElementById('kylo-x-out').innerText = `${x}px`;
      document.getElementById('kylo-y-out').innerText = `${y}px`;
      
      kyloCard.style.transform = `scale(${s}) translate(${x}px, ${y}px)`;
    }
    
    kyloScale.addEventListener('input', updateKyloLayout);
    kyloX.addEventListener('input', updateKyloLayout);
    kyloY.addEventListener('input', updateKyloLayout);
  }

  // IdeaPad Logic
  const navIdeapad = document.getElementById('nav-ideapad');
  const ideapadModal = document.getElementById('ideapad-modal');
  const ideapadHeader = document.getElementById('ideapad-header');
  const ideapadClose = document.getElementById('ideapad-close');
  const ideapadSave = document.getElementById('ideapad-save');
  const ideapadTextarea = document.getElementById('ideapad-textarea');
  const ideapadStatus = document.getElementById('ideapad-status');

  const currentIpScale = 0.60;
  const offsetX = -204;
  const offsetY = 272;

  if (navIdeapad && ideapadModal) {
    // Close IdeaPad
    const closeIdeaPad = () => {
      ideapadModal.classList.remove('active');
    };

    // Toggle IdeaPad
    navIdeapad.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (ideapadModal.classList.contains('active')) {
        closeIdeaPad();
      } else {
        ideapadModal.style.top = 'auto';
        ideapadModal.style.bottom = '40px';
        ideapadModal.style.left = '40px';
        ideapadModal.style.transformOrigin = 'bottom left';
        ideapadModal.style.transform = `scale(${currentIpScale})`;
        
        ideapadModal.classList.add('active');
        ideapadTextarea.focus();
      }
    });

    ideapadClose.addEventListener('click', closeIdeaPad);
    ideapadSave.addEventListener('click', closeIdeaPad);

    // Handle Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ideapadModal.classList.contains('active')) {
        closeIdeaPad();
      }
    });

    // Persist content in memory (sessionStorage)
    const savedIdea = sessionStorage.getItem('vca_ideapad_content');
    if (savedIdea) {
      ideapadTextarea.value = savedIdea;
    }

    ideapadTextarea.addEventListener('input', () => {
      sessionStorage.setItem('vca_ideapad_content', ideapadTextarea.value);
      ideapadStatus.textContent = 'Saving...';
      clearTimeout(ideapadTextarea.saveTimeout);
      ideapadTextarea.saveTimeout = setTimeout(() => {
        ideapadStatus.textContent = 'Stored in memory';
      }, 500);
    });

    // Draggable Logic
    let isDragging = false;
    let dragStartX, dragStartY;
    let initialLeft, initialTop;

    ideapadHeader.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      
      const rect = ideapadModal.getBoundingClientRect();
      
      // We freeze the position via absolute pixel values so dragging is 1:1
      ideapadModal.style.bottom = 'auto'; // Clear bottom positioning
      ideapadModal.style.left = rect.left + 'px';
      ideapadModal.style.top = rect.top + 'px';
      ideapadModal.style.transform = `scale(${currentIpScale})`;
      ideapadModal.style.transformOrigin = 'top left'; // Adjust for direct left/top tracking
      
      initialLeft = rect.left;
      initialTop = rect.top;
      
      // Prevent text selection while dragging
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      ideapadModal.style.left = (initialLeft + dx) + 'px';
      ideapadModal.style.top = (initialTop + dy) + 'px';
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Download functionality
    const ideapadDownload = document.getElementById('ideapad-download');
    if (ideapadDownload) {
      ideapadDownload.addEventListener('click', () => {
        const textToSave = ideapadTextarea.value || 'No ideas yet...';
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VCA_IdeaPad.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }