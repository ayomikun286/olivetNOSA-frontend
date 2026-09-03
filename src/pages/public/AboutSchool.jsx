import React from 'react'
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";


import {
  ArrowDown,
  Users,
  UsersRound,
  Globe2,
  Landmark,
  GraduationCap,
  School,
} from "lucide-react";
const AboutSchool = () => {
  return (
    <main className="min-h-screen bg-white">
     

      {/* =========================
    ABOUT SCHOOL — HERO
========================= */}
<section
style={{ backgroundImage: `url("/images/olivetNOSA-2.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
className="relative min-h-[78vh] overflow-hidden bg-[var(--primary-dark)]">
  {/* Background Image */}
  <div className="absolute inset-0">
    {/* Replace with your actual Olivet campus image */}
    <img
      src="/images/olivet-school.jpg"
      alt="Olivet Baptist High School, Oyo"
      className="h-full w-full object-cover"
    />
  </div>

  {/* Dark overlays */}
  <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/75 to-[var(--primary-dark)]/25" />

  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />



 <header className="fixed left-0 right-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12">
                    <Navbar />
                </header>

  {/* Content */}
  <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-end px-5 pb-20 pt-40 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
    <div className="max-w-4xl">

      {/* Eyebrow */}
      <div
        data-aos="fade-right"
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-px w-10 bg-[var(--secondary)]" />

        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
          About Olivet
        </span>
      </div>

      {/* Heading */}
      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        A legacy built on
        <span className="block text-[var(--secondary)]">
          faith, knowledge
        </span>
        <span className="block text-white/80">
          & character.
        </span>
      </h1>

      {/* Description */}
      <p
        data-aos="fade-up"
        data-aos-delay="200"
        className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
      >
        Discover the story, values and heritage of Olivet Baptist High School —
        a tradition of excellence that has shaped generations since 1945.
      </p>

      {/* Bottom Information */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center"
      >
        {/* Established */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md">
            <span className="text-sm font-bold text-[var(--secondary)]">
              45
            </span>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Established
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              1945
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-white/15 sm:block" />

        {/* Location */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Location
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            Olivet Heights · Oyo, Nigeria
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div
    data-aos="fade-up"
    data-aos-delay="500"
    className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 text-white/40 lg:flex lg:right-12"
  >
    <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
      Explore the story
    </span>

    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
      <ArrowDown size={14} />
    </div>
  </div>
</section>







{/* =========================
    WHERE THE STORY BEGAN
========================= */}
<section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Intro */}
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            01 · The Beginning
          </span>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
          Where the story
          <span className="block text-[var(--primary)]">
            began.
          </span>
        </h2>
      </div>

    </div>

    {/* Main Story */}
    <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">

      {/* Image */}
      <div
        data-aos="fade-right"
        className="relative"
      >
        <div className="absolute -left-5 -top-5 h-28 w-28 rounded-[1.75rem] bg-[var(--primary-light)]" />

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--background-soft)]">
          <img
            src="/images/olivetNOSA-am.jpg"
            alt="Olivet Baptist High School historical photograph"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/70 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-7 sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Oyo, Nigeria
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              Since 1945
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="max-w-2xl space-y-6 text-base leading-8 text-[var(--text-muted)] sm:text-lg"
        >
          <p>
            In 1945, a vision for education took root in Oyo. The institution
            that would become Olivet Baptist High School began with a belief
            that education should do more than prepare students for
            examinations.
          </p>

          <p>
            It was established as{" "}
            <strong className="font-semibold text-[var(--primary-dark)]">
              Oyo Baptist Boys' High School
            </strong>
            , beginning its journey at Oke-Isokun under the American Southern
            Baptist Mission.
          </p>

          <p>
            As the school grew, so did its ambitions. A new home was eventually
            established on{" "}
            <strong className="font-semibold text-[var(--primary-dark)]">
              Olivet Heights
            </strong>
            — a setting that would become closely connected with the identity,
            memories and experiences of generations of Olivetians.
          </p>

          <p>
            Decades later, the institution continues to stand as a place where
            knowledge, character, faith and ambition come together.
          </p>
        </div>

        {/* Motto */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="mt-10 flex items-start gap-5 border-t border-slate-200 pt-8"
        >
          <div className="mt-1 h-10 w-1 rounded-full bg-[var(--secondary)]" />

          <div>
            <p className="font-serif text-xl italic text-[var(--primary-dark)] sm:text-2xl">
              Cum Christo Progredere
            </p>

            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Forward with Christ
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* Historical Markers */}
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="mt-20 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--background-soft)] sm:grid-cols-3"
    >

      <div className="border-b border-slate-200 p-7 sm:border-b-0 sm:border-r sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          1945
        </p>

        <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
          A Vision Takes Root
        </h3>

        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          The institution begins its journey in Oyo.
        </p>
      </div>

      <div className="border-b border-slate-200 p-7 sm:border-b-0 sm:border-r sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          Oke-Isokun
        </p>

        <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
          The Early Years
        </h3>

        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          The early school community grows around its original setting.
        </p>
      </div>

      <div className="p-7 sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          Olivet Heights
        </p>

        <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
          A Home for Generations
        </h3>

        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          A permanent home becomes part of the Olivet story.
        </p>
      </div>

    </div>

  </div>
</section>





<section className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Intro */}
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            02 · The Olivet Experience
          </span>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
          It was never just
          <span className="block text-[var(--primary)]">
            about the classroom.
          </span>
        </h2>
      </div>

    </div>


    {/* Statement */}
    <div
      data-aos="fade-up"
      data-aos-delay="150"
      className="mt-16 max-w-4xl"
    >
      <p className="text-xl leading-9 text-[var(--text-muted)] sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.6]">
        For generations, Olivet has been a place where young people
        discovered more than knowledge. It was where friendships began,
        character was shaped, and experiences were carried far beyond
        the school gates.
      </p>
    </div>


    {/* Three Pillars */}
    <div className="mt-20 grid border-y border-slate-200 md:grid-cols-3">

      {/* Learning */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group border-b border-slate-200 py-10 md:border-b-0 md:border-r md:pr-10 lg:py-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
          01
        </span>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--primary-dark)]">
          Learning
        </h3>

        <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
          A foundation built on knowledge, curiosity and the discipline
          to keep growing beyond the classroom.
        </p>

        <div className="mt-7 h-px w-0 bg-[var(--secondary)] transition-all duration-500 group-hover:w-12" />
      </div>


      {/* Character */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group border-b border-slate-200 py-10 md:border-b-0 md:border-r md:px-10 lg:py-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
          02
        </span>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--primary-dark)]">
          Character
        </h3>

        <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
          Lessons in responsibility, discipline and values that continue
          to influence Olivetians long after graduation.
        </p>

        <div className="mt-7 h-px w-0 bg-[var(--secondary)] transition-all duration-500 group-hover:w-12" />
      </div>


      {/* Community */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group py-10 md:pl-10 lg:py-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
          03
        </span>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--primary-dark)]">
          Community
        </h3>

        <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
          A shared identity that connects classmates, generations and
          Olivetians wherever life takes them.
        </p>

        <div className="mt-7 h-px w-0 bg-[var(--secondary)] transition-all duration-500 group-hover:w-12" />
      </div>

    </div>


    {/* Closing Statement */}
    <div
      data-aos="fade-up"
      data-aos-delay="350"
      className="mt-16 flex flex-col gap-6 border-l-2 border-[var(--secondary)] pl-6 sm:pl-8 lg:max-w-3xl"
    >
      <p className="font-serif text-2xl italic leading-relaxed text-[var(--primary-dark)] sm:text-3xl">
        "The years may pass, but what is built here stays with you."
      </p>

      <p className="text-sm leading-6 text-[var(--text-muted)]">
        The Olivet experience continues through the lives, friendships
        and contributions of those who have called the school home.
      </p>
    </div>

  </div>
</section>








<section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Intro */}
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            03 · Through the Years
          </span>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
          Every generation
          <span className="block text-[var(--primary)]">
            added a chapter.
          </span>
        </h2>
      </div>

    </div>


    {/* Intro Text */}
    <div
      data-aos="fade-up"
      data-aos-delay="150"
      className="mt-14 max-w-3xl"
    >
      <p className="text-lg leading-8 text-[var(--text-muted)] sm:text-xl sm:leading-9">
        From its beginnings in 1945, Olivet has continued to evolve with
        each generation of students. Different faces, different times,
        different journeys — but a shared connection to the same place.
      </p>
    </div>


    {/* Timeline */}
    <div className="relative mt-20">

      {/* Timeline Line */}
      <div className="absolute left-0 right-0 top-3 hidden h-px bg-slate-200 lg:block" />

      <div className="grid gap-12 lg:grid-cols-5 lg:gap-6">

        {/* 1945 */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="relative lg:pt-10"
        >
          <div className="absolute left-0 top-0 hidden h-6 w-6 rounded-full border-4 border-white bg-[var(--secondary)] shadow-sm lg:block" />

          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
            1945
          </p>

          <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
            The Beginning
          </h3>

          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            A new educational journey begins in Oyo.
          </p>
        </div>


        {/* 1950s */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="relative lg:pt-10"
        >
          <div className="absolute left-0 top-0 hidden h-6 w-6 rounded-full border-4 border-white bg-[var(--secondary)] shadow-sm lg:block" />

          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
            1950s
          </p>

          <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
            A Growing School
          </h3>

          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            The school develops and welcomes new generations of students.
          </p>
        </div>


        {/* 1970s */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative lg:pt-10"
        >
          <div className="absolute left-0 top-0 hidden h-6 w-6 rounded-full border-4 border-white bg-[var(--secondary)] shadow-sm lg:block" />

          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
            1970s
          </p>

          <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
            New Generations
          </h3>

          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            Another generation carries the Olivet experience into a changing world.
          </p>
        </div>


        {/* 1990s */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="relative lg:pt-10"
        >
          <div className="absolute left-0 top-0 hidden h-6 w-6 rounded-full border-4 border-white bg-[var(--secondary)] shadow-sm lg:block" />

          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
            1990s
          </p>

          <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
            Beyond the Gates
          </h3>

          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            Olivetians take their education, friendships and values further into the world.
          </p>
        </div>


        {/* Today */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="relative lg:pt-10"
        >
          <div className="absolute left-0 top-0 hidden h-6 w-6 rounded-full border-4 border-white bg-[var(--secondary)] shadow-sm lg:block" />

          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--secondary)]">
            TODAY
          </p>

          <h3 className="mt-4 text-xl font-semibold text-[var(--primary-dark)]">
            The Legacy Continues
          </h3>

          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            New generations continue to add their own chapters to the Olivet story.
          </p>
        </div>

      </div>
    </div>


    {/* Bottom Statement */}
    <div
      data-aos="fade-up"
      data-aos-delay="350"
      className="mt-20 rounded-[2rem] bg-[var(--primary-dark)] p-8 sm:p-10 lg:p-14"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            One continuing story
          </p>

          <h3 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            Different generations. Different journeys.
            <span className="block text-white/60">
              One Olivet legacy.
            </span>
          </h3>
        </div>

        <div className="hidden h-20 w-px bg-white/10 lg:block" />

        <p className="max-w-sm text-sm leading-7 text-white/60">
          The history of Olivet is not only found in dates and buildings,
          but in the people who carried its story forward.
        </p>

      </div>
    </div>

  </div>
</section>












<section className="relative overflow-hidden bg-[var(--primary-dark)] py-24 sm:py-28 lg:py-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Intro */}
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            04 · The Olivetian
          </span>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          More than a name.
          <span className="block text-[var(--secondary)]">
            A shared identity.
          </span>
        </h2>
      </div>

    </div>


    {/* Main Statement */}
    <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">

      <div data-aos="fade-up" data-aos-delay="150">
        <p className="max-w-4xl text-2xl font-light leading-[1.55] text-white sm:text-3xl lg:text-4xl">
          To be an Olivetian is to carry a part of the school with you —
          through the friendships you made, the lessons you learned and
          the life you built afterwards.
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="250"
        className="border-l border-white/15 pl-7"
      >
        <p className="text-base leading-8 text-white/60">
          Across different generations and different paths, Olivetians
          remain connected by a shared experience that began within the
          same school community.
        </p>
      </div>

    </div>


    {/* Identity Cards */}
    <div className="mt-20 grid gap-5 md:grid-cols-3">

      {/* Memory */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:bg-white/[0.06] sm:p-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
          01
        </span>

        <h3 className="mt-10 text-2xl font-semibold text-white">
          The Memories
        </h3>

        <p className="mt-4 leading-7 text-white/55">
          The classrooms, friendships, traditions and moments that remain
          part of the Olivet experience long after school days are over.
        </p>

        <div className="mt-8 h-px w-8 bg-[var(--secondary)] transition-all duration-500 group-hover:w-14" />
      </div>


      {/* Values */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:bg-white/[0.06] sm:p-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
          02
        </span>

        <h3 className="mt-10 text-2xl font-semibold text-white">
          The Values
        </h3>

        <p className="mt-4 leading-7 text-white/55">
          The discipline, character, faith and sense of responsibility
          carried from the school into everyday life.
        </p>

        <div className="mt-8 h-px w-8 bg-[var(--secondary)] transition-all duration-500 group-hover:w-14" />
      </div>


      {/* Connection */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:bg-white/[0.06] sm:p-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
          03
        </span>

        <h3 className="mt-10 text-2xl font-semibold text-white">
          The Connection
        </h3>

        <p className="mt-4 leading-7 text-white/55">
          A bond that brings together people who may have left Olivet at
          different times, but share the same roots.
        </p>

        <div className="mt-8 h-px w-8 bg-[var(--secondary)] transition-all duration-500 group-hover:w-14" />
      </div>

    </div>


    {/* Closing Quote */}
    <div
      data-aos="fade-up"
      data-aos-delay="350"
      className="mt-20 border-t border-white/10 pt-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <p className="font-serif text-xl italic text-white/80 sm:text-2xl">
          Once an Olivetian, always part of the story.
        </p>

        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          OlivetNOSA
        </span>

      </div>
    </div>

  </div>
</section>




{/* =========================================================
    05 · THE PEOPLE
========================================================= */}

<section
  id="people-of-olivet"
  className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* SECTION HEADER */}
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            05 · The People
          </span>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
          The people who
          <span className="block text-[var(--primary)]">
            carried it forward.
          </span>
        </h2>
      </div>

    </div>


    {/* =====================================================
        FEATURED LEADERSHIP
    ===================================================== */}

    <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">

      {/* PRINCIPAL IMAGE */}
      <div
        data-aos="fade-right"
        className="relative"
      >

        {/* Decorative shape */}
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-[2rem] bg-[var(--secondary-light)]" />

        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm">

          <img
            src="/images/olivetsNOSA__ -olaojo.webp"
            alt="Mrs. Olanike Olaojo, Principal, Senior School"
            className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.02]"
          />

          {/* Image overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/60 to-transparent p-7 pt-24 sm:p-9 sm:pt-32">

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              School Leadership
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Mrs. Olanike Olaojo
            </h3>

            <p className="mt-1 text-sm text-white/60">
              Principal, Senior School
            </p>

          </div>

        </div>

      </div>


      {/* TEXT */}
      <div>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="max-w-3xl text-2xl font-light leading-[1.5] text-[var(--primary-dark)] sm:text-3xl lg:text-4xl"
        >
          Behind every generation of Olivetians are people who chose to
          teach, lead, guide and serve.
        </p>


        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[var(--text-muted)] sm:text-lg"
        >

          <p>
            From the earliest educators who helped establish the school to
            the teachers and leaders serving generations of students,
            Olivet's story has always been shaped by people.
          </p>

          <p>
            Their influence reaches beyond the classroom — helping students
            develop knowledge, character, discipline and the confidence to
            find their place in the wider world.
          </p>

        </div>


        {/* QUOTE */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-10 border-l-2 border-[var(--secondary)] pl-6"
        >

          <p className="font-serif text-xl italic leading-relaxed text-[var(--primary-dark)] sm:text-2xl">
            A school becomes a legacy through the people who give themselves
            to its story.
          </p>

        </div>

      </div>

    </div>


    {/* =====================================================
        FACES OF OLIVET
    ===================================================== */}

    <div className="mt-24">

      {/* SUB HEADER */}
      <div
        data-aos="fade-up"
        className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            Faces of Olivet
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--primary-dark)] sm:text-3xl">
            Across generations.
          </h3>

        </div>


        <p className="max-w-sm text-sm leading-6 text-[var(--text-muted)]">
          From school leadership to the wider school community, each
          generation has left its mark.
        </p>

      </div>


      {/* =====================================================
          IMAGE CARDS
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">


        {/* -------------------------------------------------
            CARD 1 — LEADERSHIP & STUDENTS
        ------------------------------------------------- */}

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[var(--primary-dark)] sm:min-h-[500px]"
          style={{
            backgroundImage: "url('/images/olivetNOSA-student.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition duration-500 group-hover:from-black/70" />


          {/* Content */}
          <div className="absolute bottom-0 left-0 p-7 sm:p-9">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
              School Community
            </p>

            <h4 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Leadership and students
            </h4>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
              A glimpse of the people who continue to shape the Olivet
              school community.
            </p>

          </div>

        </div>


        {/* -------------------------------------------------
            CARD 2 — THEN & NOW
        ------------------------------------------------- */}

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[var(--primary-dark)] sm:min-h-[500px]"
          style={{
            backgroundImage: "url('/images/olivetNOSA-building.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition duration-500 group-hover:from-black/70" />


          {/* Content */}
          <div className="absolute bottom-0 left-0 p-7 sm:p-9">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
              The Olivet Community
            </p>

            <h4 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Then and now
            </h4>

            <p className="mt-2 text-sm leading-6 text-white/65">
              A school shaped by generations, connected by one enduring
              identity.
            </p>

          </div>

        </div>

      </div>

    </div>


    {/* =====================================================
        CLOSING STATEMENT
    ===================================================== */}

    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="mt-20 border-t border-slate-200 pt-10"
    >

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <p className="max-w-3xl text-lg leading-8 text-[var(--text-muted)] sm:text-xl">
          Every teacher, leader and student adds another chapter. The people
          may change, but the responsibility of carrying Olivet forward remains.
        </p>

        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          Cum Christo Progredere
        </span>

      </div>

    </div>

  </div>
</section>


{/* =========================================================
    06 · THE HOUSE SYSTEM
========================================================= */}

<section
  id="house-system"
  className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* SECTION HEADER */}
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            06 · The House System
          </span>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-delay="100">
        <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
          Six houses.
          <span className="block text-[var(--primary)]">
            One Olivet spirit.
          </span>
        </h2>
      </div>

    </div>


    {/* =====================================================
        INTRODUCTION
    ===================================================== */}

    <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-20">

      <div data-aos="fade-up">

        <p className="max-w-3xl text-2xl font-light leading-[1.5] text-[var(--primary-dark)] sm:text-3xl lg:text-4xl">
          The House system is part of the tradition that has helped shape
          life at Olivet.
        </p>

        <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[var(--text-muted)] sm:text-lg">

          <p>
            Historically a residential school, Olivet Heights was organized
            into houses named after visionary missionaries and indigenous
            leaders.
          </p>

          <p>
            Over the years, these houses became more than names. They
            provided a sense of belonging, identity and healthy competition
            among students.
          </p>

          <p>
            Today, the House system remains part of the Olivet experience,
            bringing students together through inter-house sports, debates
            and academic competitions.
          </p>

        </div>

      </div>


      {/* STATUS CARD */}
      <div
        data-aos="fade-left"
        data-aos-delay="150"
        className="relative overflow-hidden rounded-[2rem] bg-[var(--primary-dark)] p-8 sm:p-10"
      >

        {/* Decorative element */}
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[var(--secondary)]/20" />

        <div className="relative">

          <span className="inline-flex items-center rounded-full border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
            Current Status
          </span>

          <h3 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
            The tradition continues.
          </h3>

          <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base">
            Boarding facilities are no longer active. Olivet Baptist High
            School now operates exclusively as a{" "}
            <strong className="font-semibold text-white">
              Day School
            </strong>.
          </p>

          <div className="my-7 h-px bg-white/10" />

          <p className="text-sm leading-7 text-white/65 sm:text-base">
            The House system continues to function through inter-house
            sports, debates and academic competitions.
          </p>

        </div>

      </div>

    </div>


    {/* =====================================================
        HOUSE COLLECTION
    ===================================================== */}

    <div className="mt-24">

      <div
        data-aos="fade-up"
        className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            The Six Houses
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--primary-dark)] sm:text-3xl">
            Names that carry history.
          </h3>
        </div>

        <p className="max-w-md text-sm leading-6 text-[var(--text-muted)]">
          Each house carries the name of a figure connected to Olivet's
          history and educational heritage.
        </p>

      </div>


    {/* =====================================================
    HOUSE GRID
===================================================== */}

<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


  {/* ATANDA HOUSE */}
  <div
    data-aos="fade-up"
    data-aos-delay="50"
    className="group rounded-[1.75rem] border border-slate-200 bg-[var(--background-soft)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-lg sm:p-8"
  >
    <div className="flex items-start justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition duration-300 group-hover:bg-[var(--secondary-light)] group-hover:text-[var(--primary-dark)]">
        <Users size={21} strokeWidth={1.7} />
      </div>

      <span className="rounded-full border border-[var(--secondary)]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
        Indigenous Leader
      </span>

    </div>

    <div className="mt-16">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        House
      </p>

      <h4 className="mt-2 text-2xl font-semibold text-[var(--primary-dark)]">
        Atanda House
      </h4>

    </div>
  </div>


  {/* ODETAYO HOUSE */}
  <div
    data-aos="fade-up"
    data-aos-delay="100"
    className="group rounded-[1.75rem] border border-slate-200 bg-[var(--background-soft)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-lg sm:p-8"
  >
    <div className="flex items-start justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition duration-300 group-hover:bg-[var(--secondary-light)] group-hover:text-[var(--primary-dark)]">
        <UsersRound size={21} strokeWidth={1.7} />
      </div>

      <span className="rounded-full border border-[var(--secondary)]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
        Indigenous Leader
      </span>

    </div>

    <div className="mt-16">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        House
      </p>

      <h4 className="mt-2 text-2xl font-semibold text-[var(--primary-dark)]">
        Odetayo House
      </h4>

    </div>
  </div>


  {/* LOCKET HOUSE */}
  <div
    data-aos="fade-up"
    data-aos-delay="150"
    className="group rounded-[1.75rem] border border-slate-200 bg-[var(--background-soft)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-lg sm:p-8"
  >
    <div className="flex items-start justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition duration-300 group-hover:bg-[var(--secondary-light)] group-hover:text-[var(--primary-dark)]">
        <Globe2 size={21} strokeWidth={1.7} />
      </div>

      <span className="rounded-full border border-[var(--secondary)]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
        American Missionary
      </span>

    </div>

    <div className="mt-16">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        House
      </p>

      <h4 className="mt-2 text-2xl font-semibold text-[var(--primary-dark)]">
        Locket House
      </h4>

    </div>
  </div>


  {/* PINNOCK HOUSE */}
  <div
    data-aos="fade-up"
    data-aos-delay="200"
    className="group rounded-[1.75rem] border border-slate-200 bg-[var(--background-soft)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-lg sm:p-8"
  >
    <div className="flex items-start justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition duration-300 group-hover:bg-[var(--secondary-light)] group-hover:text-[var(--primary-dark)]">
        <Landmark size={21} strokeWidth={1.7} />
      </div>

      <span className="rounded-full border border-[var(--secondary)]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
        American Missionary
      </span>

    </div>

    <div className="mt-16">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        House
      </p>

      <h4 className="mt-2 text-2xl font-semibold text-[var(--primary-dark)]">
        Pinnock House
      </h4>

    </div>
  </div>


  {/* HOMER BROWN HOUSE */}
  <div
    data-aos="fade-up"
    data-aos-delay="250"
    className="group rounded-[1.75rem] border border-slate-200 bg-[var(--background-soft)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-lg sm:p-8"
  >
    <div className="flex items-start justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition duration-300 group-hover:bg-[var(--secondary-light)] group-hover:text-[var(--primary-dark)]">
        <GraduationCap size={21} strokeWidth={1.7} />
      </div>

      <span className="rounded-full border border-[var(--secondary)]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
        American Principal
      </span>

    </div>

    <div className="mt-16">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        House
      </p>

      <h4 className="mt-2 text-2xl font-semibold text-[var(--primary-dark)]">
        Homer Brown House
      </h4>

      <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
        Named in honour of Olivet's last American principal.
      </p>

    </div>
  </div>


  {/* JBP LAFINHAN HOUSE */}
  <div
    data-aos="fade-up"
    data-aos-delay="300"
    className="group rounded-[1.75rem] border border-slate-200 bg-[var(--background-soft)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-lg sm:p-8"
  >
    <div className="flex items-start justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition duration-300 group-hover:bg-[var(--secondary-light)] group-hover:text-[var(--primary-dark)]">
        <School size={21} strokeWidth={1.7} />
      </div>

      <span className="rounded-full border border-[var(--secondary)]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
        Nigerian Principal
      </span>

    </div>

    <div className="mt-16">

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        House
      </p>

      <h4 className="mt-2 text-2xl font-semibold text-[var(--primary-dark)]">
        JBP Lafinhan House
      </h4>

      <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
        Named in honour of Olivet's first Nigerian principal.
      </p>

    </div>
  </div>

</div>

    </div>


    {/* =====================================================
        CLOSING STATEMENT
    ===================================================== */}

    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="mt-20 overflow-hidden rounded-[2rem] bg-[var(--primary-dark)] px-7 py-10 sm:px-10 sm:py-12 lg:px-14"
    >

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-3xl">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            The Olivet Spirit
          </p>

          <p className="mt-4 text-xl font-light leading-relaxed text-white sm:text-2xl">
            Competition may bring the houses together on the field,
            but the spirit of Olivet brings everyone together beyond it.
          </p>

        </div>

        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Cum Christo Progredere
        </span>

      </div>

    </div>

  </div>
</section>





{/* =========================================================
    07 · A LIVING LEGACY
========================================================= */}

<section
  id="living-legacy"
  className="relative overflow-hidden bg-[var(--primary-dark)] py-24 sm:py-28 lg:py-32"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* =====================================================
        SECTION INTRO
    ===================================================== */}

    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

      <div data-aos="fade-right">

        <div className="flex items-center gap-3">

          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            07 · A Living Legacy
          </span>

        </div>

      </div>


      <div data-aos="fade-left" data-aos-delay="100">

        <h2 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
          What began here
          <span className="block text-[var(--secondary)]">
            continues beyond.
          </span>
        </h2>

      </div>

    </div>


    {/* =====================================================
        MAIN VISUAL STORY
    ===================================================== */}

    <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">


      {/* -------------------------------------------------
          LARGE IMAGE
      ------------------------------------------------- */}

      <div
        data-aos="fade-up"
        className="group relative min-h-[480px] overflow-hidden rounded-[2rem] sm:min-h-[600px]"
      >

        <img
          src="/images/olivetNOSA-2.jpg"
          alt="Olivet Baptist High School"
          className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/20 to-transparent" />


        {/* Image caption */}
        <div className="absolute bottom-0 left-0 max-w-xl p-7 sm:p-10">

          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            Olivet Heights · Oyo
          </p>

          <p className="mt-3 text-2xl font-light leading-snug text-white sm:text-3xl">
            A place remembered by generations.
          </p>

        </div>

      </div>


      {/* -------------------------------------------------
          SIDE CONTENT
      ------------------------------------------------- */}

      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="flex flex-col rounded-[2rem] bg-white/5 p-7 ring-1 ring-white/10 sm:p-9"
      >

        <div>

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            Beyond the school years
          </span>

          <h3 className="mt-6 text-2xl font-semibold leading-tight text-white sm:text-3xl">
            The experience does not end at the gate.
          </h3>

        </div>


        <div className="mt-8 space-y-5 text-sm leading-7 text-white/60 sm:text-base">

          <p>
            For generations of students, Olivet has been more than a place
            to attend school. It has been a place where friendships were
            formed, values were shaped and memories were created.
          </p>

          <p>
            Those experiences travel with Olivetians long after their school
            years are over — into universities, professions, communities and
            families.
          </p>

          <p>
            The buildings may change and generations may come and go, but
            the connection to the place remains.
          </p>

        </div>


        {/* Small divider */}
        <div className="my-8 h-px bg-white/10" />


        {/* Small visual */}
        <div className="relative mt-auto overflow-hidden rounded-[1.5rem]">

          <img
            src="/images/olivetNOSA.jpg"
            alt="Olivet school campus"
            className="h-48 w-full object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-[var(--primary-dark)]/30" />

          <div className="absolute bottom-0 left-0 p-5">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              One place
            </p>

            <p className="mt-1 text-lg font-medium text-white">
              Many generations
            </p>

          </div>

        </div>

      </div>

    </div>


    {/* =====================================================
        LEGACY STATEMENT
    ===================================================== */}

    <div
      data-aos="fade-up"
      data-aos-delay="250"
      className="mt-20 border-y border-white/10 py-12 sm:py-16"
    >

      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            The Olivet Legacy
          </p>

        </div>


        <div>

          <p className="max-w-5xl text-2xl font-light leading-[1.4] text-white sm:text-3xl lg:text-4xl">
            A legacy is not simply what a school leaves behind.
            It is what each generation chooses to carry forward.
          </p>

        </div>

      </div>

    </div>


    {/* =====================================================
        HERITAGE DETAILS
    ===================================================== */}

    <div
      data-aos="fade-up"
      data-aos-delay="350"
      className="mt-12 grid gap-5 sm:grid-cols-3"
    >

      {/* ITEM 1 */}
      <div className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:bg-white/[0.06]">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">

          <span className="text-lg font-serif">
            01
          </span>

        </div>

        <h4 className="mt-6 text-lg font-semibold text-white">
          Remember
        </h4>

        <p className="mt-3 text-sm leading-6 text-white/50">
          The people, places and experiences that shaped generations of
          Olivetians.
        </p>

      </div>


      {/* ITEM 2 */}
      <div className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:bg-white/[0.06]">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">

          <span className="text-lg font-serif">
            02
          </span>

        </div>

        <h4 className="mt-6 text-lg font-semibold text-white">
          Connect
        </h4>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Stay connected with the people who share the Olivet experience
          across generations.
        </p>

      </div>


      {/* ITEM 3 */}
      <div className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:bg-white/[0.06]">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">

          <span className="text-lg font-serif">
            03
          </span>

        </div>

        <h4 className="mt-6 text-lg font-semibold text-white">
          Carry Forward
        </h4>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Keep the values, friendships and spirit of Olivet alive for the
          generations ahead.
        </p>

      </div>

    </div>


    {/* =====================================================
        FINAL MOTTO
    ===================================================== */}

    <div
      data-aos="fade-up"
      data-aos-delay="450"
      className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
    >

      <p className="font-serif text-2xl italic text-white/80 sm:text-3xl">
        Cum Christo Progredere
      </p>

      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
        Forward with Christ
      </span>

    </div>

  </div>
</section>



{/* =========================================================
    08 · THE STORY CONTINUES
========================================================= */}

<section
  id="story-continues"
  className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* MAIN CTA */}
    <div
      data-aos="fade-up"
      className="relative overflow-hidden rounded-[2.5rem] bg-[var(--primary-dark)]"
    >

      {/* Decorative background shapes */}
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10" />

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[var(--secondary)]/20" />

      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[var(--primary)]/20 blur-3xl" />


      {/* Content */}
      <div className="relative grid gap-12 px-7 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-16 lg:py-20">

        <div className="max-w-4xl">

          {/* Label */}
          <div className="flex items-center gap-3">

            <span className="h-px w-10 bg-[var(--secondary)]" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              08 · The Story Continues
            </span>

          </div>


          {/* Heading */}
          <h2 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            The story did not
            <span className="block text-[var(--secondary)]">
              end when you left.
            </span>
          </h2>


          {/* Text */}
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Generations have passed through Olivet's gates, carrying with
            them memories, friendships, values and experiences that remain
            part of who they are.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Today, those generations have an opportunity to remain connected,
            celebrate the school's heritage and contribute to the future of
            the Olivet community.
          </p>

        </div>


        {/* CTA */}
        <div className="lg:pb-1">

          <a
            href="/about/nosa"
            className="group inline-flex items-center gap-4 rounded-full bg-[var(--secondary)] px-6 py-4 text-sm font-semibold text-[var(--primary-dark)] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
          >

            <span>
              Discover NOSA
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-dark)] text-white transition duration-300 group-hover:translate-x-1">
              <ArrowDown
                size={16}
                className="-rotate-90"
              />
            </span>

          </a>

        </div>

      </div>

    </div>


    {/* =====================================================
        FINAL STATEMENT
    ===================================================== */}

    <div
      data-aos="fade-up"
      data-aos-delay="150"
      className="mx-auto mt-16 max-w-4xl text-center"
    >

      <p className="font-serif text-2xl italic leading-relaxed text-[var(--primary-dark)] sm:text-3xl lg:text-4xl">
        "Different generations. Different journeys.
        <span className="text-[var(--primary)]">
          {" "}One Olivet legacy.
        </span>"
      </p>

      <div className="mt-7 flex items-center justify-center gap-3">

        <span className="h-px w-8 bg-[var(--secondary)]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
          Cum Christo Progredere
        </span>

        <span className="h-px w-8 bg-[var(--secondary)]" />

      </div>

    </div>

  </div>
</section>




      <Footer/>
    </main>
  )
}

export default AboutSchool