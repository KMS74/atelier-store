"use client";

import Link from "next/link";
import type { Ref } from "react";
import { menu } from "@/lib/catalog";
import { CloseIcon } from "./icons";

export function MenuDrawer({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const close = (dialog: HTMLDialogElement | null) => dialog?.close();

  return (
    <dialog
      ref={ref}
      aria-label="Menu"
      // Clicks on the backdrop land on the dialog element itself.
      onClick={(e) => e.target === e.currentTarget && close(e.currentTarget)}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-none translate-x-full bg-paper text-ink transition-transform duration-300 ease-out backdrop:bg-scrim backdrop:backdrop-blur-sm open:translate-x-0 md:w-drawer starting:open:translate-x-full"
    >
      <div className="flex min-h-full flex-col px-page pt-20 pb-10 md:px-20">
        <button
          type="button"
          onClick={(e) => close(e.currentTarget.closest("dialog"))}
          aria-label="Close menu"
          className="absolute top-4 right-4 flex size-12 cursor-pointer items-center justify-center rounded-full bg-ink text-paper"
        >
          <CloseIcon className="size-5" />
        </button>

        <nav
          aria-label="Main"
          // Client-side navigation keeps the dialog mounted, so close it on any link click.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) close(e.currentTarget.closest("dialog"));
          }}
          className="flex flex-1 flex-col"
        >
          <ul className="flex flex-col gap-5">
            {menu.primary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-nav font-medium hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-12 flex flex-col gap-6">
            {menu.secondary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-body hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-col gap-6 pt-12">
            {menu.account.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-caption font-medium underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </dialog>
  );
}
