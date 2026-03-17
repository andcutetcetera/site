import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", path: "/About" },
  { label: "Portfolio", path: "/Portfolio" },
  { label: "Marketplace", path: "/Marketplace" },
  { label: "Foundation", path: "/Foundation" },
  { label: "Partnerships", path: "/Partnerships" },
  { label: "Contact", path: "/Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Find all dark sections on the page and check if navbar overlaps them
      const darkSections = document.querySelectorAll("[data-theme='dark']");
      let isOverDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Navbar is ~60px tall; if section top is above 60px and bottom is below 0
        if (rect.top <= 60 && rect.bottom >= 0) {
          isOverDark = true;
        }
      });
      setOnDark(isOverDark);
    };

    // Run on mount to set initial state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  // Reset on route change
  useEffect(() => {
    setOpen(false);
    setOnDark(true);
    setScrolled(false);
  }, [location]);

  const logoColor = onDark && !scrolled ? "text-white" : "text-foreground";
  const linkColor = onDark && !scrolled ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const activeLinkColor = onDark && !scrolled ? "text-white font-medium" : "text-foreground font-medium";
  const menuBtnColor = onDark && !scrolled ? "text-white" : "text-foreground";
  const accentColor = onDark && !scrolled ? "text-blue-400" : "text-accent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/Home" className="flex items-center gap-1 group">
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}>
            And Cut
          </span>
          <span className={`font-display italic text-xl transition-colors duration-300 ${accentColor}`}>
            Etcetera
          </span>
          <span className={`text-2xl font-light ml-0.5 group-hover:translate-x-1 transition-all duration-300 ${accentColor}`}>
            …
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-wide transition-colors duration-300 ${
                location.pathname === link.path ? activeLinkColor : linkColor
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 transition-colors duration-300 ${menuBtnColor}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg tracking-wide transition-colors ${
                    location.pathname === link.path
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
