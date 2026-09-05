import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });

    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <main className="mt-0 overflow-x-hidden bg-white text-[var(--primary-dark)] md:mt-15">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[var(--primary-dark)] md:min-h-screen">
        {/* Background */}
        <img
          src="/images/olivetNOSA-building.jpg"
          alt="Olivet Baptist High School"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

        {/* Left editorial gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/75 to-[var(--primary-dark)]/15" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        {/* Bottom border */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-5 pb-8 sm:px-8 md:min-h-screen lg:px-12 lg:pb-10">
          <div
            className="max-w-5xl"
            data-aos="fade-up"
          >
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--secondary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Contact OlivetNOSA
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Let’s stay
              <span className="block text-[var(--secondary)]">
                connected.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Whether you are an Olivetian, a prospective member,
              a partner, or simply want to learn more, we would
              be glad to hear from you.
            </p>
          </div>

          {/* Bottom information */}
          <div
            className="mt-16 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-white/15 text-sm text-white/70">
                ↓
              </span>

              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                Find your way to us
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Visit · Write · Call
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20">
            <div data-aos="fade-up">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Reach Us
              </p>

              <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                We’re here
                <span className="block text-[var(--primary)]">
                  to listen.
                </span>
              </h2>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                Have a question about NOSA, membership, an event,
                an initiative, or reconnecting with fellow
                Olivetians? Get in touch with us.
              </p>

              <div className="mt-8 h-px w-20 bg-[var(--secondary)]" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT DETAILS
      ====================================================== */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3 lg:px-12">
          {/* LOCATION */}
          <div
            className="border-b border-black/10 px-5 py-10 sm:border-b-0 sm:border-r sm:px-8 lg:px-10"
            data-aos="fade-up"
          >
            <div className="flex items-center gap-4 text-[var(--secondary)]">
              <MapPin size={20} strokeWidth={1.7} />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Visit
              </p>
            </div>

            <h3 className="mt-7 text-2xl font-semibold tracking-tight">
              Olivet Heights
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              Olivet Baptist High School
              <br />
              Oyo, Nigeria
            </p>

            <Link
              to="/about-school"
              className="mt-6 inline-flex items-center gap-2 border-b border-black/15 pb-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-[var(--secondary)] hover:text-[var(--primary)]"
            >
              About Olivet
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* EMAIL */}
          <div
            className="border-b border-black/10 px-5 py-10 sm:border-b-0 sm:border-r sm:px-8 lg:px-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-4 text-[var(--secondary)]">
              <Mail size={20} strokeWidth={1.7} />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Email
              </p>
            </div>

            <h3 className="mt-7 text-2xl font-semibold tracking-tight">
              Write to us
            </h3>

            <a
              href="mailto:info@olivetnosa.org"
              className="mt-3 block break-all text-sm text-[var(--primary)] transition hover:text-[var(--secondary)]"
            >
              info@olivetnosa.org
            </a>

            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
              We’ll get back to you as soon as possible.
            </p>
          </div>

          {/* PHONE */}
          <div
            className="px-5 py-10 sm:px-8 lg:px-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-4 text-[var(--secondary)]">
              <Phone size={20} strokeWidth={1.7} />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Call
              </p>
            </div>

            <h3 className="mt-7 text-2xl font-semibold tracking-tight">
              Speak with us
            </h3>

            {/* Replace with the official number when available */}
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Phone number to be updated.
            </p>

            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
              Available during official contact hours.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ====================================================== */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          {/* LEFT CONTENT */}
          <div
            className="lg:pt-4"
            data-aos="fade-right"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--secondary)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Send a Message
              </p>
            </div>

            <h2 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              How can
              <span className="block text-[var(--secondary)]">
                we help?
              </span>
            </h2>

            <p className="mt-7 max-w-md text-base leading-8 text-white/60 sm:text-lg">
              Send us a message and the appropriate member of
              the OlivetNOSA community will get back to you.
            </p>

            {/* Enquiry types */}
            <div className="mt-12 border-t border-white/10">
              <div className="border-b border-white/10 py-5">
                <h3 className="text-sm font-semibold">
                  Membership enquiries
                </h3>

                <p className="mt-1 text-sm leading-6 text-white/45">
                  Questions about joining or updating your
                  membership.
                </p>
              </div>

              <div className="border-b border-white/10 py-5">
                <h3 className="text-sm font-semibold">
                  NOSA initiatives
                </h3>

                <p className="mt-1 text-sm leading-6 text-white/45">
                  Enquiries about projects, partnerships and
                  community initiatives.
                </p>
              </div>

              <div className="border-b border-white/10 py-5">
                <h3 className="text-sm font-semibold">
                  General enquiries
                </h3>

                <p className="mt-1 text-sm leading-6 text-white/45">
                  Anything else you would like to ask or share
                  with us.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div
            className="bg-white p-6 text-[var(--primary-dark)] sm:p-9 lg:p-10"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center bg-[var(--primary-dark)] text-[var(--secondary)]">
                  <CheckCircle2 size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-2xl font-semibold">
                  Message received.
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                  Thank you for reaching out to OlivetNOSA.
                  Your message has been received and someone
                  from the team will get back to you.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 border-b border-black/20 pb-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[var(--secondary)]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-sm font-semibold"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-sm font-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2.5 block text-sm font-semibold"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option value="membership">
                      Membership
                    </option>

                    <option value="event">
                      Events
                    </option>

                    <option value="initiative">
                      NOSA Initiative
                    </option>

                    <option value="partnership">
                      Partnership
                    </option>

                    <option value="general">
                      General Enquiry
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-sm font-semibold"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="How can we help?"
                    className="w-full resize-none border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 bg-[var(--primary-dark)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--primary)]"
                >
                  Send Message
                  <Send size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT HOURS
      ====================================================== */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div
          className="mx-auto max-w-5xl px-5 text-center sm:px-8"
          data-aos="fade-up"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-black/10 text-[var(--secondary)]">
            <Clock size={22} strokeWidth={1.6} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            Contact Hours
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            We’re available to connect.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)]">
            For enquiries requiring a direct response, please
            contact the association during its official working
            hours.
          </p>

          <div className="mx-auto mt-8 h-px w-16 bg-black/10" />
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-36">
        <div
          className="mx-auto max-w-4xl px-5 text-center sm:px-8"
          data-aos="fade-up"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--secondary)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
              Stay Connected
            </p>

            <span className="h-px w-10 bg-[var(--secondary)]" />
          </div>

          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            You left Olivet.
            <span className="block text-[var(--secondary)]">
              But you’re still part of it.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Join the wider Olivetian community and stay
            connected with generations of people who share the
            same story.
          </p>

          <Link
            to="/olivetians"
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:gap-4"
          >
            Explore the Olivetian Community
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;