import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#000000] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-display text-3xl">
  <span className="text-[#f52323]">Maison</span>{" "}
  <span className="text-[#344c26]">Olive</span>
</h3>

            <p className="mt-3 text-sm text-white/60">
              A modern table for the everyday gourmand.
            </p>

            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Facebook].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[#f5a623] hover:text-[#14110f]"
                  aria-label="social"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Dine"
            links={[
              ["Menu", "/menu"],
              ["Reserve", "/reserve"],
              ["Track", "/track"],
            ]}
          />

          <FooterCol
            title="Account"
            links={[
              ["Profile", "/profile"],
              ["Rewards", "/rewards"],
              ["Cart", "/cart"],
            ]}
          />

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Visit
            </h4>

            <p className="mt-4 text-sm leading-7 text-white/70">
              128 Olive Street
              <br />
              Lisbon, Portugal
              <br />
              Open 11am – 11pm
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <span>© 2026 Maison Olive. Crafted with care.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">
        {title}
      </h4>

      <ul className="mt-4 space-y-3 text-sm text-white/75">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link
              to={to}
              className="transition hover:text-[#f5a623]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}