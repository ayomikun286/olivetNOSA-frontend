import React from "react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import {
  ArrowDown,
  ArrowUpRight,
  MapPinned,
  UsersRound,
  Handshake,
  Globe2,
  Building2,
  HeartHandshake,
} from "lucide-react";

const chapters = [
  {
    number: "01",
    title: "Local Chapters",
    text: "Connect with Olivetians in your city, region, and community through local chapter activities and gatherings.",
    icon: MapPinned,
  },
  {
    number: "02",
    title: "Year Set Networks",
    text: "Chapters work alongside year sets to strengthen relationships across generations of Olivetians.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Community Service",
    text: "Members come together to support initiatives that strengthen the school and the wider Olivetian community.",
    icon: HeartHandshake,
  },
  {
    number: "04",
    title: "Global Connection",
    text: "Wherever Olivetians live and work, chapters help keep the connection to Olivet alive.",
    icon: Globe2,
  },
];

const activities = [
  {
    title: "Connect",
    text: "Build meaningful relationships with fellow Olivetians living within your community.",
    icon: UsersRound,
  },
  {
    title: "Collaborate",
    text: "Work with other chapters and the national body on initiatives that benefit Olivet.",
    icon: Handshake,
  },
  {
    title: "Give Back",
    text: "Turn the Olivetian spirit into practical support for the school and future generations.",
    icon: Building2,
  },
];

export default function NOSAChapters() {
  return (
    <div className="min-h-screen bg-white text-[var(--primary-dark)]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
        <div
          
        >
          <Navbar />
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src="/images/olivetNOSA-6.jpg"
          alt="Olivetians gathered together"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[var(--primary-dark)]/95
            via-[var(--primary)]/80
            to-[var(--secondary)]/20
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[var(--primary-dark)]/95
            via-[var(--primary-dark)]/35
            to-transparent
          "
        />

        <div className="relative z-10 w-full px-6 pb-14 pt-40 sm:px-10 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div
                data-aos="fade-right"
                className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--secondary-light)]"
              >
                <span className="h-px w-10 bg-[var(--secondary)]" />
                NOSA Chapters
              </div>

              <h1
                data-aos="fade-up"
                className="
                  text-5xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.045em]
                  text-white
                  sm:text-6xl
                  lg:text-8xl
                "
              >
                Wherever Olivetians
                <span className="block text-[var(--secondary)]">
                  gather, we connect.
                </span>
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="100"
                className="
                  mt-8
                  max-w-2xl
                  text-base
                  leading-8
                  text-white/75
                  sm:text-lg
                "
              >
                NOSA chapters bring Olivetians together beyond the school
                grounds — creating spaces for friendship, collaboration,
                service and a lasting connection to our alma mater.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#chapters"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[var(--secondary)]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-[var(--primary-dark)]
                    transition
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  Explore Our Network
                  <ArrowDown size={17} />
                </a>

                <a
                  href="#connect"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/30
                    bg-white/10
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white/20
                  "
                >
                  Connect With NOSA
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="
                mt-20
                flex
                flex-col
                gap-5
                border-t
                border-white/20
                pt-6
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  The Olivetian Network
                </p>
                <p className="mt-2 text-sm text-white/75">
                  One association. Many communities. One shared identity.
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <span className="h-2 w-2 rounded-full bg-[var(--secondary)]" />
                Cum Christo Progredere
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section
        id="chapters"
        className="relative overflow-hidden bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                02 — The Network
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[var(--primary-dark)] sm:text-5xl">
                More than a location.
                <span className="block text-[var(--primary)]/55">
                  It is a community.
                </span>
              </h2>
            </div>

            <div data-aos="fade-left">
              <p className="text-lg leading-8 text-[var(--text-muted)]">
                NOSA chapters provide a local expression of the wider
                Olivetian family. They create opportunities for alumni to
                reconnect, share experiences, support one another and
                contribute to the continued growth of Olivet.
              </p>

              <p className="mt-6 text-lg leading-8 text-[var(--text-muted)]">
                From professional networks to social gatherings and community
                initiatives, chapters help transform the idea of an alumni
                association into something people can experience close to
                home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER STRUCTURE
      ========================================================= */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              03 — How Chapters Work
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--primary-dark)] sm:text-5xl">
              A stronger connection,
              <span className="block text-[var(--primary)]/50">
                wherever you are.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 md:grid-cols-2">
            {chapters.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="
                    group
                    bg-white
                    p-8
                    transition
                    duration-300
                    hover:bg-[var(--primary-dark)]
                    sm:p-10
                    lg:p-12
                  "
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="
                        text-sm
                        font-semibold
                        tracking-[0.2em]
                        text-[var(--secondary)]
                      "
                    >
                      {item.number}
                    </span>

                    <div
                      className="
                        rounded-2xl
                        bg-[var(--primary-light)]
                        p-3
                        text-[var(--primary)]
                        transition
                        group-hover:bg-white/10
                        group-hover:text-[var(--secondary)]
                      "
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="mt-14 text-2xl font-semibold text-[var(--primary-dark)] group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-md leading-7 text-[var(--text-muted)] group-hover:text-white/65">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          IMAGE FEATURE
      ========================================================= */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div
              data-aos="fade-right"
              className="relative min-h-[480px] overflow-hidden rounded-[2rem]"
            >
              <img
                src="/images/olivetNOSA-2.jpg"
                alt="Olivetian community"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Community
                </p>

                <p className="mt-3 max-w-md text-xl font-medium leading-8 text-white">
                  Different places. Different generations. One Olivetian
                  family.
                </p>
              </div>
            </div>

            <div data-aos="fade-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                04 — Beyond The Chapter
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[var(--primary-dark)] sm:text-5xl">
                Your chapter is only
                <span className="block text-[var(--primary)]/50">
                  part of the story.
                </span>
              </h2>

              <p className="mt-7 text-lg leading-8 text-[var(--text-muted)]">
                Chapters are connected to the wider NOSA structure, allowing
                local communities to contribute to national initiatives while
                maintaining their own identity and relationships.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 h-fit rounded-full bg-[var(--primary-light)] p-2 text-[var(--primary)]">
                    <Globe2 size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      Local presence
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                      Stay connected to Olivetians around you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 h-fit rounded-full bg-[var(--primary-light)] p-2 text-[var(--primary)]">
                    <Handshake size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      National collaboration
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                      Work together on initiatives that reach beyond one
                      community.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 h-fit rounded-full bg-[var(--primary-light)] p-2 text-[var(--primary)]">
                    <HeartHandshake size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      Shared responsibility
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                      Every chapter has a role in preserving the Olivet
                      legacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACTIVITIES
      ========================================================= */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                05 — Chapter Life
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Chapters turn
                <span className="block text-white/35">
                  connection into action.
                </span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {activities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      p-7
                      transition
                      hover:-translate-y-2
                      hover:bg-white/[0.08]
                    "
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--secondary)] text-[var(--primary-dark)]">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-10 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/55">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section
        id="connect"
        className="relative overflow-hidden bg-[var(--secondary-light)] py-24 sm:py-32"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--secondary)]/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
          <p
            data-aos="fade-up"
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]"
          >
            Stay Connected
          </p>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="
              mt-5
              text-4xl
              font-semibold
              leading-tight
              tracking-tight
              text-[var(--primary-dark)]
              sm:text-6xl
            "
          >
            Find your people.
            <span className="block text-[var(--primary)]/50">
              Find your chapter.
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-lg
              leading-8
              text-[var(--primary-dark)]/65
            "
          >
            Whether you are reconnecting after many years or looking for ways
            to become more involved, NOSA provides a place to belong, serve
            and build lasting relationships.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-10 flex justify-center"
          >
            <a
              href="/contact"
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[var(--primary-dark)]
                px-7
                py-4
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:-translate-y-1
              "
            >
              Connect With NOSA
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}