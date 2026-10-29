import React, { useEffect, useMemo, useState } from "react";

import {
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  Crown,
  UsersRound,
  HeartHandshake,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";


import { getPublicWebsiteContent, getPublicLegacyLeaders } from "../../services/authService.js";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";



const formatTenure = (leader) => {
  const start = leader.startYear ?? "";
  const end = leader.endYear ?? "Present";

  if (!start) return "Tenure not specified";

  return `${start} – ${end}`;
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function LegacyLeadership() {
  const [pageContent, setPageContent] = useState({});
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      const results = await Promise.allSettled([
        getPublicWebsiteContent("legacy-leadership"),
        getPublicLegacyLeaders(),
      ]);

      if (!isMounted) return;

      const [contentResult, leadersResult] = results;

      if (contentResult.status === "fulfilled") {
        const result = contentResult.value;
        if (result?.success && result?.page?.content) {
          setPageContent(result.page.content);
        }
      } else {
        console.warn(
          "Unable to load Legacy Leadership page content:",
          contentResult.reason
        );
      }

      if (leadersResult.status === "fulfilled") {
        const result = leadersResult.value;
        if (result?.success && Array.isArray(result.data)) {
          setLeaders(result.data);
        } else {
          setError("The leadership records could not be loaded.");
        }
      } else {
        console.error(
          "Unable to load published legacy leaders:",
          leadersResult.reason
        );
        setError("We couldn't load the leadership records. Please try again.");
      }

      setLoading(false);
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredLeaders = useMemo(() => {
    if (activeFilter === "all") return leaders;

    return leaders.filter((leader) => {
      const startYear = Number(leader.startYear);

      if (activeFilter === "1985-1999") {
        return startYear >= 1985 && startYear <= 1998;
      }

      if (activeFilter === "1999-2013") {
        return startYear >= 1999 && startYear <= 2012;
      }

      if (activeFilter === "2013-present") {
        return startYear >= 2013;
      }

      return true;
    });
  }, [leaders, activeFilter]);

  const currentPresident = useMemo(
    () =>
      leaders.find(
        (leader) =>
          leader.name?.trim().toLowerCase() === "ayobami olubiyi" &&
          leader.startYear === 2025
      ),
    [leaders]
  );

  const pastPresidents = useMemo(
    () =>
      filteredLeaders.filter(
        (leader) => leader._id !== currentPresident?._id
      ),
    [filteredLeaders, currentPresident]
  );

  const selectedIndex = useMemo(() => {
    if (!selectedLeader) return -1;
    return filteredLeaders.findIndex(
      (leader) => leader._id === selectedLeader._id
    );
  }, [filteredLeaders, selectedLeader]);

  const showAdjacentLeader = (direction) => {
    if (selectedIndex < 0) return;

    const nextIndex = selectedIndex + direction;

    if (nextIndex >= 0 && nextIndex < filteredLeaders.length) {
      setSelectedLeader(filteredLeaders[nextIndex]);
    }
  };

  // Handle keyboard events and body scroll lock when modal is open
  useEffect(() => {
    if (!selectedLeader) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedLeader(null);
      if (event.key === "ArrowLeft") showAdjacentLeader(-1);
      if (event.key === "ArrowRight") showAdjacentLeader(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedLeader, selectedIndex, filteredLeaders]);

  const pageTitle = pageContent.pageTitle || "Legacy Leadership";

  return (
    <main className="mt-0 min-h-screen overflow-x-hidden bg-white text-(--primary-dark) md:mt-15">
      <PageTitle title={`${pageTitle} | OlivetNOSA`} />

      <header>
        <Navbar />
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-(--primary-dark)">
        <img
          src={pageContent.heroImage || "/images/olivetNOSA-6.jpg"}
          alt="Olivetian alumni community"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-(--primary-dark) via-(--primary-dark)/65 to-(--primary-dark)/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-36 sm:px-10 lg:px-16 lg:pb-24">
          <div className="max-w-5xl">
            <div
              data-aos="fade-up"
              className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-(--secondary-light)"
            >
              <span className="h-px w-10 bg-(--secondary)" />
              Our Legacy Leaders
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[7rem]"
            >
              {pageContent.heroTitle || (
                <>
                  Celebrating leadership.
                  <span className="block text-(--secondary)">
                    Inspiring generations.
                  </span>
                </>
              )}
            </h1>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                {pageContent.intro ||
                  "Recognising our past and present National Presidents and the spirit of service that connects generations of Olivetians."}
              </p>

              <a
                href="#leadership-directory"
                className="inline-flex w-fit shrink-0 items-center gap-3 border-b border-(--secondary) pb-2 text-sm font-semibold text-white transition hover:gap-5"
              >
                Meet our presidents
                <ArrowDown size={17} />
              </a>
            </div>

            <div className="mt-16 grid grid-cols-1 border-t border-white/20 pt-7 sm:grid-cols-3">
              {[
                {
                  value: leaders.length,
                  label: "Published leaders",
                },
                {
                  value: leaders.length
                    ? `${Math.max(
                      ...leaders.map((leader) =>
                        Number(leader.endYear || leader.startYear || 0)
                      )
                    ) -
                    Math.min(
                      ...leaders.map((leader) =>
                        Number(leader.startYear || 0)
                      )
                    )
                    }+ years`
                    : "—",
                  label: "Years of leadership",
                },
                {
                  value: "1",
                  label: "Olivetian community",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-4 sm:px-6 ${index > 0 ? "sm:border-l sm:border-white/15" : ""
                    }`}
                >
                  <p className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.17em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-16">
          <div data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.23em] text-(--secondary)">
              A Continuing Story
            </p>
            <div className="mt-6 h-px w-16 bg-(--secondary)" />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Leadership is a chapter. Belonging is lifelong.
            </h2>

            <div className="mt-8 grid gap-6 text-base leading-8 text-(--text-muted) md:grid-cols-2">
              <p>
                An old students’ association is a meeting place for different generations, experiences and ambitions. It gives our connection to Olivet a continuing purpose: to stay involved, support one another and contribute to the community we share.
              </p>
              <p>
                Since 1985, eleven presidents have led our National Old Students’ Association, including our current President, Ayobami Olubiyi. We celebrate their service as part of an ongoing story of participation and leadership—one that invites every Olivetian to contribute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP DIRECTORY */}
      <section
        id="leadership-directory"
        className="scroll-mt-24 bg-(--background-soft) py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div data-aos="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.23em] text-(--secondary)">
                The Leadership Record
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                The people behind the legacy.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-(--text-muted)">
                Explore the published record of National Presidents and the
                different periods they served.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Filter leaders">
              {[
                { value: "all", label: "All presidents" },
                { value: "1985-1999", label: "1985–1998" },
                { value: "1999-2013", label: "1999–2012" },
                { value: "2013-present", label: "2013–present" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`border px-4 py-2.5 text-xs font-semibold transition ${activeFilter === filter.value
                      ? "border-(--primary-dark) bg-(--primary-dark) text-white"
                      : "border-black/10 bg-white text-(--text-muted) hover:border-(--primary-dark) hover:text-(--primary-dark)"
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* PAST PRESIDENTS */}
          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-(--text-muted)">
              <LoaderCircle size={22} className="animate-spin" />
              <span>Loading leadership records...</span>
            </div>
          ) : error ? (
            <div className="mt-12 flex items-start gap-4 border border-red-200 bg-white p-6 text-red-700">
              <AlertCircle size={22} className="mt-1 shrink-0" />
              <div>
                <p className="font-semibold">Unable to display leaders</p>
                <p className="mt-2 text-sm leading-6">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 text-sm font-semibold underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : pastPresidents.length === 0 ? (
            <div className="mt-12 border-t border-black/10 py-14">
              <Crown size={28} className="text-(--secondary)" />
              <h3 className="mt-5 text-2xl font-medium">
                No published past presidents yet
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-(--text-muted)">
                Published records of past National Presidents will appear here
                once they are available.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pastPresidents.map((leader, index) => (
                <article
                  key={leader._id || `${leader.name}-${leader.startYear}`}
                  data-aos="fade-up"
                  data-aos-delay={Math.min((index % 4) * 70, 210)}
                  className="group min-w-0"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedLeader(leader)}
                    className="block w-full text-left"
                    aria-label={`View details for ${leader.name}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-(--primary-dark)/10">
                      {leader.portrait ? (
                        <img
                          src={leader.portrait}
                          alt={leader.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-(--primary-dark) to-(--primary)">
                          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/25 text-3xl font-medium text-white">
                            {getInitials(leader.name)}
                          </div>
                          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/55">
                            National President
                          </p>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                        <p className="text-xs font-semibold uppercase tracking-[0.17em] text-white/65">
                          {formatTenure(leader)}
                        </p>
                        <p className="mt-2 text-xl font-medium text-white">
                          {leader.name}
                        </p>
                      </div>

                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--primary-dark) transition group-hover:bg-(--secondary)">
                        <ArrowUpRight size={19} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-b border-black/10 py-4">
                      <span className="text-sm text-(--text-muted)">
                        {leader.title || "National President"}
                      </span>
                      <span className="text-xs text-(--secondary)">
                        View profile
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* FEATURED CURRENT PRESIDENT — BELOW THE PAST PRESIDENTS */}
          {!loading && !error && currentPresident && (
            <article
              data-aos="fade-up"
              className="relative mt-20 overflow-hidden border border-(--secondary)/40 bg-(--primary-dark) text-white"
            >


              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[360px] md:min-h-[480px]">
                  {currentPresident.portrait ? (
                    <img
                      src={currentPresident.portrait}
                      alt={currentPresident.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-(--primary) to-(--primary-dark)">
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/30 text-5xl font-medium text-white">
                        {getInitials(currentPresident.name)}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-(--primary-dark)/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-(--primary-dark)/20" />

                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 bg-(--secondary) px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-(--primary-dark)">
                    <Crown size={15} />
                    Serving President
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--secondary)">
                    National Leadership · {formatTenure(currentPresident)}
                  </p>

                  <h3 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {currentPresident.name}
                  </h3>

                  <p className="mt-4 text-base text-white/65">
                    {currentPresident.title || "National President"}
                  </p>

                  <div className="my-7 h-px w-16 bg-(--secondary)" />

                  <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                    {currentPresident.biography ||
                      "Leading the Olivetian community into its next chapter of service, connection, and shared progress."}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedLeader(currentPresident)}
                      className="inline-flex items-center gap-3 bg-(--secondary) px-6 py-3.5 text-sm font-semibold text-(--primary-dark) transition hover:gap-5"
                    >
                      View president's profile
                      <ArrowUpRight size={18} />
                    </button>

                    <span className="text-xs uppercase tracking-[0.16em] text-white/45">
                      {formatTenure(currentPresident)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* SERVICE */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-16">
          <div data-aos="fade-right">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
              <HeartHandshake size={22} strokeWidth={1.5} />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.23em] text-(--secondary)">
              The Spirit of Service
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Leadership brings us together. Service moves us forward.
            </h2>

            <div className="mt-10 border-l italic space-y-4 p-4 text-xl">
              <p>Every generation has something to offer.</p>
              
              <p>Every contribution helps us move forward.</p>
            </div>

          </div>

          <div data-aos="fade-left">
            <p className="text-xl leading-9 text-(--text-muted)">
              An association thrives when people make time for it. Leadership gives that shared effort direction: bringing people together, encouraging participation and keeping a common purpose in view.
            </p>
            <p className="text-xl mt-3 leading-9 text-(--text-muted)">
              The leaders featured here each accepted the responsibility of the presidency. Recognising their service is a way to celebrate the contribution of individuals while strengthening the connection that belongs to us all.
            </p>

            <div className="mt-10 border-t border-black/10">
              {[
                {
                  number: "01",
                  title: "Keep the connection strong",
                  description:
                    "Across sets and across distance, make time for the friendships and shared memories that connect us.",
                },
                {
                  number: "02",
                  title: "Give what you can",
                  description:
                    "Bring your time, experience and willingness to serve. A shared future grows through individual contributions.",
                },
                {
                  number: "03",
                  title: "Make room for tomorrow",
                  description:
                    "Carry the Olivetian spirit forward, with an open door for the next generation and a place for every voice.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="grid gap-4 border-b border-black/10 py-7 sm:grid-cols-[60px_1fr]"
                >
                  <span className="text-sm font-semibold text-(--secondary)">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="mt-3 max-w-2xl leading-7 text-(--text-muted)">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-(--primary-dark) py-20 text-white sm:py-28">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-(--secondary)/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-(--secondary)">
            <UsersRound size={22} />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.23em] text-(--secondary)">
            The Legacy Continues
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            A shared connection.
            <span className="block text-white/45">
              A future we shape together.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/65">
            The legacy continues wherever an Olivetian chooses to remain
            connected and to serve.
          </p>

          <a
            href="/portal/signup"
            className="mt-9 inline-flex items-center gap-3 bg-(--secondary) px-7 py-4 text-sm font-semibold text-(--primary-dark) transition hover:gap-5"
          >
            Stay connected
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* LEADER DETAIL MODAL */}
      {selectedLeader && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLeader(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="leader-modal-title"
            className="relative my-auto grid w-full max-w-4xl overflow-hidden bg-white shadow-2xl md:grid-cols-[0.8fr_1.2fr]"
          >
            <button
              type="button"
              onClick={() => setSelectedLeader(null)}
              aria-label="Close leader details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--primary-dark) shadow transition hover:bg-(--secondary-light)"
            >
              <X size={20} />
            </button>

            <div className="min-h-64 bg-(--primary-dark) md:min-h-[500px]">
              {selectedLeader.portrait ? (
                <img
                  src={selectedLeader.portrait}
                  alt={selectedLeader.name}
                  className="h-full max-h-[360px] w-full object-cover md:max-h-none"
                />
              ) : (
                <div className="flex h-full min-h-64 flex-col items-center justify-center bg-gradient-to-br from-(--primary-dark) to-(--primary) p-8 md:min-h-[500px]">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/30 text-4xl font-medium text-white">
                    {getInitials(selectedLeader.name)}
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/55">
                    Legacy Leadership
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-10 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--secondary)">
                {formatTenure(selectedLeader)}
              </p>

              <h2
                id="leader-modal-title"
                className="mt-4 pr-8 text-3xl font-medium leading-tight tracking-tight text-(--primary-dark) sm:text-4xl"
              >
                {selectedLeader.name}
              </h2>

              <p className="mt-3 text-sm text-(--text-muted)">
                {selectedLeader.title || "National President"}
              </p>

              <div className="my-7 h-px w-16 bg-(--secondary)" />

              <div className="max-h-[35vh] flex-1 overflow-y-auto pr-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-dark)">
                  Leadership and service
                </h3>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-(--text-muted)">
                  {selectedLeader.biography ||
                    "A biography for this leader has not yet been published."}
                </p>

                {Array.isArray(selectedLeader.achievements) &&
                  selectedLeader.achievements.length > 0 && (
                    <div className="mt-7">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-dark)">
                        Achievements and contributions
                      </h3>

                      <ul className="mt-4 space-y-3">
                        {selectedLeader.achievements.map(
                          (achievement, index) => (
                            <li
                              key={`${achievement}-${index}`}
                              className="flex gap-3 text-sm leading-6 text-(--text-muted)"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--secondary)" />
                              {achievement}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                <button
                  type="button"
                  disabled={selectedIndex <= 0}
                  onClick={() => showAdjacentLeader(-1)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary-dark) transition hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={17} />
                  Previous
                </button>

                <span className="text-xs text-(--text-muted)">
                  {selectedIndex + 1} of {filteredLeaders.length}
                </span>

                <button
                  type="button"
                  disabled={
                    selectedIndex < 0 ||
                    selectedIndex >= filteredLeaders.length - 1
                  }
                  onClick={() => showAdjacentLeader(1)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary-dark) transition hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      <Footer />
    </main>
  );
}