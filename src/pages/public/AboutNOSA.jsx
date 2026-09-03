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
  User
} from "lucide-react";
const AboutNOSA = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* =========================
    ABOUT NOSA — HERO
========================= */}

      <section
        className="relative overflow-hidden bg-[var(--background-soft)]"
      >
        {/* =========================
      HERO IMAGE
  ========================= */}

        <div className="absolute inset-0">
          <img
            src="/images/olivetNOSA-6.jpg"
            alt="OlivetNOSA alumni community"
            className="h-full w-full object-cover"
          />

          {/* Overall image treatment */}
          <div className="
    absolute inset-0
    bg-gradient-to-r
    from-[var(--primary-dark)]/95
    via-[var(--primary)]/65
    to-[var(--secondary)]/20
  " />

          {/* Top navigation protection */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--primary-dark)]/20 to-transparent" />
        </div>


        {/* =========================
      NAVBAR
  ========================= */}

        <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
          <div

          >
            <Navbar />
          </div>
        </header>


        {/* =========================
      HERO CONTENT
  ========================= */}

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-12 lg:pb-20 lg:pt-32">

          {/* LEFT */}
          <div className="relative z-10">

            <div
              data-aos="fade-right"
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-[var(--secondary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                National Old Students Association
              </span>
            </div>


            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.8rem]"
            >
              We left Olivet.

              <span className="mt-2 block text-[var(--secondary)]">
                But Olivet
              </span>

              <span className="block text-white">
                never left us.
              </span>
            </h1>


            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-8 max-w-xl text-base leading-8 text-white sm:text-lg"
            >
              Across generations, professions and continents, OlivetNOSA keeps
              the Olivetian connection alive — bringing old students together
              to reconnect, give back and build what comes next.
            </p>


            {/* CTA */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#association"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--primary-dark)]"
              >
                Explore NOSA
                <ArrowDown size={16} />
              </a>

              <a
                href="/join"
                className="inline-flex items-center justify-center rounded-full border border-[var(--primary)]/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[var(--primary)] backdrop-blur-md transition hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
              >
                Join the Community
              </a>
            </div>


            {/* STATS */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5"
            >

              <div>
                <p className="text-2xl font-semibold tracking-tight text-[var(--secondary)]">
                  1976
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  NOSA Founded
                </p>
              </div>


              <div className="hidden h-10 w-px bg-[var(--primary)]/15 sm:block" />


              <div>
                <p className="text-2xl font-semibold tracking-tight text-[var(--secondary)]">
                  1945
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Olivet Legacy
                </p>
              </div>


              <div className="hidden h-10 w-px bg-[var(--primary)]/15 sm:block" />


              <div>
                <p className="text-2xl font-semibold tracking-tight text-[var(--secondary)]">
                  ∞
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Generations Connected
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT IMAGE */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="relative mx-auto w-full max-w-xl lg:ml-auto"
          >

            {/* Decorative circle */}
            <div
              className="absolute -right-5 -top-5 h-40 w-40 rounded-full border border-[var(--secondary)]/30"
            />

            <div
              className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[var(--secondary)]/10"
            />


            {/* Main image */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[var(--primary-dark)] shadow-2xl">

              <img
                 src="/images/olivetNOSA-6.jpg"
            alt="OlivetNOSA alumni community"
           
                className="h-[520px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[600px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/80 via-transparent to-transparent" />


              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The Olivetian Connection
                </p>

                <p className="mt-3 max-w-sm text-lg font-medium leading-7 text-white sm:text-xl">
                  Different generations. One shared identity.
                </p>

              </div>

            </div>


            {/* Floating year card */}
            <div
              data-aos="zoom-in"
              data-aos-delay="500"
              className="absolute -left-5 top-10 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-xl backdrop-blur-xl sm:-left-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Since
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-[var(--primary)]">
                1976
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Connecting Olivetians
              </p>
            </div>


            {/* Floating community card */}
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="absolute -bottom-5 -right-4 rounded-2xl border border-white/20 bg-[var(--primary)] p-5 shadow-xl sm:-right-8"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Users
                    size={20}
                    strokeWidth={1.7}
                    className="text-[var(--secondary)]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    One Community
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Year Sets · Chapters · Alumni
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>


        {/* =========================
      BOTTOM STATEMENT
  ========================= */}

        <div
          data-aos="fade-up"
          data-aos-delay="700"
          className="relative z-10 border-t border-(--primary)/10 bg-white/60 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">

            <p className="max-w-2xl text-sm leading-6 text-(--primary)">
              A living network of Olivetians committed to friendship, service,
              development and the future of our alma mater.
            </p>

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Cum Christo Progredere
            </span>

          </div>
        </div>

      </section>



      {/* =========================
    ABOUT NOSA — WHY WE EXIST
========================= */}

<section
  id="association"
  className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Top label */}
    <div
      data-aos="fade-right"
      className="mb-14 flex items-center gap-3"
    >
      <span className="h-px w-10 bg-[var(--secondary)]" />

      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/50">
        02 · Why We Exist
      </span>
    </div>


    {/* Main statement */}
    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

      {/* Left */}
      <div data-aos="fade-up">

        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
          The Olivetian Bond
        </p>

        <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
          What connects us
          <span className="block text-[var(--primary)]/45">
            is bigger than where we live.
          </span>
        </h2>

      </div>


      {/* Right */}
      <div data-aos="fade-up" data-aos-delay="150">

        <p className="max-w-2xl text-xl leading-9 tracking-[-0.015em] text-[var(--primary)] sm:text-2xl sm:leading-10">
          NOSA exists to keep the Olivetian family connected long after
          graduation — creating a community where old friendships can
          continue, experiences can be shared and every generation can
          contribute to the future of our alma mater.
        </p>

        <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text-muted)]">
          From Year Sets and Chapters to national gatherings and development
          initiatives, the association provides a platform for Olivetians
          to reconnect, support one another and give back to the institution
          that helped shape who they became.
        </p>

      </div>

    </div>


    {/* Three pillars */}
    <div
      data-aos="fade-up"
      data-aos-delay="250"
      className="mt-20 grid border-t border-[var(--primary)]/10 sm:grid-cols-3"
    >

      {/* Pillar 1 */}
      <div className="border-b border-[var(--primary)]/10 py-8 sm:border-b-0 sm:border-r sm:pr-8 lg:py-10">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/5">
          <UsersRound
            size={20}
            strokeWidth={1.7}
            className="text-[var(--primary)]"
          />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          01
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--primary)]">
          Reconnect
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-muted)]">
          Bring generations of Olivetians back into one connected community.
        </p>

      </div>


      {/* Pillar 2 */}
      <div className="border-b border-[var(--primary)]/10 py-8 sm:border-b-0 sm:border-r sm:px-8 lg:py-10">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)]/10">
          <Globe2
            size={20}
            strokeWidth={1.7}
            className="text-[var(--secondary)]"
          />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          02
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--primary)]">
          Engage
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-muted)]">
          Create meaningful opportunities to participate, share and support
          one another.
        </p>

      </div>


      {/* Pillar 3 */}
      <div className="py-8 sm:pl-8 lg:py-10">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/5">
          <Landmark
            size={20}
            strokeWidth={1.7}
            className="text-[var(--primary)]"
          />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
          03
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--primary)]">
          Give Back
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-muted)]">
          Turn the strength of the alumni community into lasting impact for
          Olivet and future generations.
        </p>

      </div>

    </div>

  </div>
</section>


{/* =========================
    ABOUT NOSA — OUR COMMUNITY
========================= */}

<section className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-36">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Header */}
    <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/50">
            03 · Our Community
          </span>
        </div>
      </div>

      <div data-aos="fade-up">

        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
          One Olivetian family.
          <span className="block text-[var(--primary)]/40">
            Many stories. One connection.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          NOSA connects former students across generations, professions,
          locations and experiences — creating a community that remains
          connected long after the school years are over.
        </p>

      </div>

    </div>


    {/* Community Cards */}
    <div className="mt-20 grid gap-5 md:grid-cols-3">

      {/* MEMBERS */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group relative min-h-[390px] overflow-hidden rounded-[2rem] bg-[var(--primary)] p-8 shadow-sm transition duration-500 hover:-translate-y-1 lg:p-10"
      >

        {/* Number */}
        <div className="absolute right-8 top-8 text-6xl font-semibold tracking-[-0.06em] text-white/5">
          01
        </div>

        <div className="relative z-10 flex h-full flex-col">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <User
              size={23}
              strokeWidth={1.6}
              className="text-[var(--secondary)]"
            />
          </div>

          <div className="mt-auto">

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              The Individual
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Members
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              Every Olivetian has a place in the community — with a profile,
              a story, a history and a role in the future of NOSA.
            </p>

          </div>

        </div>
      </div>


      {/* YEAR SETS */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[var(--primary)]/10 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-1 lg:p-10"
      >

        <div className="absolute right-8 top-8 text-6xl font-semibold tracking-[-0.06em] text-[var(--primary)]/5">
          02
        </div>

        <div className="relative z-10 flex h-full flex-col">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary)]/10">
            <GraduationCap
              size={23}
              strokeWidth={1.6}
              className="text-[var(--secondary)]"
            />
          </div>

          <div className="mt-auto">

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Generations
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--primary)]">
              Year Sets
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--text-muted)]">
              From one graduating generation to another, Year Sets preserve
              the friendships, memories and identity formed at Olivet.
            </p>

          </div>

        </div>
      </div>


      {/* CHAPTERS */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group relative min-h-[390px] overflow-hidden rounded-[2rem] bg-[var(--secondary)] p-8 shadow-sm transition duration-500 hover:-translate-y-1 lg:p-10"
      >

        <div className="absolute right-8 top-8 text-6xl font-semibold tracking-[-0.06em] text-[var(--primary)]/10">
          03
        </div>

        <div className="relative z-10 flex h-full flex-col">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
            <Globe2
              size={23}
              strokeWidth={1.6}
              className="text-[var(--primary)]"
            />
          </div>

          <div className="mt-auto">

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--primary)]/60">
              Beyond Oyo
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--primary)]">
              Chapters
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--primary)]/65">
              Wherever Olivetians find themselves, Chapters create local
              communities that keep the wider NOSA family close.
            </p>

          </div>

        </div>
      </div>

    </div>


    {/* Bottom statement */}
    <div
      data-aos="fade-up"
      data-aos-delay="400"
      className="mt-10 flex flex-col gap-5 border-t border-[var(--primary)]/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
    >

      <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
        Different paths may take us in different directions. NOSA gives
        Olivetians a reason to keep finding their way back to one another.
      </p>

      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]/40">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
        Members · Year Sets · Chapters
      </div>

    </div>

  </div>
</section>



{/* =========================
    ABOUT NOSA — WHAT WE DO
========================= */}

<section className="relative overflow-hidden bg-[var(--primary-dark)] py-24 text-white sm:py-28 lg:py-36">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Header */}
    <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            04 · What We Do
          </span>
        </div>
      </div>

      <div data-aos="fade-up">

        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
          Staying connected
          <span className="block text-white/35">
            is only the beginning.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
          NOSA turns the strength of the Olivetian community into meaningful
          connection, support and lasting impact — for today's members and
          for generations yet to come.
        </p>

      </div>

    </div>


    {/* Main Content */}
    <div className="mt-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

      {/* Image */}
      <div
        data-aos="fade-right"
        className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-black/20"
      >

        <img
          src="/images/olivetNOSA-6.jpg"
          alt="Olivet NOSA community"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 sm:p-10">

          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            The Work Continues
          </p>

          <p className="mt-3 max-w-md text-2xl font-medium leading-8 tracking-tight text-white">
            Every generation has a part to play in the Olivet story.
          </p>

        </div>

      </div>


      {/* Activities */}
      <div className="divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/[0.03]">

        {/* Connect */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="group p-7 transition hover:bg-white/[0.04] sm:p-9"
        >

          <div className="flex gap-6">

            <span className="pt-1 text-xs font-semibold text-[var(--secondary)]">
              01
            </span>

            <div className="flex-1">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Connect
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    Reconnect former classmates, strengthen friendships and
                    create opportunities for Olivetians across generations
                    to remain part of the community.
                  </p>
                </div>

                <UsersRound
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--secondary)]"
                />

              </div>

            </div>
          </div>
        </div>


        {/* Support */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="group p-7 transition hover:bg-white/[0.04] sm:p-9"
        >

          <div className="flex gap-6">

            <span className="pt-1 text-xs font-semibold text-[var(--secondary)]">
              02
            </span>

            <div className="flex-1">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Support
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    Build a community where members can share experience,
                    encourage one another and find meaningful ways to
                    participate in the wider Olivetian network.
                  </p>
                </div>

                <Users
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--secondary)]"
                />

              </div>

            </div>
          </div>
        </div>


        {/* Develop */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="group p-7 transition hover:bg-white/[0.04] sm:p-9"
        >

          <div className="flex gap-6">

            <span className="pt-1 text-xs font-semibold text-[var(--secondary)]">
              03
            </span>

            <div className="flex-1">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Develop
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    Channel alumni commitment into projects and initiatives
                    that contribute to the continued development of Olivet
                    and its community.
                  </p>
                </div>

                <Landmark
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--secondary)]"
                />

              </div>

            </div>
          </div>
        </div>


        {/* Celebrate */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="group p-7 transition hover:bg-white/[0.04] sm:p-9"
        >

          <div className="flex gap-6">

            <span className="pt-1 text-xs font-semibold text-[var(--secondary)]">
              04
            </span>

            <div className="flex-1">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Celebrate
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    Honour the people, memories, achievements and milestones
                    that continue to shape the Olivetian identity.
                  </p>
                </div>

                <GraduationCap
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--secondary)]"
                />

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>


    {/* Bottom line */}
    <div
      data-aos="fade-up"
      data-aos-delay="500"
      className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
    >

      <p className="max-w-xl text-sm leading-7 text-white/40">
        From the relationships we maintain to the projects we build,
        NOSA keeps the Olivetian spirit active beyond the school gates.
      </p>

      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]/70">
        Connection · Service · Legacy
      </span>

    </div>

  </div>
</section>




{/* =========================
    ABOUT NOSA — LEADERSHIP
========================= */}

<section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Header */}
    <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">

      <div data-aos="fade-right">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/45">
            05 · Leadership
          </span>
        </div>
      </div>

      <div data-aos="fade-up">

        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
          Guided by experience.
          <span className="block text-[var(--primary)]/40">
            Driven by the future.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          NOSA's leadership provides the direction, coordination and
          stewardship needed to keep generations of Olivetians connected
          and moving forward together.
        </p>

      </div>

    </div>


    {/* Leadership Feature */}
    <div className="mt-20 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

      {/* Main leadership statement */}
      <div
        data-aos="fade-up"
        className="relative overflow-hidden rounded-[2rem] bg-[var(--primary)] p-8 sm:p-10 lg:p-14"
      >

        {/* Decorative number */}
        <span className="absolute -right-5 -top-12 text-[12rem] font-bold leading-none tracking-[-0.08em] text-white/[0.035]">
          05
        </span>

        <div className="relative z-10 flex min-h-[420px] flex-col justify-between">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Leadership & Service
            </p>

            <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              Leadership at NOSA is
              <span className="text-white/40"> service to the community.</span>
            </h3>

          </div>


          <div className="mt-12">

            <p className="max-w-xl text-base leading-8 text-white/55">
              From the national executive to the wider leadership structure,
              NOSA depends on committed Olivetians who give their time,
              experience and energy to strengthen the association and
              advance its purpose.
            </p>

            <div className="mt-8 flex items-center gap-3">

              <div className="h-px w-12 bg-[var(--secondary)]" />

              <span className="text-xs font-medium text-white/45">
                Serving the Olivetian community
              </span>

            </div>

          </div>

        </div>
      </div>


      {/* Leadership Structure */}
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="rounded-[2rem] border border-[var(--primary)]/10 bg-[var(--background-soft)] p-8 sm:p-10"
      >

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              The Structure
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--primary)]">
              One leadership team.
            </h3>
          </div>

          <Landmark
            size={24}
            strokeWidth={1.5}
            className="text-[var(--primary)]/30"
          />

        </div>


        <div className="mt-10 space-y-0">

          {/* Item */}
          <div className="flex items-center gap-5 border-t border-[var(--primary)]/10 py-5">

            <span className="text-xs font-semibold text-[var(--secondary)]">
              01
            </span>

            <div>
              <p className="text-sm font-semibold text-[var(--primary)]">
                National Leadership
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Providing direction across the association
              </p>
            </div>

          </div>


          <div className="flex items-center gap-5 border-t border-[var(--primary)]/10 py-5">

            <span className="text-xs font-semibold text-[var(--secondary)]">
              02
            </span>

            <div>
              <p className="text-sm font-semibold text-[var(--primary)]">
                Chapters
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Building community at the local level
              </p>
            </div>

          </div>


          <div className="flex items-center gap-5 border-t border-[var(--primary)]/10 py-5">

            <span className="text-xs font-semibold text-[var(--secondary)]">
              03
            </span>

            <div>
              <p className="text-sm font-semibold text-[var(--primary)]">
                Year Sets
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Preserving generation-to-generation connection
              </p>
            </div>

          </div>


          <div className="flex items-center gap-5 border-y border-[var(--primary)]/10 py-5">

            <span className="text-xs font-semibold text-[var(--secondary)]">
              04
            </span>

            <div>
              <p className="text-sm font-semibold text-[var(--primary)]">
                Members
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                The people who make NOSA what it is
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>


    {/* Leadership principle */}
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="mt-10 flex flex-col gap-6 rounded-[1.5rem] border border-[var(--primary)]/10 bg-[var(--background-soft)] px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)]/10">
          <Users
            size={19}
            strokeWidth={1.6}
            className="text-[var(--secondary)]"
          />
        </div>

        <p className="text-sm leading-6 text-[var(--primary)]/65">
          Strong leadership keeps the community connected.
          <span className="font-semibold text-[var(--primary)]">
            {" "}Shared purpose keeps it moving.
          </span>
        </p>

      </div>

      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]/35">
        Leadership · Service · Stewardship
      </span>

    </div>

  </div>
</section>







{/* =========================
    SECTION 06 — OUR CHAPTERS
========================= */}
<section
  id="chapters"
  className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-36"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Label */}
    <div
      data-aos="fade-right"
      className="mb-14 flex items-center gap-3"
    >
      <span className="h-px w-10 bg-[var(--secondary)]" />

      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/50">
        06 · Our Chapters
      </span>
    </div>

    <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

      {/* LEFT — CONTENT */}
      <div data-aos="fade-up">

        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
          Community, Wherever We Are
        </p>

        <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
          Wherever Olivetians gather,
          <span className="block text-[var(--primary)]/40">
            the connection continues.
          </span>
        </h2>

        <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
          Our Chapters bring the Olivetian community closer to home. They
          create spaces where old students can reconnect, build friendships,
          share experiences and keep the spirit of Olivet alive within their
          communities.
        </p>

        <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)]">
          From local gatherings to wider NOSA initiatives, Chapters give
          members a way to stay involved while remaining connected to the
          larger Olivetian family.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white">
            <UsersRound size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">
              Local communities
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              One network. Many places. One Olivetian identity.
            </p>
          </div>
        </div>
      </div>


      {/* RIGHT — NETWORK VISUAL */}
      <div
        data-aos="fade-left"
        data-aos-delay="150"
        className="relative"
      >

        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[var(--primary)] p-6 shadow-2xl sm:p-8">

          {/* Decorative Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(var(--secondary) 1px, transparent 1px), linear-gradient(90deg, var(--secondary) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          {/* Glow */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--secondary)]/20 blur-3xl" />

          <div className="relative flex h-full min-h-[420px] items-center justify-center">

            {/* Connection Lines */}
            <div className="absolute left-[20%] top-[28%] h-px w-[60%] rotate-[18deg] bg-[var(--secondary)]/30" />
            <div className="absolute left-[25%] top-[55%] h-px w-[50%] -rotate-[20deg] bg-[var(--secondary)]/30" />
            <div className="absolute left-[38%] top-[38%] h-[34%] w-px rotate-[25deg] bg-[var(--secondary)]/30" />

            {/* Central Community */}
            <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[var(--secondary)]/50 bg-[var(--primary-dark)] shadow-2xl">

              <Globe2
                size={34}
                strokeWidth={1.5}
                className="text-[var(--secondary)]"
              />

              <span className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                NOSA
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
                One Community
              </span>

            </div>


            {/* Chapter Nodes */}
            <div className="absolute left-[10%] top-[18%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-4 border-[var(--primary)] bg-[var(--secondary)] shadow-[0_0_0_8px_rgba(201,162,39,0.12)]" />
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                Chapter
              </span>
            </div>

            <div className="absolute right-[12%] top-[25%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-4 border-[var(--primary)] bg-[var(--secondary)] shadow-[0_0_0_8px_rgba(201,162,39,0.12)]" />
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                Chapter
              </span>
            </div>

            <div className="absolute bottom-[18%] left-[18%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-4 border-[var(--primary)] bg-[var(--secondary)] shadow-[0_0_0_8px_rgba(201,162,39,0.12)]" />
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                Chapter
              </span>
            </div>

            <div className="absolute bottom-[14%] right-[20%] flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-4 border-[var(--primary)] bg-[var(--secondary)] shadow-[0_0_0_8px_rgba(201,162,39,0.12)]" />
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                Chapter
              </span>
            </div>

            {/* Bottom Label */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                Connected across communities
              </span>

              <ArrowDown
                size={16}
                className="rotate-[-45deg] text-[var(--secondary)]"
              />
            </div>

          </div>
        </div>


        {/* Floating Quote */}
        <div
          className="
            absolute
            -bottom-6
            left-6
            max-w-xs
            rounded-2xl
            border
            border-[var(--primary)]/10
            bg-white
            p-5
            shadow-xl
            sm:left-10
          "
        >
          <p className="text-sm leading-6 text-[var(--primary)]">
            “The strength of NOSA is found in the people who continue to
            show up for one another.”
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]/45">
              Olivetian Community
            </span>
          </div>
        </div>

      </div>
    </div>


    {/* Bottom Statement */}
    <div
      data-aos="fade-up"
      data-aos-delay="250"
      className="mt-24 border-t border-[var(--primary)]/10 pt-8"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

        <p className="max-w-2xl text-xl leading-8 tracking-[-0.02em] text-[var(--primary)] sm:text-2xl">
          A Chapter may begin in one place,
          <span className="text-[var(--primary)]/40">
            {" "}but its connection reaches far beyond it.
          </span>
        </p>

        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
          Community · Connection · Belonging
        </span>

      </div>
    </div>

  </div>
</section>







{/* =========================
    SECTION 07 — OUR YEAR SETS
========================= */}
<section
  id="year-sets"
  className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Label */}
    <div
      data-aos="fade-right"
      className="mb-14 flex items-center gap-3"
    >
      <span className="h-px w-10 bg-[var(--secondary)]" />

      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/50">
        07 · Our Year Sets
      </span>
    </div>

    {/* INTRO */}
    <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">

      <div data-aos="fade-up">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
          Generations Connected
        </p>

        <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
          Different years.
          <span className="block text-[var(--primary)]/40">
            One Olivetian story.
          </span>
        </h2>
      </div>

      <div data-aos="fade-up" data-aos-delay="120">
        <p className="max-w-xl text-lg leading-8 text-[var(--text-muted)]">
          Every graduating set carries its own memories, friendships and
          experiences. Together, those generations form the living history
          of the Olivetian community.
        </p>
      </div>

    </div>


    {/* GENERATION TIMELINE */}
    <div
      data-aos="fade-up"
      data-aos-delay="180"
      className="relative mt-20"
    >

      {/* Desktop Line */}
      <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-[var(--primary)]/10 lg:block" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* SET 01 */}
        <div className="group relative">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[var(--primary)] p-7 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Generation
              </span>

              <span className="text-sm text-white/30">
                01
              </span>
            </div>

            <div className="mt-20">
              <p className="text-5xl font-semibold tracking-[-0.05em]">
                Year
              </p>

              <p className="mt-1 text-3xl font-medium text-white/40">
                Sets
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-sm leading-6 text-white/60">
                Each set preserves the friendships and memories formed
                during the Olivet years.
              </p>
            </div>

          </div>
        </div>


        {/* SET 02 */}
        <div className="group relative lg:mt-12">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--primary)]/10 bg-[var(--background-soft)] p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Memories
              </span>

              <span className="text-sm text-[var(--primary)]/20">
                02
              </span>
            </div>

            <div className="mt-20">
              <p className="text-5xl font-semibold tracking-[-0.05em] text-[var(--primary)]">
                Shared
              </p>

              <p className="mt-1 text-3xl font-medium text-[var(--primary)]/35">
                Experiences
              </p>
            </div>

            <div className="mt-8 border-t border-[var(--primary)]/10 pt-5">
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                From classrooms and assemblies to lifelong friendships,
                every generation has a story worth remembering.
              </p>
            </div>

          </div>
        </div>


        {/* SET 03 */}
        <div className="group relative">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[var(--secondary)] p-7 text-[var(--primary)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]/60">
                Connection
              </span>

              <span className="text-sm text-[var(--primary)]/25">
                03
              </span>
            </div>

            <div className="mt-20">
              <p className="text-5xl font-semibold tracking-[-0.05em]">
                Then
              </p>

              <p className="mt-1 text-3xl font-medium text-[var(--primary)]/40">
                & Now
              </p>
            </div>

            <div className="mt-8 border-t border-[var(--primary)]/15 pt-5">
              <p className="text-sm leading-6 text-[var(--primary)]/70">
                Year Sets help generations stay connected long after
                their final day at Olivet.
              </p>
            </div>

          </div>
        </div>


        {/* SET 04 */}
        <div className="group relative lg:mt-12">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--primary)]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Legacy
              </span>

              <span className="text-sm text-[var(--primary)]/20">
                04
              </span>
            </div>

            <div className="mt-20">
              <p className="text-5xl font-semibold tracking-[-0.05em] text-[var(--primary)]">
                Future
              </p>

              <p className="mt-1 text-3xl font-medium text-[var(--primary)]/35">
                Generations
              </p>
            </div>

            <div className="mt-8 border-t border-[var(--primary)]/10 pt-5">
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                What one generation builds becomes part of the story
                inherited by the next.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>


    {/* BOTTOM STATEMENT */}
    <div
      data-aos="fade-up"
      data-aos-delay="280"
      className="mt-20 grid gap-8 border-t border-[var(--primary)]/10 pt-8 lg:grid-cols-[1fr_auto]"
    >

      <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em] text-[var(--primary)] sm:text-2xl">
        From the earliest generations of Olivetians to those joining the
        community today, every Year Set adds another chapter to a story
        that continues to grow.
      </p>

      <div className="flex items-end">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
          Memories · Generations · Legacy
        </span>
      </div>

    </div>

  </div>
</section>








{/* =========================
    SECTION 08 — THE FUTURE
========================= */}
<section
  id="future"
  className="relative overflow-hidden bg-[var(--primary-dark)] py-24 text-white sm:py-28 lg:py-36"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Section Label */}
    <div
      data-aos="fade-right"
      className="mb-16 flex items-center gap-3"
    >
      <span className="h-px w-10 bg-[var(--secondary)]" />

      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
        08 · The Future
      </span>
    </div>


    {/* MAIN CONTENT */}
    <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">

      {/* LEFT */}
      <div data-aos="fade-up">

        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
          Looking Ahead
        </p>

        <h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
          The next chapter
          <span className="block text-white/35">
            belongs to us.
          </span>
        </h2>

      </div>


      {/* RIGHT */}
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="lg:pb-3"
      >
        <p className="max-w-xl text-lg leading-8 text-white/65 sm:text-xl">
          NOSA continues to evolve with its members. The future is about
          building stronger connections, creating greater opportunities for
          engagement and turning the collective strength of Olivetians into
          meaningful impact.
        </p>

        <p className="mt-6 max-w-xl text-base leading-7 text-white/40">
          As new generations join the community, the responsibility remains
          the same — preserve what matters, strengthen what exists and build
          something worthy of those who come after us.
        </p>
      </div>

    </div>


    {/* FUTURE PILLARS */}
    <div
      data-aos="fade-up"
      data-aos-delay="220"
      className="mt-20 grid border-y border-white/10 sm:grid-cols-3"
    >

      {/* 01 */}
      <div className="group border-b border-white/10 px-2 py-10 sm:border-b-0 sm:border-r sm:px-8 lg:px-10">

        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
          01
        </span>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
          Stronger Connections
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
          Creating better ways for Olivetians across generations and
          locations to stay connected and involved.
        </p>

      </div>


      {/* 02 */}
      <div className="group border-b border-white/10 px-2 py-10 sm:border-b-0 sm:border-r sm:px-8 lg:px-10">

        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
          02
        </span>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
          Greater Impact
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
          Turning the collective knowledge, resources and commitment of the
          alumni community into lasting value.
        </p>

      </div>


      {/* 03 */}
      <div className="group px-2 py-10 sm:px-8 lg:px-10">

        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--secondary)]">
          03
        </span>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
          A Living Legacy
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
          Ensuring that the Olivetian spirit continues to inspire and
          connect generations yet to come.
        </p>

      </div>

    </div>


    {/* LARGE STATEMENT */}
    <div
      data-aos="fade-up"
      data-aos-delay="300"
      className="mt-24 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start"
    >

      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--secondary)]/40">
        <span className="text-xl font-semibold text-[var(--secondary)]">
          ∞
        </span>
      </div>

      <div>
        <p className="max-w-5xl text-2xl font-medium leading-9 tracking-[-0.025em] text-white/85 sm:text-3xl lg:text-4xl lg:leading-[1.25]">
          We are not simply preserving the past.
          <span className="text-white/35">
            {" "}We are building the connections, opportunities and legacy
            that future Olivetians will inherit.
          </span>
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
            Cum Christo Progredere
          </span>
        </div>
      </div>

    </div>

  </div>


  {/* Decorative Background */}
  <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

  <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[var(--primary)] blur-3xl" />

</section>










{/* =========================
    SECTION 09 — JOIN THE COMMUNITY
========================= */}
<section
  id="join"
  className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    <div
      data-aos="fade-up"
      className="relative overflow-hidden rounded-[2.5rem] bg-[var(--primary)] px-7 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24"
    >

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/olivetNOSA-2.jpg"
          alt="OlivetNOSA community"
          className="h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[var(--primary-dark)]/85" />

        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/80 via-transparent to-[var(--secondary)]/15" />
      </div>


      {/* Decorative Circle */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[var(--secondary)]/20" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[var(--secondary)]/10" />


      {/* Content */}
      <div className="relative z-10 max-w-4xl">

        <div
          data-aos="fade-right"
          data-aos-delay="100"
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
            09 · Join the Community
          </span>
        </div>


        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-10 text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]"
        >
          Your Olivetian Story Continues
        </p>


        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl"
        >
          Stay connected.
          <span className="block text-white/35">
            Stay Olivetian.
          </span>
        </h2>


        <p
          data-aos="fade-up"
          data-aos-delay="250"
          className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl"
        >
          NOSA is more than an association. It is a community built on
          shared memories, enduring friendships and a commitment to the
          future of Olivet.
        </p>


        {/* CTA */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >

          <a
            href="/join-nosa"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Join NOSA

            <ArrowDown
              size={17}
              className="rotate-[-45deg]"
            />
          </a>


          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            Get in Touch
          </a>

        </div>

      </div>


      {/* Bottom Identity */}
      <div
        data-aos="fade-up"
        data-aos-delay="350"
        className="relative z-10 mt-20 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center"
      >

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
            National Old Students Association
          </p>

          <p className="mt-2 text-sm text-white/50">
            Connecting generations since 1976.
          </p>
        </div>

        <span className="text-sm font-medium italic text-[var(--secondary)]">
          Cum Christo Progredere
        </span>

      </div>

    </div>

  </div>
</section>







      <Footer />
    </main>
  )
}

export default AboutNOSA