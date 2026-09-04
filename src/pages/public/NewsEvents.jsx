import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import "aos/dist/aos.css";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Newspaper,
  Clock,
} from "lucide-react";

const latestNews = [
  {
    id: 1,
    title: "Olivetians Continue to Strengthen the Olivetian Community",
    excerpt:
      "From alumni engagement to community initiatives, Olivetians continue to find meaningful ways to stay connected and give back.",
    date: "August 24, 2026",
    category: "Community",
    image: "/images/olivetNOSA-2.jpg",
  },
  {
    id: 2,
    title: "NOSA and the Continuing Legacy of Olivet",
    excerpt:
      "The association continues to build connections between generations of Olivetians while supporting the future of the school.",
    date: "August 12, 2026",
    category: "NOSA",
    image: "/images/olivetNOSA-6.jpg",
  },
  {
    id: 3,
    title: "Keeping the Olivetian Connection Alive",
    excerpt:
      "Across generations and locations, former students remain connected through shared memories, relationships and service.",
    date: "July 30, 2026",
    category: "Olivetians",
    image: "/images/olivetNOSA-student.jpg",
  },
];

const upcomingEvents = [
  {
    id: 1,
    day: "12",
    month: "SEP",
    title: "NOSA Community Gathering",
    location: "Olivet Baptist High School, Oyo",
    time: "10:00 AM",
    description:
      "An opportunity for Olivetians to reconnect, share experiences and strengthen the community.",
  },
  {
    id: 2,
    day: "03",
    month: "OCT",
    title: "Olivetian Development Meeting",
    location: "Oyo, Nigeria",
    time: "11:00 AM",
    description:
      "Members come together to discuss initiatives and projects supporting the Olivetian community.",
  },
  {
    id: 3,
    day: "21",
    month: "NOV",
    title: "Year Set Reunion",
    location: "Olivet Heights, Oyo",
    time: "12:00 PM",
    description:
      "A gathering for old students to reconnect with classmates and celebrate their shared Olivetian journey.",
  },
];

const archiveNews = [
  {
    id: 1,
    title: "Celebrating Generations of Olivetians",
    date: "June 18, 2026",
    category: "Community",
  },
  {
    id: 2,
    title: "Supporting the Next Generation of Olivet Students",
    date: "May 27, 2026",
    category: "Development",
  },
  {
    id: 3,
    title: "NOSA Strengthens Alumni Connections",
    date: "April 15, 2026",
    category: "NOSA",
  },
  {
    id: 4,
    title: "Remembering the Olivetian Journey",
    date: "March 08, 2026",
    category: "Heritage",
  },
];

export default function NewsEvents() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });

    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white text-[var(--primary-dark)]">
      {/* =====================================================
          HERO
      ====================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
        <div

        >
          <Navbar />
        </div>
      </header>
      <section className="relative min-h-[90vh] md:min-h-[100vh] overflow-hidden bg-[var(--primary-dark)]">

        {/* Background Image */}
        <img
          src="/images/olivetNOSA-6.jpg"
          alt="Olivetians"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark image treatment */}
        <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

        {/* Left-to-right cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/80 to-[var(--primary-dark)]/20" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        {/* Subtle border */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[90vh] md:min-h-[100vh] max-w-7xl flex-col justify-end px-6 pb-8 sm:px-10 lg:px-12 lg:pb-10">

          <div
            data-aos="fade-up"
            className="max-w-5xl"
          >

            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-4">

              

              <span className="h-px w-12 bg-[var(--secondary)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                News & Events
              </p>

            </div>

            {/* Heading */}
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.035em] text-white sm:text-6xl lg:text-[5.8rem]">

              Stay connected with

              <span className="block text-[var(--secondary)]">
                Olivet.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Discover the latest stories, gatherings and developments
              shaping the Olivetian community.
            </p>

          </div>

          {/* Bottom information strip */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >

            <div className="flex items-center gap-3">

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70">
                ↓
              </span>

              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                Latest from the community
              </span>

            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Stories · Gatherings · Developments
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          LATEST NEWS
      ====================================================== */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div
            className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
            data-aos="fade-up"
          >
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Latest
              </p>

              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                What’s happening.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--text-muted)]">
              The latest stories, updates and moments from the Olivetian
              community.
            </p>
          </div>

          {/* Featured Story */}
          <div
            className="grid overflow-hidden rounded-3xl border border-black/10 bg-[var(--background-soft)] lg:grid-cols-[1.25fr_0.75fr]"
            data-aos="fade-up"
          >
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-[500px]">
              <img
                src={latestNews[0].image}
                alt={latestNews[0].title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-7 sm:p-10">
                <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary-dark)]">
                  {latestNews[0].category}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="mb-5 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <CalendarDays size={16} />
                {latestNews[0].date}
              </div>

              <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
                {latestNews[0].title}
              </h3>

              <p className="mt-6 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                {latestNews[0].excerpt}
              </p>

              <button
                type="button"
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
              >
                Read story
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Smaller Stories */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {latestNews.slice(1).map((news, index) => (
              <article
                key={news.id}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
                      {news.category}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <CalendarDays size={14} />
                    {news.date}
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold leading-tight">
                    {news.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                    {news.excerpt}
                  </p>

                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition group-hover:gap-3"
                  >
                    Read story
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          UPCOMING EVENTS
      ====================================================== */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div
            className="mb-14"
            data-aos="fade-up"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Upcoming
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Gatherings that bring us together.
            </h2>
          </div>

          <div className="divide-y divide-black/10 rounded-3xl border border-black/10 bg-white">
            {upcomingEvents.map((event, index) => (
              <article
                key={event.id}
                className="grid gap-7 p-7 sm:p-9 lg:grid-cols-[130px_1fr_auto] lg:items-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Date */}
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-[var(--primary-dark)] text-white">
                  <span className="text-3xl font-semibold leading-none">
                    {event.day}
                  </span>

                  <span className="mt-1 text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
                    {event.month}
                  </span>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-2xl font-semibold">
                    {event.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                    {event.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 text-xs text-[var(--text-muted)] sm:flex-row sm:gap-6">
                    <span className="flex items-center gap-2">
                      <MapPin size={15} />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={15} />
                      {event.time}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                >
                  Event details
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          NEWS ARCHIVE
      ====================================================== */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div
            className="mb-12"
            data-aos="fade-up"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Archive
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              From the community.
            </h2>
          </div>

          <div className="grid gap-4">
            {archiveNews.map((news, index) => (
              <article
                key={news.id}
                className="group flex flex-col gap-5 rounded-2xl border border-black/10 p-6 transition hover:border-[var(--secondary)] sm:flex-row sm:items-center sm:justify-between sm:p-7"
                data-aos="fade-up"
                data-aos-delay={index * 70}
              >
                <div>
                  <div className="mb-3 flex items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
                    <span>{news.date}</span>

                    <span className="h-1 w-1 rounded-full bg-[var(--secondary)]" />

                    <span>{news.category}</span>
                  </div>

                  <h3 className="text-xl font-semibold transition group-hover:text-[var(--primary)] sm:text-2xl">
                    {news.title}
                  </h3>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-[var(--primary)] transition group-hover:translate-x-1"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SIMPLE CTA
      ====================================================== */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-28">
        <div
          className="mx-auto max-w-4xl px-6 text-center sm:px-10"
          data-aos="fade-up"
        >
          <Newspaper
            size={38}
            strokeWidth={1.5}
            className="mx-auto mb-7 text-[var(--secondary)]"
          />

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
            Stay Connected
          </p>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            There is always something happening in the Olivetian community.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Keep up with the people, gatherings and initiatives that continue
            to connect generations of Olivetians.
          </p>

          <Link
            to="/olivetians"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:gap-3"
          >
            Explore the Olivetian Community
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>


      <Footer />
    </main>
  );
}