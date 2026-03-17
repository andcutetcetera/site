import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MOTIFS = ["&", ">", "…"];
const IDLE_DELAY = 2000;

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [motifIndex, setMotifIndex] = useState(0);
  const [showMotif, setShowMotif] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const idleTimer = useRef(null);
  const motifTimer = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 280, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 280, damping: 24, mass: 0.5 });

  // Slower follower for the motif trail
  const trailX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.8 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
      setShowMotif(false);

      lastPos.current = { x: e.clientX, y: e.clientY };

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setShowMotif(true);
        // Cycle through motifs while idle
        motifTimer.current = setInterval(() => {
          setMotifIndex((i) => (i + 1) % MOTIFS.length);
        }, 800);
      }, IDLE_DELAY);

      clearInterval(motifTimer.current);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Detect hoverable elements
    const onMouseOver = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      clearTimeout(idleTimer.current);
      clearInterval(motifTimer.current);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? (isHovering ? 0.5 : 0.25) : 0,
          scale: isHovering ? 1.6 : 1,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.35 } }}
      >
        <div className="w-8 h-8 rounded-full border border-white" />
      </motion.div>

      {/* Motif character */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "calc(-50% - 28px)" }}
        animate={{
          opacity: showMotif && visible ? 1 : 0,
          scale: showMotif ? 1 : 0.4,
          rotate: showMotif ? 0 : -15,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.span
          key={motifIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-blue-400 font-bold text-lg select-none"
          style={{ textShadow: "0 0 20px rgba(96,165,250,0.6)" }}
        >
          {MOTIFS[motifIndex]}
        </motion.span>
      </motion.div>
    </>
  );
}
