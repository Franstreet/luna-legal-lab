"use client";

import { useEffect, useRef, useState } from "react";

type MobileNavMenuItem = {
  href: string;
  label: string;
};

type MobileNavMenuProps = {
  items: MobileNavMenuItem[];
};

export function MobileNavMenu({ items }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-site-navigation"
        aria-label="Open section menu"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm hover:border-secondary hover:text-secondary"
      >
        <span className="sr-only">Open section menu</span>
        <span className="flex flex-col gap-1.5">
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
        </span>
      </button>

      {isOpen ? (
        <div
          id="mobile-site-navigation"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(18rem,calc(100vw-3rem))] rounded-[1.5rem] border border-white/12 bg-primary/95 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
        >
          <div className="space-y-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-[1rem] px-4 py-3 text-sm font-medium text-white/82 hover:bg-white/6 hover:text-secondary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
