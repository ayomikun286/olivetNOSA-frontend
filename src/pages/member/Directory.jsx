import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  Eye,
  X,
} from "lucide-react";

import { getDirectoryMembers } from "../../services/authService";
import ContentLoading from "../../components/admin/ContentLoading";
const DirectorySection = ({ title, children }) => {
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

const DirectoryItem = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="grid grid-cols-1 gap-1 border-b border-(--border) px-4 py-3 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-4">
      <span className="text-xs text-(--text-muted)">
        {label}
      </span>

      <span className="break-words text-sm text-(--secondary)">
        {value}
      </span>
    </div>
  );
};

const Directory = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadDirectory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDirectoryMembers();

        if (response?.success) {
          setUsers(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load directory:", error);

        setError(
          error.message ||
          "Unable to load the member directory."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDirectory();
  }, []);

 

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => {
      const fullName = [
        user.firstName,
        user.middleName,
        user.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const preferredName =
        user.profile?.preferredName?.toLowerCase() || "";

      const alumniId =
        user.alumniId?.toLowerCase() || "";

      const profession =
        user.profile?.profession?.toLowerCase() || "";

      const headline =
        user.profile?.professionalHeadline?.toLowerCase() || "";

      const chapter =
        user.chapter?.name?.toLowerCase() || "";

      const yearSet =
        user.yearSet?.name?.toLowerCase() ||
        String(user.yearSet?.year || "");

      return (
        fullName.includes(query) ||
        preferredName.includes(query) ||
        alumniId.includes(query) ||
        profession.includes(query) ||
        headline.includes(query) ||
        chapter.includes(query) ||
        yearSet.includes(query)
      );
    });
  }, [users, search]);

  const getFullName = (user) =>
    [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ");

  const getInitials = (user) =>
    [user.firstName, user.lastName]
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();


       if (loading) {
    return (
      <ContentLoading />
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* PAGE HEADER */}
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-(--primary)">
                Member Directory
              </h1>

              <p className="mt-1 text-sm text-(--secondary)">
                Find and connect with fellow Olivetians.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-(--secondary)">
              <Users size={15} />

              <span>
                {users.length}{" "}
                {users.length === 1
                  ? "member"
                  : "members"}
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-(--bg-white) border border-(--border) rounded p-4">
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
              placeholder="Search by name, Alumni ID, profession, chapter or year set..."
              className="w-full rounded border border-(--border) bg-transparent py-2.5 pl-10 pr-3 text-sm text-(--secondary) outline-none transition focus:border-(--primary)"
            />
          </div>
        </div>

       

        {/* ERROR */}
        {!loading && error && (
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

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredUsers.length === 0 && (
            <div className="bg-(--bg-white) border border-(--border) rounded p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
                <Users size={21} />
              </div>

              <h3 className="mt-4 font-semibold text-(--primary)">
                No members found
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-(--secondary)">
                Try searching with a different name,
                profession, chapter or year set.
              </p>
            </div>
          )}

        {/* DIRECTORY */}
        {!loading &&
          !error &&
          filteredUsers.length > 0 && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredUsers.map((user) => {
                const profile = user.profile || {};

                return (
                  <div
                    key={user.id}
                    className="bg-(--bg-white) border border-(--border) rounded overflow-hidden transition hover:border-(--primary)/30"
                  >
                    <div className="p-5">

                      {/* MEMBER INFO */}
                      <div className="flex items-start gap-3.5">
                        {profile.profilePhoto ? (
                          <img
                            src={
                              profile.profilePhoto
                            }
                            alt={getFullName(
                              user
                            )}
                            className="h-12 w-12 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--primary-light) text-sm font-semibold text-(--primary)">
                            {getInitials(
                              user
                            )}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-semibold text-(--primary)">
                            {profile.preferredName ||
                              getFullName(
                                user
                              )}
                          </h2>

                          {user.alumniId && (
                            <p className="mt-0.5 text-[11px] text-(--text-muted)">
                              {
                                user.alumniId
                              }
                            </p>
                          )}

                          {profile.professionalHeadline && (
                            <p className="mt-1.5 line-clamp-2 text-xs text-(--secondary)">
                              {
                                profile.professionalHeadline
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="mt-5 space-y-2.5 border-t border-(--border) pt-4">

                        {user.yearSet && (
                          <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <GraduationCap
                              size={15}
                              className="shrink-0 text-(--primary)"
                            />

                            <span>
                              {user
                                .yearSet
                                .name ||
                                user
                                  .yearSet
                                  .year}
                            </span>
                          </div>
                        )}

                        {user.chapter?.name && (
                          <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <Users
                              size={15}
                              className="shrink-0 text-(--primary)"
                            />

                            <span>
                              {
                                user
                                  .chapter
                                  .name
                              }
                            </span>
                          </div>
                        )}

                        {(profile.city ||
                          profile.country) && (
                            <div className="flex items-center gap-2 text-xs text-(--secondary)">
                              <MapPin
                                size={15}
                                className="shrink-0 text-(--primary)"
                              />

                              <span>
                                {[
                                  profile.city,
                                  profile.country,
                                ]
                                  .filter(
                                    Boolean
                                  )
                                  .join(
                                    ", "
                                  )}
                              </span>
                            </div>
                          )}

                        {profile.profession && (
                          <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <BriefcaseBusiness
                              size={15}
                              className="shrink-0 text-(--primary)"
                            />

                            <span>
                              {
                                profile.profession
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
                          setSelectedUser(
                            user
                          )
                        }
                        className="flex w-full items-center justify-center gap-2 text-sm font-medium text-(--primary) transition hover:opacity-80"
                      >
                        <Eye size={16} />

                        View Profile
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>

      {/* MEMBER PROFILE DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 z-50">

          {/* OVERLAY */}
          <button
            type="button"
            aria-label="Close profile"
            onClick={() =>
              setSelectedUser(null)
            }
            className="absolute inset-0 bg-black/30"
          />

          {/* DRAWER */}
          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-(--bg-white) shadow-xl">

            {/* DRAWER HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-(--border) bg-(--bg-white) px-5 py-4">
              <div className="flex items-center gap-2">
                <Users
                  size={17}
                  className="text-(--primary)"
                />

                <h2 className="text-sm font-semibold text-(--primary)">
                  Member Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="flex h-8 w-8 items-center justify-center rounded text-(--text-muted) transition hover:bg-(--bg-light) hover:text-(--primary)"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 p-5">

              {/* IDENTITY */}
              <div className="flex items-center gap-4">
                {selectedUser.profile
                  ?.profilePhoto ? (
                  <img
                    src={
                      selectedUser
                        .profile
                        .profilePhoto
                    }
                    alt={getFullName(
                      selectedUser
                    )}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--primary-light) text-lg font-semibold text-(--primary)">
                    {getInitials(
                      selectedUser
                    )}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-(--primary)">
                    {selectedUser.profile?.preferredName ||
                      getFullName(selectedUser)}
                  </h3>

                  {selectedUser.profile?.preferredName && (
                    <p className="mt-1 text-sm text-(--secondary)">
                      {getFullName(selectedUser)}
                    </p>
                  )}

                  {selectedUser.alumniId && (
                    <p className="mt-1 text-xs text-(--text-muted)">
                      {selectedUser.alumniId}
                    </p>
                  )}

                  {selectedUser.profile?.professionalHeadline && (
                    <p className="mt-2 text-sm text-(--secondary)">
                      {selectedUser.profile.professionalHeadline}
                    </p>
                  )}
                </div>
              </div>

              {/* OLIVET BACKGROUND */}
              <DirectorySection title="Olivet Background">
                <DirectoryItem
                  label="Year Set"
                  value={
                    selectedUser.yearSet
                      ?.name ||
                    selectedUser.yearSet
                      ?.year
                  }
                />

                <DirectoryItem
                  label="Graduation Year"
                  value={
                    selectedUser.graduationYear
                  }
                />

                <DirectoryItem
                  label="Chapter"
                  value={
                    selectedUser.chapter
                      ?.name
                  }
                />

                <DirectoryItem
                  label="School House"
                  value={
                    selectedUser.profile
                      ?.schoolHouse
                  }
                />

                <DirectoryItem
                  label="Student Type"
                  value={
                    selectedUser.profile
                      ?.studentType
                  }
                />

                <DirectoryItem
                  label="Leadership"
                  value={
                    selectedUser.profile
                      ?.leadershipPosition
                  }
                />
              </DirectorySection>

              {/* PROFESSIONAL */}
              <DirectorySection title="Professional">
                <DirectoryItem
                  label="Profession"
                  value={
                    selectedUser.profile
                      ?.profession
                  }
                />

                <DirectoryItem
                  label="Job Title"
                  value={
                    selectedUser.profile
                      ?.jobTitle
                  }
                />

                <DirectoryItem
                  label="Employer"
                  value={
                    selectedUser.profile
                      ?.employer
                  }
                />

                <DirectoryItem
                  label="Industry"
                  value={
                    selectedUser.profile
                      ?.industry
                  }
                />

                <DirectoryItem
                  label="Skills"
                  value={selectedUser.profile
                    ?.skills?.join(", ")}
                />
              </DirectorySection>

              {/* LOCATION */}
              {(selectedUser.profile?.city ||
                selectedUser.profile?.country ||
                selectedUser.profile
                  ?.stateOfOrigin) && (
                  <DirectorySection title="Location">
                    <DirectoryItem
                      label="City"
                      value={
                        selectedUser
                          .profile
                          ?.city
                      }
                    />

                    <DirectoryItem
                      label="Country"
                      value={
                        selectedUser
                          .profile
                          ?.country
                      }
                    />

                    <DirectoryItem
                      label="State of Origin"
                      value={
                        selectedUser
                          .profile
                          ?.stateOfOrigin
                      }
                    />
                  </DirectorySection>
                )}

              {/* OLIVET EXPERIENCE */}
              {(selectedUser.profile
                ?.clubsAndSocieties?.length ||
                selectedUser.profile
                  ?.sportsAndActivities?.length ||
                selectedUser.profile
                  ?.awardsAndHonours ||
                selectedUser.profile
                  ?.memorableTeachers ||
                selectedUser.profile
                  ?.olivetMemory) && (
                  <DirectorySection title="Olivet Experience">
                    <DirectoryItem
                      label="Clubs & Societies"
                      value={selectedUser
                        .profile
                        ?.clubsAndSocieties?.join(
                          ", "
                        )}
                    />

                    <DirectoryItem
                      label="Sports & Activities"
                      value={selectedUser
                        .profile
                        ?.sportsAndActivities?.join(
                          ", "
                        )}
                    />

                    <DirectoryItem
                      label="Awards & Honours"
                      value={
                        selectedUser
                          .profile
                          ?.awardsAndHonours
                      }
                    />

                    <DirectoryItem
                      label="Memorable Teachers"
                      value={
                        selectedUser
                          .profile
                          ?.memorableTeachers
                      }
                    />

                    <DirectoryItem
                      label="Olivet Memory"
                      value={
                        selectedUser
                          .profile
                          ?.olivetMemory
                      }
                    />
                  </DirectorySection>
                )}

              {/* BUSINESS */}
              {selectedUser.profile
                ?.businessOwner && (
                  <DirectorySection title="Business">
                    <DirectoryItem
                      label="Business Name"
                      value={
                        selectedUser
                          .profile
                          ?.businessName
                      }
                    />

                    <DirectoryItem
                      label="Services"
                      value={
                        selectedUser
                          .profile
                          ?.businessServices
                      }
                    />
                  </DirectorySection>
                )}

              {/* EDUCATION */}
              {(selectedUser.profile
                ?.otherEducation ||
                selectedUser.profile
                  ?.qualifications ||
                selectedUser.profile
                  ?.professionalMemberships ||
                selectedUser.profile
                  ?.achievements) && (
                  <DirectorySection title="Education & Achievements">
                    <DirectoryItem
                      label="Other Education"
                      value={
                        selectedUser
                          .profile
                          ?.otherEducation
                      }
                    />

                    <DirectoryItem
                      label="Qualifications"
                      value={
                        selectedUser
                          .profile
                          ?.qualifications
                      }
                    />

                    <DirectoryItem
                      label="Professional Memberships"
                      value={
                        selectedUser
                          .profile
                          ?.professionalMemberships
                      }
                    />

                    <DirectoryItem
                      label="Achievements"
                      value={
                        selectedUser
                          .profile
                          ?.achievements
                      }
                    />
                  </DirectorySection>
                )}

              {/* CONTACT */}
              {(selectedUser.contact?.email ||
                selectedUser.contact?.phone ||
                selectedUser.profile?.whatsapp ||
                selectedUser.profile?.socialLinks) && (
                  <DirectorySection title="Contact & Social">
                    <DirectoryItem
                      label="Email"
                      value={
                        selectedUser.contact
                          ?.email
                      }
                    />

                    <DirectoryItem
                      label="Phone"
                      value={
                        selectedUser.contact
                          ?.phone
                      }
                    />

                    <DirectoryItem
                      label="WhatsApp"
                      value={
                        selectedUser.profile
                          ?.whatsapp
                      }
                    />

                    <DirectoryItem
                      label="Website"
                      value={
                        selectedUser.profile
                          ?.website
                      }
                    />

                    <DirectoryItem
                      label="LinkedIn"
                      value={
                        selectedUser.profile
                          ?.socialLinks
                          ?.linkedin
                      }
                    />

                    <DirectoryItem
                      label="Facebook"
                      value={
                        selectedUser.profile
                          ?.socialLinks
                          ?.facebook
                      }
                    />

                    <DirectoryItem
                      label="Instagram"
                      value={
                        selectedUser.profile
                          ?.socialLinks
                          ?.instagram
                      }
                    />
                  </DirectorySection>
                )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Directory;