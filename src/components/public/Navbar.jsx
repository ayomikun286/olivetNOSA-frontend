import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  User,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {

    const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileNosa, setMobileNosa] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  // =========================================
  // SCROLL DETECTION
  // =========================================
    // =========================================
  // HASH SCROLLING
  // =========================================
  useEffect(() => {
    if (!location.hash) return;

    const hash = location.hash.replace("#", "");

    const scrollToSection = () => {
      const element = document.getElementById(hash);

      if (!element) return;

      const navbarOffset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: "smooth",
      });
    };

    // Give React Router time to render the destination page
    const timer = setTimeout(scrollToSection, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;


      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideTopBar(true);
      }
      if (currentScrollY < lastScrollY) {
        setHideTopBar(false);
      }
      if (currentScrollY <= 10) {
        setHideTopBar(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================
  // DESKTOP NAV LINK STYLING
  // =========================================
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-500 ${isActive
      ? "text-[var(--secondary)]"
      : "text-[var(--primary)]"
    }`;

  // =========================================
  // DROPDOWN PARENT STYLING
  // =========================================
  const dropdownNavLinkClass = ({ isActive }) =>
    `flex items-center gap-1 text-sm font-medium transition-colors duration-500 ${isActive
      ? "text-[var(--secondary)]"
      : "text-[var(--primary)]"
    }`;

  // =========================================
  // DROPDOWN ITEM STYLING
  // =========================================
  const dropdownItemClass =
    "block rounded-lg px-4 py-3 text-sm text-slate-600 transition-all duration-200 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
      ? "border-red-200"
      : "border-red-200  "
      }`}>

      {/* =====================================================
          TOP INFORMATION BAR
          Hides when scrolling down
      ====================================================== */}


      <div
        className={`hidden md:flex bg-white transition-all duration-500 ease-in-out ${hideTopBar
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
          }`}
      >

        {/* Social Links */}
        <div className="flex h-full w-80 items-center justify-center gap-3 bg-[var(--primary)]/70 p-1">

          <a
            href="#"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]"
          >
            f
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]"
          >
            ◎
          </a>

          <a
            href="#"
            aria-label="X"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]"
          >
            𝕏
          </a>

        </div>

        {/* Contact Information */}
        <div className="flex h-full items-center gap-3 p-1 pl-10">

          <div className="flex items-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50">
            <Mail size={15} strokeWidth={1.8} />
            <p>Hello@olivetnosa.org</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50">
            <Phone size={15} strokeWidth={1.8} />
            <p>+1 (123) 456-7890</p>
          </div>

        </div>

        {/* Quick Links */}
        <div className="ml-20 flex h-full items-center justify-center gap-3 p-1 pl-15">

          <Link
            to="/portal/login"
            className="flex h-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            Portal
          </Link>

          <Link
            to="/about-nosa"
            className="flex h-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            Alumni
          </Link>

          <Link
            to="/news"
            className="flex h-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            Events
          </Link>

          <span className="block h-5 w-[0.10rem] bg-[var(--primary)]/50" />

          <Link
            to="/portal/login"
            className="flex h-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            <User size={15} strokeWidth={1.8} />
            Login
          </Link>

        </div>
      </div>


      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <div
        className={`transition-all duration-500 ease-in-out ${hideTopBar ? "md:-translate-y-[53px]" : "translate-y-0"
          }`}
      >
        <div
          className={`flex items-center justify-between gap-20 border px-6 py-5   transition-all duration-500 md:justify-center md:px-15 ${scrolled
            ? "border-slate-200 bg-white"
            : "border-slate-200 bg-white shadow"
            }`}
        >

          {/* =================================================
              LOGO
          ================================================= */}
          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
              <img
                src="/images/olivetNOSA_logo.png"
                alt="Olivet NOSA"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="leading-none">

              <p className="text-lg font-bold tracking-wide text-[var(--primary-dark)] transition-colors duration-500">
                OLIVET
              </p>

              <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-slate-500 transition-colors duration-500">
                Baptist High School
              </p>

            </div>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <div className="hidden items-center gap-8 lg:flex">

            {/* Home */}
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Home
            </NavLink>


            {/* ===============================================
                ABOUT DROPDOWN
            ================================================ */}
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


            {/* ===============================================
                NOSA DROPDOWN
            ================================================ */}
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
            <NavLink
              to="/olivetians"
              className={navLinkClass}
            >
              Olivetians
            </NavLink>

             {/* Programs */}
            <NavLink
              to="/programs"
              className={navLinkClass}
            >
              Programs
            </NavLink>


            {/* News & Events */}
            <NavLink
              to="/news"
              className={navLinkClass}
            >
              News & Events
            </NavLink>


            {/* Gallery */}
            <NavLink
              to="/gallery"
              className={navLinkClass}
            >
              Gallery
            </NavLink>

            



            {/* Contact */}
            <NavLink
              to="/contact"
              className={navLinkClass}
            >
              Contact
            </NavLink>

          </div>


          {/* =================================================
              RIGHT ACTION
          ================================================= */}
          <Link
            to="/portal/signup"
            className="hidden md:flex group items-center gap-2 border border-[var(--primary)]  px-5 py-2.5 text-sm font-semibold text-[var(--primary-dark)] transition-all duration-300 hover:shadow-md "
          >
            Join NOSA
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 lg:hidden ${scrolled
              ? "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
              : "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
              }`}
          >
            {mobileMenu ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>


        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}
        {mobileMenu && (
          <div
            className={`mt-3 rounded-2xl border p-5 backdrop-blur-xl shadow-lg transition-all duration-500 lg:hidden ${scrolled
              ? "border-slate-200 bg-white/95"
              : "border-slate-200 bg-white/95"
              }`}
          >

            <div className="flex flex-col gap-1">

              {/* Home */}
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${isActive
                    ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                  }`
                }
              >
                Home
              </NavLink>


              {/* =================================================
                  MOBILE ABOUT
              ================================================= */}
              <div>

                <button
                  type="button"
                  onClick={() => setMobileAbout(!mobileAbout)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition-all duration-300 hover:bg-slate-50 hover:text-[var(--primary)]"
                >
                  <span>About</span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${mobileAbout ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {mobileAbout && (
                  <div className="ml-3 mt-1 border-l border-slate-200 pl-3">

                    <Link
                      to="/about-school"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      About Olivet
                    </Link>

                    <Link
                      to="/about-school#history"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      History & Heritage
                    </Link>

                  </div>
                )}

              </div>


              {/* =================================================
                  MOBILE NOSA
              ================================================= */}
              <div>

                <button
                  type="button"
                  onClick={() => setMobileNosa(!mobileNosa)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-600 transition-all duration-300 hover:bg-slate-50 hover:text-[var(--primary)]"
                >
                  <span>NOSA</span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${mobileNosa ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {mobileNosa && (
                  <div className="ml-3 mt-1 border-l border-slate-200 pl-3">

                    <Link
                      to="/about-nosa"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      About NOSA
                    </Link>

                    <Link
                      to="/nosa-leadership"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      NOSA Leadership
                    </Link>

                    <Link
                      to="/nosa-chapters"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
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
                  `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${isActive
                    ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                  }`
                }
              >
                Olivetians
              </NavLink>

                      {/* News & Events */}
              <NavLink
                to="/programs"
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${isActive
                    ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                  }`
                }
              >
                Programs
              </NavLink>


              {/* News & Events */}
              <NavLink
                to="/news"
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${isActive
                    ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
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
                  `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${isActive
                    ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
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
                  `rounded-xl px-4 py-3 text-sm transition-all duration-300 ${isActive
                    ? "bg-[var(--primary-light)] font-semibold text-[var(--secondary)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                  }`
                }
              >
                Contact
              </NavLink>


              {/* Divider */}
              <div className="my-3 h-px bg-slate-200" />


              {/* Member Login */}
              <Link
                to="/portal/login"
                onClick={() => setMobileMenu(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm text-[var(--primary)] transition-all duration-300 hover:bg-slate-50"
              >
                Member Login
              </Link>


              {/* Join NOSA */}
              <Link
                to="/portal/signup"
                onClick={() => setMobileMenu(false)}
                className="mt-2 rounded-xl bg-[var(--secondary)] px-4 py-3 text-center text-sm font-semibold text-[var(--primary-dark)] transition hover:shadow-lg"
              >
                Join NOSA
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;