"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ChevronIcon } from "./icons";

type FooterAccordionProps = {
  title: string;
  links: { label: string; href: string }[];
};

// Collapsible on mobile, always expanded from md up.
export function FooterAccordion({ title, links }: FooterAccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-line-inverse/30 md:border-none">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center justify-between py-5 text-label md:pointer-events-none md:cursor-default md:py-0"
        >
          {title}
          <ChevronIcon
            className={`size-4 transition-transform md:hidden ${open ? "-rotate-90" : "rotate-90"}`}
          />
        </button>
      </h3>
      <ul id={panelId} className={`flex-col gap-5 pb-6 md:mt-8 md:flex md:pb-0 ${open ? "flex" : "hidden"}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-caption font-medium underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
