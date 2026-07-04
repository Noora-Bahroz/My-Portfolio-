import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function CinematicPortfolio() {
  const sceneRef = useRef(null);
  const characterRef = useRef(null);
  const portfolioTextRef = useRef(null);
  const containerRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [perspective, setPerspective] = useState({ x: 0, y: 0 });
  const [textY, setTextY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate perspective shift (camera movement effect)
      const perspectiveX = (mouseX - centerX) * 0.05;
      const perspectiveY = (mouseY - centerY) * 0.05;
      
      setPerspective({ x: perspectiveX, y: perspectiveY });
      setMousePos({ x: mouseX, y: mouseY });
      
      // Calculate text movement (upward as user looks at character's face)
      const distFromCenter = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );
      const normalizedDist = Math.min(distFromCenter / 300, 1);
      setTextY(-normalizedDist * 80);

      // Apply GSAP animations for smooth transitions
      if (characterRef.current) {
        gsap.to(characterRef.current, {
          x: (mouseX - centerX) * 0.3,
          y: (mouseY - centerY) * 0.3,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      if (portfolioTextRef.current) {
        gsap.to(portfolioTextRef.current, {
          y: textY,
          opacity: 0.85 + normalizedDist * 0.15,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      setPerspective({ x: 0, y: 0 });
      setTextY(0);
      
      if (characterRef.current) {
        gsap.to(characterRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      if (portfolioTextRef.current) {
        gsap.to(portfolioTextRef.current, {
          y: 0,
          opacity: 0.7,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [textY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
      style={{
        perspective: '1200px',
        background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
      }}
    >
      {/* Ambient lighting effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(138, 43, 226, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Scene container with 3D perspective */}
      <div
        ref={sceneRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${perspective.y * 0.3}deg) rotateY(${perspective.x * 0.3}deg)`,
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
        }}
      >
        {/* Portfolio Typography - Floor Perspective Background */}
        <div
          ref={portfolioTextRef}
          className="absolute pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: `matrix3d(1, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 1, 0, 0, 200, 0, 1) rotateZ(-8deg) translateZ(-200px)`,
            opacity: 0.7,
            fontSize: 'clamp(140px, 20vw, 280px)',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            fontFamily: "'Bebas Neue', 'Monument Extended', sans-serif",
            textShadow: `
              0 0 40px rgba(138, 43, 226, 0.4),
              0 0 80px rgba(0, 255, 255, 0.2),
              0 20px 60px rgba(0, 0, 0, 0.8)
            `,
            lineHeight: '0.9',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          PORTFOLIO
        </div>

        {/* Character Container */}
        <motion.div
          ref={characterRef}
          className="absolute z-20 pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.320, 1] }}
        >
          <motion.img
            src="Jinx 1.png"
            alt="Jinx"
            style={{
              height: '90vh',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 60px rgba(138, 43, 226, 0.5))',
            }}
          />
        </motion.div>

        {/* Name Text - Left Side */}
        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ml-8 md:ml-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            style={{
              fontSize: 'clamp(16px, 2vw, 24px)',
              fontWeight: '300',
              letterSpacing: '0.15em',
              color: '#ffffff',
              fontFamily: "'Poppins', sans-serif",
              textShadow: '0 0 20px rgba(138, 43, 226, 0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            NOORA BAHROZ
          </div>
          <div
            style={{
              fontSize: 'clamp(12px, 1.2vw, 16px)',
              fontWeight: '300',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: "'Poppins', sans-serif",
              marginTop: '8px',
              textTransform: 'uppercase',
            }}
          >
            Frontend Developer
          </div>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="absolute bottom-0 z-10 pb-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Scroll to explore
          </div>
        </motion.div>
      </div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />

      {/* Grid overlay for cyberpunk aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(138, 43, 226, 0.05) 25%, rgba(138, 43, 226, 0.05) 26%, transparent 27%, transparent 74%, rgba(138, 43, 226, 0.05) 75%, rgba(138, 43, 226, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(138, 43, 226, 0.05) 25%, rgba(138, 43, 226, 0.05) 26%, transparent 27%, transparent 74%, rgba(138, 43, 226, 0.05) 75%, rgba(138, 43, 226, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
