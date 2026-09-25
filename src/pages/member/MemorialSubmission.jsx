import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ImagePlus, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createMemorialSubmission,
  getMemorials,
} from "../../services/authService";

const MemorialSubmission = () => {
  const navigate = useNavigate();

  const [memorials, setMemorials] = useState([]);
  const [loadingMemorials, setLoadingMemorials] = useState(true);

  const [submissionType, setSubmissionType] =
    useState("photograph");

  const [memorialChoice, setMemorialChoice] =
    useState("existing");

  const [memorial, setMemorial] = useState("");

  const [suggestedFullName, setSuggestedFullName] =
    useState("");

  const [suggestedSchoolSet, setSuggestedSchoolSet] =
    useState("");

  const [suggestedYearsAttended, setSuggestedYearsAttended] =
    useState("");

  const [suggestedGraduationYear, setSuggestedGraduationYear] =
    useState("");

  const [message, setMessage] = useState("");

  const [files, setFiles] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load published memorials
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const loadMemorials = async () => {
      try {
        setLoadingMemorials(true);
        setError("");

        const response = await getMemorials();

        if (response?.success) {
          setMemorials(response.data || []);
        } else {
          throw new Error(
            response?.message ||
              "Unable to load memorial records."
          );
        }
      } catch (error) {
        console.error(
          "Load memorials for submission error:",
          error
        );

        setError(
          error.message ||
            "Unable to load memorial records."
        );
      } finally {
        setLoadingMemorials(false);
      }
    };

    loadMemorials();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Submission type options
  |--------------------------------------------------------------------------
  */

  const submissionTypes = useMemo(
    () => [
      {
        value: "photograph",
        label: "Photograph",
      },
      {
        value: "biography",
        label: "Biography",
      },
      {
        value: "condolence",
        label: "Condolence",
      },
      {
        value: "correction",
        label: "Correction",
      },
      {
        value: "new_memorial",
        label: "New Memorial",
      },
    ],
    []
  );

  /*
  |--------------------------------------------------------------------------
  | File handling
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (!selectedFiles.length) return;

    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== selectedFiles.length) {
      setError("Only image files are allowed.");
      return;
    }

    const combinedFiles = [...files, ...imageFiles];

    if (combinedFiles.length > 10) {
      setError(
        "You can upload a maximum of 10 photographs."
      );
      return;
    }

    const oversizedFile = combinedFiles.find(
      (file) => file.size > 10 * 1024 * 1024
    );

    if (oversizedFile) {
      setError(
        `"${oversizedFile.name}" is larger than 10MB.`
      );
      return;
    }

    setError("");
    setFiles(combinedFiles);

    event.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Memorial choice
  |--------------------------------------------------------------------------
  */

  const handleMemorialChoiceChange = (value) => {
    setMemorialChoice(value);

    if (value === "new") {
      setMemorial("");
      setSubmissionType("new_memorial");
    } else if (submissionType === "new_memorial") {
      setSubmissionType("photograph");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
    |--------------------------------------------------------------------------
    | Basic validation
    |--------------------------------------------------------------------------
    */

    if (!message.trim()) {
      setError(
        "Please provide the remembrance or information you would like to share."
      );
      return;
    }

    if (
      memorialChoice === "existing" &&
      !memorial
    ) {
      setError(
        "Please select the memorial this submission relates to."
      );
      return;
    }

    if (
      memorialChoice === "new" &&
      !suggestedFullName.trim()
    ) {
      setError(
        "Please provide the full name of the person you are remembering."
      );
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Build FormData
    |--------------------------------------------------------------------------
    */

    const formData = new FormData();

    formData.append(
      "submissionType",
      submissionType
    );

    formData.append(
      "message",
      message.trim()
    );

    if (memorialChoice === "existing" && memorial) {
      formData.append("memorial", memorial);
    }

    if (memorialChoice === "new") {
      formData.append(
        "suggestedFullName",
        suggestedFullName.trim()
      );

      if (suggestedSchoolSet.trim()) {
        formData.append(
          "suggestedSchoolSet",
          suggestedSchoolSet.trim()
        );
      }

      if (suggestedYearsAttended.trim()) {
        formData.append(
          "suggestedYearsAttended",
          suggestedYearsAttended.trim()
        );
      }

      if (suggestedGraduationYear) {
        formData.append(
          "suggestedGraduationYear",
          suggestedGraduationYear
        );
      }
    }

    files.forEach((file) => {
      formData.append("photographs", file);
    });

    /*
    |--------------------------------------------------------------------------
    | API request
    |--------------------------------------------------------------------------
    */

    try {
      setSubmitting(true);

      const response =
        await createMemorialSubmission(formData);

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to submit your remembrance."
        );
      }

      setSuccess(
        response.message ||
          "Your remembrance has been submitted for review."
      );

      /*
      |--------------------------------------------------------------------------
      | Reset form
      |--------------------------------------------------------------------------
      */

      setMemorial("");
      setMemorialChoice("existing");
      setSubmissionType("photograph");
      setSuggestedFullName("");
      setSuggestedSchoolSet("");
      setSuggestedYearsAttended("");
      setSuggestedGraduationYear("");
      setMessage("");
      setFiles([]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Memorial submission error:",
        error
      );

      setError(
        error.message ||
          "Unable to submit your remembrance."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            navigate(
              "/portal/member/dashboard/memorials"
            )
          }
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-(--text-muted) transition hover:text-(--primary)"
        >
          <ArrowLeft size={17} />
          Back to In Loving Memory
        </button>

        <h1 className="text-xl font-semibold text-(--primary)">
          Share a Remembrance
        </h1>

        <p className="mt-1 text-sm text-(--secondary)">
          Help preserve the memory and legacy of an
          Olivetian.
        </p>
      </div>

    

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Memorial selection */}
        <section className="rounded border border-(--border) bg-(--bg-white) p-5">
          <h2 className="text-base font-semibold text-(--primary)">
            Who is this remembrance for?
          </h2>

          <p className="mt-1 text-sm text-(--text-muted)">
            Choose an existing memorial or suggest a
            new person to be added to the In Loving
            Memory records.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                handleMemorialChoiceChange(
                  "existing"
                )
              }
              className={`rounded border p-4 text-left transition ${
                memorialChoice === "existing"
                  ? "border-(--primary) bg-(--primary-light)"
                  : "border-(--border) hover:border-(--primary)/40"
              }`}
            >
              <p className="text-sm font-semibold text-(--primary)">
                Existing Memorial
              </p>

              <p className="mt-1 text-xs leading-5 text-(--text-muted)">
                Share information about someone
                already listed.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                handleMemorialChoiceChange("new")
              }
              className={`rounded border p-4 text-left transition ${
                memorialChoice === "new"
                  ? "border-(--primary) bg-(--primary-light)"
                  : "border-(--border) hover:border-(--primary)/40"
              }`}
            >
              <p className="text-sm font-semibold text-(--primary)">
                Suggest a New Memorial
              </p>

              <p className="mt-1 text-xs leading-5 text-(--text-muted)">
                Suggest someone who is not currently
                listed.
              </p>
            </button>
          </div>

          {/* Existing memorial */}
          {memorialChoice === "existing" && (
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-(--primary)">
                Select Memorial
              </label>

              <select
                value={memorial}
                onChange={(event) =>
                  setMemorial(event.target.value)
                }
                disabled={loadingMemorials}
                className="w-full rounded border border-(--border) bg-white px-3 py-3 text-sm text-(--primary) outline-none transition focus:border-(--primary)"
              >
                <option value="">
                  {loadingMemorials
                    ? "Loading memorials..."
                    : "Select a memorial"}
                </option>

                {memorials.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.fullName}
                    {item.schoolSet
                      ? ` — ${item.schoolSet}`
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* New memorial */}
          {memorialChoice === "new" && (
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-(--primary)">
                  Full Name *
                </label>

                <input
                  type="text"
                  value={suggestedFullName}
                  onChange={(event) =>
                    setSuggestedFullName(
                      event.target.value
                    )
                  }
                  placeholder="Full name"
                  className="w-full rounded border border-(--border) bg-white px-3 py-3 text-sm outline-none transition focus:border-(--primary)"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-(--primary)">
                    School Set
                  </label>

                  <input
                    type="text"
                    value={suggestedSchoolSet}
                    onChange={(event) =>
                      setSuggestedSchoolSet(
                        event.target.value
                      )
                    }
                    placeholder="e.g. 1966 Set"
                    className="w-full rounded border border-(--border) bg-white px-3 py-3 text-sm outline-none transition focus:border-(--primary)"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-(--primary)">
                    Years Attended
                  </label>

                  <input
                    type="text"
                    value={suggestedYearsAttended}
                    onChange={(event) =>
                      setSuggestedYearsAttended(
                        event.target.value
                      )
                    }
                    placeholder="e.g. 1962 - 1966"
                    className="w-full rounded border border-(--border) bg-white px-3 py-3 text-sm outline-none transition focus:border-(--primary)"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-(--primary)">
                  Graduation Year
                </label>

                <input
                  type="number"
                  value={suggestedGraduationYear}
                  onChange={(event) =>
                    setSuggestedGraduationYear(
                      event.target.value
                    )
                  }
                  placeholder="e.g. 1966"
                  className="w-full rounded border border-(--border) bg-white px-3 py-3 text-sm outline-none transition focus:border-(--primary)"
                />
              </div>
            </div>
          )}
        </section>

        {/* Submission type */}
        <section className="rounded border border-(--border) bg-(--bg-white) p-5">
          <h2 className="text-base font-semibold text-(--primary)">
            What would you like to share?
          </h2>

          <div className="mt-4">
            <select
              value={submissionType}
              onChange={(event) =>
                setSubmissionType(event.target.value)
              }
              className="w-full rounded border border-(--border) bg-white px-3 py-3 text-sm text-(--primary) outline-none focus:border-(--primary)"
            >
              {submissionTypes.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Message */}
        <section className="rounded border border-(--border) bg-(--bg-white) p-5">
          <h2 className="text-base font-semibold text-(--primary)">
            Your Contribution
          </h2>

          <p className="mt-1 text-sm text-(--text-muted)">
            Provide the remembrance, biography,
            condolence, correction, or other information
            you would like the association to review.
          </p>

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            rows={8}
            maxLength={5000}
            placeholder="Write your contribution here..."
            className="mt-4 w-full resize-y rounded border border-(--border) bg-white px-3 py-3 text-sm leading-6 text-(--primary) outline-none transition focus:border-(--primary)"
          />

          <p className="mt-2 text-right text-xs text-(--text-muted)">
            {message.length}/5000
          </p>
        </section>

        {/* Photos */}
        <section className="rounded border border-(--border) bg-(--bg-white) p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-(--primary)">
                Photographs
              </h2>

              <p className="mt-1 text-sm text-(--text-muted)">
                You may upload up to 10 photographs.
                Each image must be 10MB or less.
              </p>
            </div>

            <ImagePlus
              size={20}
              className="shrink-0 text-(--secondary)"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-center justify-center rounded border border-dashed border-(--border) px-5 py-8 text-center transition hover:border-(--primary)">
            <div>
              <ImagePlus
                size={28}
                className="mx-auto text-(--secondary)"
              />

              <p className="mt-3 text-sm font-medium text-(--primary)">
                Add photographs
              </p>

              <p className="mt-1 text-xs text-(--text-muted)">
                JPG, PNG, WEBP and other image formats
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded border border-(--border) p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-(--primary)">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-(--text-muted)">
                      {(
                        file.size /
                        (1024 * 1024)
                      ).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFile(index)
                    }
                    className="shrink-0 text-(--text-muted) transition hover:text-(--danger)"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

          {/* Success */}
      {success && (
        <div className="mb-5 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-5 rounded border border-(--danger)/20 bg-(--danger)/5 p-4 text-sm text-(--danger)">
          {error}
        </div>
      )}

        {/* Submit */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/portal/member/dashboard/memorials"
              )
            }
            className="rounded border border-(--border) px-5 py-3 text-sm font-medium text-(--primary) transition hover:border-(--primary)/40"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={17} />

            {submitting
              ? "Submitting..."
              : "Submit for Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemorialSubmission;