import { footerLinks } from "@/lib/catalog";
import { FooterAccordion } from "./footer-accordion";
import { NewsletterForm } from "./newsletter-form";
import { brandName } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-page gap-y-12 px-page pt-16 md:grid-cols-12 md:gap-x-6 md:pt-20">
        <section className="md:order-last md:col-span-6">
          <h2 className="text-label">Sign Up for Updates</h2>
          <p className="mt-6 text-caption font-medium">
            Be the first to hear about new collections, private events and the stories behind the craft.
          </p>
          <NewsletterForm />
        </section>

        <div className="md:col-span-6 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16">
          {footerLinks.map((group) => (
            <FooterAccordion key={group.title} title={group.title} links={group.links} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-page px-page pt-20 pb-6">
        <p className="text-caption text-paper/70">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>

      {/* Oversized wordmark that always spans the full width. */}
      <svg viewBox="0 0 1000 170" className="block w-full px-page pb-8" aria-hidden="true">
        <text
          x="0"
          y="150"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          className="fill-paper font-display"
          fontSize="190"
        >
          {brandName.toUpperCase()}
        </text>
      </svg>
    </footer>
  );
}
