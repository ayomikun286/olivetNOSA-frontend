import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle  from "../../components/common/PageTitle.jsx";

import {
  ArrowDown,
  ArrowUpRight,
  UsersRound,
  Globe2,
  HeartHandshake,
  GraduationCap,
  Landmark,
  Infinity,
} from "lucide-react";

const AboutNOSA = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden bg-white text-[var(--primary-dark)] mt-0 md:mt-15">
         <PageTitle title="About NOSA | OlivetNOSA" />
        
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative min-h-screen overflow-hidden bg-[var(--primary-dark)] text-white">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/olivetNOSA-15.jpg"
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/95 via-[var(--primary-dark)]/65 to-[var(--primary-dark)]/25" />

            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/50 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 pb-20 pt-32 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-16">
              {/* Main copy */}
              <div>
                <div
                  data-aos="fade-right"
                  className="mb-7 flex items-center gap-3"
                >
                  <span className="h-px w-10 bg-[var(--secondary)]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--secondary)] sm:text-xs">
                    About NOSA
                  </span>
                </div>

                <h1
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                >
                  We left Olivet.
                  <br />
                  <span className="text-[var(--secondary)]">
                    But Olivet never left us.
                  </span>
                </h1>

                <p
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                >
                  The Olivet Baptist High School Old Students Association
                  brings together the people who once shared the same
                  classrooms, grounds and memories — and keeps that connection
                  alive long after school.
                </p>

                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="mt-9 flex flex-wrap items-center gap-3"
                >
                  <Link
                    to="/olivetians"
                    className="group inline-flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] transition duration-300 hover:opacity-90"
                  >
                    Explore NOSA

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.8}
                    />
                  </Link>

                  <Link
                    to="/portal/Signup"
                    className="group inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10"
                  >
                    Become a member

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              </div>

              {/* Heritage statement */}
              <div
                data-aos="fade-left"
                data-aos-delay="200"
                className="lg:pb-2"
              >
                <div className="border-l border-white/20 pl-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                    One Olivet family
                  </p>

                  <p className="mt-5 text-2xl font-medium leading-[1.25] tracking-[-0.02em] text-white sm:text-3xl">
                    Many journeys.
                    <br />
                    One connection.
                  </p>

                  <div className="mt-8 border-t border-white/15 pt-6">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-3xl font-semibold tracking-[-0.03em] text-white">
                          1945
                        </p>

                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                          Since the beginning
                        </p>
                      </div>

                      <div className="h-10 w-px bg-white/15" />

                      <div>
                        <Infinity
                          className="h-8 w-8 text-[var(--secondary)]"
                          strokeWidth={1.5}
                        />

                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                          Still connected
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero footer */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex items-center justify-between border-t border-white/15 py-5"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 sm:text-xs">
                Cum Christo Progredere
              </span>

              <ArrowDown
                className="h-5 w-5 text-[var(--secondary)]"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY NOSA
        ========================================================== */}
        <section className="bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
                    Why NOSA exists
                  </p>
                </div>
              </div>

              <div>
                <h2
                  data-aos="fade-up"
                  className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
                >
                  The Olivetian bond is bigger than distance.
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="mt-8 max-w-3xl text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8"
                >
                  Leaving school does not mean leaving behind everything that
                  happened there. The friendships, lessons, experiences and
                  values we gained at Olivet continue to become part of who we
                  are.
                </p>

                <p
                  data-aos="fade-up"
                  data-aos-delay="150"
                  className="mt-5 max-w-3xl text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8"
                >
                  NOSA exists to preserve that connection — giving Olivetians
                  a way to find one another, stay involved, support the school
                  and help shape what comes next.
                </p>

                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="mt-16 grid border-t border-black/10 sm:grid-cols-3"
                >
                  <div className="border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:pr-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      Reconnect
                    </p>

                    <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                      Find old friends, classmates and members of the wider
                      Olivetian family.
                    </p>
                  </div>

                  <div className="border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      Engage
                    </p>

                    <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                      Stay part of the conversations, gatherings and work that
                      keep our community moving.
                    </p>
                  </div>

                  <div className="py-8 sm:pl-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      Give back
                    </p>

                    <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                      Use what we have built together to create opportunities
                      for those coming after us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            THE COMMUNITY
        ========================================================== */}
        <section className="bg-[var(--primary)] py-24 text-white sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
                    The community
                  </p>
                </div>

                <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  One Olivetian family.
                  <br />
                  <span className="text-white/45">Many stories.</span>
                </h2>

                <p className="mt-8 max-w-md text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  Different generations. Different professions. Different
                  places. But one shared beginning.
                </p>
              </div>

              <div data-aos="fade-left">
                <div className="overflow-hidden">
                  <img
                    src="/images/olivetNOSA-16.jpg"
                    alt="Olivetians together"
                    className="h-[440px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[560px]"
                  />
                </div>

                <div className="mt-4 flex flex-col justify-between gap-3 border-t border-white/15 pt-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-white/55">
                    A community connected by where we began.
                  </p>

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                    Since 1945
                  </span>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              className="mt-24 border-t border-white/15"
            >
              <div className="grid sm:grid-cols-3">
                <div className="border-b border-white/15 py-10 sm:border-b-0 sm:border-r sm:pr-10">
                  <UsersRound
                    className="h-6 w-6 text-[var(--secondary)]"
                    strokeWidth={1.5}
                  />

                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
                    Members
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                    Individuals connected through the wider Olivetian
                    community.
                  </p>
                </div>

                <div className="border-b border-white/15 py-10 sm:border-b-0 sm:border-r sm:px-10">
                  <GraduationCap
                    className="h-6 w-6 text-[var(--secondary)]"
                    strokeWidth={1.5}
                  />

                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
                    Year Sets
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                    Generations whose shared school years continue to connect
                    them.
                  </p>
                </div>

                <div className="py-10 sm:pl-10">
                  <Globe2
                    className="h-6 w-6 text-[var(--secondary)]"
                    strokeWidth={1.5}
                  />

                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
                    Chapters
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                    Local communities keeping the Olivetian connection alive
                    wherever members are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHAT NOSA DOES
        ========================================================== */}
        <section className="bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
                    What NOSA does
                  </p>
                </div>

                <div className="mt-10 overflow-hidden">
                  <img
                    src="/images/olivetNOSA-17.jpg"
                    alt="Olivetian gathering"
                    className="h-[500px] w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </div>

                <p className="mt-4 text-sm text-[var(--text-muted)]">
                  Keeping the connection active across generations.
                </p>
              </div>

              <div>
                <h2
                  data-aos="fade-up"
                  className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
                >
                  Keeping the Olivetian connection alive.
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="mt-8 max-w-2xl text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8"
                >
                  NOSA is more than a name or an organisation. It is the
                  structure through which Olivetians continue to connect,
                  contribute and celebrate the community they share.
                </p>

                <div className="mt-16 border-t border-black/10">
                  <div
                    data-aos="fade-up"
                    className="grid gap-5 border-b border-black/10 py-9 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--primary-dark)]">
                        Connect
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                        Creating opportunities for members to find each other
                        and build meaningful relationships.
                      </p>
                    </div>

                    <UsersRound
                      className="h-6 w-6 text-[var(--primary)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="grid gap-5 border-b border-black/10 py-9 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--primary-dark)]">
                        Support
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                        Building a community where members and the school can
                        support one another.
                      </p>
                    </div>

                    <HeartHandshake
                      className="h-6 w-6 text-[var(--primary)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className="grid gap-5 border-b border-black/10 py-9 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--primary-dark)]">
                        Develop
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                        Supporting ideas and initiatives that help future
                        generations of Olivetians thrive.
                      </p>
                    </div>

                    <GraduationCap
                      className="h-6 w-6 text-[var(--primary)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="grid gap-5 py-9 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--primary-dark)]">
                        Celebrate
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                        Remembering the people, achievements and moments that
                        make the Olivet story special.
                      </p>
                    </div>

                    <Infinity
                      className="h-6 w-6 text-[var(--primary)]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            STRUCTURE
        ========================================================== */}
        <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                    How NOSA is connected
                  </p>
                </div>
              </div>

              <div>
                <h2
                  data-aos="fade-up"
                  className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
                >
                  Different parts of one Olivetian family.
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="mt-8 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
                >
                  From national leadership to individual members, NOSA works
                  through a community structure that gives everyone a place
                  within the wider association.
                </p>

                <div className="mt-16 border-t border-white/15">
                  <div
                    data-aos="fade-up"
                    className="grid gap-6 border-b border-white/15 py-9 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em]">
                        National Leadership
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                        Providing direction, coordination and stewardship for
                        the association.
                      </p>
                    </div>

                    <Landmark
                      className="h-6 w-6 text-[var(--secondary)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="grid gap-6 border-b border-white/15 py-9 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em]">
                        Chapters
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                        Giving members places to connect and participate within
                        their local communities.
                      </p>
                    </div>

                    <Globe2
                      className="h-6 w-6 text-[var(--secondary)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className="grid gap-6 border-b border-white/15 py-9 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em]">
                        Year Sets
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                        Keeping the friendships and experiences of each
                        generation alive.
                      </p>
                    </div>

                    <GraduationCap
                      className="h-6 w-6 text-[var(--secondary)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="grid gap-6 py-9 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.025em]">
                        Members
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                        The people at the heart of NOSA — each carrying a
                        different Olivet story.
                      </p>
                    </div>

                    <UsersRound
                      className="h-6 w-6 text-[var(--secondary)]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ACROSS PLACES / GENERATIONS
        ========================================================== */}
        <section className="bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              {/* Across places */}
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
                    Across places
                  </p>
                </div>

                <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                  Wherever Olivetians gather, the connection continues.
                </h2>

                <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8">
                  Chapters give members a local expression of the wider NOSA
                  community — a place to meet, share experiences and remain
                  involved.
                </p>

                <div className="mt-12 overflow-hidden">
                  <img
                    src="/images/olivetNOSA-18.jpg"
                    alt="Olivetian chapter"
                    className="h-[440px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[500px]"
                  />
                </div>
              </div>

              {/* Across generations */}
              <div data-aos="fade-left" className="lg:pt-28">
                <div className="border-t border-black/10 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[var(--secondary)]" />

                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
                      Across generations
                    </p>
                  </div>

                  <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                    Some friendships begin in a classroom and last a lifetime.
                  </h2>

                  <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8">
                    Year sets preserve the experiences shared by each
                    generation and give classmates a way to remain part of the
                    wider Olivetian story.
                  </p>

                  <div className="mt-12 border-t border-black/10">
                    <div className="border-b border-black/10 py-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                        Shared experiences
                      </p>

                      <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-muted)]">
                        The memories and moments that belong to one generation.
                      </p>
                    </div>

                    <div className="border-b border-black/10 py-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                        Lasting friendships
                      </p>

                      <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-muted)]">
                        Relationships that continue long after school.
                      </p>
                    </div>

                    <div className="py-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                        A shared responsibility
                      </p>

                      <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-muted)]">
                        Helping the next generation experience the same sense
                        of belonging.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            LOOKING AHEAD
        ========================================================== */}
        <section className="bg-[var(--primary)] py-24 text-white sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                    Looking ahead
                  </p>
                </div>
              </div>

              <div>
                <h2
                  data-aos="fade-up"
                  className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]"
                >
                  The next chapter
                  <br />
                  <span className="text-[var(--secondary)]">
                    belongs to us.
                  </span>
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="mt-9 max-w-3xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8"
                >
                  The future of NOSA is not simply about becoming bigger. It is
                  about becoming more connected, more useful to its members and
                  more meaningful to the generations that follow.
                </p>

                <div
                  data-aos="fade-up"
                  data-aos-delay="150"
                  className="mt-16 grid border-t border-white/15 sm:grid-cols-3"
                >
                  <div className="border-b border-white/15 py-8 sm:border-b-0 sm:border-r sm:pr-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      Stronger connections
                    </p>

                    <p className="mt-4 text-sm leading-6 text-white/55">
                      Making it easier for Olivetians to find and support one
                      another.
                    </p>
                  </div>

                  <div className="border-b border-white/15 py-8 sm:border-b-0 sm:border-r sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      Greater impact
                    </p>

                    <p className="mt-4 text-sm leading-6 text-white/55">
                      Turning the strength of our community into meaningful
                      action.
                    </p>
                  </div>

                  <div className="py-8 sm:pl-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      A living legacy
                    </p>

                    <p className="mt-4 text-sm leading-6 text-white/55">
                      Carrying the Olivet story forward for those who come
                      after us.
                    </p>
                  </div>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="mt-20 border-t border-white/15 pt-10"
                >
                  <p className="max-w-4xl text-3xl font-medium leading-[1.25] tracking-[-0.025em] text-white/90 sm:text-4xl">
                    NOSA is not simply about where we came from. It is about
                    what we choose to build together from here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL INVITATION
        ========================================================== */}
        <section className="bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--secondary)]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
                    Stay connected
                  </p>
                </div>

                <p className="mt-6 max-w-sm text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8">
                  Whether you left Olivet recently or many years ago, there is
                  still a place for you in the story.
                </p>
              </div>

              <div data-aos="fade-up">
                <h2 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
                  Your Olivet story
                  <br />
                  <span className="text-[var(--text-muted)]">
                    is still part of ours.
                  </span>
                </h2>

                <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-black/10 pt-7">
                  <Link
                    to="/portal/Signup"
                    className="group inline-flex items-center gap-3 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:opacity-90"
                  >
                    Join NOSA

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.8}
                    />
                  </Link>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 border-b border-black/20 pb-2 text-sm font-semibold text-[var(--primary-dark)] transition hover:border-[var(--primary)]"
                  >
                    Get in touch

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              className="mt-24 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] sm:text-xs">
                Olivet Baptist High School Old Students Association
              </span>

              <span className="text-sm italic text-[var(--text-muted)]">
                Cum Christo Progredere
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutNOSA;