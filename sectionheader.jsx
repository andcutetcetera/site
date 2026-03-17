import React from "react";
import RevealSection from "./RevealSection";

export default function SectionHeader({ label, title, description }) {
  return (
    <RevealSection className="mb-12 md:mb-16">
      {label && (
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </RevealSection>
  );
}
