import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

import {
  ArrowRight,
  Globe2,
  Heart,
  Users,
  HandHeart,
  Quote,
  Network,
} from "lucide-react";

const Olivetians = () => {
  useEffect(() => {
    AOS.init({
      duration: 850,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  const yearSets = [
    {
      year: "1940s–1960s",
      title: "The Pioneers",
      text: "The earliest generations who helped shape the traditions and character of Olivet.",
    },
    {
      year: "1970s–1980s",
      title: "The Builders",
      text: "Generations who carried the Olivet spirit into a changing Nigeria and beyond.",
    },
    {
      year: "1990s–2000s",
      title: "The Connectors",
      text: "A generation that expanded the Olivetian community across professions and continents.",
    },
    {
      year: "2010s–Today",
      title: "The New Generation",
      text: "Young Olivetians continuing the tradition of excellence, service and leadership.",
    },
  ];

  const values = [
    {
      icon: Users,
      number: "01",
      title: "Community",
      text: "A lifelong network built around shared memories, friendships and the Olivet experience.",
    },
    {
      icon: Globe2,
      number: "02",
      title: "Connection",
      text: "Wherever life takes us, Olivet gives us a common ground to return to.",
    },
    {
      icon: HandHeart,
      number: "03",
      title: "Service",
      text: "Giving back to the school and communities that helped shape generations of Olivetians.",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white text-[var(--primary-dark)] mt-0 md:mt-15">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[82vh] overflow-hidden bg-[var(--primary-dark)]">
        <div className="absolute inset-0">
          <img
            src="/images/olivetNOSA-6.jpg"
            alt="Olivetians"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-transparent to-[var(--primary-dark)]/35" />
        </div>

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-end px-6 pb-20 pt-36 sm:px-8 lg:px-12 lg:pb-28">
          <div
            className="max-w-4xl"
            data-aos="fade-up"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--secondary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--secondary)]">
                The Olivetian Community
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
              One school.
              <br />

              <span className="text-[var(--secondary)]">
                Generations.
              </span>

              <br />

              One connection.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Olivetians are more than former students. We are a community
              connected by shared memories, enduring values and a school that
              continues to live in us.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/portal/login"
                className="group inline-flex items-center gap-3 bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] transition hover:bg-white"
              >
                Join the Community

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#community"
                className="inline-flex items-center gap-3 border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Discover Olivetians
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section
        id="community"
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <div data-aos="fade-right">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                  Who We Are
                </span>
              </div>

              <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                The story continues
                <span className="text-[var(--secondary)]">
                  {" "}
                  beyond the classroom.
                </span>
              </h2>
            </div>

            <div
              className="max-w-2xl lg:pt-10"
              data-aos="fade-left"
            >
              <p className="text-lg leading-8 text-slate-600">
                Every person who passed through Olivet carries a piece of its
                story. From the earliest students to today's generation,
                Olivetians have gone on to build careers, communities and
                institutions across Nigeria and around the world.
              </p>

              <p className="mt-6 leading-8 text-slate-500">
                The Olivetian community exists to keep that connection alive —
                creating opportunities to reconnect, celebrate one another,
                support the school and ensure that the values of Olivet
                continue from one generation to the next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMMUNITY VALUES
      ========================================================= */}
      <section className="border-y border-slate-200 bg-[var(--background-soft)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div
            className="max-w-2xl"
            data-aos="fade-up"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
              What Connects Us
            </span>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[var(--primary-dark)] sm:text-5xl">
              More than a school.
              <br />

              <span className="text-[var(--secondary)]">
                A lifelong community.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid border-y border-slate-200 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className={`py-8 md:px-8 md:py-10 ${
                    index !== 0
                      ? "border-t border-slate-200 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
                      {item.number}
                    </span>

                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-[var(--secondary)]"
                    />
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold text-[var(--primary-dark)]">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          GENERATIONS
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div data-aos="fade-right">
              <div className="lg:sticky lg:top-28">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                    Generations
                  </span>
                </div>

                <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                  Different
                  <br />

                  <span className="text-[var(--secondary)]">
                    generations.
                  </span>

                  <br />

                  One Olivet.
                </h2>

                <p className="mt-6 max-w-md leading-7 text-slate-500">
                  Every year set has its own memories, friendships and
                  milestones. Together, those stories form the wider Olivetian
                  story.
                </p>
              </div>
            </div>

            <div>
              {yearSets.map((set, index) => (
                <div
                  key={set.year}
                  data-aos="fade-left"
                  data-aos-delay={index * 70}
                  className="group border-t border-slate-200 py-8 first:pt-0 sm:py-10"
                >
                  <div className="grid gap-5 sm:grid-cols-[150px_1fr_auto] sm:items-start sm:gap-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
                      {set.year}
                    </span>

                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--primary-dark)]">
                        {set.title}
                      </h3>

                      <p className="mt-3 max-w-xl leading-7 text-slate-500">
                        {set.text}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="hidden text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--secondary)] sm:block"
                    />
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-200" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GLOBAL OLIVETIANS
      ========================================================= */}
      <section className="bg-[var(--primary-dark)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
            <div data-aos="fade-right">
              <div className="mb-5 flex items-center gap-3">
                <Globe2
                  size={17}
                  strokeWidth={1.7}
                  className="text-[var(--secondary)]"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                  Around the World
                </span>
              </div>

              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Wherever life takes us,
                <span className="text-[var(--secondary)]">
                  {" "}
                  Olivet comes with us.
                </span>
              </h2>

              <p className="mt-7 max-w-xl leading-8 text-white/60">
                Olivetians continue to make their mark across different
                professions, industries and communities, carrying with them
                the experiences and values of their school years.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Nigeria",
                  "United Kingdom",
                  "North America",
                  "Africa",
                  "Beyond",
                ].map((location) => (
                  <span
                    key={location}
                    className="flex items-center gap-2 text-sm text-white/55"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
                    {location}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="relative"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/olivetNOSA-2.jpg"
                  alt="Olivet community"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                  The Olivetian Community
                </span>

                <Globe2
                  size={17}
                  className="text-[var(--secondary)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STORIES
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div data-aos="fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                Olivetian Stories
              </span>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--primary-dark)] sm:text-5xl">
                The people are
                <span className="text-[var(--secondary)]">
                  {" "}
                  the legacy.
                </span>
              </h2>
            </div>

            <Link
              to="/news"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--primary)]"
            >
              View stories

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <article
              data-aos="fade-up"
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/olivetNOSA-student.jpg"
                  alt="Olivetian community"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="border-b border-slate-200 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Community
                </span>

                <h3 className="mt-3 text-xl font-semibold text-[var(--primary-dark)]">
                  The memories that stay with us
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Every Olivetian carries stories of friendships, lessons and
                  experiences that continue long after school.
                </p>
              </div>
            </article>

            <article
              data-aos="fade-up"
              data-aos-delay="100"
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/olivetNOSA-building.jpg"
                  alt="Olivet Baptist High School"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="border-b border-slate-200 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Legacy
                </span>

                <h3 className="mt-3 text-xl font-semibold text-[var(--primary-dark)]">
                  Giving back to Olivet
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  The relationship between an Olivetian and the school does not
                  end at graduation.
                </p>
              </div>
            </article>

            <article
              data-aos="fade-up"
              data-aos-delay="200"
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/olivetNOSA.jpg"
                  alt="Olivetians"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="border-b border-slate-200 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Connection
                </span>

                <h3 className="mt-3 text-xl font-semibold text-[var(--primary-dark)]">
                  Staying connected
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Reconnect with classmates, discover fellow Olivetians and
                  remain part of the community.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          GIVING BACK
      ========================================================= */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid overflow-hidden bg-[var(--primary)] lg:grid-cols-2">
            <div
              className="relative min-h-[420px]"
              data-aos="fade-right"
            >
              <img
                src="/images/olivet-school.jpg"
                alt="Olivet Baptist High School"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[var(--primary-dark)]/40" />

              <div className="absolute bottom-8 left-8 flex items-center gap-3 text-white">
                <span className="flex h-11 w-11 items-center justify-center bg-[var(--secondary)] text-[var(--primary-dark)]">
                  <Heart
                    size={21}
                    fill="currentColor"
                  />
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Give Back
                </span>
              </div>
            </div>

            <div
              className="flex flex-col justify-center p-9 sm:p-12 lg:p-16"
              data-aos="fade-left"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                Giving Back
              </span>

              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                The best way to honour the past is to invest in the future.
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-white/60">
                Olivet has given generations of students a foundation for
                life. Today, Olivetians have an opportunity to help strengthen
                that foundation for those coming next.
              </p>

              <Link
                to="/contact"
                className="group mt-8 inline-flex w-fit items-center gap-3 bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] transition hover:bg-white"
              >
                Support Olivet

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUOTE
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <Quote
            size={40}
            strokeWidth={1.3}
            className="mx-auto text-[var(--secondary)]"
            data-aos="fade-up"
          />

          <blockquote
            data-aos="fade-up"
            className="mt-7 text-3xl font-medium leading-tight tracking-tight text-[var(--primary-dark)] sm:text-4xl lg:text-5xl"
          >
            “The story of Olivet is not only about where we came from.
            It is about what we choose to carry forward.”
          </blockquote>

          <div
            data-aos="fade-up"
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-slate-200" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Cum Christo Progredere
            </span>

            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[var(--primary-dark)] py-24 sm:py-28 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="/images/olivetNOSA-6.jpg"
            alt=""
            className="h-full w-full object-cover opacity-15"
          />

          <div className="absolute inset-0 bg-[var(--primary-dark)]/90" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <div
            data-aos="fade-up"
            className="mx-auto flex h-14 w-14 items-center justify-center bg-[var(--secondary)] text-[var(--primary-dark)]"
          >
            <Network
              size={24}
              strokeWidth={1.8}
            />
          </div>

          <span
            data-aos="fade-up"
            className="mt-7 block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--secondary)]"
          >
            Stay Connected
          </span>

          <h2
            data-aos="fade-up"
            className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Your Olivet story
            <br />
            is still being written.
          </h2>

          <p
            data-aos="fade-up"
            className="mx-auto mt-6 max-w-2xl leading-8 text-white/60"
          >
            Join the Olivetian community, keep your profile updated, reconnect
            with your year set and stay informed about the work of NOSA.
          </p>

          <div
            data-aos="fade-up"
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/portal/login"
              className="group inline-flex items-center gap-3 bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:bg-white"
            >
              Access Member Portal

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/about-nosa"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Learn About NOSA
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Olivetians;