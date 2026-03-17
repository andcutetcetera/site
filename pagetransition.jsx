import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const variants = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(3px)",
    transition: {
      duration: 0.35,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

// Thin progress bar that sweeps across the top on entry
const barVariants = {
  initial: { scaleX: 0, originX: 0 },
  enter: {
    scaleX: [0, 0.6, 1],
    transition: { duration: 0.55, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    scaleX: 0,
    originX: 1,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {/* Progress bar */}
        <motion.div
          variants={barVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[9999] origin-left"
          style={{ scaleX: 0 }}
        />

        {/* Page content */}
        <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
