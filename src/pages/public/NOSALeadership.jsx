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

const NOSALeadership = () => {
  return (
    <main className="min-h-screen bg-white">

     {/* =========================
    HERO — NOSA LEADERSHIP
========================= */}
<section
  className="relative min-h-[90vh] overflow-hidden bg-[var(--primary-dark)]"
>
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/olivetNOSA-6.jpg"
      alt="OlivetNOSA leadership and alumni community"
      className="h-full w-full object-cover"
    />

    {/* Primary + Secondary Overlay */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-r
        from-[var(--primary-dark)]/95
        via-[var(--primary)]/80
        to-[var(--secondary)]/20
      "
    />

    {/* Bottom Depth */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-[var(--primary-dark)]/90
        via-transparent
        to-[var(--primary-dark)]/30
      "
    />
  </div>


  {/* Navbar */}
  <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
    <div
     
    >
      <Navbar />
    </div>
  </header>


  {/* Hero Content */}
  <div
    className="
      relative
      z-10
      mx-auto
      flex
      min-h-[90vh]
      max-w-7xl
      items-end
      px-5
      pb-20
      pt-36
      sm:px-8
      sm:pb-24
      lg:px-12
      lg:pb-28
    "
  >

    <div className="max-w-4xl">

      {/* Eyebrow */}
      <div
        data-aos="fade-right"
        className="flex items-center gap-3"
      >
        <span className="h-px w-10 bg-[var(--secondary)]" />

        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
          NOSA Leadership
        </span>
      </div>


      {/* Small Label */}
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-[var(--secondary)]"
      >
        Leadership · Service · Stewardship
      </p>


      {/* Heading */}
      <h1
        data-aos="fade-up"
        data-aos-delay="150"
        className="
          mt-5
          max-w-4xl
          text-5xl
          font-semibold
          leading-[0.94]
          tracking-[-0.05em]
          text-white
          sm:text-6xl
          lg:text-8xl
        "
      >
        Guided by experience.
        <span className="block text-white/35">
          Driven by purpose.
        </span>
      </h1>


      {/* Description */}
      <p
        data-aos="fade-up"
        data-aos-delay="220"
        className="
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-white/70
          sm:text-xl
        "
      >
        NOSA leadership exists to serve the Olivetian community —
        providing direction, strengthening connections and helping
        turn shared commitment into meaningful impact.
      </p>


      {/* Bottom Meta */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
      >

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            National Old Students Association
          </span>
        </div>


        <div className="hidden h-4 w-px bg-white/20 sm:block" />


        <span className="text-xs uppercase tracking-[0.2em] text-white/35">
          Serving the Olivetian Community
        </span>

      </div>

    </div>

  </div>


  {/* Bottom Scroll Indicator */}
  <div
    className="
      absolute
      bottom-7
      left-5
      z-10
      flex
      items-center
      gap-3
      text-white/40
      sm:left-8
      lg:left-12
    "
  >
    <ArrowDown size={16} />

    <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
      Explore Leadership
    </span>
  </div>

</section>


      {/* =========================
          SECTION 02 — PHILOSOPHY
      ========================= */}
      <section className="bg-white py-24 sm:py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div
            data-aos="fade-right"
            className="mb-14 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[var(--secondary)]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/45">
              02 · Our Approach
            </span>
          </div>


          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

            {/* Heading */}
            <div data-aos="fade-up">

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
                Leading Together
              </p>

              <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
                The community
                <span className="block text-[var(--primary)]/35">
                  comes first.
                </span>
              </h2>

            </div>


            {/* Copy */}
            <div
              data-aos="fade-up"
              data-aos-delay="120"
            >

              <p className="max-w-2xl text-xl leading-9 text-[var(--primary)] sm:text-2xl sm:leading-10">
                Effective leadership keeps an association connected,
                accountable and focused on the people it exists to serve.
              </p>

              <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text-muted)]">
                At NOSA, leadership brings together different generations,
                experiences and perspectives around a shared Olivetian
                identity. It provides the coordination needed to keep the
                association moving while ensuring that members remain at
                the heart of its work.
              </p>

            </div>

          </div>


          {/* Principles */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-20 grid border-t border-[var(--primary)]/10 sm:grid-cols-3"
          >

            {/* Collaboration */}
            <div className="border-b border-[var(--primary)]/10 py-9 sm:border-b-0 sm:border-r sm:pr-10">

              <Network
                size={23}
                className="text-[var(--secondary)]"
              />

              <h3 className="mt-5 text-xl font-semibold text-[var(--primary)]">
                Collaboration
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Bringing members, Year Sets and Chapters together around
                shared goals.
              </p>

            </div>


            {/* Service */}
            <div className="border-b border-[var(--primary)]/10 py-9 sm:border-b-0 sm:border-r sm:px-10">

              <HeartHandshake
                size={23}
                className="text-[var(--secondary)]"
              />

              <h3 className="mt-5 text-xl font-semibold text-[var(--primary)]">
                Service
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Giving time, knowledge and energy to strengthen the
                Olivetian community.
              </p>

            </div>


            {/* Stewardship */}
            <div className="py-9 sm:pl-10">

              <ShieldCheck
                size={23}
                className="text-[var(--secondary)]"
              />

              <h3 className="mt-5 text-xl font-semibold text-[var(--primary)]">
                Stewardship
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Protecting the values, relationships and legacy entrusted
                to the association.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SECTION 03 — LEADERSHIP
      ========================= */}
      <section className="bg-[var(--background-soft)] py-24 sm:py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* Heading */}
          <div
            data-aos="fade-up"
            className="max-w-3xl"
          >

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/40">
              03 · Leadership
            </span>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
              People entrusted
              <span className="block text-[var(--primary)]/35">
                with the Olivetian community.
              </span>
            </h2>

          </div>


          {/* Leadership Feature */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mt-16 grid overflow-hidden rounded-[2rem] bg-[var(--primary)] lg:grid-cols-[0.85fr_1.15fr]"
          >

            {/* Image */}
            <div className="relative min-h-[420px]">

              <img
                src="/images/olivetNOSA.jpg"
                alt="National NOSA leadership"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 sm:bottom-9 sm:left-9">

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  NOSA
                </span>

                <p className="mt-2 text-2xl font-semibold text-white">
                  National Leadership
                </p>

              </div>

            </div>


            {/* Content */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Leadership in Action
              </span>

              <h3 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                Leading the association.
                <span className="block text-white/35">
                  Serving the generations.
                </span>
              </h3>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/55">
                NOSA's leadership structure brings together committed
                Olivetians who help coordinate the association's activities,
                strengthen member engagement and advance initiatives that
                benefit the wider community.
              </p>

              <div className="mt-10 border-t border-white/10 pt-6">

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                    Service · Direction · Unity
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-[var(--secondary)]"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SECTION 04 — STRUCTURE
      ========================= */}
      <section className="bg-white py-24 sm:py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">

            {/* Heading */}
            <div data-aos="fade-right">

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/40">
                04 · How We Work
              </span>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--primary)] sm:text-5xl lg:text-6xl">
                One association.
                <span className="block text-[var(--primary)]/35">
                  Shared responsibility.
                </span>
              </h2>

            </div>


            {/* Structure */}
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="divide-y divide-[var(--primary)]/10 border-y border-[var(--primary)]/10"
            >

              {/* Item */}
              <div className="flex gap-6 py-8">

                <span className="text-xs font-semibold text-[var(--secondary)]">
                  01
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)]">
                    National Leadership
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    Providing direction and coordination across the wider
                    association.
                  </p>
                </div>

              </div>


              <div className="flex gap-6 py-8">

                <span className="text-xs font-semibold text-[var(--secondary)]">
                  02
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)]">
                    Chapters
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    Strengthening local communities and keeping members
                    connected wherever they are.
                  </p>
                </div>

              </div>


              <div className="flex gap-6 py-8">

                <span className="text-xs font-semibold text-[var(--secondary)]">
                  03
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)]">
                    Year Sets
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    Preserving relationships and strengthening
                    generation-to-generation connections.
                  </p>
                </div>

              </div>


              <div className="flex gap-6 py-8">

                <span className="text-xs font-semibold text-[var(--secondary)]">
                  04
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)]">
                    Members
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    The people whose participation, ideas and commitment
                    give NOSA its strength.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SECTION 05 — SERVICE
      ========================= */}
      <section className="relative overflow-hidden bg-[var(--primary-dark)] py-24 text-white sm:py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">

            {/* Text */}
            <div data-aos="fade-up">

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
                Leadership as Service
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Leadership is not simply about holding a position.
                <span className="text-white/30">
                  {" "}It is about accepting responsibility for the
                  community we share.
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/50">
                The strength of NOSA depends on Olivetians who are willing
                to contribute their experience, ideas and time. Leadership
                creates the framework for that contribution to become
                coordinated action.
              </p>

            </div>


            {/* Quote Card */}
            <div
              data-aos="fade-left"
              data-aos-delay="150"
              className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm sm:p-9"
            >

              <HeartHandshake
                size={28}
                className="text-[var(--secondary)]"
              />

              <p className="mt-7 text-2xl font-medium leading-9 text-white/85">
                “The future of an association is shaped by the people
                willing to serve it.”
              </p>

              <div className="mt-8 flex items-center gap-3">

                <span className="h-px w-8 bg-[var(--secondary)]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                  Olivetian Leadership
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SECTION 06 — CTA
      ========================= */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div
            data-aos="fade-up"
            className="border-t border-[var(--primary)]/10 pt-14"
          >

            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

              <div>

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]/40">
                  06 · The Community
                </span>

                <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-[var(--primary)] sm:text-5xl lg:text-7xl">
                  Leadership starts with
                  <span className="block text-[var(--primary)]/30">
                    people who care.
                  </span>
                </h2>

              </div>


              <a
                href="/about/nosa"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--primary)] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--primary-dark)] hover:shadow-xl"
              >
                Back to About NOSA

                <ArrowUpRight size={17} />

              </a>

            </div>


            <div className="mt-16 flex flex-col justify-between gap-5 border-t border-[var(--primary)]/10 pt-6 sm:flex-row sm:items-center">

              <p className="text-sm text-[var(--text-muted)]">
                National Old Students Association
              </p>

              <span className="text-sm font-medium italic text-[var(--secondary)]">
                Cum Christo Progredere
              </span>

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </main>
  );
};

export default NOSALeadership;