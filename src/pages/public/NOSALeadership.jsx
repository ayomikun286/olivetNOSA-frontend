
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

import {
  getPublicWebsiteContent,
  getPublicNOSALeaders,
} from "../../services/authService.js";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function NOSALeadership() {
  const [pageContent, setPageContent] = useState({});
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLeader, setSelectedLeader] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      const results = await Promise.allSettled([
        getPublicWebsiteContent("nosa-leadership"),
        getPublicNOSALeaders(),
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
          "Unable to load NOSA Leadership page content:",
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
          "Unable to load published NOSA leaders:",
          leadersResult.reason
        );

        setError(
          "We couldn't load the leadership records. Please try again."
        );
      }

      setLoading(false);
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentPresident = useMemo(
    () => leaders.find((leader) => leader.isPresident),
    [leaders]
  );

  const otherLeaders = useMemo(
    () => leaders.filter((leader) => !leader.isPresident),
    [leaders]
  );

  const selectedIndex = useMemo(
    () =>
      selectedLeader
        ? leaders.findIndex(
            (leader) => leader._id === selectedLeader._id
          )
        : -1,
    [leaders, selectedLeader]
  );

  const showAdjacentLeader = (direction) => {
    if (selectedIndex < 0) return;

    const nextIndex = selectedIndex + direction;

    if (nextIndex >= 0 && nextIndex < leaders.length) {
      setSelectedLeader(leaders[nextIndex]);
    }
  };

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
  }, [selectedLeader, selectedIndex, leaders]);

  const pageTitle = pageContent.pageTitle || "NOSA Leadership";

  const LeaderImage = ({ leader, featured = false }) => (
    <div
      className={`relative overflow-hidden bg-(--primary-dark)/10 ${
        featured ? "h-full min-h-[360px] md:min-h-[480px]" : "aspect-[4/5]"
      }`}
    >
      {leader.image ? (
        <img
          src={leader.image}
          alt={leader.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-(--primary-dark) to-(--primary)">
          <div
            className={`flex items-center justify-center rounded-full border border-white/25 font-medium text-white ${
              featured ? "h-32 w-32 text-5xl" : "h-24 w-24 text-3xl"
            }`}
          >
            {getInitials(leader.name)}
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/55">
            {leader.position}
          </p>
        </div>
      )}

      {featured && (
        <div className="absolute inset-0 bg-gradient-to-t from-(--primary-dark)/60 via-transparent to-transparent" />
      )}
    </div>
  );

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
          alt="OlivetNOSA leadership"
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
              Our National Leadership
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[7rem]"
            >
              {pageContent.heroTitle || (
                <>
                  United by purpose.
                  <span className="block text-(--secondary)">
                    Driven by service.
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
                  "Meet the individuals entrusted with guiding our National Old Students' Association and advancing the shared interests of every Olivetian."}
              </p>

              <a
                href="#leadership-directory"
                className="inline-flex w-fit shrink-0 items-center gap-3 border-b border-(--secondary) pb-2 text-sm font-semibold text-white transition hover:gap-5"
              >
                Meet our leaders
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
                  value: currentPresident ? "1" : "—",
                  label: "National President",
                },
                {
                  value: "1",
                  label: "United community",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-4 sm:px-6 ${
                    index > 0 ? "sm:border-l sm:border-white/15" : ""
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

      
      {/* LEADERSHIP DIRECTORY */}
      <section
        id="leadership-directory"
        className="scroll-mt-24 bg-(--background-soft) py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.23em] text-(--secondary)">
              The People Who Lead
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Meet our national executives.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-(--text-muted)">
              Meet the individuals serving our association and working
              together to strengthen the Olivetian community.
            </p>
          </div>

          {/* LOADING / ERROR / EMPTY STATES */}
          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-(--text-muted)">
              <LoaderCircle size={22} className="animate-spin" />
              <span>Loading leadership records...</span>
            </div>
          ) : error ? (
            <div className="mt-12 flex items-start gap-4 border border-red-200 bg-white p-6 text-red-700">
              <AlertCircle size={22} className="mt-1 shrink-0" />

              <div>
                <p className="font-semibold">
                  Unable to display leaders
                </p>

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
          ) : leaders.length === 0 ? (
            <div className="mt-12 border-t border-black/10 py-14">
              <UsersRound size={28} className="text-(--secondary)" />

              <h3 className="mt-5 text-2xl font-medium">
                Leadership records coming soon
              </h3>

              <p className="mt-3 max-w-xl leading-7 text-(--text-muted)">
                Our national leadership records will appear here once they
                have been published.
              </p>
            </div>
          ) : (
            <>
              {/* FEATURED PRESIDENT */}
              {currentPresident && (
                <article
                  data-aos="fade-up"
                  className="group relative mt-12 overflow-hidden border border-(--secondary)/40 bg-(--primary-dark) text-white"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative min-h-[360px] md:min-h-[480px]">
                      <LeaderImage
                        leader={currentPresident}
                        featured
                      />

                      <div className="absolute left-6 top-6 inline-flex items-center gap-2 bg-(--secondary) px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-(--primary-dark)">
                        <Crown size={15} />
                        National President
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--secondary)">
                        National Leadership
                      </p>

                      <h3 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {currentPresident.name}
                      </h3>

                      <p className="mt-4 text-base text-white/65">
                        {currentPresident.position}
                      </p>

                      <div className="my-7 h-px w-16 bg-(--secondary)" />

                      <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                        {pageContent.presidentMessage ||
                          "Providing leadership, direction, and service in advancing the shared vision and aspirations of the Olivetian community."}
                      </p>

                      <div className="mt-8">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedLeader(currentPresident)
                          }
                          className="inline-flex items-center gap-3 bg-(--secondary) px-6 py-3.5 text-sm font-semibold text-(--primary-dark) transition hover:gap-5"
                        >
                          View president's profile
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* OTHER EXECUTIVES */}
              {otherLeaders.length > 0 && (
                <div className="mt-20">
                  <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--secondary)">
                        The Executive Team
                      </p>

                      <h3 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                        Serving the association.
                      </h3>
                    </div>

                    <p className="text-sm text-(--text-muted)">
                      {otherLeaders.length} executive
                      {otherLeaders.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {otherLeaders.map((leader, index) => (
                      <article
                        key={leader._id}
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
                            {leader.image ? (
                              <img
                                src={leader.image}
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
                                  {leader.position}
                                </p>
                              </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                              <p className="text-xl font-medium text-white">
                                {leader.name}
                              </p>
                            </div>

                            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--primary-dark) transition group-hover:bg-(--secondary)">
                              <ArrowUpRight size={19} />
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 border-b border-black/10 py-4">
                            <span className="text-sm text-(--text-muted)">
                              {leader.position}
                            </span>

                            <span className="shrink-0 text-xs text-(--secondary)">
                              View profile
                            </span>
                          </div>
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>


      {/* INTRODUCTION */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-16">
          <div data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.23em] text-(--secondary)">
              Leading Together
            </p>

            <div className="mt-6 h-px w-16 bg-(--secondary)" />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              A shared responsibility. A common vision.
            </h2>

            <div className="mt-8 grid gap-6 text-base leading-8 text-(--text-muted) md:grid-cols-2">
              <p>
                The National Old Students' Association brings together
                generations of Olivetians through shared memories, common
                interests, and a lasting connection to our alma mater.
              </p>

              <p>
                Our national leaders provide direction, encourage
                participation, and help turn our collective vision into
                meaningful action. Their service represents a commitment to
                keeping the Olivetian community connected and moving forward.
              </p>
            </div>
          </div>
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

            <div className="mt-10 space-y-4 border-l p-4 text-xl italic">
              <p>Every generation has something to offer.</p>
              <p>Every contribution helps us move forward.</p>
            </div>
          </div>

          <div data-aos="fade-left">
            <p className="text-xl leading-9 text-(--text-muted)">
              A strong association is built through participation,
              collaboration, and a shared commitment to its future.
              Leadership provides direction, but meaningful progress
              comes from the collective effort of its members.
            </p>

            <p className="mt-3 text-xl leading-9 text-(--text-muted)">
              Our national executives serve with the responsibility of
              representing the interests of Olivetians, strengthening
              relationships, and creating opportunities for every
              generation to remain involved.
            </p>

            <div className="mt-10 border-t border-black/10">
              {[
                {
                  number: "01",
                  title: "Stay connected",
                  description:
                    "Strengthen the relationships that connect Olivetians across different sets and generations.",
                },
                {
                  number: "02",
                  title: "Participate and contribute",
                  description:
                    "Share your time, experience, and ideas in support of the association and its activities.",
                },
                {
                  number: "03",
                  title: "Build a lasting future",
                  description:
                    "Work together to create an association that future generations can be proud to belong to.",
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
                    <h3 className="text-xl font-medium">
                      {item.title}
                    </h3>

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
            One Olivetian Family
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            A shared connection.
            <span className="block text-white/45">
              A future we shape together.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/65">
            Our association grows stronger when every Olivetian
            remains connected, participates, and contributes.
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
              {selectedLeader.image ? (
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="h-full max-h-[360px] w-full object-cover md:max-h-none"
                />
              ) : (
                <div className="flex h-full min-h-64 flex-col items-center justify-center bg-gradient-to-br from-(--primary-dark) to-(--primary) p-8 md:min-h-[500px]">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/30 text-4xl font-medium text-white">
                    {getInitials(selectedLeader.name)}
                  </div>

                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/55">
                    NOSA Leadership
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-10 md:p-12">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-(--secondary)">
                {selectedLeader.isPresident && <Crown size={16} />}
                {selectedLeader.isPresident
                  ? "National President"
                  : "National Executive"}
              </div>

              <h2
                id="leader-modal-title"
                className="mt-4 pr-8 text-3xl font-medium leading-tight tracking-tight text-(--primary-dark) sm:text-4xl"
              >
                {selectedLeader.name}
              </h2>

              <p className="mt-3 text-sm text-(--text-muted)">
                {selectedLeader.position}
              </p>

              <div className="my-7 h-px w-16 bg-(--secondary)" />

              <div className="flex-1">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-dark)">
                  Position and responsibility
                </h3>

                <p className="mt-4 text-sm leading-7 text-(--text-muted)">
                  {selectedLeader.position} — serving the Olivetian
                  community through leadership, participation, and
                  commitment to the association.
                </p>
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
                  {selectedIndex + 1} of {leaders.length}
                </span>

                <button
                  type="button"
                  disabled={
                    selectedIndex < 0 ||
                    selectedIndex >= leaders.length - 1
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
