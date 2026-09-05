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
    <main className="bg-white overflow-x-hidden text-[var(--primary-dark)] mt-0 md:mt-15">


      <header className="">
        <div

        >
          <Navbar />
        </div>
      </header>


      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[70vh] md:min-h-screen overflow-hidden bg-[var(--primary-dark)]">
        <img
          src="/images/olivetNOSA-building.jpg"
          alt="Olivet Baptist High School"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[var(--primary-dark)]/80" />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/75 to-transparent" />

        <div className="relative mx-auto flex min-h-[100vh] max-w-7xl items-end px-6 pb-20 sm:px-10 lg:px-12 lg:pb-24">
          <div
            className="max-w-3xl"
            data-aos="fade-up"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
              Contact OlivetNOSA
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Let’s stay
              <span className="block text-[var(--secondary)]">
                connected.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Whether you are an Olivetian, a prospective member, a partner,
              or simply want to learn more, we would be glad to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT DETAILS
      ====================================================== */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">

          <div
            className="mb-14 max-w-2xl"
            data-aos="fade-up"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Reach Us
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              We’re here to listen.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              Have a question about NOSA, membership, an event, an initiative,
              or reconnecting with fellow Olivetians? Get in touch with us.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {/* Location */}
            <div
              className="rounded-3xl border border-black/10 bg-[var(--background-soft)] p-7 sm:p-8"
              data-aos="fade-up"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-dark)] text-[var(--secondary)]">
                <MapPin size={21} strokeWidth={1.8} />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Visit
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Olivet Heights
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Olivet Baptist High School
                <br />
                Oyo, Nigeria
              </p>
            </div>

            {/* Email */}
            <div
              className="rounded-3xl border border-black/10 bg-[var(--background-soft)] p-7 sm:p-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-dark)] text-[var(--secondary)]">
                <Mail size={21} strokeWidth={1.8} />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Email
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Write to us
              </h3>

              <a
                href="mailto:info@olivetnosa.org"
                className="mt-3 block text-sm text-[var(--primary)] transition hover:text-[var(--secondary)]"
              >
                info@olivetnosa.org
              </a>

              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                We’ll get back to you as soon as possible.
              </p>
            </div>

            {/* Phone */}
            <div
              className="rounded-3xl border border-black/10 bg-[var(--background-soft)] p-7 sm:p-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-dark)] text-[var(--secondary)]">
                <Phone size={21} strokeWidth={1.8} />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Call
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Speak with us
              </h3>

              <a
                href="tel:+2340000000000"
                className="mt-3 block text-sm text-[var(--primary)] transition hover:text-[var(--secondary)]"
              >
                +234 XXX XXX XXXX
              </a>

              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                Available during official contact hours.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ====================================================== */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">

          {/* Left */}
          <div data-aos="fade-right">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Send a Message
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              How can we help?
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              Send us a message and the appropriate member of the
              OlivetNOSA community will get back to you.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-start gap-4">
                <div className="mt-1 text-[var(--secondary)]">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Membership enquiries
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                    Questions about joining or updating your membership.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-[var(--secondary)]">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    NOSA initiatives
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                    Enquiries about projects, partnerships and community
                    initiatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-[var(--secondary)]">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    General enquiries
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                    Anything else you would like to ask or share with us.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm sm:p-9 lg:p-10"
            data-aos="fade-left"
          >
            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                  <CheckCircle2 size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  Message received.
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                  Thank you for reaching out to OlivetNOSA. Your message has
                  been received and someone from the team will get back to you.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
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
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-dark)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--primary)]"
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
      <section className="bg-white py-20 sm:py-24">
        <div
          className="mx-auto max-w-5xl px-6 text-center sm:px-10"
          data-aos="fade-up"
        >
          <Clock
            size={28}
            strokeWidth={1.6}
            className="mx-auto text-[var(--secondary)]"
          />

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            Contact Hours
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            We’re available to connect.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            For enquiries requiring a direct response, please contact the
            association during its official working hours.
          </p>
        </div>
      </section>

      {/* =====================================================
          JOIN CTA
      ====================================================== */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-28">
        <div
          className="mx-auto max-w-4xl px-6 text-center sm:px-10"
          data-aos="fade-up"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
            Stay Connected
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            You left Olivet.
            <span className="block text-[var(--secondary)]">
              But you’re still part of it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Join the wider Olivetian community and stay connected with
            generations of people who share the same story.
          </p>

          <Link
            to="/olivetians"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:gap-3"
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