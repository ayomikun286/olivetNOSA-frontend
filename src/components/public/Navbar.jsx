import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect page scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="mx-auto max-w-7xl">
      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <div
        className={`flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border border-slate-200 bg-white/95 shadow-lg"
            : "border border-white/15 bg-white/10"
        }`}
      >
        {/* =========================
            LOGO
        ========================== */}
        <Link to="/" className="flex items-center gap-3">
          {/* Logo Mark */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
            <img src="/images/olivetNOSA_logo.png" alt="" />
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <p
              className={`text-lg font-bold tracking-wide transition-colors duration-500 ${
                scrolled
                  ? "text-[var(--primary-dark)]"
                  : "text-white"
              }`}
            >
              OLIVET
            </p>

            <p
              className={`mt-1 text-[9px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                scrolled
                  ? "text-slate-500"
                  : "text-white/60"
              }`}
            >
              Baptist High School
            </p>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Home */}
          <Link
            to="/"
            className={`text-sm font-medium transition-colors duration-500 ${
              scrolled
                ? "text-[var(--primary)]"
                : "text-white"
            }`}
          >
            Home
          </Link>

          {/* About */}
          <Link
            to="/about-school"
            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-500 ${
              scrolled
                ? "text-slate-600 hover:text-[var(--primary)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            About
            <ChevronDown size={14} />
          </Link>

          {/* NOSA */}
          <Link
            to="/about-nosa"
            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-500 ${
              scrolled
                ? "text-slate-600 hover:text-[var(--primary)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            NOSA
            <ChevronDown size={14} />
          </Link>

          {/* Olivetians */}
          <Link
            to="/olivetians"
            className={`text-sm font-medium transition-colors duration-500 ${
              scrolled
                ? "text-slate-600 hover:text-[var(--primary)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Olivetians
          </Link>

          {/* News & Events */}
          <Link
            to="/news"
            className={`text-sm font-medium transition-colors duration-500 ${
              scrolled
                ? "text-slate-600 hover:text-[var(--primary)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            News & Events
          </Link>

          {/* Gallery */}
          <Link
            to="/gallery"
            className={`text-sm font-medium transition-colors duration-500 ${
              scrolled
                ? "text-slate-600 hover:text-[var(--primary)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Gallery
          </Link>
        </div>

        {/* =========================
            RIGHT ACTIONS
        ========================== */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Member Login */}
          <Link
            to="/portal/login"
            className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
              scrolled
                ? "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            Member Login
          </Link>

          {/* Join NOSA */}
          <Link
            to="/contact"
            className="rounded-xl bg-[var(--secondary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-dark)] shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
          >
            Join NOSA
          </Link>
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 lg:hidden ${
            scrolled
              ? "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
              : "border-white/15 text-white hover:bg-white/10"
          }`}
        >
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}
      {mobileMenu && (
        <div
          className={`mt-3 rounded-2xl p-5 backdrop-blur-xl transition-all duration-500 lg:hidden ${
            scrolled
              ? "border border-slate-200 bg-white/95 shadow-lg"
              : "border border-white/10 bg-[var(--primary-dark)]/95"
          }`}
        >
          <div className="flex flex-col gap-1">
            {/* Mobile Links */}
            {[
              ["Home", "/"],
              ["About", "/about-school"],
              ["NOSA", "/about-nosa"],
              ["Olivetians", "/olivetians"],
              ["News & Events", "/news"],
              ["Gallery", "/gallery"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                onClick={() => setMobileMenu(false)}
                className={`rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div
              className={`my-3 h-px ${
                scrolled ? "bg-slate-200" : "bg-white/10"
              }`}
            />

            {/* Member Login */}
            <Link
              to="/portal/login"
              onClick={() => setMobileMenu(false)}
              className={`rounded-xl border px-4 py-3 text-center text-sm transition-all duration-300 ${
                scrolled
                  ? "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
                  : "border-white/15 text-white hover:bg-white/10"
              }`}
            >
              Member Login
            </Link>

            {/* Join NOSA */}
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className="mt-2 rounded-xl bg-[var(--secondary)] px-4 py-3 text-center text-sm font-semibold text-[var(--primary-dark)] transition hover:shadow-lg"
            >
              Join NOSA
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;