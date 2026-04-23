"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only activate on devices with a fine pointer (not touch)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    el.style.display = "block";
    document.body.classList.add("custom-cursor-active");

    const pos = { x: -200, y: -200 };
    const target = { x: -200, y: -200 };
    let rafId: number;
    let lastEl: Element | null = null;

    const setScale = (big: boolean) => {
      el.style.width = big ? "40px" : "16px";
      el.style.height = big ? "40px" : "16px";
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";

      const hovered = e.target as Element | null;
      if (hovered !== lastEl) {
        lastEl = hovered;
        setScale(!!hovered?.closest("a, button, [role='button'], label, [data-cursor-hover]"));
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.1;
      pos.y += (target.y - pos.y) * 0.1;
      el.style.transform = `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "16px",
        height: "16px",
        borderRadius: "9999px",
        backgroundColor: "rgba(250, 200, 163, 0.8)",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform, width, height",
        transition:
          "width 220ms cubic-bezier(0.16,1,0.3,1), height 220ms cubic-bezier(0.16,1,0.3,1), opacity 180ms ease",
      }}
    />
  );
}
