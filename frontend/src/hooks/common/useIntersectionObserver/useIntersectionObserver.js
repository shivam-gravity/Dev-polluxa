"use client";
import { useRef } from "react";

// TODO: Make it generic to work with any element later
const useIntersectionObserver = ({ onIntersect }) => {
  const observer = useRef(
    typeof window !== "undefined"
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const id = entry.target.getAttribute("data-section-id");
                onIntersect(id);
              }
            });
          },
          {
            rootMargin: "-10% 0px -80% 0px",
            threshold: 0.1,
          }
        )
      : null
  );

  const observe = (element, id) => {
    if (!element || !observer.current) return;
    element.setAttribute("data-section-id", id);
    observer.current.observe(element);
  };

  const unobserve = (element) => {
    if (!element || !observer.current) return;
    observer.current.unobserve(element);
  };

  return { observe, unobserve };
};

export default useIntersectionObserver;
