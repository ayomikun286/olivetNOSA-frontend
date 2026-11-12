import React from "react";
import { ArrowLeft, Vote, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Election = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate("/portal/member/dashboard")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-(--text-muted) transition hover:text-(--primary)"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <h1 className="text-xl font-semibold text-(--primary)">
          Election Portal
        </h1>

        <p className="mt-1 text-sm text-(--secondary)">
          Stay informed about the NOSA  election process.
        </p>
      </div>

      {/* Under Construction */}
      <section className="rounded border border-(--border) bg-(--bg-white) p-6 sm:p-10">

        <div className="mx-auto max-w-xl py-8 text-center">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Construction size={32} strokeWidth={1.7} />
          </div>

          {/* Status */}
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            Under Construction
          </span>

          {/* Message */}
          <h2 className="mt-5 text-xl font-semibold text-(--primary) sm:text-2xl">
            Election Portal Coming Soon
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-(--text-muted)">
            The  NOSA Election Portal is currently under construction.
            We are working on making this platform available to members.
            Please check back later for updates.
          </p>

          {/* Divider */}
          <div className="mx-auto my-7 h-px w-20 bg-(--border)" />

          <div className="flex items-center justify-center gap-2 text-sm text-(--text-muted)">
            <Vote size={18} className="text-(--secondary)" />
            <span>NOSA Election Portal</span>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Election;