import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[var(--primary-dark)] text-white">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--primary)]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 lg:px-12">

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">

          {/* =========================
              BRAND
          ========================== */}
          <div
            data-aos="fade-up"
            className="max-w-sm"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
               <div className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
            <img src="/images/olivetNOSA_logo.png" alt="" />
          </div>


 

             


              <div className="leading-none">
               <p className="text-xs font-bold tracking-wide  transition-colors duration-500 max-w-35">
               Olivet National Old Students Association
              </p>

                <p className="mt-1 text-[7px] font-medium uppercase tracking-[0.22em] text-white/50">
                  Baptist High School
                </p>
              </div>
            </Link>

            <p className="mt-7 text-sm leading-7 text-white/55">
              A tradition of excellence, character and service
              since 1945. Connecting generations of Olivetians
              and building a future worthy of our legacy.
            </p>

            {/* Motto */}
            <div className="mt-7 border-l border-[var(--secondary)]/50 pl-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Our Motto
              </p>

              <p className="mt-2 font-serif text-lg italic text-white/80">
                “Cum Christo Progredere”
              </p>

              <p className="mt-1 text-xs text-white/40">
                Forward with Christ
              </p>
            </div>
          </div>


          {/* =========================
              EXPLORE
          ========================== */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>

            <ul className="mt-6 space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about-school"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  About the School
                </Link>
              </li>

              <li>
                <Link
                  to="/about-nosa"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  About NOSA
                </Link>
              </li>

              <li>
                <Link
                  to="/olivetians"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Olivetians
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Gallery
                </Link>
              </li>

            </ul>
          </div>


          {/* =========================
              COMMUNITY
          ========================== */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Community
            </h3>

            <ul className="mt-6 space-y-3">

              <li>
                <Link
                  to="/news"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  News & Events
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Photo Gallery
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/portal/login"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Member Portal
                </Link>
              </li>

              <li>
                <Link
                  to="/Signup"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Join NOSA
                </Link>
              </li>

            </ul>
          </div>


          {/* =========================
              STAY CONNECTED
          ========================== */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Stay Connected
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/55">
              Keep up with Olivet Baptist High School,
              NOSA activities and stories from our community.
            </p>

            {/* CTA */}
            <Link
              to="/Signup"
              className="group mt-6 inline-flex items-center gap-3  bg-[var(--secondary)] px-5 py-3 text-sm font-semibold text-[var(--primary-dark)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Join the Community

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 transition hover:border-[var(--secondary)]/30 hover:bg-[var(--secondary)] hover:text-[var(--primary-dark)]"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 transition hover:border-[var(--secondary)]/30 hover:bg-[var(--secondary)] hover:text-[var(--primary-dark)]"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 transition hover:border-[var(--secondary)]/30 hover:bg-[var(--secondary)] hover:text-[var(--primary-dark)]"
              >
                𝕏
              </a>

            </div>
          </div>

        </div>


        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />


        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">

          <p>
            @ {new Date().getFullYear()} National Old Students Association | Powered by: DXsExpressionsUK
          </p>

          <div className="flex flex-wrap items-center gap-5">

            <Link
              to="/privacy"
              className="transition hover:text-white/70"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white/70"
            >
              Terms
            </Link>

            <span className="text-white/20">
              Olivet Heights · Oyo, Nigeria
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;