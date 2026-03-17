import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Studio",
    links: [
      { label: "About", path: "/About" },
      { label: "Portfolio", path: "/Portfolio" },
      { label: "Marketplace", path: "/Marketplace" },
    ],
  },
  {
    title: "Impact",
    links: [
      { label: "Foundation", path: "/Foundation" },
      { label: "Partnerships", path: "/Partnerships" },
      { label: "Contact", path: "/Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-bold tracking-tight">And Cut</span>
              <span className="font-display italic text-xl text-blue-400">Etcetera</span>
              <span className="text-blue-400 text-2xl font-light ml-0.5">…</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Ideas into IP. IP into impact. We build intellectual property that generates both cultural and social value.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-4">
                {group.title}
              </h4>
              <div className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} And Cut Etcetera. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-background/30 text-sm">
            <span>&amp;</span>
            <span className="mx-1">&gt;</span>
            <span>…</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
