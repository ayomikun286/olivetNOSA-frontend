
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  User,
  ArrowRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import usePublicGeneralSettings from "../../hooks/usePublicGeneralSettings";

const Navbar = () => {
  const { isAuthenticated, loading } = useAuth();


  const location = useLocation();
  const settings = usePublicGeneralSettings();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileNosa, setMobileNosa] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  // Public settings with fallbacks
  const logoUrl =
    settings?.logoUrl || "/images/Logo-NOSA.png";

  const associationName =
    settings?.associationName ||
    "Olivet NOSA Worldwide Website";

  const contactEmail =
    settings?.contactEmail ||
    "customerservice@olivetbhsnosa.org";

  const phone =
    settings?.phone || "+1 (123) 456-7890";

  const socialLinks = {
    facebook: settings?.socialLinks?.facebook || "#",
    instagram:
      settings?.socialLinks?.instagram ||
      "https://www.instagram.com/olivetheights/",
    youtube:
      settings?.socialLinks?.youtube ||
      "https://www.youtube.com/@olivetheightstv",
  };

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

    const timer = setTimeout(scrollToSection, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  // =========================================
  // SCROLL DETECTION
  // =========================================
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
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-slate-200" : "border-slate-200"
        }`}
    >
      {/* =====================================================
          TOP INFORMATION BAR
      ====================================================== */}
      <div
        className={`hidden lg:flex  md:hidden bg-white transition-all duration-500 ease-in-out ${hideTopBar
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
          }`}
      >
        {/* Social Links */}
        <div className="flex flex-wrap min-h-full w-80 items-center justify-center gap-3 bg-[var(--primary)]/92 p-1">
          <a
            href={socialLinks.facebook}
            target={socialLinks.facebook !== "#" ? "_blank" : undefined}
            rel={socialLinks.facebook !== "#" ? "noreferrer" : undefined}
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]"
          >
            <FaFacebookF size={20} />
          </a>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]"
          >
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Contact Information */}
        <div className="flex h-full items-center gap-3 p-1 pl-10">
          <a
            href={`mailto:${contactEmail}`}
            className="flex items-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            <Mail size={15} strokeWidth={1.8} />
            <p>{contactEmail}</p>
          </a>

          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            <Phone size={15} strokeWidth={1.8} />
            <p>{phone}</p>
          </a>
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
            to="/about-NOSA"
            className="flex h-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-medium text-[var(--primary)]/50 transition hover:text-[var(--secondary)]"
          >
            NOSA
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
          className={`flex items-center justify-between md:gap-20 border px-3 py-4 md:px-6 md:py-5 transition-all duration-500 lg:justify-center md:justify-between ${scrolled
              ? "border-slate-200 bg-white"
              : "border-slate-200 bg-white shadow"
            }`}
        >
          {/* LOGO AND ASSOCIATION NAME */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
              <img
                src={logoUrl}
                alt={associationName}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="leading-none">
              <p className="max-w-35 text-sm font-bold tracking-wide text-[var(--primary-dark)] transition-colors duration-500">
                {associationName}
              </p>
            </div>
          </Link>






          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            {/* ABOUT DROPDOWN */}
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
                  <Link to="/about-school" className={dropdownItemClass}>
                    <span className="block font-semibold text-[var(--primary)]">
                      About Olivet
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Discover the school
                    </span>
                  </Link>

                  <Link
                    to="/history"
                    className={dropdownItemClass}
                  >
                    <span className="block font-semibold text-[var(--primary)]">
                      History &amp; Heritage
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Our story since 1945
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* NOSA DROPDOWN */}
            <div className="group relative">
              <NavLink
                to="/about-NOSA"
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
                  <Link to="/about-NOSA" className={dropdownItemClass}>
                    <span className="block font-semibold text-[var(--primary)]">
                      About NOSA
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Who we are &amp; what we do
                    </span>
                  </Link>

                  <Link to="/NOSA-leadership" className={dropdownItemClass}>
                    <span className="block font-semibold text-[var(--primary)]">
                      NOSA Leadership
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Our past Leaders
                    </span>
                  </Link>

                  <Link to="/legacy-leadership" className={dropdownItemClass}>
                    <span className="block font-semibold text-[var(--primary)]">
                      Legacy Leaders
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Leadership &amp; service
                    </span>
                  </Link>

                  <Link
                    to="/in-loving-memory"
                    className={dropdownItemClass}
                  >
                    <span className="block font-semibold text-[var(--primary)]">
                      In Loving Memory
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      Honouring our Olivetian legacy
                    </span>
                  </Link>

                  <Link to="/NOSA-chapters" className={dropdownItemClass}>
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

            <NavLink to="/olivetians" className={navLinkClass}>
              Olivetians
            </NavLink>

            <NavLink to="/programs" className={navLinkClass}>
              Programs
            </NavLink>

            <NavLink to="/news" className={navLinkClass}>
              News &amp; Events
            </NavLink>

            <NavLink to="/gallery" className={navLinkClass}>
              Gallery
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          {/* JOIN NOSA */}
          {/* JOIN GOSA / BACK TO PORTAL */}
          <Link
            to={
              loading
                ? "/portal/signup"
                : isAuthenticated
                  ? "/portal/dashboard"
                  : "/portal/signup"
            }
            className="group hidden items-center gap-2 border border-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-dark)] transition-all duration-300 hover:shadow-md md:flex"
          >
            {loading
              ? "Join NOSA"
              : isAuthenticated
                ? "Back to Portal"
                : "Join NOSA"}

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 lg:hidden ${scrolled
                ? "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
                : "border-slate-200 text-[var(--primary)] hover:bg-slate-50"
              }`}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenu && (
          <div
            className={`mt-0 border p-5 backdrop-blur-xl transition-all duration-500 lg:hidden ${scrolled
                ? "border-slate-200 bg-white/95"
                : "border-slate-200 bg-white/95"
              }`}
          >
            <div className="flex flex-col gap-1">
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

              {/* MOBILE ABOUT */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAbout(!mobileAbout)}
                  aria-expanded={mobileAbout}
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
                      to="/history"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      History &amp; Heritage
                    </Link>
                  </div>
                )}
              </div>

              {/* MOBILE NOSA */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileNosa(!mobileNosa)}
                  aria-expanded={mobileNosa}
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
                      to="/about-NOSA"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      About NOSA
                    </Link>

                    <Link
                      to="/NOSA-leadership"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      NOSA Leadership
                    </Link>

                    <Link
                      to="/legacy-leadership"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      Legacy Leaders
                    </Link>

                    <Link
                      to="/in-loving-memory"
                      onClick={() => setMobileMenu(false)}
                      className={dropdownItemClass}
                    >
                      <span className="block text-[var(--primary)]">
                        In Loving Memory
                      </span>
                      <span className="mt-1 block text-xs text-slate-400">
                        Honouring our Olivetian legacy
                      </span>
                    </Link>

                    <Link
                      to="/NOSA-chapters"
                      onClick={() => setMobileMenu(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--primary)]"
                    >
                      Chapters
                    </Link>
                  </div>
                )}
              </div>

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
                News &amp; Events
              </NavLink>

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

              <div className="my-3 h-px bg-slate-200" />

              <Link
                to="/portal/login"
                onClick={() => setMobileMenu(false)}
                className="border border-slate-200 px-4 py-3 text-center text-sm text-[var(--primary)] transition-all duration-300 hover:bg-slate-50"
              >
                Member Login
              </Link>

              <Link
                to={
                  loading
                    ? "/portal/signup"
                    : isAuthenticated
                      ? "/portal/dashboard"
                      : "/portal/signup"
                }
                onClick={() => setMobileMenu(false)}
                className="mt-2 bg-[var(--secondary)] px-4 py-3 text-center text-sm font-semibold text-[var(--primary-dark)] transition hover:shadow-lg"
              >
                {loading
                  ? "Join NOSA"
                  : isAuthenticated
                    ? "Back to Portal"
                    : "Join NOSA"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
