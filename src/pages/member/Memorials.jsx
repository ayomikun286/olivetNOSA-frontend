import React, { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Search,
  HeartHandshake,
  GraduationCap,
  CalendarDays,
  Eye,
  X,
  Images,
} from "lucide-react";

import {
  getMemorials,
  getMemorialById,
} from "../../services/authService";

import ContentLoading from "../../components/admin/ContentLoading";

// ============================================================
// MEMORIAL SECTION
// ============================================================

const MemorialSection = ({ title, children }) => {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--primary)">
        {title}
      </h3>

      <div className="overflow-hidden rounded border border-(--border)">
        {children}
      </div>
    </section>
  );
};

// ============================================================
// MEMORIAL ITEM
// ============================================================

const MemorialItem = ({ label, value }) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-1 border-b border-(--border) px-4 py-3 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-4">
      <span className="text-xs text-(--text-muted)">
        {label}
      </span>

      <span className="break-words whitespace-pre-line text-sm text-(--secondary)">
        {value}
      </span>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const Memorials = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [memorials, setMemorials] = useState([]);

  const [search, setSearch] = useState("");
  const [schoolSet, setSchoolSet] = useState("");
  const [yearsAttended, setYearsAttended] =
    useState("");
  const [graduationYear, setGraduationYear] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] =
    useState(false);

  const [error, setError] = useState("");
  const [detailsError, setDetailsError] =
    useState("");

  const [selectedMemorial, setSelectedMemorial] =
    useState(null);

  // ==========================================================
  // LOAD MEMORIALS
  // ==========================================================

  useEffect(() => {
    const loadMemorials = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMemorials({
          search,
          schoolSet,
          yearsAttended,
          graduationYear,
        });

        if (response?.success) {
          setMemorials(response.data || []);
        } else {
          setMemorials([]);
        }
      } catch (error) {
        console.error(
          "Failed to load memorials:",
          error
        );

        setError(
          error.message ||
            "Unable to load memorials."
        );

        setMemorials([]);
      } finally {
        setLoading(false);
      }
    };

    loadMemorials();
  }, [
    search,
    schoolSet,
    graduationYear,
    yearsAttended,
  ]);

  // ==========================================================
  // FILTER OPTIONS
  // ==========================================================

  const schoolSets = useMemo(() => {
    return [
      ...new Set(
        memorials
          .map((memorial) => memorial.schoolSet)
          .filter(Boolean)
      ),
    ].sort();
  }, [memorials]);

  const graduationYears = useMemo(() => {
    return [
      ...new Set(
        memorials
          .map(
            (memorial) =>
              memorial.graduationYear
          )
          .filter(Boolean)
      ),
    ].sort((a, b) => b - a);
  }, [memorials]);

  const yearsAttendedOptions = useMemo(() => {
    return [
      ...new Set(
        memorials
          .map(
            (memorial) =>
              memorial.yearsAttended
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [memorials]);

  // ==========================================================
  // LOAD MEMORIAL FROM ROUTE
  // ==========================================================

  useEffect(() => {
    if (!id) {
      setSelectedMemorial(null);
      setDetailsError("");
      return;
    }

    const loadMemorialFromRoute = async () => {
      try {
        setDetailsError("");
        setLoadingDetails(true);

        setSelectedMemorial({
          _id: id,
          loading: true,
        });

        const response =
          await getMemorialById(id);

        if (response?.success) {
          setSelectedMemorial(response.data);
        } else {
          throw new Error(
            response?.message ||
              "Unable to load memorial details."
          );
        }
      } catch (error) {
        console.error(
          "Failed to load memorial from route:",
          error
        );

        setDetailsError(
          error.message ||
            "Unable to load memorial details."
        );
      } finally {
        setLoadingDetails(false);
      }
    };

    loadMemorialFromRoute();
  }, [id]);

  // ==========================================================
  // CLOSE MEMORIAL
  // ==========================================================

  const handleCloseMemorial = () => {
    setSelectedMemorial(null);
    setDetailsError("");

    if (id) {
      navigate(
        "/portal/member/dashboard/memorials",
        { replace: true }
      );
    }
  };

  // ==========================================================
  // HELPERS
  // ==========================================================

  const getMemorialId = (memorial) =>
    memorial?._id || memorial?.id;

  const getInitials = (memorial) =>
    memorial?.fullName
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) =>
        name.charAt(0)
      )
      .join("")
      .toUpperCase() || "O";

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-5">
        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-(--primary)">
                In Loving Memory
              </h1>

              <p className="mt-1 text-sm text-(--secondary)">
                Honouring and remembering members
                of our Olivetian family.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs text-(--secondary)">
                <HeartHandshake size={15} />

                <span>
                  {memorials.length}{" "}
                  {memorials.length === 1
                    ? "memorial"
                    : "memorials"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/portal/member/dashboard/memorials/submit"
                  )
                }
                className=" inline-flex items-center justify-center rounded border border-(--primary) px-4 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--primary) hover:text-white"
              >
                Share a Remembrance
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            SEARCH & FILTERS
        ==================================================== */}

        <div className="rounded border border-(--border) bg-(--bg-white) p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1fr_180px_180px_180px]">
            {/* SEARCH */}

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name..."
                className="w-full rounded border border-(--border) bg-transparent py-2.5 pl-10 pr-3 text-sm text-(--secondary) outline-none transition focus:border-(--primary)"
              />
            </div>

            {/* SCHOOL SET */}

            <select
              value={schoolSet}
              onChange={(e) =>
                setSchoolSet(e.target.value)
              }
              className="w-full rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--secondary) outline-none transition focus:border-(--primary)"
            >
              <option value="">
                All School Sets
              </option>

              {schoolSets.map((set) => (
                <option
                  key={set}
                  value={set}
                >
                  {set}
                </option>
              ))}
            </select>

            {/* GRADUATION YEAR */}

            <select
              value={graduationYear}
              onChange={(e) =>
                setGraduationYear(
                  e.target.value
                )
              }
              className="w-full rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--secondary) outline-none transition focus:border-(--primary)"
            >
              <option value="">
                All Graduation Years
              </option>

              {graduationYears.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>

            {/* YEARS ATTENDED */}

            <select
              value={yearsAttended}
              onChange={(e) =>
                setYearsAttended(
                  e.target.value
                )
              }
              className="w-full rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--secondary) outline-none transition focus:border-(--primary)"
            >
              <option value="">
                All Years Attended
              </option>

              {yearsAttendedOptions.map(
                (years) => (
                  <option
                    key={years}
                    value={years}
                  >
                    {years}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="rounded border border-(--danger)/20 bg-(--danger)/5 p-4">
            <div className="flex items-start gap-3">
              <X
                size={18}
                className="mt-0.5 shrink-0 text-(--danger)"
              />

              <p className="text-sm text-(--danger)">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ====================================================
            EMPTY
        ==================================================== */}

        {!error &&
          memorials.length === 0 && (
            <div className="rounded border border-(--border) bg-(--bg-white) p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
                <HeartHandshake size={21} />
              </div>

              <h3 className="mt-4 font-semibold text-(--primary)">
                No memorials found
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-(--secondary)">
                Try searching with a different
                name or changing the filters.
              </p>
            </div>
          )}

        {/* ====================================================
            MEMORIAL GRID
        ==================================================== */}

        {!error &&
          memorials.length > 0 && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {memorials.map((memorial) => (
                <div
                  key={getMemorialId(
                    memorial
                  )}
                  className="overflow-hidden rounded border border-(--border) bg-(--bg-white) transition hover:border-(--primary)/30"
                >
                  <div className="p-5">
                    {/* MEMORIAL INFO */}

                    <div className="flex items-start gap-3.5">
                      {memorial.photograph ? (
                        <img
                          src={
                            memorial.photograph
                          }
                          alt={
                            memorial.fullName
                          }
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--primary-light) text-sm font-semibold text-(--primary)">
                          {getInitials(
                            memorial
                          )}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-(--primary)">
                          {memorial.fullName}
                        </h2>

                        {memorial.schoolSet && (
                          <p className="mt-0.5 text-[11px] text-(--text-muted)">
                            {
                              memorial.schoolSet
                            }
                          </p>
                        )}

                        {memorial.shortRemembrance && (
                          <p className="mt-1.5 line-clamp-3 text-xs text-(--secondary)">
                            {
                              memorial.shortRemembrance
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {/* DETAILS */}

                    <div className="mt-5 space-y-2.5 border-t border-(--border) pt-4">
                      {memorial.yearsAttended && (
                        <div className="flex items-center gap-2 text-xs text-(--secondary)">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-(--primary)"
                          />

                          <span>
                            {
                              memorial.yearsAttended
                            }
                          </span>
                        </div>
                      )}

                      {memorial.graduationYear && (
                        <div className="flex items-center gap-2 text-xs text-(--secondary)">
                          <GraduationCap
                            size={15}
                            className="shrink-0 text-(--primary)"
                          />

                          <span>
                            Graduated{" "}
                            {
                              memorial.graduationYear
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CARD FOOTER */}

                  <div className="border-t border-(--border) px-5 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/portal/member/dashboard/memorials/${getMemorialId(
                            memorial
                          )}`
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 text-sm font-medium text-(--primary) transition hover:opacity-80"
                    >
                      <Eye size={16} />

                      View Memorial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* ======================================================
          MEMORIAL DRAWER
      ====================================================== */}

      {selectedMemorial && (
        <div className="fixed inset-0 z-50">
          {/* OVERLAY */}

          <button
            type="button"
            aria-label="Close memorial"
            onClick={handleCloseMemorial}
            className="absolute inset-0 bg-black/30"
          />

          {/* DRAWER */}

          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-(--bg-white) shadow-xl">
            {/* DRAWER HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-(--border) bg-(--bg-white) px-5 py-4">
              <div className="flex items-center gap-2">
                <HeartHandshake
                  size={17}
                  className="text-(--primary)"
                />

                <h2 className="text-sm font-semibold text-(--primary)">
                  Memorial
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseMemorial}
                className="flex h-8 w-8 items-center justify-center rounded text-(--text-muted) transition hover:bg-(--bg-light) hover:text-(--primary)"
              >
                <X size={18} />
              </button>
            </div>

            {/* DRAWER CONTENT */}

            <div className="space-y-6 p-5">
              {/* ==================================================
                  LOADING DETAILS
              ================================================== */}

              {loadingDetails && (
                <div className="py-12 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />

                  <p className="mt-3 text-sm text-(--secondary)">
                    Loading memorial...
                  </p>
                </div>
              )}

              {/* ==================================================
                  DETAILS ERROR
              ================================================== */}

              {!loadingDetails &&
                detailsError && (
                  <div className="rounded border border-(--danger)/20 bg-(--danger)/5 p-4">
                    <div className="flex items-start gap-3">
                      <X
                        size={18}
                        className="mt-0.5 shrink-0 text-(--danger)"
                      />

                      <p className="text-sm text-(--danger)">
                        {detailsError}
                      </p>
                    </div>
                  </div>
                )}

              {/* ==================================================
                  MEMORIAL DETAILS
              ================================================== */}

              {!loadingDetails &&
                !detailsError &&
                !selectedMemorial.loading && (
                  <>
                    {/* IDENTITY */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {selectedMemorial.photograph ? (
                        <img
                          src={
                            selectedMemorial.photograph
                          }
                          alt={
                            selectedMemorial.fullName
                          }
                          className="h-24 w-24 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded bg-(--primary-light) text-xl font-semibold text-(--primary)">
                          {getInitials(
                            selectedMemorial
                          )}
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-semibold text-(--primary)">
                          {
                            selectedMemorial.fullName
                          }
                        </h3>

                        {selectedMemorial.schoolSet && (
                          <p className="mt-1 text-sm text-(--secondary)">
                            {
                              selectedMemorial.schoolSet
                            }
                          </p>
                        )}

                        {selectedMemorial.yearsAttended && (
                          <p className="mt-1 text-xs text-(--text-muted)">
                            {
                              selectedMemorial.yearsAttended
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {/* OLIVET BACKGROUND */}

                    {(selectedMemorial.schoolSet ||
                      selectedMemorial.yearsAttended ||
                      selectedMemorial.graduationYear) && (
                      <MemorialSection title="Olivet Background">
                        <MemorialItem
                          label="School Set"
                          value={
                            selectedMemorial.schoolSet
                          }
                        />

                        <MemorialItem
                          label="Years Attended"
                          value={
                            selectedMemorial.yearsAttended
                          }
                        />

                        <MemorialItem
                          label="Graduation Year"
                          value={
                            selectedMemorial.graduationYear
                          }
                        />
                      </MemorialSection>
                    )}

                    {/* REMEMBRANCE */}

                    {selectedMemorial.shortRemembrance && (
                      <MemorialSection title="Remembrance">
                        <MemorialItem
                          label="Remembered As"
                          value={
                            selectedMemorial.shortRemembrance
                          }
                        />
                      </MemorialSection>
                    )}

                    {/* BIOGRAPHY */}

                    {selectedMemorial.biography && (
                      <MemorialSection title="Biography">
                        <MemorialItem
                          label="Biography"
                          value={
                            selectedMemorial.biography
                          }
                        />
                      </MemorialSection>
                    )}

                    {/* CONTRIBUTIONS */}

                    {selectedMemorial.contributions && (
                      <MemorialSection title="Contributions">
                        <MemorialItem
                          label="Contributions"
                          value={
                            selectedMemorial.contributions
                          }
                        />
                      </MemorialSection>
                    )}

                    {/* MEMORIES */}

                    {selectedMemorial.memories && (
                      <MemorialSection title="Memories">
                        <MemorialItem
                          label="Memories"
                          value={
                            selectedMemorial.memories
                          }
                        />
                      </MemorialSection>
                    )}

                    {/* MEMORIAL SERVICE */}

                    {selectedMemorial.memorialService && (
                      <MemorialSection title="Memorial Service">
                        <MemorialItem
                          label="Service Details"
                          value={
                            selectedMemorial.memorialService
                          }
                        />
                      </MemorialSection>
                    )}

                    {/* ADDITIONAL PHOTOGRAPHS */}

                    {selectedMemorial
                      .additionalPhotos
                      ?.length > 0 && (
                      <section>
                        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-(--primary)">
                          <Images size={14} />

                          Additional Photographs
                        </h3>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {selectedMemorial.additionalPhotos.map(
                            (
                              photo,
                              index
                            ) => (
                              <div
                                key={
                                  photo._id ||
                                  photo.publicId ||
                                  index
                                }
                                className="overflow-hidden rounded border border-(--border)"
                              >
                                <img
                                  src={
                                    photo.url
                                  }
                                  alt={`${selectedMemorial.fullName} memorial photo ${
                                    index + 1
                                  }`}
                                  className="aspect-square w-full object-cover transition hover:scale-[1.02]"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </section>
                    )}
                  </>
                )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Memorials;