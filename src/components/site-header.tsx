"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AccountIcon, BagIcon, MenuIcon, PlusIcon, SearchIcon } from "./icons";
import { MenuDrawer } from "./menu-drawer";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);

  // On the homepage the header sits transparent over the hero until the hero scrolls away.
  const hasHero = pathname === "/";
  useEffect(() => {
    if (!hasHero) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  const overlay = hasHero && !pastHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-header transition-colors duration-300 ${
          overlay ? "bg-transparent text-paper" : "border-b border-line bg-paper text-ink"
        }`}
      >
        <div className="relative mx-auto flex h-full max-w-page items-center justify-between px-page">
          <Link href="/contact" className="hidden items-center gap-1.5 text-label md:flex">
            <PlusIcon className="size-4" />
            Contact Us
          </Link>

          <Link
            href="/"
            aria-label="Atelier home"
            className="md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Utility" className="flex items-center gap-5 md:gap-6">
            <Link href="/search" aria-label="Search" className="hidden md:block">
              <SearchIcon />
            </Link>
            <Link href="/account" aria-label="Account" className="hidden md:block">
              <AccountIcon />
            </Link>
            <Link href="/cart" aria-label="Shopping bag">
              <BagIcon />
            </Link>
            <button
              type="button"
              onClick={() => drawerRef.current?.showModal()}
              className="flex cursor-pointer items-center gap-2 text-label"
              aria-haspopup="dialog"
            >
              <MenuIcon />
              <span className="sr-only md:not-sr-only">Menu</span>
            </button>
          </nav>
        </div>
      </header>
      <MenuDrawer ref={drawerRef} />
    </>
  );
}
