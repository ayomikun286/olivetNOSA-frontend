import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Trophy,
  MessageCircle,
  Users,
  Star,
} from "lucide-react";

const Programs = () => {
  return (
    <>
      <PageTitle title="Programs | OlivetNOSA" />

      <Navbar />

      <main className="bg-white text-[var(--primary-dark)]">

        {/* =====================================================
            01 — HERO
        ====================================================== */}
        <section className="relative overflow-hidden bg-[var(--background-soft)] pt-32 sm:pt-36 lg:pt-40">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="grid items-end gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

              {/* TEXT */}
              <div
                data-aos="fade-up"
                className="pb-10 lg:pb-20"
              >
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Programs & Student Life
                </p>

                <h1 className="max-w-4xl text-5xl font-light leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-6xl lg:text-[5.3rem]">
                  Learning that reaches beyond the classroom.
                </h1>

                <p className="mt-8 max-w-2xl text-lg font-light leading-[1.75] text-[var(--text-muted)]">
                  At Olivet, education is more than what happens during a
                  lesson. Students are encouraged to discover, participate,
                  compete, create and grow into people who can make a
                  meaningful difference.
                </p>

                <div className="mt-10 flex items-center gap-3 text-sm font-medium text-[var(--primary)]">
                  <span>Explore student life</span>
                  <ArrowDown size={16} strokeWidth={1.6} />
                </div>
              </div>

              {/* IMAGE */}
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="relative"
              >
                <div className="overflow-hidden">
                  <img
                    src="/images/olivetNOSA-4.jpg"
                    alt="Students and school life at Olivet Baptist High School"
                    className="h-[28rem] w-full object-cover sm:h-[34rem]"
                  />
                </div>

                <div className="absolute bottom-0 left-0 bg-white px-6 py-5 sm:px-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Olivet Baptist High School
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--primary)]">
                    Learning · Character · Community
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="h-16 sm:h-20" />
        </section>


        {/* =====================================================
            02 — ACADEMIC LIFE
        ====================================================== */}
        <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="mb-14 flex items-end justify-between gap-8">

              <div data-aos="fade-up">

               

                <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.12] tracking-[-0.025em] text-[var(--primary-dark)] sm:text-5xl">
                  Knowledge with purpose.
                </h2>

              </div>

              <BookOpen
                size={34}
                strokeWidth={1}
                className="hidden text-[var(--primary)]/30 sm:block"
              />

            </div>


            <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-20">

              {/* IMAGE */}
              <div
                data-aos="fade-right"
                className="relative"
              >
                <img
                  src="/images/olivetNOSA-3.jpg"
                  alt="Academic life at Olivet Baptist High School"
                  className="h-[30rem] w-full object-cover"
                />

                <div className="absolute -bottom-8 right-0 hidden w-52 bg-[var(--primary)] p-6 text-white sm:block">
                  <p className="text-3xl font-light">1945</p>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    A tradition of education that continues across generations.
                  </p>
                </div>
              </div>


              {/* TEXT */}
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="lg:pt-8"
              >

                <p className="max-w-2xl text-2xl font-light leading-[1.5] text-[var(--primary)] sm:text-3xl">
                  Olivet's academic experience is built around more than
                  passing examinations. It is about helping students think,
                  communicate, question and apply what they learn.
                </p>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                  Students take part in academic enrichment through quizzes,
                  competitions, debate, oral presentations and science-related
                  activities. These experiences give students opportunities to
                  develop confidence while putting classroom knowledge into
                  practice.
                </p>


                <div className="mt-12 border-t border-slate-200 pt-8">

                  <div className="grid gap-8 sm:grid-cols-3">

                    <div>
                      <p className="text-sm font-semibold text-[var(--primary)]">
                        Academic learning
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Building strong foundations for further education.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--primary)]">
                        Enrichment
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Opportunities to learn beyond ordinary lessons.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--primary)]">
                        Competition
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Healthy challenges that build confidence and discipline.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            03 — JETS / SCIENCE
        ====================================================== */}
        <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">

              <div data-aos="fade-up">

                

                <h2 className="mt-4 max-w-2xl text-4xl font-light leading-[1.12] tracking-[-0.025em] text-[var(--primary-dark)] sm:text-5xl">
                  Where curiosity becomes discovery.
                </h2>

                <p className="mt-7 max-w-xl text-lg font-light leading-8 text-[var(--text-muted)]">
                  Through science and technology activities, students have
                  opportunities to move from simply learning ideas to asking
                  what they can do with them.
                </p>

                <div className="mt-10 flex items-start gap-4 border-l border-[var(--secondary)] pl-5">

                  <FlaskConical
                    size={24}
                    strokeWidth={1.4}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />

                  <div>
                    <p className="font-semibold text-[var(--primary)]">
                      JETS Club
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Olivet's Junior Engineers, Technicians and Scientists
                      Club has taken part in science activities and achieved
                      recognition at the Oyo State Science Fair.
                    </p>
                  </div>

                </div>

              </div>


              {/* OVERLAPPING IMAGES */}
              <div
                data-aos="fade-left"
                data-aos-delay="150"
                className="relative min-h-[31rem]"
              >

                <img
                  src="/images/olivetNOSA-2.jpg"
                  alt="Students participating in learning activities"
                  className="absolute right-0 top-0 h-[24rem] w-[78%] object-cover"
                />

                <img
                  src="/images/olivetNOSA-3.jpg"
                  alt="Olivet school community"
                  className="absolute bottom-0 left-0 h-52 w-[55%] border-[12px] border-[var(--background-soft)] object-cover"
                />

                <div className="absolute bottom-16 right-0 bg-white px-5 py-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Curiosity
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--primary)]">
                    Discovery through doing
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            04 — SPORT
        ====================================================== */}
        <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-end lg:gap-20">

              <div data-aos="fade-right">

                

                <h2 className="mt-4 text-4xl font-light leading-[1.12] tracking-[-0.025em] text-[var(--primary-dark)] sm:text-5xl">
                  The spirit of competition.
                </h2>

              </div>

              <p
                data-aos="fade-up"
                className="max-w-2xl text-lg font-light leading-8 text-[var(--text-muted)]"
              >
                Sport is part of Olivet's long tradition of developing
                discipline, teamwork and healthy competition. Football in
                particular continues to be part of student life, alongside a
                broader sporting tradition that has shaped the school's
                history.
              </p>

            </div>


            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="mt-14"
            >

              <div className="relative overflow-hidden">

                <img
                  src="/images/olivetNOSA-11.jpg"
                  alt="Olivet students participating in sport"
                  className="h-[28rem] w-full object-cover sm:h-[38rem]"
                />

                <div className="absolute bottom-0 left-0 max-w-md bg-white p-7 sm:p-9">

                  <div className="flex items-center gap-3">

                    <Trophy
                      size={22}
                      strokeWidth={1.4}
                      className="text-[var(--secondary)]"
                    />

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      Sporting life
                    </p>

                  </div>

                  <p className="mt-4 text-xl font-light leading-8 text-[var(--primary-dark)]">
                    Competition teaches lessons that stay with us long after
                    the final whistle.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            05 — EXPRESSION
        ====================================================== */}
        <section className="overflow-hidden bg-[var(--primary-dark)] py-24 text-white sm:py-28 lg:py-32">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-24">

              <div data-aos="fade-up">

               
                <h2 className="mt-4 max-w-xl text-4xl font-light leading-[1.12] tracking-[-0.025em] sm:text-5xl">
                  Find your voice.
                </h2>

              </div>


              <div data-aos="fade-up" data-aos-delay="150">

                <p className="max-w-2xl text-2xl font-light leading-[1.5] text-white/90">
                  Debate, drama, quizzes and oral presentations give students
                  space to think for themselves and express what they know.
                </p>

                <p className="mt-8 max-w-2xl text-base leading-8 text-white/60">
                  These activities help students become clearer communicators,
                  more confident participants and better listeners. Learning
                  becomes something they actively experience rather than
                  something they simply receive.
                </p>


                <div className="mt-12 grid border-t border-white/10 sm:grid-cols-3">

                  <div className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:pr-7">
                    <MessageCircle
                      size={22}
                      strokeWidth={1.4}
                      className="text-[var(--secondary)]"
                    />
                    <p className="mt-4 font-medium">
                      Debate
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Learn to reason, listen and speak with confidence.
                    </p>
                  </div>

                  <div className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:px-7">
                    <BookOpen
                      size={22}
                      strokeWidth={1.4}
                      className="text-[var(--secondary)]"
                    />
                    <p className="mt-4 font-medium">
                      Quizzes
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Turn knowledge into healthy academic challenge.
                    </p>
                  </div>

                  <div className="py-7 sm:pl-7">
                    <Star
                      size={22}
                      strokeWidth={1.4}
                      className="text-[var(--secondary)]"
                    />
                    <p className="mt-4 font-medium">
                      Drama
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Create, perform and discover confidence.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            06 — HOUSE LIFE
        ====================================================== */}
        <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">

              <div data-aos="fade-up">

               
                <h2 className="mt-4 max-w-2xl text-4xl font-light leading-[1.12] tracking-[-0.025em] text-[var(--primary-dark)] sm:text-5xl">
                  Belonging is part of growing.
                </h2>

                <p className="mt-7 max-w-xl text-lg font-light leading-8 text-[var(--text-muted)]">
                  Olivet's house system brings students together beyond their
                  ordinary classroom groups. Through participation and healthy
                  competition, students learn teamwork, responsibility and
                  school spirit.
                </p>

                <Link
                  to="/about-school#houses"
                  className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                >
                  Explore the house system

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>


              <div
                data-aos="fade-left"
                data-aos-delay="150"
                className="border-l border-slate-200 pl-7 sm:pl-10"
              >

                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  House life
                </p>

                <div className="mt-7 space-y-0">

                  <div className="border-t border-slate-200 py-5">
                    <p className="font-medium text-[var(--primary)]">
                      Teamwork
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Working together toward something shared.
                    </p>
                  </div>

                  <div className="border-t border-slate-200 py-5">
                    <p className="font-medium text-[var(--primary)]">
                      Healthy competition
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Learning to compete with discipline and respect.
                    </p>
                  </div>

                  <div className="border-y border-slate-200 py-5">
                    <p className="font-medium text-[var(--primary)]">
                      School spirit
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Building memories and friendships across generations.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            07 — CHARACTER & LEADERSHIP
        ====================================================== */}
        <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">

          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">

            <div data-aos="fade-up">

             

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-light leading-[1.12] tracking-[-0.025em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                Education that stays with you.
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-8 text-[var(--text-muted)]">
                The goal is not simply to prepare students for the next
                examination. It is to help them develop the confidence,
                discipline, responsibility and character to take their place
                in the world.
              </p>

            </div>


            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="mx-auto mt-14 grid max-w-3xl border-y border-slate-200 sm:grid-cols-3"
            >

              <div className="px-5 py-8 sm:border-r sm:border-slate-200">
                <p className="text-2xl font-light text-[var(--primary)]">
                  Learn
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Build knowledge and understanding.
                </p>
              </div>

              <div className="border-y border-slate-200 px-5 py-8 sm:border-y-0 sm:border-r">
                <p className="text-2xl font-light text-[var(--primary)]">
                  Participate
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Discover strengths through experience.
                </p>
              </div>

              <div className="px-5 py-8">
                <p className="text-2xl font-light text-[var(--primary)]">
                  Lead
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Carry responsibility beyond school.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            08 — LIFE ON THE HEIGHTS
        ====================================================== */}
        <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

            <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:items-end lg:gap-20">

              <div data-aos="fade-up">

                

                <h2 className="mt-4 max-w-xl text-4xl font-light leading-[1.12] tracking-[-0.025em] text-[var(--primary-dark)] sm:text-5xl">
                  Life on the Heights.
                </h2>

              </div>

              <div data-aos="fade-up" data-aos-delay="150">

                <p className="max-w-2xl text-lg font-light leading-8 text-[var(--text-muted)]">
                  The Olivet experience is made up of ordinary moments too:
                  friendships, activities, competitions, lessons and the
                  memories students carry with them long after they leave.
                </p>

              </div>

            </div>


            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-14 grid gap-4 sm:grid-cols-2"
            >

              <img
                src="/images/olivetNOSA-6.jpg"
                alt="Olivet school community"
                className="h-80 w-full object-cover sm:h-[28rem]"
              />

              <div className="grid gap-4">

                <img
                  src="/images/olivetNOSA-10.jpg"
                  alt="Students at Olivet Baptist High School"
                  className="h-56 w-full object-cover sm:h-64"
                />

                <div className="flex flex-1 items-end border-l border-slate-200 px-6 py-6 sm:px-8">

                  <p className="max-w-md text-xl font-light leading-8 text-[var(--primary)]">
                    A school experience is remembered not only for what was
                    taught, but for how it made you grow.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            CLOSING
        ====================================================== */}
        <section className="overflow-hidden bg-[var(--primary-dark)] py-24 text-white sm:py-28 lg:py-32">

          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">

            <div data-aos="fade-up">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                The Olivet Experience
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-light leading-[1.12] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                There is more to an Olivet education than the classroom.
              </h2>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                <Link
                  to="/gallery"
                  className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-[var(--primary-dark)]"
                >
                  View the Gallery

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/about-school"
                  className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
                >
                  Explore Olivet

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Programs;