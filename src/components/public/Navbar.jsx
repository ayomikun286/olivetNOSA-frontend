import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileNosa, setMobileNosa] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect page scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Desktop nav link styling
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-500 ${
      scrolled
        ? isActive
          ? "text-[var(--secondary)]"
          : "text-[var(--primary)]"
        : isActive
          ? "text-[var(--secondary)]"
          : "text-white"
    }`;

  // Dropdown parent styling
  const dropdownNavLinkClass = ({ isActive }) =>
    `flex items-center gap-1 text-sm font-medium transition-colors duration-500 ${
      scrolled
        ? isActive
          ? "text-[var(--secondary)]"
          : "text-[var(--primary)]"
        : isActive
          ? "text-[var(--secondary)]"
          : "text-white"
    }`;

  // Dropdown item styling
  const dropdownItemClass =
    "block rounded-lg px-4 py-3 text-sm text-slate-600 transition-all duration-200 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]";

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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
            <img
              src="/images/olivetNOSA_logo.png"
              alt="Olivet NOSA"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="leading-none">
            <p
              className={`text-lg font-bold tracking-wide transition-colors duration-500 ${
                scrolled ? "text-[var(--primary-dark)]" : "text-white"
              }`}
            >
              OLIVET
            </p>

            <p
              className={`mt-1 text-[9px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                scrolled ? "text-slate-500" : "text-white/60"
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
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          {/* =========================
              ABOUT DROPDOWN
          ========================== */}
          <div className="group relative">
            <NavLink
              to="/about-school"
              className={dropdownNavLinkClass}
            >
              About

              <ChevronDown
                size={14}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </NavLink>

            <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">

                {/* About Olivet */}
                <Link
                  to="/about-school"
                  className={dropdownItemClass}
                >
                  <span className="block font-semibold text-[var(--primary)]">
                    About Olivet
                  </span>

                  <span className="mt-1 block text-xs text-slate-400">
                    Discover the school
                  </span>
                </Link>

                {/* History */}
                <Link
                  to="/about-school#history"
                  className={dropdownItemClass}
                >
                  <span className="block font-semibold text-[var(--primary)]">
                    History & Heritage
                  </span>

                  <span className="mt-1 block text-xs text-slate-400">
                    Our story since 1945
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* =========================
              NOSA DROPDOWN
          ========================== */}
          <div className="group relative">
            <NavLink
              to="/about-nosa"
              className={dropdownNavLinkClass}
            >
              NOSA

              <ChevronDown
                size={14}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </NavLink>

            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">

                {/* About NOSA */}
                <Link
                  to="/about-nosa"
                  className={dropdownItemClass}
                >
                  <span className="block font-semibold text-[var(--primary)]">
                    About NOSA
                  </span>

                  <span className="mt-1 block text-xs text-slate-400">
                    Who we are & what we do
                  </span>
                </Link>

                {/* Leadership */}
                <Link
                  to="/nosa-leadership"
                  className={dropdownItemClass}
                >
                  <span className="block font-semibold text-[var(--primary)]">
                    NOSA Leadership
                  </span>

                  <span className="mt-1 block text-xs text-slate-400">
                    Leadership & service
                  </span>
                </Link>

                {/* Chapters */}
                <Link
                  to="/nosa-chapters"
                  className={dropdownItemClass}
                >
                  <span className="block font-semibold text-[var(--primary)]">
                    Chapters
                  </span>

                  <span className="mt-1 block text-xs text-slate-400">
                    Connect with Olivetians
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Olivetians */}
          <NavLink to="/olivetians" className={navLinkClass}>
            Olivetians
          </NavLink>

          {/* News & Events */}
          <NavLink to="/news" className={navLinkClass}>
            News & Events
          </NavLink>

          {/* Gallery */}
          <NavLink to="/gallery" className={navLinkClass}>
            Gallery
          </NavLink>

          {/* Contact */}
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
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

            {/* Home */}
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? isActive
                      ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : isActive
                      ? "bg-white/10 font-semibold text-[var(--secondary)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            {/* =========================
                MOBILE ABOUT
            ========================== */}
            <div>
              <button
                type="button"
                onClick={() => setMobileAbout(!mobileAbout)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>About</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    mobileAbout ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileAbout && (
                <div className="ml-3 mt-1 border-l border-slate-200 pl-3">

                  <Link
                    to="/about-school"
                    onClick={() => setMobileMenu(false)}
                    className={`block rounded-lg px-4 py-3 text-sm ${
                      scrolled
                        ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    About Olivet
                  </Link>

                  <Link
                    to="/about-school#history"
                    onClick={() => setMobileMenu(false)}
                    className={`block rounded-lg px-4 py-3 text-sm ${
                      scrolled
                        ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    History & Heritage
                  </Link>

                </div>
              )}
            </div>

            {/* =========================
                MOBILE NOSA
            ========================== */}
            <div>
              <button
                type="button"
                onClick={() => setMobileNosa(!mobileNosa)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>NOSA</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    mobileNosa ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileNosa && (
                <div className="ml-3 mt-1 border-l border-slate-200 pl-3">

                  {/* About NOSA */}
                  <Link
                    to="/about-nosa"
                    onClick={() => setMobileMenu(false)}
                    className={`block rounded-lg px-4 py-3 text-sm ${
                      scrolled
                        ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    About NOSA
                  </Link>

                  {/* Leadership */}
                  <Link
                    to="/nosa-leadership"
                    onClick={() => setMobileMenu(false)}
                    className={`block rounded-lg px-4 py-3 text-sm ${
                      scrolled
                        ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    NOSA Leadership
                  </Link>

                  {/* Chapters */}
                  <Link
                    to="/nosa-chapters"
                    onClick={() => setMobileMenu(false)}
                    className={`block rounded-lg px-4 py-3 text-sm ${
                      scrolled
                        ? "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Chapters
                  </Link>

                </div>
              )}
            </div>

            {/* Olivetians */}
            <NavLink
              to="/olivetians"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? isActive
                      ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : isActive
                      ? "bg-white/10 font-semibold text-[var(--secondary)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              Olivetians
            </NavLink>

            {/* News & Events */}
            <NavLink
              to="/news"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? isActive
                      ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : isActive
                      ? "bg-white/10 font-semibold text-[var(--secondary)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              News & Events
            </NavLink>

            {/* Gallery */}
            <NavLink
              to="/gallery"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? isActive
                      ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : isActive
                      ? "bg-white/10 font-semibold text-[var(--secondary)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              Gallery
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                  scrolled
                    ? isActive
                      ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    : isActive
                      ? "bg-white/10 font-semibold text-[var(--secondary)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              Contact
            </NavLink>

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