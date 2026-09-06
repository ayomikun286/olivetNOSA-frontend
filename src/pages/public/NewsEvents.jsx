import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle  from "../../components/common/PageTitle.jsx";

import {
  ArrowRight,
  CalendarDays,
  MapPin,
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
    <main className="mt-0 bg-white text-[var(--primary-dark)] md:mt-15">
     
     
      <PageTitle title="News & Events | OlivetNOSA" />
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-screen overflow-hidden bg-[var(--primary-dark)]">
        <img
          src="/images/olivetNOSA-6.jpg"
          alt="Olivetians"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/80 to-[var(--primary-dark)]/20" />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-8 sm:px-8 lg:px-12 lg:pb-10">
          <div data-aos="fade-up" className="max-w-5xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--secondary)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                News & Events
              </p>
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Stay connected with
              <span className="block text-[var(--secondary)]">
                Olivet.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Stories, gatherings and developments from a community that
              continues to grow, remember and move forward together.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mt-16 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60">
                ↓
              </span>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Latest from the community
              </span>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
              Stories · Gatherings · Developments
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED STORY
      ====================================================== */}

      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div
            data-aos="fade-up"
            className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Latest
              </p>

              <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                What’s happening around Olivet.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              The people, moments and initiatives keeping the Olivetian
              community connected.
            </p>
          </div>

          <article
            data-aos="fade-up"
            className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16"
          >
            <div className="group relative overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={latestNews[0].image}
                  alt={latestNews[0].title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="lg:py-8">
              <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                <span className="text-[var(--secondary)]">
                  {latestNews[0].category}
                </span>

                <span className="h-px w-8 bg-black/15" />

                <span>{latestNews[0].date}</span>
              </div>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl lg:text-[2.8rem]">
                {latestNews[0].title}
              </h3>

              <p className="mt-6 text-base leading-8 text-[var(--text-muted)]">
                {latestNews[0].excerpt}
              </p>

              {/* <Link
                to="#"
                className="mt-8 inline-flex items-center gap-2 border-b border-[var(--primary)] pb-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
              >
                Read story
                <ArrowRight size={17} />
              </Link> */}
            </div>
          </article>

          {/* More Stories */}

          <div className="mt-24 grid gap-x-10 gap-y-14 border-t border-black/10 pt-10 md:grid-cols-2">
            {latestNews.slice(1).map((news, index) => (
              <article
                key={news.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group"
              >
                <div className="overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    <span className="text-[var(--secondary)]">
                      {news.category}
                    </span>

                    <span className="h-px w-7 bg-black/15" />

                    <span>{news.date}</span>
                  </div>

                  <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">
                    {news.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                    {news.excerpt}
                  </p>

                  <Link
                    to="#"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
                  >
                    Read story
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EVENTS
      ====================================================== */}

      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div
            data-aos="fade-up"
            className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Upcoming
              </p>

              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Gatherings that bring us together.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base">
              There are moments in every Olivetian journey when being
              together matters most.
            </p>
          </div>

          <div className="border-t border-white/15">
            {upcomingEvents.map((event, index) => (
              <article
                key={event.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="grid gap-8 border-b border-white/15 py-9 lg:grid-cols-[120px_1fr_auto] lg:items-center lg:gap-12"
              >
                <div className="flex items-baseline gap-3 lg:block">
                  <span className="text-5xl font-semibold leading-none tracking-[-0.04em]">
                    {event.day}
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)] lg:ml-1">
                    {event.month}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
                    {event.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                    {event.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:gap-6">
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

                <Link
                  to="#"
                  className="inline-flex w-fit items-center gap-2 border-b border-white/25 pb-2 text-sm font-semibold text-white transition hover:gap-3 hover:border-[var(--secondary)]"
                >
                  Event details
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ARCHIVE
      ====================================================== */}

      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div
            data-aos="fade-up"
            className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Archive
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                From the community.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              A record of the conversations, achievements and moments that
              continue to shape the Olivetian story.
            </p>
          </div>

          <div className="border-t border-black/10">
            {archiveNews.map((news, index) => (
              <article
                key={news.id}
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group flex flex-col gap-5 border-b border-black/10 py-7 sm:flex-row sm:items-center sm:justify-between sm:py-8"
              >
                <div>
                  <div className="mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    <span>{news.date}</span>

                    <span className="h-px w-7 bg-[var(--secondary)]" />

                    <span>{news.category}</span>
                  </div>

                  <h3 className="max-w-3xl text-xl font-semibold leading-tight transition group-hover:text-[var(--primary)] sm:text-2xl">
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
          CLOSING
      ====================================================== */}

      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
        <div
          data-aos="fade-up"
          className="mx-auto max-w-4xl px-5 text-center sm:px-8"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
            Stay Connected
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl lg:text-6xl">
            There is always something happening in the Olivetian community.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/55">
            Keep up with the people, gatherings and initiatives that continue
            to connect generations of Olivetians.
          </p>

          <Link
            to="/olivetians"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:gap-3"
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