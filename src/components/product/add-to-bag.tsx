"use client";

import { useState } from "react";

// Placeholder until the cart exists: the button explains that instead of pretending to add.
export function AddToBag({ soldOut }: { soldOut: boolean }) {
  const [notice, setNotice] = useState(false);

  if (soldOut) {
    return (
      <button
        type="button"
        disabled
        className="h-12 w-full cursor-not-allowed border border-line text-label text-muted"
      >
        Sold Out
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setNotice(true)}
        className="h-12 w-full cursor-pointer bg-ink text-label text-paper transition-opacity hover:opacity-80"
      >
        Add to Shopping Bag
      </button>
      <p role="status" className="mt-3 text-caption text-muted">
        {notice && "The shopping bag isn't available yet."}
      </p>
    </div>
  );
}
