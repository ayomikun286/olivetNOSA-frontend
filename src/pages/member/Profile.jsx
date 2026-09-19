import React from "react";
import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  Users,
  MapPin,
  BadgeCheck,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();

  const fullName = [
    user?.firstName,
    user?.middleName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");



    console.log(user);

  const getInitials = () => {
    const first = user?.firstName?.charAt(0) || "";
    const last = user?.lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {/* PAGE HEADER */}
        <div>
          <h1 className="text-xl font-semibold text-(--primary)">
            My Profile
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            View your registered OlivetNOSA membership information.
          </p>
        </div>

        {/* PROFILE SUMMARY */}
        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* AVATAR */}
            <div className="w-16 h-16 shrink-0 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
              <span className="text-lg font-semibold">
                {getInitials() || <UserRound size={25} />}
              </span>
            </div>

            {/* BASIC INFO */}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-(--primary)">
                {fullName || "OlivetNOSA Member"}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                <span className="text-xs text-(--secondary)">
                  Alumni ID:{" "}
                  <span className="font-medium text-(--primary)">
                    {user?.alumniId || "Pending approval"}
                  </span>
                </span>
              </div>
            </div>

            {/* STATUS */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--success) bg-(--success-light) px-3 py-1.5 rounded-full">
                <BadgeCheck size={14} />
                {user?.memberStatus === "active" ? "Active Member" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* INFORMATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* PERSONAL INFORMATION */}
          <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
            <div className="p-5 border-b border-(--border)">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                  <UserRound size={17} />
                </div>

                <div>
                  <h2 className="font-semibold text-(--primary)">
                    Personal Information
                  </h2>

                  <p className="text-xs text-(--secondary) mt-0.5">
                    Your registered personal details.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <p className="text-xs text-(--text-muted)">
                  Full Name
                </p>
                <p className="text-sm font-medium text-(--primary) mt-1">
                  {fullName || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Email Address
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Mail
                    size={15}
                    className="text-(--secondary) shrink-0"
                  />

                  <p className="text-sm font-medium text-(--primary) break-all">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Phone Number
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Phone
                    size={15}
                    className="text-(--secondary) shrink-0"
                  />

                  <p className="text-sm font-medium text-(--primary)">
                    {user?.phone || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ALUMNI INFORMATION */}
          <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
            <div className="p-5 border-b border-(--border)">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                  <GraduationCap size={17} />
                </div>

                <div>
                  <h2 className="font-semibold text-(--primary)">
                    Alumni Information
                  </h2>

                  <p className="text-xs text-(--secondary) mt-0.5">
                    Your OlivetNOSA membership details.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <p className="text-xs text-(--text-muted)">
                  Alumni ID
                </p>

                <p className="text-sm font-semibold text-(--primary) mt-1">
                  {user?.alumniId || "Pending approval"}
                </p>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Graduation Year
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <CalendarDays
                    size={15}
                    className="text-(--secondary)"
                  />

                  <p className="text-sm font-medium text-(--primary)">
                    {user?.graduationYear || "—"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Year Set
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Users
                    size={15}
                    className="text-(--secondary)"
                  />

                  <p className="text-sm font-medium text-(--primary)">
                    {user?.yearSet?.name || "Not yet assigned"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Chapter
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <MapPin
                    size={15}
                    className="text-(--secondary)"
                  />

                  <p className="text-sm font-medium text-(--primary)">
                    {user?.chapter?.name || "Not yet assigned"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT STATUS */}
        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
          <div className="p-5 border-b border-(--border)">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                <ShieldCheck size={17} />
              </div>

              <div>
                <h2 className="font-semibold text-(--primary)">
                  Account
                </h2>

                <p className="text-xs text-(--secondary) mt-0.5">
                  Your OlivetNOSA account status.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <p className="text-xs text-(--text-muted)">
                  Email Verification
                </p>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <BadgeCheck
                    size={15}
                    className={
                      user?.isEmailVerified
                        ? "text-(--success)"
                        : "text-(--warning)"
                    }
                  />

                  <span
                    className={`text-sm font-medium ${
                      user?.isEmailVerified
                        ? "text-(--success)"
                        : "text-(--warning)"
                    }`}
                  >
                    {user?.isEmailVerified
                      ? "Verified"
                      : "Not verified"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Membership Status
                </p>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <BadgeCheck
                    size={15}
                    className={
                      user?.memberStatus === "active"
                        ? "text-(--success)"
                        : "text-(--warning)"
                    }
                  />

                  <span
                    className={`text-sm font-medium ${
                      user?.memberStatus === "active"
                        ? "text-(--success)"
                        : "text-(--warning)"
                    }`}
                  >
                    {user?.memberStatus === "active"
                      ? "Active"
                      : "Pending"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--text-muted)">
                  Member Since
                </p>

                <p className="text-sm font-medium text-(--primary) mt-1.5">
                  {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ADMIN-MANAGED NOTICE */}
        <div className="bg-(--primary-light) border border-(--border) rounded p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={18}
              className="text-(--primary) shrink-0 mt-0.5"
            />

            <div>
              <p className="text-sm font-semibold text-(--primary)">
                Profile information is managed by OlivetNOSA
              </p>

              <p className="text-xs text-(--secondary) mt-1 leading-relaxed">
                Your membership information cannot be edited from this
                portal. If any of your details are incorrect, please
                contact the OlivetNOSA administration for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;