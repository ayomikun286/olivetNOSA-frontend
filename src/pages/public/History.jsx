import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";

import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Church,
  GraduationCap,
  Landmark,
  Library,
  School,
  Trophy,
  Users,
} from "lucide-react";

const milestones = [
  {
    year: "1937",
    label: "The Proposal",
    title: "A vision for secondary education in Oyo.",
    description:
      "At an Oyo/Okeho Baptist Association meeting at Ishokun, a proposal requesting a Middle or Central School in Oyo was adopted. The initiative reflected the efforts of Baptist educators and community leaders.",
  },
  {
    year: "1941",
    label: "Site Acquisition",
    title: "Preparations move forward.",
    description:
      "The school site was acquired in 1941. Administrative hurdles followed, but the plans for the institution continued toward realization.",
  },
  {
    year: "1945",
    label: "The Beginning",
    title: "Oyo Baptist Boys' High School is launched.",
    description:
      "The school was officially launched on January 29, 1945. Its earliest operations took place in the Old Mission House at Ishokun, with an initial group of students admitted through entrance examinations.",
  },
  {
    year: "1947",
    label: "A New Home",
    title: "The Olivet Heights site opens.",
    description:
      "On September 7, 1947, the school opened at its present Olivet Heights site under Rev. G. W. Sadler, establishing the setting associated with generations of Olivet students.",
  },
  {
    year: "1951",
    label: "Boarding Life",
    title: "Boarding becomes part of school life.",
    description:
      "Boarding began in 1951. Over time, the school developed residential facilities for its students as its educational activities and population grew.",
  },
  {
    year: "1953",
    label: "Student Expression",
    title: "The Reflector is launched.",
    description:
      "The school magazine, The Reflector, was launched in 1953, forming part of a wider culture of literary, debating and extracurricular activities.",
  },
  {
    year: "1961",
    label: "Academic Development",
    title: "Higher School Certificate education begins.",
    description:
      "The Higher School Certificate programme was introduced in 1961. Its growth contributed to changes in the school's academic structure and student population.",
  },
  {
    year: "1962",
    label: "A New Name",
    title: "Oyo Baptist Boys' High School becomes Olivet Baptist High School.",
    description:
      "The institution was renamed Olivet Baptist High School in 1962. The same year, girls were introduced for the Higher School Certificate programme, according to the anniversary handbook.",
  },
  {
    year: "1969",
    label: "A New Gathering Place",
    title: "Planning begins for the Silver Jubilee Hall.",
    description:
      "In October 1969, members of staff constituted the Silver Jubilee Hall Site Committee following a request from the principal to plan for a hall and a new I.D.A. workshop.",
  },
  {
    year: "1970",
    label: "Foundation Stone",
    title: "The Silver Jubilee Hall project reaches a milestone.",
    description:
      "The foundation stone was laid on February 28, 1970, during the Silver Jubilee celebrations. The ceremony was performed by Rev. E. O. Agboola, then President of the Nigerian Baptist Convention.",
  },
  {
    year: "1972",
    label: "Dedication",
    title: "The Silver Jubilee Hall is formally opened.",
    description:
      "The hall was formally opened and dedicated on Thursday, July 6, 1972, in a programme involving education officials, Baptist Convention leaders, school staff and members of the wider school community.",
  },
];

const schoolLife = [
  {
    icon: GraduationCap,
    title: "Academic Development",
    description:
      "The school combined grammar-school education with practical subjects such as carpentry, agriculture and rural science. Science education received particular attention through laboratory facilities and the expansion of higher-level studies.",
  },
  {
    icon: Church,
    title: "Christian Foundation",
    description:
      "School life included daily devotions, Sunday worship, Sunday School, Baptist Training Union activities and annual revival services at the campus chapel.",
  },
  {
    icon: Users,
    title: "Clubs and Societies",
    description:
      "Students participated in the Dramatic Society, Literary and Debating Society, Science and other academic societies, Royal Ambassadors, Lydia Group, Choral Society, Boy Scouts and Red Cross activities.",
  },
  {
    icon: Trophy,
    title: "Sports and Competition",
    description:
      "Inter-house athletics and football formed part of school life, alongside activities such as lawn tennis, table tennis, netball and hockey. The handbook also records student achievements in athletics.",
  },
];

const ArchiveCard = ({ number, title, period, description, icon: Icon }) => (
  <article className="group flex h-full flex-col border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:border-[var(--secondary)]/50 hover:bg-white/[0.06] sm:p-8">
    <div className="flex items-start justify-between gap-4">
      <div className="flex h-12 w-12 items-center justify-center border border-white/15 text-[var(--secondary)]">
        <Icon size={21} strokeWidth={1.5} />
      </div>

      <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
        Record {number}
      </span>
    </div>

    <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
      {period}
    </p>

    <h3 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
      {title}
    </h3>

    <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
      {description}
    </p>

    <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/35">
      <BookOpen size={15} strokeWidth={1.5} />
      <span>Historical record</span>
    </div>
  </article>
);

const History = () => {
  return (
    <main className="mt-0 min-h-screen bg-white text-[var(--primary-dark)] md:mt-15">
      <PageTitle title="History of Olivet Baptist High School | OlivetGOSA" />

      <header className="absolute left-0 right-0 top-0 z-50">
        <Navbar />
      </header>

      {/* 01 — HERO */}
      <section className="relative min-h-[82vh] overflow-hidden bg-[var(--primary-dark)] sm:min-h-[88vh]">
        <div className="absolute inset-0">
          <img
            src="/images/olivetNOSA-4.jpg"
            alt="Olivet Baptist High School, Oyo"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-[var(--primary-dark)]/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/90 via-[var(--primary-dark)]/55 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl items-end px-5 pb-20 pt-36 sm:min-h-[88vh] sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
          <div className="max-w-5xl">
            <div
              data-aos="fade-right"
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[var(--secondary)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--secondary)] sm:text-xs">
                The History of Olivet
              </span>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              A legacy that
              <span className="block text-[var(--secondary)]">
                began in 1945.
              </span>
              <span className="block text-white/65">
                A story across generations.
              </span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
            >
              From its beginnings as Oyo Baptist Boys' High School to the
              institution remembered as Olivet Baptist High School, this is a
              story of education, faith, community and generations of students.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  Established
                </p>
                <p className="mt-1 text-xl font-medium text-white">1945</p>
              </div>

              <span className="hidden h-9 w-px bg-white/15 sm:block" />

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  Historical period
                </p>
                <p className="mt-1 text-xl font-medium text-white">
                  1945 onwards
                </p>
              </div>

              <span className="hidden h-9 w-px bg-white/15 sm:block" />

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  Location
                </p>
                <p className="mt-1 text-xl font-medium text-white">
                  Olivet Heights, Oyo
                </p>
              </div>
            </div>

            <a
              href="#beginnings"
              className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-white/75 transition hover:text-white"
            >
              Explore the history
              <ArrowDown size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* 02 — THE BEGINNINGS */}
      <section
        id="beginnings"
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
                Every institution has a beginning. Olivet's early story
                reflects the work of Baptist educators, local communities and
                people who believed in expanding educational opportunities.
              </p>
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                A vision for education in
                <span className="block text-[var(--primary)]">
                  Oyo, Nigeria.
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div data-aos="fade-right" className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 bg-[var(--primary-light)]" />

              <div className="relative overflow-hidden">
                <img
                  src="/images/olivetNOSA-am.jpg"
                  alt="Historical photograph associated with Olivet Baptist High School"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  From the historical record
                </p>
                <p className="text-xs font-medium text-[var(--primary)]">
                  Oyo, Nigeria
                </p>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <div className="max-w-2xl space-y-6 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                <p>
                  The historical handbook traces the school's origins to
                  conversations among educators, including Mr. Samuel Eyitayo
                  of Ilora Baptist School and Rev. Olaopa of Awe First Baptist
                  School.
                </p>

                <p>
                  In 1937, the Oyo/Okeho Baptist Association adopted a motion
                  requesting a Middle or Central School in Oyo. The proposal
                  received support from Miss Reagan, principal of Baptist
                  Academy.
                </p>

                <p>
                  Following site acquisition in 1941 and a period of
                  administrative challenges, the school was officially
                  launched on January 29, 1945, as{" "}
                  <strong className="font-semibold text-[var(--primary-dark)]">
                    Oyo Baptist Boys' High School
                  </strong>.
                </p>

                <p>
                  The school initially operated from the Old Mission House at
                  Ishokun. On September 7, 1947, the Olivet Heights site opened
                  under Rev. G. W. Sadler, becoming the school's enduring home.
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
                      The school motto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — THE EARLY COMMUNITY */}
      <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The Early Community
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Built through
                <span className="block text-[var(--primary)]">
                  shared commitment.
                </span>
              </h2>

              <p className="mt-7 text-base leading-8 text-[var(--text-muted)]">
                The school's early development depended on the efforts of
                educators, Baptist leaders, families, community members and
                supporters.
              </p>
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <div className="border-t border-slate-300">
                <article className="grid gap-4 border-b border-slate-300 py-7 sm:grid-cols-[64px_1fr] sm:gap-7">
                  <div className="flex h-11 w-11 items-center justify-center border border-slate-300 text-[var(--primary)]">
                    <Users size={20} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      The founding students
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                      The handbook records 48 students admitted through
                      examinations in December 1944 and February 1945. They
                      came from Oyo, Awe, Ilora, Okeho and surrounding areas.
                    </p>
                  </div>
                </article>

                <article className="grid gap-4 border-b border-slate-300 py-7 sm:grid-cols-[64px_1fr] sm:gap-7">
                  <div className="flex h-11 w-11 items-center justify-center border border-slate-300 text-[var(--primary)]">
                    <School size={20} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Early leadership and staff
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                      The handbook identifies T. A. Okanla as the headmaster
                      at the school's foundation, alongside S. Eyitayo as
                      first assistant master and J. O. Ogunlade as second
                      assistant master. It also records the contributions of
                      later teachers and principals.
                    </p>
                  </div>
                </article>

                <article className="grid gap-4 border-b border-slate-300 py-7 sm:grid-cols-[64px_1fr] sm:gap-7">
                  <div className="flex h-11 w-11 items-center justify-center border border-slate-300 text-[var(--primary)]">
                    <Landmark size={20} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Funding and development
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                      Local subscriptions, American Baptist Mission support
                      and government grants helped fund facilities, including
                      dormitories, an administration building, dining
                      facilities, a library, science equipment, staff
                      quarters and a chapel.
                    </p>
                  </div>
                </article>

                <article className="grid gap-4 border-b border-slate-300 py-7 sm:grid-cols-[64px_1fr] sm:gap-7">
                  <div className="flex h-11 w-11 items-center justify-center border border-slate-300 text-[var(--primary)]">
                    <Library size={20} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      A growing school
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                      The recorded student population grew from approximately
                      50 in 1945 to 350 in 1960 and 547 in 1965. The 1965
                      figure included 521 boys and 26 girls, including 118
                      Higher School Certificate students.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — EDUCATION AND SCHOOL LIFE */}
      <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl" data-aos="fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--secondary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Education and School Life
              </span>
            </div>

            <h2 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Learning beyond
              <span className="block text-[var(--primary)]">
                the classroom.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              The anniversary handbook describes a school community where
              academic work, Christian activities, student societies and
              sports all contributed to the wider educational experience.
            </p>
          </div>

          <div className="mt-14 grid gap-0 border-t border-slate-200 sm:grid-cols-2">
            {schoolLife.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                data-aos="fade-up"
                data-aos-delay={index * 75}
                className={`border-b border-slate-200 py-8 sm:p-8 ${
                  index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center border border-slate-200 text-[var(--primary)]">
                  <Icon size={21} strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                  {title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div className="overflow-hidden" data-aos="fade-right">
              <img
                src="/images/olivetNOSA-student.jpg"
                alt="Student life at Olivet"
                className="aspect-[5/3] w-full object-cover"
              />
            </div>

            <div data-aos="fade-left">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                A culture of participation
              </p>

              <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Traditions that shaped school life.
              </h3>

              <p className="mt-5 text-base leading-8 text-[var(--text-muted)]">
                The handbook names inter-house competitions, the Grier Cup,
                the Hussey Shield and several student societies. It also
                highlights athletes, including Adeleke Adeniyi, described in
                the record as “The Young Miler from Olivet Heights,” who
                represented Nigeria at Liberty Stadium in 1963.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — HISTORICAL TIMELINE */}
      <section
        id="timeline"
        className="relative overflow-hidden bg-[var(--primary-dark)] text-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="max-w-3xl" data-aos="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Through the Years
            </p>

            <h2 className="mt-5 text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Milestones in the story of Olivet.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              These milestones are drawn from the 21st Anniversary Historical
              Handbook and the 1972 Silver Jubilee Hall programme.
            </p>
          </div>

          <div className="relative mt-16 md:mt-20">
            <div className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-white/15 md:block" />

            <div className="space-y-12 md:space-y-14">
              {milestones.map((item, index) => (
                <article
                  key={`${item.year}-${item.label}`}
                  data-aos="fade-up"
                  className="relative grid gap-4 md:grid-cols-[150px_1fr] md:gap-12"
                >
                  <div className="relative">
                    <span className="absolute left-0 top-1 hidden h-4 w-4 rounded-full border-4 border-[var(--primary-dark)] bg-[var(--secondary)] md:block" />

                    <p className="text-2xl font-light tracking-tight text-white md:pl-9">
                      {item.year}
                    </p>
                  </div>

                  <div className="max-w-3xl border-b border-white/10 pb-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                      {item.label}
                    </p>

                    <h3 className="mt-3 text-2xl font-light leading-snug sm:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-light text-white">1945</p>
              <p className="mt-2 text-sm leading-6 text-white/45">
                The year the school was officially launched.
              </p>
            </div>

            <div>
              <p className="text-3xl font-light text-white">1962</p>
              <p className="mt-2 text-sm leading-6 text-white/45">
                The year the institution was renamed Olivet Baptist High
                School.
              </p>
            </div>

            <div>
              <p className="text-3xl font-light text-white">1972</p>
              <p className="mt-2 text-sm leading-6 text-white/45">
                The formal opening and dedication of the Silver Jubilee Hall.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — SILVER JUBILEE HALL */}
      <section className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div data-aos="fade-right" className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 bg-[var(--primary-light)]" />

              <div className="relative overflow-hidden">
                <img
                  src="/images/olivetNOSA-3.jpg"
                  alt="Historical school photograph"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  A school landmark
                </p>
                <p className="text-xs font-medium text-[var(--primary)]">
                  1972
                </p>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  A Landmark in School History
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                The Silver
                <span className="block text-[var(--primary)]">
                  Jubilee Hall.
                </span>
              </h2>

              <div className="mt-7 space-y-5 text-base leading-8 text-[var(--text-muted)]">
                <p>
                  The Silver Jubilee Hall project emerged from a staff
                  committee formed in October 1969. The principal had requested
                  planning for a hall and a new I.D.A. workshop. The proposed
                  hall was estimated to cost £8,000 and was positioned in the
                  academic quadrangle opposite the Blue Gate.
                </p>

                <p>
                  The programme record explains the intended role of the
                  building within school life: the chapel served as the
                  spiritual centre, the library as the intellectual centre,
                  and the hall was envisioned as a social activity centre.
                </p>

                <p>
                  Funding included contributions from parents, old boys and
                  old girls. The Lagos Branch of the Olivet Old Students
                  Association delegated a contribution of £150 in November
                  1970. The programme records voluntary donations totaling
                  £2,045:17:6d.
                </p>

                <p>
                  The foundation stone was laid on February 28, 1970. The hall
                  was formally opened and dedicated on July 6, 1972, with
                  education officials and Baptist Convention leaders taking
                  part in the ceremony.
                </p>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-7">
                <div className="flex items-start gap-4">
                  <CalendarDays
                    size={21}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-[var(--primary)]"
                  />

                  <div>
                    <p className="font-semibold text-[var(--primary-dark)]">
                      Thursday, July 6, 1972
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                      Formal opening and dedication of the Silver Jubilee
                      Hall, Olivet Heights, Oyo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — HISTORICAL ARCHIVE */}
      <section
        id="archive"
        className="overflow-hidden bg-[var(--primary-dark)] text-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div data-aos="fade-right">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  The Historical Archive
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Preserving the records.
                <span className="block text-white/50">
                  Keeping the story alive.
                </span>
              </h2>
            </div>

            <p
              data-aos="fade-left"
              data-aos-delay="100"
              className="max-w-2xl text-base leading-8 text-white/60 sm:text-lg"
            >
              Historical publications and event programmes offer a window
              into the people, decisions and milestones that shaped Olivet.
              This archive section is designed to accommodate digitized
              records as they become available.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div data-aos="fade-up">
              <ArchiveCard
                number="01"
                icon={BookOpen}
                period="1945–1966"
                title="21st Anniversary Historical Handbook"
                description="A historical account of the school's beginnings, development, community, educational activities and extracurricular life, prepared for the 21st anniversary."
              />
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <ArchiveCard
                number="02"
                icon={Landmark}
                period="July 6, 1972"
                title="Silver Jubilee Hall Opening and Dedication"
                description="The historical programme for the formal opening and dedication of the hall, including the ceremony, participants, fundraising history and details of the building project."
              />
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="mt-10 border border-dashed border-white/20 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 text-[var(--secondary)]">
                <Library size={22} strokeWidth={1.5} />
              </div>

              <div>
                <p className="text-lg font-medium text-white">
                  More historical records will be added.
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/50">
                  Original PDF documents, scanned handbooks and other
                  historical publications can be added here in a future
                  update. The archive cards currently describe the records;
                  they are not download links because the original PDF files
                  have not yet been connected to this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — CLOSING */}
      <section className="overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div data-aos="fade-up">
            <School
              size={30}
              strokeWidth={1.3}
              className="mx-auto text-[var(--primary)]"
            />

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              A Living Heritage
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              The history is remembered.
              <span className="block text-[var(--primary)]">
                The story continues.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              The history of Olivet is preserved through its records, its
              traditions and the generations of people connected to the
              school. The work of preserving that heritage continues.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/about-school"
                className="inline-flex items-center gap-3 bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)]"
              >
                About the School
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 border border-slate-300 px-6 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Explore the Gallery
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-14 border-t border-slate-200 pt-8">
              <p className="font-serif text-2xl italic text-[var(--primary-dark)] sm:text-3xl">
                Cum Christo Progredere
              </p>

              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Hitherto hath the Lord helped us — 1 Samuel 7:12
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default History;