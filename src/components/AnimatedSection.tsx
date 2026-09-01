"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll-reveal wrapper for BELOW-THE-FOLD content only.
 *
 * Do not wrap above-the-fold hero content in this: it renders with
 * `opacity: 0` in the prerendered HTML and only becomes visible once React has
 * hydrated, which delays the LCP paint on slow devices and networks.
 */
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      // `initial={false}` skips the hidden start state entirely, so the content
      // is simply present rather than fading/sliding into place.
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: "easeOut" }
      }
      className={`animated-section ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
