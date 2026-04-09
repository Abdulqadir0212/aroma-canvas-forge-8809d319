import { useEffect, useRef } from "react";

export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    // Observe existing items
    const observeAll = () => {
      const children = el.querySelectorAll(".reveal-item:not(.revealed)");
      children.forEach((child) => observer.observe(child));
    };

    observeAll();

    // Watch for DOM changes (e.g. filter updates adding new items)
    const mutation = new MutationObserver(() => observeAll());
    mutation.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return ref;
};
