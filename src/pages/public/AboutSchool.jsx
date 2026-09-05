import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

import {
  ArrowDown,
  ArrowRight,
  GraduationCap,
  Heart,
  Landmark,
  School,
  Trophy,
  Users,
} from "lucide-react";

const AboutSchool = () => {
  /*
   * =========================================================
   * TEMPORARY CONTENT
   * Replace these with the school's officially approved
   * Mission and Vision statements when provided.
   * =========================================================
   */

  const schoolMission =
    "To provide an environment where young people are equipped with knowledge, character, discipline and faith to make meaningful contributions to society.";

  const schoolVision =
    "To remain a leading institution where sound education, Christian values and responsible leadership continue to shape generations.";

  const houses = [
    {
      name: "Atanda House",
      description:
        "A house community built around participation, discipline and healthy competition.",
    },
    {
      name: "Odetayo House",
      description:
        "A house that forms part of the wider tradition and identity of Olivet.",
    },
    {
      name: "Locket House",
      description:
        "A house through which students experience belonging, teamwork and school spirit.",
    },
    {
      name: "Pinnock House",
      description:
        "A house community that contributes to the competitive and social life of the school.",
    },
    {
      name: "Homer Brown House",
      description:
        "Part of the house tradition that has connected generations of Olivet students.",
    },
    {
      name: "JBP Lafinhan House",
      description:
        "A house carrying forward the sense of identity and community found across Olivet.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[var(--primary-dark)] mt-0 md:mt-15">
      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <Navbar />
      </header>

      {/* =========================================================
          01 · HERO
      ========================================================= */}
      <section className="relative min-h-[88vh] overflow-hidden bg-[var(--primary-dark)]">
        <div className="absolute inset-0">
          <img
            src="/images/olivetNOSA-4.jpg"
            alt="Olivet Baptist High School, Oyo"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/85 via-[var(--primary-dark)]/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-end px-5 pb-20 pt-36 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
          <div className="max-w-5xl">
            <div
              data-aos="fade-right"
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[var(--secondary)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--secondary)] sm:text-xs">
                About Olivet Baptist High School
              </span>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              A school shaped by
              <span className="block text-[var(--secondary)]">
                faith, learning
              </span>
              <span className="block text-white/70">
                and character.
              </span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
            >
              Olivet Baptist High School has been part of the educational
              history of Oyo since 1945, providing generations of students
              with an education rooted in knowledge, character and service.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Established
                </p>

                <p className="mt-1 text-lg font-medium text-white">
                  1945
                </p>
              </div>

              <span className="hidden h-9 w-px bg-white/15 sm:block" />

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Location
                </p>

                <p className="mt-1 text-lg font-medium text-white">
                  Olivet Heights · Oyo, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 text-white/35 lg:right-12 lg:flex"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
            Explore the school
          </span>

          <ArrowDown size={14} />
        </div>
      </section>

      {/* =========================================================
          02 · WHERE IT BEGAN
      ========================================================= */}
      <section
        id="history"
        className="scroll-mt-24 overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Where It Began
                </span>
              </div>

              <p className="mt-6 max-w-xs text-sm leading-7 text-[var(--text-muted)]">
                The story of Olivet begins in Oyo and continues through the
                lives of generations who have passed through its gates.
              </p>
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                A beginning in
                <span className="block text-[var(--primary)]">
                  Oyo, 1945.
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            {/* Image */}
            <div data-aos="fade-right" className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 bg-[var(--primary-light)]" />

              <div className="relative overflow-hidden">
                <img
                  src="/images/olivetNOSA-am.jpg"
                  alt="Historical photograph of Olivet Baptist High School"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Historical archive
                </p>

                <p className="text-xs font-medium text-[var(--primary)]">
                  Oyo, Nigeria
                </p>
              </div>
            </div>

            {/* Story */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="max-w-2xl space-y-6 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                <p>
                  In 1945, a new chapter in education began in Oyo. The
                  institution that would become Olivet Baptist High School was
                  established as{" "}
                  <strong className="font-semibold text-[var(--primary-dark)]">
                    Oyo Baptist Boys' High School
                  </strong>
                  .
                </p>

                <p>
                  The school began its journey at Oke-Isokun under the
                  American Southern Baptist Mission, with education at the
                  heart of its work and a commitment to developing young people
                  beyond the classroom.
                </p>

                <p>
                  As the institution developed, Olivet Heights became its
                  enduring home — a place that would become familiar to
                  generations of students and an important part of the
                  school's identity.
                </p>

                <p>
                  The history of Olivet is therefore not simply a history of
                  buildings or dates. It is a history of teachers, students,
                  families and communities whose lives have been connected to
                  the school.
                </p>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-8">
                <div className="flex items-start gap-5">
                  <span className="mt-1 h-10 w-1 bg-[var(--secondary)]" />

                  <div>
                    <p className="font-serif text-2xl italic text-[var(--primary-dark)]">
                      Cum Christo Progredere
                    </p>

                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
                      Forward with Christ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historical notes */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-20 grid border-y border-slate-200 sm:grid-cols-3"
          >
            <div className="border-b border-slate-200 px-1 py-8 sm:border-b-0 sm:border-r sm:px-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                1945
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                The school begins
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                An educational institution takes root in Oyo.
              </p>
            </div>

            <div className="border-b border-slate-200 px-1 py-8 sm:border-b-0 sm:border-r sm:px-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                OKE-ISOKUN
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                The early setting
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                The school's early years are connected with its original
                setting in Oyo.
              </p>
            </div>

            <div className="px-1 py-8 sm:px-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                OLIVET HEIGHTS
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                A defining home
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                The Heights became closely associated with the Olivet
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03 · PURPOSE
      ========================================================= */}
      <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Education With Purpose
                </span>
              </div>

              <p className="mt-7 max-w-xs text-sm leading-7 text-[var(--text-muted)]">
                The Olivet tradition reaches beyond academic instruction,
                placing importance on character, responsibility and the
                development of the whole person.
              </p>
            </div>

            <div>
              <h2
                data-aos="fade-up"
                className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
              >
                Education that prepares
                <span className="block text-[var(--primary)]">
                  people for life.
                </span>
              </h2>

              <div className="mt-12 border-t border-slate-200">
                {/* Vision */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="grid gap-5 border-b border-slate-200 py-8 md:grid-cols-[180px_1fr] md:gap-10"
                >
                  <div className="flex items-center gap-3">
                    <School
                      size={19}
                      strokeWidth={1.5}
                      className="text-[var(--primary)]"
                    />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Our Vision
                    </p>
                  </div>

                  <p className="max-w-3xl text-lg leading-8 text-[var(--primary-dark)] sm:text-xl">
                    {schoolVision}
                  </p>
                </div>

                {/* Mission */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="150"
                  className="grid gap-5 border-b border-slate-200 py-8 md:grid-cols-[180px_1fr] md:gap-10"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap
                      size={19}
                      strokeWidth={1.5}
                      className="text-[var(--primary)]"
                    />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Our Mission
                    </p>
                  </div>

                  <p className="max-w-3xl text-lg leading-8 text-[var(--primary-dark)] sm:text-xl">
                    {schoolMission}
                  </p>
                </div>
              </div>

              {/* Principles */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-12 grid gap-8 sm:grid-cols-3"
              >
                <div>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-200 text-[var(--primary)]">
                    <GraduationCap size={19} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold">Knowledge</h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    A strong foundation for learning, curiosity and continued
                    growth.
                  </p>
                </div>

                <div>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-200 text-[var(--primary)]">
                    <Heart size={18} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold">Character</h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    Values and discipline that shape how students live and
                    relate with others.
                  </p>
                </div>

                <div>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center border border-slate-200 text-[var(--primary)]">
                    <Users size={18} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold">Service</h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    Preparing young people to contribute meaningfully to their
                    communities.
                  </p>
                </div>
              </div>

              <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                * Mission and vision currently require official confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04 · THE OLIVET EXPERIENCE
      ========================================================= */}
      <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The Olivet Experience
                </span>
              </div>

              <h2 className="mt-7 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                More than
                <span className="block text-[var(--primary)]">
                  the classroom.
                </span>
              </h2>

              <p className="mt-7 max-w-lg text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                Life at Olivet is shaped by the people, friendships,
                activities and traditions that make the school experience
                memorable long after students leave its grounds.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="grid grid-cols-[1.15fr_0.85fr] items-end gap-4"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/olivetNOSA-student.jpg"
                  alt="Olivet student"
                  className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>

              <div className="space-y-4">
                <div className="overflow-hidden">
                  <img
                    src="/images/olivetsNOSA__ -olaojo.webp"
                    alt="Olivet school community"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden">
                  <img
                    src="/images/olivetNOSA-2.jpg"
                    alt="Olivet Baptist High School"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          05 · THROUGH THE YEARS
      ========================================================= */}
      <section className="overflow-hidden bg-[var(--primary-dark)] py-24 text-white sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Through The Years
                </span>
              </div>

              <h2 className="mt-7 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                A story carried
                <span className="block text-white/50">
                  from one generation to another.
                </span>
              </h2>
            </div>

            <div className="grid gap-0 border-t border-white/10">
              <div
                data-aos="fade-up"
                className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[160px_1fr] sm:gap-10"
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                  1945
                </p>

                <div>
                  <h3 className="text-xl font-semibold">
                    The beginning
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    The institution that would become Olivet Baptist High
                    School begins its educational journey in Oyo.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[160px_1fr] sm:gap-10"
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                  EARLY YEARS
                </p>

                <div>
                  <h3 className="text-xl font-semibold">
                    Building the school
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    The school develops its educational community, traditions
                    and identity.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[160px_1fr] sm:gap-10"
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                  OLIVET HEIGHTS
                </p>

                <div>
                  <h3 className="text-xl font-semibold">
                    A defining home
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    Olivet Heights becomes closely connected with the school's
                    identity and the memories of generations of students.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="grid gap-4 py-8 sm:grid-cols-[160px_1fr] sm:gap-10"
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
                  TODAY
                </p>

                <div>
                  <h3 className="text-xl font-semibold">
                    Continuing the work
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    The school continues to educate and prepare new
                    generations of students.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Archive feature */}
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className="mt-20 grid lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="min-h-[360px] overflow-hidden">
              <img
                src="/images/olivetNOSA-3.jpg"
                alt="Historical Olivet Baptist High School photograph"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center border border-white/10 bg-white/[0.025] p-8 sm:p-10 lg:p-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  A Record Of Time
                </p>

                <h3 className="mt-5 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
                  The archive keeps the
                  <span className="block text-white/45">
                    memories visible.
                  </span>
                </h3>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                  Photographs, records and personal memories help preserve the
                  history of the people and places that have shaped Olivet.
                </p>

                <Link
                  to="/gallery"
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[var(--secondary)]"
                >
                  Explore the gallery

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          06 · PEOPLE OF OLIVET
      ========================================================= */}
      <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  People Of Olivet
                </span>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                A school is remembered
                <span className="block text-[var(--primary)]">
                  through its people.
                </span>
              </h2>

              <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                Teachers, students, leaders and families have each contributed
                to the story of Olivet. Their experiences are part of what
                makes the school more than a place of learning.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              data-aos="fade-right"
              className="relative min-h-[480px] overflow-hidden"
            >
              <img
                src="/images/olivetsNOSA__ -olaojo.webp"
                alt="Olivet school community"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--primary-dark)]/80 to-transparent p-8 pt-24 sm:p-10 sm:pt-28">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The Olivet Community
                </p>

                <p className="mt-3 max-w-lg text-xl font-medium leading-8 text-white sm:text-2xl">
                  Generations of people connected by a shared school
                  experience.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <div
                data-aos="fade-left"
                data-aos-delay="100"
                className="overflow-hidden"
              >
                <img
                  src="/images/olivetNOSA-student.jpg"
                  alt="Olivet student"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div
                data-aos="fade-left"
                data-aos-delay="150"
                className="grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2"
              >
                <div>
                  <Trophy
                    size={21}
                    strokeWidth={1.5}
                    className="text-[var(--primary)]"
                  />

                  <h3 className="mt-4 text-lg font-semibold">
                    Tradition
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    The customs and memories that make the Olivet experience
                    recognisable across generations.
                  </p>
                </div>

                <div>
                  <Users
                    size={21}
                    strokeWidth={1.5}
                    className="text-[var(--primary)]"
                  />

                  <h3 className="mt-4 text-lg font-semibold">
                    Community
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    A network of people whose connection with Olivet continues
                    beyond their years at school.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          07 · HOUSE SYSTEM
      ========================================================= */}
      <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The House System
                </span>
              </div>

              <h2 className="mt-7 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                A tradition of
                <span className="block text-[var(--primary)]">
                  belonging and competition.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                The house system forms part of the wider Olivet experience,
                giving students another sense of identity, teamwork and
                participation within school life.
              </p>

              <div className="mt-10 overflow-hidden">
                <img
                  src="/images/olivetNOSA.jpg"
                  alt="Olivet Baptist High School"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <div className="border-t border-slate-300">
                {houses.map((house, index) => (
                  <div
                    key={house.name}
                    className="group grid gap-4 border-b border-slate-300 py-7 sm:grid-cols-[70px_1fr_auto] sm:items-start sm:gap-8"
                  >
                    <span className="text-sm font-semibold text-[var(--secondary)]">
                      0{index + 1}
                    </span>

                    <div>
                      <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-[var(--primary)]">
                        {house.name}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                        {house.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="mt-1 hidden text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)] sm:block"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          08 · OLIVET TODAY
      ========================================================= */}
      <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid overflow-hidden bg-[var(--primary-dark)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-h-[420px] overflow-hidden">
              <img
                src="/images/olivetNOSA-2.jpg"
                alt="Olivet Baptist High School"
                className="h-full w-full object-cover"
              />
            </div>

            <div
              data-aos="fade-left"
              className="flex items-center p-8 sm:p-10 lg:p-14"
            >
              <div>
                <div className="flex items-center gap-3">
                  <Landmark
                    size={18}
                    strokeWidth={1.5}
                    className="text-[var(--secondary)]"
                  />

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                    Olivet Today
                  </p>
                </div>

                <h2 className="mt-7 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  The story continues.
                  <span className="block text-white/45">
                    New generations, same foundation.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                  Olivet Baptist High School continues to educate and prepare
                  young people while carrying a history that stretches back to
                  1945.
                </p>

                <div className="mt-10 border-t border-white/10 pt-7">
                  <p className="font-serif text-2xl italic text-white sm:text-3xl">
                    Cum Christo Progredere
                  </p>

                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                    Forward with Christ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          09 · OLIVET & NOSA
      ========================================================= */}
      <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div
            data-aos="fade-up"
            className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  From School To Association
                </span>
              </div>

              <h2 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                The connection does not end
                <span className="block text-[var(--primary)]">
                  when school ends.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                OlivetNOSA provides a way for former students to remain
                connected with one another, preserve the history of the school
                and contribute to the continuing Olivet community.
              </p>
            </div>

            <Link
              to="/about-nosa"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
            >
              Discover OlivetNOSA

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mx-auto mt-20 max-w-4xl text-center"
          >
            <p className="font-serif text-2xl italic leading-relaxed text-[var(--primary-dark)] sm:text-3xl lg:text-4xl">
              A history worth remembering.
              <span className="text-[var(--primary)]">
                {" "}
                A future worth building.
              </span>
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[var(--secondary)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Olivet Baptist High School
              </span>

              <span className="h-px w-8 bg-[var(--secondary)]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Footer />
    </main>
  );
};

export default AboutSchool;