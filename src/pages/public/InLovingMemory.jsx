import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Search,
  Heart,
  MessageCircleHeart,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";

import { getMemorials } from "../../services/authService";

export default function InLovingMemory() {
  const [memorials, setMemorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [schoolSet, setSchoolSet] = useState("");
  const [yearsAttended, setYearsAttended] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const navigate = useNavigate();

  // =========================================================
  // FETCH PUBLIC MEMORIALS
  // =========================================================

  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMemorials({
          search,
          schoolSet,
          yearsAttended,
          graduationYear,
        });

        setMemorials(result.data || []);
      } catch (err) {
        console.error("Memorial fetch error:", err);

        setError(
          err.message ||
            "Something went wrong while loading the memorial records."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMemorials();
  }, [search, schoolSet, yearsAttended, graduationYear]);

  // =========================================================
  // VIEW MEMORIAL
  // =========================================================

  const handleViewMemorial = (memorialId) => {
    navigate("/portal/login", {
      state: {
        alert: {
          type: "info",
          title: "Members Only",
          message:
            "Full memorial details are available to registered OlivetNOSA members. Please sign in to continue.",
        },

        redirectTo: `/portal/member/dashboard/memorials/${memorialId}`,
      },
    });
  };

  // =========================================================
  // SHARE A REMEMBRANCE
  // =========================================================

  const handleShareRemembrance = () => {
    navigate("/portal/login", {
      state: {
        alert: {
          type: "info",
          title: "Members Only",
          message:
            "Please sign in to share a remembrance with the OlivetNOSA community.",
        },

        redirectTo: "/portal/member/dashboard/memorials/submit",
      },
    });
  };

  // =========================================================
  // FILTER OPTIONS
  // =========================================================

  const schoolSets = useMemo(() => {
    return [
      ...new Set(
        memorials
          .map((memorial) => memorial.schoolSet)
          .filter(Boolean)
      ),
    ].sort();
  }, [memorials]);

  const yearsAttendedOptions = useMemo(() => {
    return [
      ...new Set(
        memorials
          .map((memorial) => memorial.yearsAttended)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [memorials]);

  const graduationYears = useMemo(() => {
    return [
      ...new Set(
        memorials
          .map((memorial) => memorial.graduationYear)
          .filter(Boolean)
      ),
    ].sort((a, b) => b - a);
  }, [memorials]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setSchoolSet("");
    setYearsAttended("");
    setGraduationYear("");
  };

  const hasFilters =
    search ||
    schoolSet ||
    yearsAttended ||
    graduationYear;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-(--primary-dark) mt-0 md:mt-15">
      <PageTitle title="In Loving Memory | OlivetNOSA" />

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header>
        <Navbar />
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[var(--primary-dark)]">
        <div className="absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--secondary)]/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 sm:px-10 sm:pb-32 lg:px-16 lg:pb-40">
          <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:gap-24">
            {/* CREST */}

            <div
              data-aos="fade-right"
              className="flex flex-col items-start"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:h-28 sm:w-28">
                <img
                  src="/images/olivetNOSA_logo.png"
                  alt="Olivet NOSA crest"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                In Loving Memory
              </div>
            </div>

            {/* HERO CONTENT */}

            <div>
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
                  lg:text-8xl
                "
              >
                Honouring Our
                <span className="block text-[var(--secondary)]">
                  Olivetian Legacy.
                </span>
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-10 max-w-3xl text-base leading-8 text-white/65 sm:text-lg"
              >
                Welcome to the Olivet Baptist High School National Old
                Students’ Association In Loving Memory portal.
              </p>

              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-5 max-w-3xl text-base leading-8 text-white/55 sm:text-lg"
              >
                This space honours and remembers members of our Olivetian
                family who have passed on. Their lives, friendships, service,
                and contributions remain part of the story of our school and
                our association.
              </p>

              <a
                href="#memorial-directory"
                data-aos="fade-up"
                data-aos-delay="400"
                className="
                  mt-10
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
                Remember our Olivetians
                <ArrowDown size={17} />
              </a>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="mt-20 border-t border-white/15 pt-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                National Old Students' Association
              </p>

              <p className="text-sm italic text-white/45">
                Cum Christo Progredere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}

      <section className="bg-white py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div data-aos="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Remembering Together
              </p>

              <div className="mt-6 h-px w-16 bg-[var(--secondary)]" />
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                Their memories remain part of the Olivetian story.
              </h2>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="text-base leading-8 text-[var(--text-muted)]">
                  Here, alumni, families, classmates, and friends may remember
                  the lives and contributions of members of our Olivetian
                  family who have passed on.
                </p>

                <p className="text-base leading-8 text-[var(--text-muted)]">
                  Through photographs, stories, memories, and shared
                  remembrance, we preserve the legacy of those who helped shape
                  the Olivetian community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MEMORIAL DIRECTORY
      ========================================================= */}

      <section
        id="memorial-directory"
        className="bg-[var(--background-soft)] py-24 sm:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          {/* SECTION HEADER */}

          <div className="max-w-3xl" data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Memorial Directory
            </p>

            <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
              In remembrance of our Olivetians.
            </h2>

            <p className="mt-7 text-lg leading-8 text-[var(--text-muted)]">
              Explore the lives and memories of members of the Olivetian
              community who have passed on.
            </p>
          </div>

          {/* SEARCH / FILTER */}

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-14 border-y border-black/10 py-6"
          >
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              {/* SEARCH */}

              <div className="relative">
                <Search
                  size={18}
                  strokeWidth={1.7}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="
                    h-12
                    w-full
                    border
                    border-black/10
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-[var(--primary-dark)]
                    outline-none
                    transition
                    focus:border-[var(--secondary)]
                  "
                />
              </div>

              {/* SCHOOL SET */}

              <select
                value={schoolSet}
                onChange={(e) => setSchoolSet(e.target.value)}
                className="
                  h-12
                  border
                  border-black/10
                  bg-white
                  px-4
                  text-sm
                  text-[var(--primary-dark)]
                  outline-none
                  focus:border-[var(--secondary)]
                "
              >
                <option value="">All graduating sets</option>

                {schoolSets.map((set) => (
                  <option key={set} value={set}>
                    {set}
                  </option>
                ))}
              </select>

              {/* YEARS ATTENDED */}

              <select
                value={yearsAttended}
                onChange={(e) => setYearsAttended(e.target.value)}
                className="
                  h-12
                  border
                  border-black/10
                  bg-white
                  px-4
                  text-sm
                  text-[var(--primary-dark)]
                  outline-none
                  focus:border-[var(--secondary)]
                "
              >
                <option value="">All years attended</option>

                {yearsAttendedOptions.map((years) => (
                  <option key={years} value={years}>
                    {years}
                  </option>
                ))}
              </select>

              {/* GRADUATION YEAR */}

              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="
                  h-12
                  border
                  border-black/10
                  bg-white
                  px-4
                  text-sm
                  text-[var(--primary-dark)]
                  outline-none
                  focus:border-[var(--secondary)]
                "
              >
                <option value="">All graduation years</option>

                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* CLEAR */}

              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    border
                    border-black/10
                    bg-white
                    px-5
                    text-sm
                    font-medium
                    text-[var(--primary-dark)]
                    transition
                    hover:border-[var(--secondary)]
                  "
                >
                  <X size={16} />
                  Clear
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* =====================================================
              STATES
          ====================================================== */}

          {loading && (
            <div className="py-24 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-[var(--secondary)]" />

              <p className="mt-5 text-sm text-[var(--text-muted)]">
                Loading memorials...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="border border-red-200 bg-red-50 px-6 py-8 text-center">
              <p className="text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 text-sm font-semibold text-[var(--primary)] underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            memorials.length === 0 && (
              <div className="border border-black/10 bg-white px-6 py-20 text-center">
                <Heart
                  size={30}
                  strokeWidth={1.4}
                  className="mx-auto text-[var(--secondary)]"
                />

                <h3 className="mt-5 text-xl font-medium text-[var(--primary-dark)]">
                  No memorial records found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                  We could not find a memorial matching your search or
                  selected filters.
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 text-sm font-semibold text-[var(--primary)] underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

          {/* =====================================================
              MEMORIAL GRID
          ====================================================== */}

          {!loading &&
            !error &&
            memorials.length > 0 && (
              <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {memorials.map((memorial, index) => (
                  <article
                    key={memorial._id}
                    data-aos="fade-up"
                    data-aos-delay={Math.min(index * 50, 250)}
                    className="
                      group
                      overflow-hidden
                      border
                      border-black/10
                      bg-white
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    {/* PHOTO */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--primary-light)]">
                      {memorial.photograph ? (
                        <img
                          src={memorial.photograph}
                          alt={memorial.fullName}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-[1.04]
                          "
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Heart
                            size={35}
                            strokeWidth={1.2}
                            className="text-[var(--secondary)]"
                          />
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* CONTENT */}

                    <div className="p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                        {memorial.schoolSet || "Olivetian"}
                      </p>

                      <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-[var(--primary-dark)]">
                        {memorial.fullName}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                        {memorial.yearsAttended && (
                          <span>
                            {memorial.yearsAttended}
                          </span>
                        )}

                        {memorial.graduationYear && (
                          <span>
                            Class of {memorial.graduationYear}
                          </span>
                        )}
                      </div>

                      {memorial.shortRemembrance && (
                        <p className="mt-5 line-clamp-3 text-sm leading-7 text-[var(--text-muted)]">
                          {memorial.shortRemembrance}
                        </p>
                      )}

                      {/* LOGIN GATE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleViewMemorial(memorial._id)
                        }
                        className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-dark)]"
                      >
                        View Memorial

                        <ArrowUpRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
        </div>
      </section>

      {/* =========================================================
          SHARE A REMEMBRANCE
      ========================================================= */}

      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div data-aos="fade-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                <MessageCircleHeart
                  size={22}
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Share a Remembrance
              </p>

              <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                Help preserve an Olivetian memory.
              </h2>
            </div>

            <div data-aos="fade-left">
              <p className="max-w-3xl text-xl leading-9 text-[var(--primary-dark)] sm:text-2xl">
                Have a photograph, biography, condolence message, memory, or
                correction to share?
              </p>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                Members of the Olivetian community can sign in to the portal
                to share information and contribute to the preservation of our
                collective history.
              </p>

              <button
                type="button"
                onClick={handleShareRemembrance}
                className="
                  mt-10
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
                Sign in to contribute

                <ArrowUpRight size={18} />
              </button>
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
            A Lasting Legacy
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
            Their lives remain
            <span className="block text-[var(--primary)]/45">
              part of ours.
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[var(--primary-dark)]/65"
          >
            Together, we remember, honour, and preserve the legacy of the
            Olivetians who came before us.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}