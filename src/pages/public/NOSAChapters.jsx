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
  HeartHandshake,
  Network,
} from "lucide-react";

export default function NOSAChapters() {
  return (
    <main className="min-h-screen bg-white text-(--primary-dark) mt-0 md:mt-15 overflow-x-hidden">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header>
        <Navbar />
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src="/images/olivetNOSA-6.jpg"
          alt="Olivetians gathered together"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/25 to-transparent" />

        <div className="relative z-10 w-full px-6 pb-12 pt-40 sm:px-10 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-5xl">
              <div
                data-aos="fade-up"
                className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--secondary-light)]"
              >
                <span className="h-px w-10 bg-[var(--secondary)]" />
                NOSA Chapters
              </div>

              <h1
                data-aos="fade-up"
                data-aos-delay="100"
                className="
                  max-w-5xl
                  text-5xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.045em]
                  text-white
                  sm:text-6xl
                  lg:text-[7.5rem]
                "
              >
                Wherever Olivetians gather,
                <span className="block text-[var(--secondary)]">
                  the connection continues.
                </span>
              </h1>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
              >
                <p className="max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                  NOSA chapters bring Olivetians together within their local
                  communities while keeping them connected to the wider
                  National Old Students' Association.
                </p>

                <a
                  href="#chapter-network"
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-3
                    border-b
                    border-[var(--secondary)]
                    pb-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:gap-5
                  "
                >
                  Explore the chapter network
                  <ArrowDown size={17} />
                </a>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="
                mt-20
                border-t
                border-white/20
                pt-5
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                National Old Students' Association
              </p>

              <p className="text-sm italic text-white/55">
                Cum Christo Progredere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section
        id="chapter-network"
        className="bg-white py-24 sm:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div data-aos="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                The Chapter Network
              </p>

              <div className="mt-6 h-px w-16 bg-[var(--secondary)]" />
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                The Olivetian community does not end when school does.
              </h2>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="text-base leading-8 text-[var(--text-muted)]">
                  For many Olivetians, the relationships formed at school
                  continue long after graduation. Chapters provide a place for
                  those connections to remain active within local communities.
                </p>

                <p className="text-base leading-8 text-[var(--text-muted)]">
                  Through the chapter network, members can reconnect with
                  fellow Olivetians, participate in activities and contribute
                  to the wider work of NOSA while remaining part of a shared
                  Olivetian heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTERS IN PRACTICE
      ========================================================= */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
            {/* Image */}
            <div
              data-aos="fade-right"
              className="relative overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/olivetNOSA-2.jpg"
                  alt="Olivetian community"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>

              <div className="mt-5 flex items-start justify-between border-t border-black/10 pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  OlivetNOSA
                </p>

                <p className="max-w-xs text-right text-sm leading-6 text-[var(--text-muted)]">
                  Building connections that extend beyond generations and
                  locations.
                </p>
              </div>
            </div>

            {/* Content */}
            <div data-aos="fade-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Life Within a Chapter
              </p>

              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                A chapter gives the Olivetian connection a local home.
              </h2>

              <p className="mt-8 text-lg leading-8 text-[var(--text-muted)]">
                Chapters create opportunities for Olivetians in a particular
                community to remain in touch, meet one another and take part
                in activities that bring members together.
              </p>

              <p className="mt-6 text-lg leading-8 text-[var(--text-muted)]">
                They are also part of something larger. Each chapter remains
                connected to the wider NOSA community, creating a network that
                reaches beyond individual locations.
              </p>

              <div className="mt-10 border-t border-black/10">
                <div className="flex gap-5 border-b border-black/10 py-6">
                  <MapPinned
                    size={21}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      Local connection
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      A place for Olivetians within a community to reconnect
                      and build relationships.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 border-b border-black/10 py-6">
                  <UsersRound
                    size={21}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      Shared community
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      Members remain part of the wider Olivetian family,
                      regardless of where they live.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 py-6">
                  <Handshake
                    size={21}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      Working together
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      Chapters can collaborate with year sets, other chapters
                      and the national association.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE WIDER NETWORK
      ========================================================= */}
      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                <Network size={21} strokeWidth={1.5} />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Part of a Wider Community
              </p>

              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                Local roots.
                <span className="block text-[var(--primary)]/45">
                  Wider connections.
                </span>
              </h2>
            </div>

            <div data-aos="fade-left">
              <p className="max-w-3xl text-xl leading-9 text-[var(--primary-dark)] sm:text-2xl">
                A chapter is one part of the wider OlivetNOSA network. Its
                strength comes from the relationships created locally and the
                connection those relationships maintain with the association
                as a whole.
              </p>

              <div className="mt-16 border-t border-black/10">
                <div className="grid gap-8 border-b border-black/10 py-8 md:grid-cols-[0.3fr_1fr]">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                    Chapters
                  </div>

                  <p className="max-w-xl text-base leading-7 text-[var(--text-muted)]">
                    Bring Olivetians together within their local communities
                    and provide opportunities for continued participation.
                  </p>
                </div>

                <div className="grid gap-8 border-b border-black/10 py-8 md:grid-cols-[0.3fr_1fr]">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                    Year Sets
                  </div>

                  <p className="max-w-xl text-base leading-7 text-[var(--text-muted)]">
                    Preserve the bonds created between classmates and
                    generations of Olivetians.
                  </p>
                </div>

                <div className="grid gap-8 py-8 md:grid-cols-[0.3fr_1fr]">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                    NOSA
                  </div>

                  <p className="max-w-xl text-base leading-7 text-[var(--text-muted)]">
                    Provides the wider association through which Olivetians
                    remain connected and contribute to the future of the
                    Olivet community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTRIBUTION
      ========================================================= */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--secondary)]">
                <HeartHandshake size={22} strokeWidth={1.5} />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Participation
              </p>

              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                More than staying in touch.
              </h2>
            </div>

            <div data-aos="fade-left">
              <p className="max-w-3xl text-xl leading-9 text-white/70 sm:text-2xl">
                Chapters create a practical way for members to take part in
                the life of NOSA. Connection can lead to collaboration,
                support and meaningful contribution to the Olivet community.
              </p>

              <div className="mt-14">
                <div className="flex gap-6 border-t border-white/15 py-8">
                  <UsersRound
                    size={22}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--secondary)]"
                  />

                  <div>
                    <h3 className="text-xl font-medium">
                      Connect with other Olivetians
                    </h3>

                    <p className="mt-3 max-w-xl leading-7 text-white/50">
                      Build and maintain relationships with fellow members in
                      your community.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 border-t border-white/15 py-8">
                  <Globe2
                    size={22}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--secondary)]"
                  />

                  <div>
                    <h3 className="text-xl font-medium">
                      Take part in the wider network
                    </h3>

                    <p className="mt-3 max-w-xl leading-7 text-white/50">
                      Remain connected to Olivetians beyond your immediate
                      location through the wider NOSA community.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 border-y border-white/15 py-8">
                  <HeartHandshake
                    size={22}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--secondary)]"
                  />

                  <div>
                    <h3 className="text-xl font-medium">
                      Contribute to Olivet
                    </h3>

                    <p className="mt-3 max-w-xl leading-7 text-white/50">
                      Support initiatives and activities that strengthen the
                      Olivetian community and its legacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER DIRECTORY
      ========================================================= */}
      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Chapter Directory
              </p>

              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                Find your Olivetian community.
              </h2>

              <p className="mt-7 max-w-md leading-7 text-[var(--text-muted)]">
                As the OlivetNOSA chapter network grows, information about
                recognised chapters and their communities can be made
                available here.
              </p>
            </div>

            <div data-aos="fade-left">
              <div className="border-t border-black/10">
                <div className="flex items-center justify-between border-b border-black/10 py-7">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Chapter Network
                    </p>

                    <h3 className="mt-2 text-xl font-medium text-[var(--primary-dark)]">
                      Chapters and locations
                    </h3>
                  </div>

                  <MapPinned
                    size={22}
                    strokeWidth={1.5}
                    className="text-[var(--primary)]"
                  />
                </div>

                <div className="py-10">
                  <p className="max-w-xl text-lg leading-8 text-[var(--text-muted)]">
                    Chapter information will be published as the official
                    chapter directory is established and maintained by
                    OlivetNOSA.
                  </p>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    This section is intentionally kept open so that verified
                    chapter information can be added without presenting
                    unconfirmed locations or associations as official.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[var(--secondary-light)] py-24 sm:py-32 lg:py-40">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--secondary)]/15 blur-3xl" />

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
              mt-6
              text-5xl
              font-medium
              leading-[0.98]
              tracking-[-0.045em]
              text-[var(--primary-dark)]
              sm:text-6xl
              lg:text-7xl
            "
          >
            The Olivet story
            <span className="block text-[var(--primary)]/45">
              continues with you.
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[var(--primary-dark)]/65"
          >
            Register with OlivetNOSA and remain connected to the alumni
            community through the wider association and its member network.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-10 flex justify-center"
          >
            <a
              href="/portal/signup"
              className="
                inline-flex
                items-center
                gap-3
                bg-[var(--primary-dark)]
                px-7
                py-4
                text-sm
                font-semibold
                text-white
                transition
                hover:gap-5
                hover:bg-[var(--primary)]
              "
            >
              Join OlivetNOSA
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Footer />
    </main>
  );
}