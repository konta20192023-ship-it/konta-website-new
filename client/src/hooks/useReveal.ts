import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    // Observe all reveal elements within the ref
    const revealEls = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealEls.forEach((el) => observer.observe(el));

    // Also observe the element itself if it has reveal class
    if (el.classList.contains("reveal") || el.classList.contains("reveal-left") || el.classList.contains("reveal-right")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
