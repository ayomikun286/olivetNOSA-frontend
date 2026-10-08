import React, { useEffect, useState } from "react";
import {
  FileText,
  CircleDollarSign,
  TrendingUp,
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  X,
  ChevronRight,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import ContentLoading from "../../components/admin/ContentLoading";
import { getPublishedFinancialReports } from "../../services/authService.js";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatCurrency = (amount = 0) => {
  return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatCategory = (category) => {
  const labels = {
    individual: "Individuals",
    yearSet: "Year Sets",
    chapter: "Chapters",
  };

  return labels[category] || category;
};

const FinancialReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setErrorStatus(null);

        const response = await getPublishedFinancialReports();

        setReports(response?.data || []);
      } catch (error) {
        console.error("Financial reports page error:", error);

        setErrorStatus(error?.status || 500);
        setErrorMessage(
          error?.message || "Unable to load financial reports."
        );
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const latestReport = reports[0];

  return (
    <>
      <PageTitle title="Financial Reports | OlivetNOSA" />

      <div className="p-4">
        <div className="space-y-4">
          {/* Intro */}
          <div className="flex flex-col mb-5 sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-(--primary)">
                Financial Reports
              </h1>

              <p className="text-sm text-(--text-muted) mt-1">
                Official financial reports published by the association.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-(--secondary)">
              <FileText size={17} />
              <span>
                {reports.length} {reports.length === 1 ? "Report" : "Reports"}
              </span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <ContentLoading message="Loading financial reports..." />
          )}

          {/* Financial eligibility notice */}
          {!loading && errorStatus === 403 && (
            <div className="bg-(--bg-white) border border-(--border) rounded p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-(--secondary-light) flex items-center justify-center shrink-0">
                  <AlertCircle
                    size={20}
                    className="text-(--secondary)"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-(--primary)">
                    Financial Reports
                  </h2>

                  <p className="text-sm text-(--text-muted) mt-1 leading-6">
                    Financial reports are available to members who are
                    currently eligible to view them. Your account is not
                    currently marked as financially eligible.
                  </p>

                  <p className="text-sm text-(--text-muted) mt-2 leading-6">
                    Once your financial status is updated, published
                    financial reports will become available here.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* General error */}
          {!loading && errorStatus && errorStatus !== 403 && (
            <div className="bg-(--bg-white) border border-(--border) rounded p-5">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-(--danger) mt-0.5 shrink-0"
                />

                <div>
                  <h2 className="font-semibold text-(--primary)">
                    Unable to load reports
                  </h2>

                  <p className="text-sm text-(--text-muted) mt-1">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reports content */}
          {!loading && !errorStatus && (
            <>
              {/* Empty state */}
              {reports.length === 0 && (
                <div className="bg-(--bg-white) border border-(--border) rounded p-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-(--secondary-light) flex items-center justify-center">
                    <FileText
                      size={22}
                      className="text-(--secondary)"
                    />
                  </div>

                  <h2 className="font-semibold text-(--primary) mt-4">
                    No Published Reports
                  </h2>

                  <p className="text-sm text-(--text-muted) mt-1">
                    There are currently no published financial reports
                    available.
                  </p>
                </div>
              )}

              {reports.length > 0 && (
                <>
                  {/* Latest report overview */}
                  {latestReport && (
                    <LatestReportCard report={latestReport} />
                  )}

                  {/* Reports list */}
                  <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    <div className="p-5 border-b border-(--border) flex items-center justify-between">
                      <div>
                        <h2 className="font-semibold text-(--primary)">
                          Published Financial Reports
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-1">
                          View officially published financial summaries.
                        </p>
                      </div>

                      <FileText
                        size={20}
                        className="text-(--secondary)"
                      />
                    </div>

                    <div className="divide-y divide-(--border)">
                      {reports.map((report) => (
                        <ReportRow
                          key={report._id}
                          report={report}
                          onView={() => setSelectedReport(report)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Report modal */}
      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

const LatestReportCard = ({ report }) => {
  const summary = report.summary || {};

  return (
    <div className="bg-(--primary) text-white p-5 relative overflow-hidden rounded">
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-(--secondary) opacity-30" />

      <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full border border-white/10" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/70">
              Latest Published Report
            </p>

            <h2 className="text-lg font-semibold mt-1">
              {report.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-white/70 mt-2">
              <CalendarDays size={14} />
              <span>
                Published {formatDate(report.publishedAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-2 rounded-full w-fit">
            <CheckCircle2 size={14} />
            Published
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-xs text-white/65">Total Expected</p>
            <p className="text-lg font-semibold mt-1">
              {formatCurrency(summary.totalExpected)}
            </p>
          </div>

          <div>
            <p className="text-xs text-white/65">Total Collected</p>
            <p className="text-lg font-semibold mt-1">
              {formatCurrency(summary.totalCollected)}
            </p>
          </div>

          <div>
            <p className="text-xs text-white/65">Outstanding</p>
            <p className="text-lg font-semibold mt-1">
              {formatCurrency(summary.totalOutstanding)}
            </p>
          </div>

          <div>
            <p className="text-xs text-white/65">Overdue</p>
            <p className="text-lg font-semibold mt-1">
              {formatCurrency(summary.totalOverdue)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-white/70 mb-2">
            <span>Collection Rate</span>
            <span className="font-semibold text-white">
              {summary.collectionRate || 0}%
            </span>
          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-(--secondary) rounded-full"
              style={{
                width: `${Math.min(
                  Number(summary.collectionRate || 0),
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportRow = ({ report, onView }) => {
  const summary = report.summary || {};

  return (
    <div className="p-5 hover:bg-(--bg-light) transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-(--secondary-light) flex items-center justify-center shrink-0">
            <FileText
              size={18}
              className="text-(--secondary)"
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-(--primary)">
              {report.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--text-muted) mt-1">
              <span>
                {monthNames[(report.month || 1) - 1]} {report.year}
              </span>

              <span>•</span>

              <span>
                Published {formatDate(report.publishedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-2 text-xs lg:min-w-[420px]">
          <div>
            <p className="text-(--text-muted)">Expected</p>
            <p className="font-semibold text-(--primary) mt-0.5">
              {formatCurrency(summary.totalExpected)}
            </p>
          </div>

          <div>
            <p className="text-(--text-muted)">Collected</p>
            <p className="font-semibold text-(--secondary) mt-0.5">
              {formatCurrency(summary.totalCollected)}
            </p>
          </div>

          <div>
            <p className="text-(--text-muted)">Outstanding</p>
            <p className="font-semibold text-(--primary) mt-0.5">
              {formatCurrency(summary.totalOutstanding)}
            </p>
          </div>

          <div>
            <p className="text-(--text-muted)">Rate</p>
            <p className="font-semibold text-(--secondary) mt-0.5">
              {summary.collectionRate || 0}%
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onView}
          className="flex items-center justify-center gap-2 text-sm font-medium text-(--secondary) hover:text-(--primary) transition-colors shrink-0"
        >
          View Report
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const ReportModal = ({ report, onClose }) => {
  const summary = report.summary || {};
  const paymentSummary = report.paymentSummary || {};
  const categories = Array.isArray(report.categoryBreakdown)
    ? report.categoryBreakdown
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-(--bg-white) rounded shadow-xl w-full max-w-4xl max-h-[90vh] h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-(--border) flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-(--primary)">
              {report.title}
            </h2>

            <p className="text-xs text-(--text-muted) mt-1">
              Published {formatDate(report.publishedAt)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-(--text-muted) hover:bg-(--bg-light) transition-colors"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Summary */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CircleDollarSign
                size={18}
                className="text-(--secondary)"
              />

              <h3 className="font-semibold text-(--primary)">
                Financial Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SummaryBox
                label="Expected"
                value={formatCurrency(summary.totalExpected)}
              />

              <SummaryBox
                label="Collected"
                value={formatCurrency(summary.totalCollected)}
                accent
              />

              <SummaryBox
                label="Outstanding"
                value={formatCurrency(summary.totalOutstanding)}
              />

              <SummaryBox
                label="Overdue"
                value={formatCurrency(summary.totalOverdue)}
              />
            </div>

            <div className="mt-4 p-4 border border-(--border) rounded">
              <div className="flex items-center justify-between text-sm">
                <span className="text-(--text-muted)">
                  Collection Rate
                </span>

                <span className="font-semibold text-(--secondary)">
                  {summary.collectionRate || 0}%
                </span>
              </div>

              <div className="h-2 bg-(--bg-light) rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-(--secondary) rounded-full"
                  style={{
                    width: `${Math.min(
                      Number(summary.collectionRate || 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* Category breakdown */}
          <section className="border border-(--border) rounded overflow-hidden">
            <div className="p-4 border-b border-(--border)">
              <h3 className="font-semibold text-(--primary)">
                Category Breakdown
              </h3>

              <p className="text-xs text-(--text-muted) mt-1">
                Financial position across each membership category.
              </p>
            </div>

            {categories.length === 0 ? (
              <div className="p-5 text-sm text-(--text-muted)">
                No category breakdown available for this report.
              </div>
            ) : (
              <div className="divide-y divide-(--border)">
                {categories.map((item) => (
                  <CategoryBreakdown
                    key={item._id || item.category}
                    category={item.category}
                    mandatory={item.mandatory}
                    optional={item.optional}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Payment summary */}
          <section className="border border-(--border) rounded overflow-hidden">
            <div className="p-4 border-b border-(--border)">
              <h3 className="font-semibold text-(--primary)">
                Payment Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-(--border)">
              <PaymentStat
                label="Total"
                value={paymentSummary.totalPayments}
              />

              <PaymentStat
                label="Successful"
                value={paymentSummary.successfulPayments}
              />

              <PaymentStat
                label="Pending"
                value={paymentSummary.pendingPayments}
              />

              <PaymentStat
                label="Failed"
                value={paymentSummary.failedPayments}
              />

              <PaymentStat
                label="Refunded"
                value={paymentSummary.refundedPayments}
              />

              <PaymentStat
                label="This Month"
                value={formatCurrency(
                  paymentSummary.totalCollectedThisMonth
                )}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const CategoryBreakdown = ({
  category,
  mandatory = {},
  optional = {},
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h4 className="font-medium text-(--primary)">
          {formatCategory(category)}
        </h4>

        <span className="text-xs text-(--secondary)">
          Mandatory + Optional
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryType
          title="Mandatory"
          data={mandatory}
        />

        <CategoryType
          title="Optional"
          data={optional}
          optional
        />
      </div>
    </div>
  );
};

const CategoryType = ({ title, data = {}, optional = false }) => {
  return (
    <div className="border border-(--border) rounded p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-(--primary)">
          {title}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            optional
              ? "bg-(--bg-light) text-(--text-muted)"
              : "bg-(--secondary-light) text-(--secondary)"
          }`}
        >
          {data.collectionRate || 0}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Metric label="Expected" value={formatCurrency(data.expected)} />

        <Metric
          label="Collected"
          value={formatCurrency(data.collected)}
          accent
        />

        <Metric
          label="Outstanding"
          value={formatCurrency(data.outstanding)}
        />

        <Metric
          label="Overdue"
          value={formatCurrency(data.overdue)}
        />
      </div>
    </div>
  );
};

const Metric = ({ label, value, accent = false }) => {
  return (
    <div>
      <p className="text-(--text-muted)">{label}</p>

      <p
        className={`font-semibold mt-0.5 ${
          accent ? "text-(--secondary)" : "text-(--primary)"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const SummaryBox = ({ label, value, accent = false }) => {
  return (
    <div className="border border-(--border) rounded p-4">
      <p className="text-xs text-(--text-muted)">
        {label}
      </p>

      <p
        className={`font-semibold mt-1 ${
          accent ? "text-(--secondary)" : "text-(--primary)"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const PaymentStat = ({ label, value }) => {
  return (
    <div className="p-4">
      <p className="text-xs text-(--text-muted)">
        {label}
      </p>

      <p className="font-semibold text-(--primary) mt-1">
        {value}
      </p>
    </div>
  );
};

export default FinancialReports;