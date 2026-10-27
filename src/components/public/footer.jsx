
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import usePublicGeneralSettings from "../../hooks/usePublicGeneralSettings";

const Footer = () => {
  const settings = usePublicGeneralSettings();

  // Dynamic branding and contact details with fallbacks
  const logoUrl = settings?.logoUrl || "/images/Logo-NOSA.png";

  const associationName =
    settings?.associationName ||
    "Global Old Students Association Website";

  const shortName =  "Baptist High School";

  const contactEmail =
    settings?.contactEmail || "customerservice@olivetbhsnosa.org";

  const phone = settings?.phone || "";

  const address =
    settings?.address || "Olivet Heights · Oyo, Nigeria";

  const socialLinks = {
    facebook: settings?.socialLinks?.facebook || "",
    instagram:
      settings?.socialLinks?.instagram ||
      "https://www.instagram.com/olivetheights/",
    youtube:
      settings?.socialLinks?.youtube ||
      "https://www.youtube.com/@olivetheightstv",
    linkedin: settings?.socialLinks?.linkedin || "",
  };

  const socialLinkClass =
    "flex h-9 w-9 items-center justify-center rounded-lg text-md text-white/90 transition hover:text-[var(--secondary)]";

  return (
    <footer className="relative overflow-hidden bg-[var(--primary-dark)] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--primary)]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          {/* BRAND */}
          <div data-aos="fade-up" className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
                <img
                  src={logoUrl}
                  alt={associationName}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="leading-none">
                <p className="max-w-35 text-xs font-bold tracking-wide transition-colors duration-500">
                  {associationName}
                </p>

                <p className="mt-1 text-[7px] font-medium uppercase tracking-[0.22em] text-white/50">
                  {shortName}
                </p>
              </div>
            </Link>

            <p className="mt-7 text-sm leading-7 text-white/55">
              A tradition of excellence, character and service since
              1945. Connecting generations of Olivetians and building
              a future worthy of our legacy.
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

          {/* EXPLORE */}
          <div data-aos="fade-up" data-aos-delay="100">
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
                  to="/about-gosa"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  About GOSA
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

              {/* Gallery link intentionally remains omitted */}
            </ul>
          </div>

          {/* COMMUNITY */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Community
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  to="/news"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  News &amp; Events
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
                  to="/portal/signup"
                  className="text-sm text-white/55 transition hover:text-[var(--secondary)]"
                >
                  Join GOSA
                </Link>
              </li>
            </ul>
          </div>

          {/* STAY CONNECTED */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Stay Connected
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/55">
              Keep up with {shortName}, GOSA activities and stories
              from our community.
            </p>

            {/* Contact details */}
            <div className="mt-5 space-y-3 text-sm text-white/55">
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="block break-words transition hover:text-[var(--secondary)]"
                >
                  {contactEmail}
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="block transition hover:text-[var(--secondary)]"
                >
                  {phone}
                </a>
              )}
            </div>

            {/* CTA */}
            <Link
              to="/portal/signup"
              className="group mt-6 inline-flex items-center gap-3 bg-[var(--secondary)] px-5 py-3 text-sm font-semibold text-[var(--primary-dark)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Join the Community

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={socialLinkClass}
                >
                  <FaFacebookF size={20} />
                </a>
              )}

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={socialLinkClass}
                >
                  <FaInstagram size={20} />
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className={socialLinkClass}
                >
                  <FaYoutube size={20} />
                </a>
              )}

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialLinkClass}
                >
                  <FaLinkedinIn size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {associationName} | Powered by:
            {" "}<a href=" https://davecr8sadebisi.co.uk/" target="_blank">DXsExpressionsUK</a>
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/privacy-policy"
              className="transition hover:text-white/70"
            >
              Privacy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="transition hover:text-white/70"
            >
              Terms
            </Link>

            <span className="text-white/20">{address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
