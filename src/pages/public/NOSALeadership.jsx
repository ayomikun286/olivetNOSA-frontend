import React from "react";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

import {
  ArrowDown,
  ArrowUpRight,
  UsersRound,
  ShieldCheck,
  Network,
  HeartHandshake,
} from "lucide-react";
import PageTitle  from "../../components/common/PageTitle.jsx";

const NOSALeadership = () => {
  return (
    <main className="min-h-screen bg-white text-(--primary-dark) mt-0 md:mt-15 overflow-x-hidden">
       <PageTitle title="Leadership | OlivetNOSA" />
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header>
        <Navbar />
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-[var(--primary-dark)]">
        <img
          src="/images/olivetNOSA-6.jpg"
          alt="OlivetNOSA leadership and alumni community"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[var(--primary-dark)]/70" />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/30 to-transparent" />

        <div className="relative z-10 w-full px-6 pb-14 pt-40 sm:px-10 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-5xl">
              <div
                data-aos="fade-up"
                className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--secondary-light)]"
              >
                <span className="h-px w-10 bg-[var(--secondary)]" />
                NOSA Leadership
              </div>

              <h1
                data-aos="fade-up"
                data-aos-delay="100"
                className="
                  mt-7
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
                Leadership rooted in
                <span className="block text-[var(--secondary)]">
                  service and responsibility.
                </span>
              </h1>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
              >
                <p className="max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                  NOSA is guided by Olivetians who give their time, experience
                  and commitment to the service of the wider alumni community.
                </p>

                <a
                  href="#leadership"
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
                  Meet the leadership
                  <ArrowDown size={17} />
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
                gap-3
                border-t
                border-white/20
                pt-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                National Old Students' Association
              </p>

              <p className="text-sm italic text-white/50">
                Cum Christo Progredere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEADERSHIP INTRODUCTION
      ========================================================= */}
      <section
        id="leadership"
        className="bg-white py-24 sm:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div data-aos="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Leadership & Service
              </p>

              <div className="mt-6 h-px w-16 bg-[var(--secondary)]" />
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                The strength of NOSA is reflected in the people willing to
                serve it.
              </h2>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="text-base leading-8 text-[var(--text-muted)]">
                  Leadership within NOSA carries the responsibility of keeping
                  the association focused on its purpose while responding to
                  the needs of its members and the wider Olivetian community.
                </p>

                <p className="text-base leading-8 text-[var(--text-muted)]">
                  It brings together experience from different generations of
                  Olivetians and provides the coordination needed for chapters,
                  year sets and members to work towards shared objectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================= */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Our Approach
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                Leadership with the community at its centre.
              </h2>
            </div>

            <div data-aos="fade-left">
              <p className="max-w-3xl text-xl leading-9 text-[var(--primary-dark)] sm:text-2xl">
                Good leadership gives an association direction without losing
                sight of the people it represents.
              </p>

              <div className="mt-14 border-t border-black/10">
                <div className="grid gap-6 border-b border-black/10 py-8 md:grid-cols-[auto_0.3fr_1fr] md:items-start">
                  <Network
                    size={23}
                    strokeWidth={1.5}
                    className="text-[var(--secondary)]"
                  />

                  <h3 className="text-xl font-semibold text-[var(--primary-dark)]">
                    Collaboration
                  </h3>

                  <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    Bringing members, chapters and year sets together so that
                    the association can work with a shared sense of purpose.
                  </p>
                </div>

                <div className="grid gap-6 border-b border-black/10 py-8 md:grid-cols-[auto_0.3fr_1fr] md:items-start">
                  <HeartHandshake
                    size={23}
                    strokeWidth={1.5}
                    className="text-[var(--secondary)]"
                  />

                  <h3 className="text-xl font-semibold text-[var(--primary-dark)]">
                    Service
                  </h3>

                  <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    Giving time, knowledge and experience to strengthen the
                    Olivetian community and support its continued development.
                  </p>
                </div>

                <div className="grid gap-6 py-8 md:grid-cols-[auto_0.3fr_1fr] md:items-start">
                  <ShieldCheck
                    size={23}
                    strokeWidth={1.5}
                    className="text-[var(--secondary)]"
                  />

                  <h3 className="text-xl font-semibold text-[var(--primary-dark)]">
                    Stewardship
                  </h3>

                  <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    Protecting the values, relationships and legacy entrusted
                    to the association by generations of Olivetians.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEADERSHIP IMAGE / CONTENT
      ========================================================= */}
      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
            <div
              data-aos="fade-right"
              className="relative overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/olivetNOSA.jpg"
                  alt="OlivetNOSA leadership"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>

              <div className="mt-5 flex items-start justify-between border-t border-black/10 pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  OlivetNOSA
                </p>

                <p className="max-w-xs text-right text-sm leading-6 text-[var(--text-muted)]">
                  Leadership entrusted with serving the wider Olivetian
                  community.
                </p>
              </div>
            </div>

            <div data-aos="fade-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Serving the Association
              </p>

              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                Bringing experience together for the benefit of the community.
              </h2>

              <p className="mt-8 text-lg leading-8 text-[var(--text-muted)]">
                NOSA leadership provides the structure through which the
                association's work can be coordinated and its priorities
                carried forward.
              </p>

              <p className="mt-6 text-lg leading-8 text-[var(--text-muted)]">
                The responsibility extends beyond administration. Leaders help
                create the conditions for members to participate, chapters to
                remain connected and initiatives to make a meaningful
                contribution to the Olivetian community.
              </p>

              <div className="mt-10 border-t border-black/10 pt-7">
                <div className="flex gap-5">
                  <UsersRound
                    size={22}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />

                  <div>
                    <h3 className="font-semibold text-[var(--primary-dark)]">
                      A community-led association
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                      NOSA is strengthened by the participation and service of
                      Olivetians across generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEADERSHIP STRUCTURE
      ========================================================= */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Working Together
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                One association, many parts.
              </h2>

              <p className="mt-7 max-w-md leading-8 text-white/55">
                Leadership works alongside the different parts of the
                OlivetNOSA community to keep the association connected and
                purposeful.
              </p>
            </div>

            <div
              data-aos="fade-left"
              className="divide-y divide-white/15 border-y border-white/15"
            >
              <div className="grid gap-5 py-8 sm:grid-cols-[0.35fr_1fr]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  National
                </p>

                <div>
                  <h3 className="text-2xl font-medium">
                    National Leadership
                  </h3>

                  <p className="mt-3 max-w-xl leading-7 text-white/50">
                    Providing direction, coordination and oversight across
                    the wider association.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 py-8 sm:grid-cols-[0.35fr_1fr]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Local
                </p>

                <div>
                  <h3 className="text-2xl font-medium">Chapters</h3>

                  <p className="mt-3 max-w-xl leading-7 text-white/50">
                    Creating local communities where Olivetians can remain
                    connected and participate in the life of NOSA.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 py-8 sm:grid-cols-[0.35fr_1fr]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Generations
                </p>

                <div>
                  <h3 className="text-2xl font-medium">Year Sets</h3>

                  <p className="mt-3 max-w-xl leading-7 text-white/50">
                    Preserving relationships between classmates and
                    strengthening connections across generations.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 py-8 sm:grid-cols-[0.35fr_1fr]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Members
                </p>

                <div>
                  <h3 className="text-2xl font-medium">Olivetians</h3>

                  <p className="mt-3 max-w-xl leading-7 text-white/50">
                    The members whose participation, ideas and commitment give
                    the association its strength.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEADERSHIP DIRECTORY PLACEHOLDER
      ========================================================= */}
      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Leadership
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                The people serving NOSA.
              </h2>
            </div>

            <div data-aos="fade-left">
              <div className="border-t border-black/10">
                <div className="flex flex-col gap-5 border-b border-black/10 py-8 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      National Leadership
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-[var(--primary-dark)]">
                      Leadership profiles
                    </h3>
                  </div>

                  <p className="max-w-md text-sm leading-6 text-[var(--text-muted)] sm:text-right">
                    Official leadership profiles can be presented here,
                    including names, positions and relevant service
                    information.
                  </p>
                </div>

                <div className="py-8">
                  <p className="max-w-xl text-base leading-7 text-[var(--text-muted)]">
                    This section is intentionally prepared for verified NOSA
                    leadership information. Names and positions should be
                    added from the association's official records rather than
                    presented without confirmation.
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
      <section className="bg-[var(--secondary-light)] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div
            data-aos="fade-up"
            className="border-t border-[var(--primary)]/10 pt-14"
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The Olivetian Community
                </p>

                <h2 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--primary-dark)] sm:text-6xl lg:text-7xl">
                  A stronger association begins with people willing to serve.
                </h2>
              </div>

              <a
                href="/portal/signup"
                className="
                  inline-flex
                  w-fit
                  shrink-0
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

            <div className="mt-16 flex flex-col justify-between gap-5 border-t border-[var(--primary)]/10 pt-6 sm:flex-row sm:items-center">
              <p className="text-sm text-[var(--text-muted)]">
                National Old Students' Association
              </p>

              <p className="text-sm font-medium italic text-[var(--secondary)]">
                Cum Christo Progredere
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NOSALeadership;