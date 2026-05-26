import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-display text-3xl">Maison Olive</h3>
            <p className="mt-3 text-sm text-primary-foreground/70">
              A modern table for the everyday gourmand.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Facebook].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20"
                  aria-label="social"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Dine" links={[["Menu", "/menu"], ["Reserve", "/reserve"], ["Track", "/track"]]} />
          <FooterCol title="Account" links={[["Profile", "/profile"], ["Rewards", "/rewards"], ["Cart", "/cart"]]} />
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
              Visit
            </h4>
            <p className="mt-4 text-sm text-primary-foreground/80">
              128 Olive Street<br />
              Lisbon, Portugal<br />
              Open 11am – 11pm
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 md:flex-row">
          <span>© 2026 Maison Olive. Crafted with care.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="hover:text-primary-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
