import React, { useEffect, useState } from "react";
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
  Eye,
  House,
  Camera
} from "lucide-react";
import {
  getMemberProfile,
  updateMemberProfile,
  uploadProfilePhoto

} from "../../services/authService.js";
import ContentLoading from "../../components/admin/ContentLoading.jsx"


import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();




  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getMemberProfile();


        if (response?.success) {
          setMyProfile(response.data);
          setFormData({
            firstName: response.data.firstName || "",
            middleName: response.data.middleName || "",
            lastName: response.data.lastName || "",
            phone: response.data.phone || "",
            profile: {
              ...response.data.profile,
            },
          });
        }
      } catch (error) {
        console.error("Failed to load member profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const member = myProfile;

  const house = member?.profile?.schoolHouse;


  const fullName = [
    member?.firstName,
    member?.middleName,
    member?.lastName,
  ]
    .filter(Boolean)
    .join(" ");


 if (loading) {
    return (
      <ContentLoading />
    );
  }


  const getInitials = () => {
    const first = member?.firstName?.charAt(0) || "";
    const last = member?.lastName?.charAt(0) || "";

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


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,
        profile: {
          ...formData.profile,
          clubsAndSocieties:
            typeof formData.profile?.clubsAndSocieties === "string"
              ? formData.profile.clubsAndSocieties
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
              : formData.profile?.clubsAndSocieties || [],

          skills:
            typeof formData.profile?.skills === "string"
              ? formData.profile.skills
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
              : formData.profile?.skills || [],

          sportsAndActivities:
            typeof formData.profile?.sportsAndActivities === "string"
              ? formData.profile.sportsAndActivities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
              : formData.profile?.sportsAndActivities || [],
        },
      };

      const response = await updateMemberProfile(payload);

      alert(response.message)

      if (response?.success) {
        setMyProfile((prev) => ({
          ...prev,
          ...response.data,
        }));

        setFormData({
          ...payload,
          profile: {
            ...payload.profile,
          },
        });

        setEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleArrayProfileChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value,
      },
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingPhoto(true);

      const response = await uploadProfilePhoto(file);

      if (response?.success) {
        setMyProfile((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            profilePhoto: response.data.profilePhoto,
          },
        }));
      }

      alert(response.message || "Profile photo uploaded successfully.");
    } catch (error) {
      console.error("Failed to upload profile photo:", error);
      alert(error.message || "Unable to upload profile photo.");
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">

        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-(--primary)">
              My Profile
            </h1>

            <p className="text-sm text-(--secondary) mt-1">
              View and manage your OlivetNOSA member information.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="
                          h-9
                          px-3.5
                          rounded
                          bg-(--primary)
                          text-white
                          text-xs
                          font-semibold
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          hover:opacity-90
                          transition-opacity
                        " >
              Edit Profile
            </button>
          )}
        </div>

        {/* PROFILE SUMMARY */}
        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">


            {/* PROFILE PHOTO */}
            <div className="relative shrink-0">
              {member?.profile?.profilePhoto ? (
                <img
                  src={member.profile.profilePhoto}
                  alt={fullName || "Profile photo"}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
                  <span className="text-lg font-semibold">
                    {getInitials() || <UserRound size={25} />}
                  </span>
                </div>
              )}

              <label
                htmlFor="profile-photo-upload"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-(--bg-white) bg-(--primary) text-white transition hover:opacity-90"
                title="Change profile photo"
              >
                <Camera size={13} />

                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                  className="hidden"
                />
              </label>
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
                    {member?.alumniId || "Pending approval"}
                  </span>
                </span>
              </div>
            </div>

            {/* STATUS */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--success) bg-(--success-light) px-3 py-1.5 rounded-full">
                <BadgeCheck size={14} />
                {member?.status === "active"
                  ? "Active Member"
                  : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* INFORMATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* PERSONAL INFORMATION */}
          <div
            className={`bg-(--bg-white) border border-(--border) rounded overflow-hidden ${editing ? "lg:col-span-2" : ""
              }`}
          >  <div className="p-5 border-b border-(--border)">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                  <UserRound size={17} />
                </div>

                <div>
                  <h2 className="font-semibold text-(--primary)">
                    Personal Information
                  </h2>

                  <p className="text-xs text-(--secondary) mt-0.5">
                    Your personal and contact details.
                  </p>
                </div>
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="p-5 space-y-5">

                {/* BASIC PERSONAL DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">

                  {/* FIRST NAME */}
                  <div>
                    <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={formData?.firstName || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                    />
                  </div>

                  {/* MIDDLE NAME */}
                  <div>
                    <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                      Middle Name
                    </label>

                    <input
                      type="text"
                      name="middleName"
                      value={formData?.middleName || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                    />
                  </div>

                  {/* LAST NAME */}
                  <div>
                    <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData?.lastName || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData?.phone || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                    />
                  </div>

                  {/* OLIVET NAME */}
                  <div>
                    <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                      Olivet Name
                    </label>

                    <input
                      type="text"
                      name="olivetName"
                      value={formData?.profile?.olivetName || ""}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      placeholder="Name used during your time at Olivet"
                    />
                  </div>

                  {/* PREFERRED NAME */}
                  <div>
                    <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                      Preferred Name
                    </label>

                    <input
                      type="text"
                      name="preferredName"
                      value={formData?.profile?.preferredName || ""}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      placeholder="What should other members call you?"
                    />
                  </div>
                </div>

                {/* EMAIL - READ ONLY */}
                <div>
                  <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                    Email Address
                  </label>

                  <div className="flex items-center gap-2 px-3 py-2.5 text-sm border border-(--border) rounded bg-gray-50 text-(--secondary)">
                    <Mail size={15} />

                    <span className="break-all">
                      {member?.email || "—"}
                    </span>
                  </div>

                  <p className="text-[11px] text-(--text-muted) mt-1">
                    Email address cannot be changed here.
                  </p>
                </div>

                {/* OLIVET BACKGROUND */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <GraduationCap size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Olivet Background
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Add details about your time at Olivet.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* MAIDEN NAME */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Maiden Name
                      </label>

                      <input
                        type="text"
                        name="maidenName"
                        value={formData?.profile?.maidenName || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="Enter maiden name"
                      />
                    </div>

                    {/* NICKNAME */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Nickname
                      </label>

                      <input
                        type="text"
                        name="nickname"
                        value={formData?.profile?.nickname || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="Enter nickname"
                      />
                    </div>

                    {/* SCHOOL HOUSE */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        School House
                      </label>

                      <select
                        name="schoolHouse"
                        value={formData?.profile?.schoolHouse || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      >
                        <option value="">Select house</option>
                        <option value="Atanda">Atanda</option>
                        <option value="Odetayo">Odetayo</option>
                        <option value="Locket">Locket</option>
                        <option value="Pinnock">Pinnock</option>
                        <option value="Homer Brown">Homer Brown</option>
                        <option value="J.B.P. Lafinhan">
                          J.B.P. Lafinhan
                        </option>
                      </select>
                    </div>

                    {/* STUDENT TYPE */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Student Type
                      </label>

                      <select
                        name="studentType"
                        value={formData?.profile?.studentType || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      >
                        <option value="">Select student type</option>
                        <option value="boarding">Boarding</option>
                        <option value="day">Day</option>
                      </select>
                    </div>

                    {/* ADMISSION NUMBER */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Admission Number
                      </label>

                      <input
                        type="text"
                        name="admissionNumber"
                        value={formData?.profile?.admissionNumber || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="Enter admission number"
                      />
                    </div>
                  </div>
                </div>

                {/* OLIVET EXPERIENCE */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <Users size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Olivet Experience
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Share some details about your experience at Olivet.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* LEADERSHIP POSITION */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Leadership Position
                      </label>

                      <input
                        type="text"
                        name="leadershipPosition"
                        value={formData?.profile?.leadershipPosition || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Senior Prefect"
                      />
                    </div>

                    {/* CLUBS & SOCIETIES */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Clubs & Societies
                      </label>

                      <input
                        type="text"
                        name="clubsAndSocieties"
                        value={
                          Array.isArray(formData?.profile?.clubsAndSocieties)
                            ? formData.profile.clubsAndSocieties.join(", ")
                            : formData?.profile?.clubsAndSocieties || ""
                        }
                        onChange={handleArrayProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Press Club, Drama Club"
                      />

                      <p className="text-[11px] text-(--text-muted) mt-1">
                        Separate multiple entries with commas.
                      </p>
                    </div>

                    {/* SPORTS & ACTIVITIES */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Sports & Activities
                      </label>

                      <input
                        type="text"
                        name="sportsAndActivities"
                        value={
                          Array.isArray(formData?.profile?.sportsAndActivities)
                            ? formData.profile.sportsAndActivities.join(", ")
                            : formData?.profile?.sportsAndActivities || ""
                        }
                        onChange={handleArrayProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Football, Athletics"
                      />

                      <p className="text-[11px] text-(--text-muted) mt-1">
                        Separate multiple entries with commas.
                      </p>
                    </div>

                    {/* AWARDS & HONOURS */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Awards & Honours
                      </label>

                      <textarea
                        name="awardsAndHonours"
                        value={formData?.profile?.awardsAndHonours || ""}
                        onChange={handleProfileChange}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Awards, achievements or honours received"
                      />
                    </div>

                    {/* MEMORABLE TEACHERS */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Memorable Teachers
                      </label>

                      <textarea
                        name="memorableTeachers"
                        value={formData?.profile?.memorableTeachers || ""}
                        onChange={handleProfileChange}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Teachers you remember fondly"
                      />
                    </div>

                    {/* OLIVET MEMORY */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Olivet Memory
                      </label>

                      <textarea
                        name="olivetMemory"
                        value={formData?.profile?.olivetMemory || ""}
                        onChange={handleProfileChange}
                        rows={3}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Share a memorable experience or moment from your time at Olivet"
                      />
                    </div>
                  </div>
                </div>

                {/* LOCATION INFORMATION */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <MapPin size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Location Information
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Tell us where you currently live and your state of origin.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* COUNTRY */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Country
                      </label>

                      <input
                        type="text"
                        name="country"
                        value={formData?.profile?.country || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Nigeria"
                      />
                    </div>

                    {/* CITY */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={formData?.profile?.city || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Ibadan"
                      />
                    </div>

                    {/* STATE OF ORIGIN */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        State of Origin
                      </label>

                      <input
                        type="text"
                        name="stateOfOrigin"
                        value={formData?.profile?.stateOfOrigin || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Oyo"
                      />
                    </div>
                  </div>
                </div>

                {/* PROFESSIONAL INFORMATION */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <BadgeCheck size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Professional Information
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Share your current professional background.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* PROFESSIONAL HEADLINE */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Professional Headline
                      </label>

                      <input
                        type="text"
                        name="professionalHeadline"
                        value={formData?.profile?.professionalHeadline || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"

                      />
                    </div>

                    {/* EMPLOYMENT STATUS */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Employment Status
                      </label>

                      <select
                        name="employmentStatus"
                        value={formData?.profile?.employmentStatus || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      >
                        <option value="">Select status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="business-owner">
                          Business Owner
                        </option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* JOB TITLE */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Job Title
                      </label>

                      <input
                        type="text"
                        name="jobTitle"
                        value={formData?.profile?.jobTitle || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"

                      />
                    </div>

                    {/* EMPLOYER */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Employer / Organization
                      </label>

                      <input
                        type="text"
                        name="employer"
                        value={formData?.profile?.employer || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="Company or organization"
                      />
                    </div>

                    {/* INDUSTRY */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Industry
                      </label>

                      <input
                        type="text"
                        name="industry"
                        value={formData?.profile?.industry || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="e.g. Technology, Education, Finance"
                      />
                    </div>

                    {/* PROFESSION */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Profession
                      </label>

                      <input
                        type="text"
                        name="profession"
                        value={formData?.profile?.profession || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"

                      />
                    </div>

                    {/* SKILLS */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Skills
                      </label>

                      <input
                        type="text"
                        name="skills"
                        value={
                          Array.isArray(formData?.profile?.skills)
                            ? formData.profile.skills.join(", ")
                            : formData?.profile?.skills || ""
                        }
                        onChange={handleArrayProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"


                      />

                      <p className="text-[11px] text-(--text-muted) mt-1">
                        Separate multiple skills with commas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* BUSINESS INFORMATION */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <Users size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Business Information
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Share your business details if you own or run a business.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* BUSINESS OWNER */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Do you own a business?
                      </label>

                      <select
                        name="businessOwner"
                        value={
                          formData?.profile?.businessOwner === true
                            ? "true"
                            : formData?.profile?.businessOwner === false
                              ? "false"
                              : ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              businessOwner:
                                e.target.value === ""
                                  ? undefined
                                  : e.target.value === "true",
                            },
                          }))
                        }
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    {/* BUSINESS NAME */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Business Name
                      </label>

                      <input
                        type="text"
                        name="businessName"
                        value={formData?.profile?.businessName || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                      />
                    </div>

                    {/* BUSINESS SERVICES */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Business Services
                      </label>

                      <textarea
                        name="businessServices"
                        value={formData?.profile?.businessServices || ""}
                        onChange={handleProfileChange}
                        rows={3}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Describe the products or services your business provides"
                      />
                    </div>
                  </div>
                </div>

                {/* EDUCATION & CREDENTIALS */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <GraduationCap size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Education & Credentials
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Add relevant education and professional credentials.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* OTHER EDUCATION */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Other Education
                      </label>

                      <textarea
                        name="otherEducation"
                        value={formData?.profile?.otherEducation || ""}
                        onChange={handleProfileChange}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Universities, institutions or other relevant education"
                      />
                    </div>

                    {/* QUALIFICATIONS */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Qualifications
                      </label>

                      <textarea
                        name="qualifications"
                        value={formData?.profile?.qualifications || ""}
                        onChange={handleProfileChange}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Degrees, certifications or professional qualifications"
                      />
                    </div>

                    {/* PROFESSIONAL MEMBERSHIPS */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Professional Memberships
                      </label>

                      <textarea
                        name="professionalMemberships"
                        value={formData?.profile?.professionalMemberships || ""}
                        onChange={handleProfileChange}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Professional bodies or associations"
                      />
                    </div>

                    {/* ACHIEVEMENTS */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Achievements
                      </label>

                      <textarea
                        name="achievements"
                        value={formData?.profile?.achievements || ""}
                        onChange={handleProfileChange}
                        rows={3}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-none"
                        placeholder="Notable professional or personal achievements"
                      />
                    </div>

                    {/* WEBSITE */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Website
                      </label>

                      <input
                        type="url"
                        name="website"
                        value={formData?.profile?.website || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTACT & SOCIAL */}
                <div className="border-t border-(--border) pt-5 mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <Phone size={15} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-(--primary)">
                        Contact & Social
                      </h3>

                      <p className="text-xs text-(--text-muted) mt-0.5">
                        Add contact details you want fellow Olivetians to see.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* WHATSAPP */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        WhatsApp
                      </label>

                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData?.profile?.whatsapp || ""}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="+234 800 000 0000"
                      />
                    </div>

                    {/* LINKEDIN */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        LinkedIn
                      </label>

                      <input
                        type="url"
                        name="linkedin"
                        value={
                          formData?.profile?.socialLinks?.linkedin || ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              socialLinks: {
                                ...prev.profile?.socialLinks,
                                linkedin: e.target.value,
                              },
                            },
                          }))
                        }
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    {/* FACEBOOK */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Facebook
                      </label>

                      <input
                        type="url"
                        name="facebook"
                        value={
                          formData?.profile?.socialLinks?.facebook || ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              socialLinks: {
                                ...prev.profile?.socialLinks,
                                facebook: e.target.value,
                              },
                            },
                          }))
                        }
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="https://facebook.com/..."
                      />
                    </div>

                    {/* INSTAGRAM */}
                    <div>
                      <label className="block text-xs font-medium text-(--text-muted) mb-1.5">
                        Instagram
                      </label>

                      <input
                        type="url"
                        name="instagram"
                        value={
                          formData?.profile?.socialLinks?.instagram || ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              socialLinks: {
                                ...prev.profile?.socialLinks,
                                instagram: e.target.value,
                              },
                            },
                          }))
                        }
                        className="w-full px-3 py-2.5 text-sm border border-(--border) rounded bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy & Directory */}
                <div className="bg-(--bg-white) border border-(--border) rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-(--primary)/10 flex items-center justify-center">
                      <Eye size={20} className="text-(--primary)" />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-(--text)">
                        Privacy & Directory
                      </h3>
                      <p className="text-sm text-(--text-muted)">
                        Choose what other members can see in the directory.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: "appearInDirectory",
                        label: "Appear in Member Directory",
                        description: "Allow your profile to appear in the member directory.",
                      },
                      {
                        key: "showEmail",
                        label: "Show Email",
                        description: "Allow your email address to be visible.",
                      },
                      {
                        key: "showPhone",
                        label: "Show Phone",
                        description: "Allow your phone number to be visible.",
                      },
                      {
                        key: "showWhatsapp",
                        label: "Show WhatsApp",
                        description: "Allow your WhatsApp number to be visible.",
                      },
                      {
                        key: "showEmployer",
                        label: "Show Employer",
                        description: "Allow your employer or organization to be visible.",
                      },
                      {
                        key: "showLocation",
                        label: "Show Location",
                        description: "Allow your city and country to be visible.",
                      },
                      {
                        key: "showSocialLinks",
                        label: "Show Social Links",
                        description: "Allow your social media links to be visible.",
                      },
                      {
                        key: "showBusiness",
                        label: "Show Business Information",
                        description: "Allow your business information to be visible.",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-4 py-3 border-b border-(--border) last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-(--text)">
                            {item.label}
                          </p>
                          <p className="text-xs text-(--text-muted) mt-1">
                            {item.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              profile: {
                                ...prev.profile,
                                privacy: {
                                  ...prev.profile?.privacy,
                                  [item.key]: !prev.profile?.privacy?.[item.key],
                                },
                              },
                            }))
                          }
                          className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${formData?.profile?.privacy?.[item.key]
                            ? "bg-(--primary)"
                            : "bg-gray-300"
                            }`}
                          aria-label={item.label}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData?.profile?.privacy?.[item.key]
                              ? "translate-x-5"
                              : ""
                              }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    disabled={saving}
                    className="px-4 py-2 text-sm font-medium rounded border border-(--border) text-(--primary) hover:bg-(--primary-light) transition disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 text-sm font-medium rounded bg-(--primary) text-white hover:opacity-90 transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-5 space-y-5">

                {/* FULL NAME */}
                <div>
                  <p className="text-xs text-(--text-muted)">
                    Full Name
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <UserRound
                      size={15}
                      className="text-(--secondary) shrink-0"
                    />

                    <p className="text-sm font-medium text-(--primary)">
                      {fullName || "—"}
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
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
                      {member?.email || "—"}
                    </p>
                  </div>
                </div>

                {/* PHONE */}
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
                      {member?.phone || "—"}
                    </p>
                  </div>
                </div>

                {/* OLIVET NAME */}
                <div>
                  <p className="text-xs text-(--text-muted)">
                    Olivet Name
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <GraduationCap
                      size={15}
                      className="text-(--secondary) shrink-0"
                    />

                    <p className="text-sm font-medium text-(--primary)">
                      {member?.profile?.olivetName || "—"}
                    </p>
                  </div>
                </div>

                {/* PREFERRED NAME */}
                <div>
                  <p className="text-xs text-(--text-muted)">
                    Preferred Name
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <UserRound
                      size={15}
                      className="text-(--secondary) shrink-0"
                    />

                    <p className="text-sm font-medium text-(--primary)">
                      {member?.profile?.preferredName || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!editing && (
            <>
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

                  {/* ALUMNI ID */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Alumni ID
                    </p>

                    <p className="text-sm font-semibold text-(--primary) mt-1">
                      {member?.alumniId || "Pending approval"}
                    </p>
                  </div>

                  {/* GRADUATION YEAR */}
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
                        {member?.graduationYear || "—"}
                      </p>
                    </div>
                  </div>

                  {/* YEAR SET */}
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
                        {member?.yearSet?.name || "Not yet assigned"}
                      </p>
                    </div>
                  </div>

                  {/* CHAPTER */}
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
                        {member?.chapter?.name || "Not yet assigned"}
                      </p>
                    </div>
                  </div>
                  {/* school house */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      House
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <House
                        size={15}
                        className="text-(--secondary)"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {house || "_"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOCATION & PROFESSIONAL INFORMATION */}
              <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                <div className="p-5 border-b border-(--border)">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <MapPin size={17} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-(--primary)">
                        Location & Professional
                      </h2>

                      <p className="text-xs text-(--secondary) mt-0.5">
                        Your current location and professional information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-5">

                  {/* LOCATION */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Location
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <MapPin
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {[
                          member?.profile?.city,
                          member?.profile?.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </p>
                    </div>
                  </div>

                  {/* STATE OF ORIGIN */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      State of Origin
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <MapPin
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.stateOfOrigin || "—"}
                      </p>
                    </div>
                  </div>

                  {/* PROFESSIONAL HEADLINE */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Professional Headline
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <BadgeCheck
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.professionalHeadline || "—"}
                      </p>
                    </div>
                  </div>

                  {/* JOB TITLE */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Job Title
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <BadgeCheck
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.jobTitle || "—"}
                      </p>
                    </div>
                  </div>

                  {/* EMPLOYER */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Employer
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Users
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.employer || "—"}
                      </p>
                    </div>
                  </div>

                  {/* PROFESSION */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Profession
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <BadgeCheck
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.profession || "—"}
                      </p>
                    </div>
                  </div>

                  {/* INDUSTRY */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Industry
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <GraduationCap
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.industry || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTACT & SOCIAL */}
              <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                <div className="p-5 border-b border-(--border)">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                      <Phone size={17} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-(--primary)">
                        Contact & Social
                      </h2>

                      <p className="text-xs text-(--secondary) mt-0.5">
                        Your contact and social information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-5">

                  {/* PHONE */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Phone
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Phone
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.phone || "—"}
                      </p>
                    </div>
                  </div>

                  {/* WHATSAPP */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      WhatsApp
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Phone
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary)">
                        {member?.profile?.whatsapp || "—"}
                      </p>
                    </div>
                  </div>

                  {/* LINKEDIN */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      LinkedIn
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Users
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary) break-all">
                        {member?.profile?.socialLinks?.linkedin || "—"}
                      </p>
                    </div>
                  </div>

                  {/* WEBSITE */}
                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Website
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <ShieldCheck
                        size={15}
                        className="text-(--secondary) shrink-0"
                      />

                      <p className="text-sm font-medium text-(--primary) break-all">
                        {member?.profile?.website || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </>
          )}
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

              {/* EMAIL VERIFICATION */}
              <div>
                <p className="text-xs text-(--text-muted)">
                  Email Verification
                </p>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <BadgeCheck
                    size={15}
                    className={
                      member?.isEmailVerified
                        ? "text-(--success)"
                        : "text-(--warning)"
                    }
                  />

                  <span
                    className={`text-sm font-medium ${member?.isEmailVerified
                      ? "text-(--success)"
                      : "text-(--warning)"
                      }`}
                  >
                    {member?.isEmailVerified
                      ? "Verified"
                      : "Not verified"}
                  </span>
                </div>
              </div>

              {/* MEMBERSHIP STATUS */}
              <div>
                <p className="text-xs text-(--text-muted)">
                  Membership Status
                </p>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <BadgeCheck
                    size={15}
                    className={
                      member?.status === "active"
                        ? "text-(--success)"
                        : "text-(--warning)"
                    }
                  />

                  <span
                    className={`text-sm font-medium ${member?.status === "active"
                      ? "text-(--success)"
                      : "text-(--warning)"
                      }`}
                  >
                    {member?.status === "active"
                      ? "Active"
                      : "Pending"}
                  </span>
                </div>
              </div>

              {/* MEMBER SINCE */}
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

      </div>
    </div>
  );
};

export default Profile;