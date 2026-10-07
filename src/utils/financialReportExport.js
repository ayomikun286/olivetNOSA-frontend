import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* =========================================================
   SHARED HELPERS
========================================================= */

const formatCurrency = (amount = 0) => {
  return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
};

const formatNumber = (amount = 0) => {
  return Number(amount || 0).toLocaleString("en-NG");
};

const formatRate = (rate = 0) => {
  return `${Number(rate || 0).toFixed(2)}%`;
};

const getCategoryLabel = (category) => {
  const labels = {
    individual: "Individual",
    yearSet: "Year Set",
    chapter: "Chapter",
  };

  return labels[category] || category || "—";
};

const getMonthName = (month, year) => {
  if (!month || !year) return "Financial Report";

  return new Date(
    Number(year),
    Number(month) - 1,
    1
  ).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};


/* =========================================================
   NORMALIZE REPORT
========================================================= */

export const normalizeFinancialReport = (report) => {
  return {
    title: report?.title || "Financial Report",

    month: Number(report?.month || 0),

    year: Number(report?.year || 0),

    reportPeriod: getMonthName(
      report?.month,
      report?.year
    ),

    summary: {
      expected: Number(
        report?.summary?.totalExpected || 0
      ),

      collected: Number(
        report?.summary?.totalCollected || 0
      ),

      outstanding: Number(
        report?.summary?.totalOutstanding || 0
      ),

      overdue: Number(
        report?.summary?.totalOverdue || 0
      ),

      collectionRate: Number(
        report?.summary?.collectionRate || 0
      ),
    },

    paymentSummary: {
      totalPayments: Number(
        report?.paymentSummary?.totalPayments || 0
      ),

      successfulPayments: Number(
        report?.paymentSummary?.successfulPayments || 0
      ),

      pendingPayments: Number(
        report?.paymentSummary?.pendingPayments || 0
      ),

      failedPayments: Number(
        report?.paymentSummary?.failedPayments || 0
      ),

      refundedPayments: Number(
        report?.paymentSummary?.refundedPayments || 0
      ),

      cashThisMonth: Number(
        report?.paymentSummary?.totalCollectedThisMonth || 0
      ),
    },

    categoryBreakdown:
      report?.categoryBreakdown || [],

    obligationBreakdown:
      report?.obligationBreakdown || [],
  };
};


/* =========================================================
   EXCEL EXPORT
========================================================= */

export const exportFinancialReportToExcel = async (
  report
) => {
  const data = normalizeFinancialReport(report);

  const workbook = XLSX.utils.book_new();


  /* -------------------------------------------------------
     SUMMARY SHEET
  ------------------------------------------------------- */

  const summaryRows = [
    ["ONW GOSA"],
    ["Financial Report"],
    ["Report Period", data.reportPeriod],
    [],

    ["FINANCIAL SUMMARY"],
    ["Expected", data.summary.expected],
    ["Collected", data.summary.collected],
    ["Outstanding", data.summary.outstanding],
    ["Overdue", data.summary.overdue],
    [
      "Collection Rate",
      data.summary.collectionRate / 100,
    ],

    [],

    ["PAYMENT ACTIVITY"],
    [
      "Total Payments",
      data.paymentSummary.totalPayments,
    ],
    [
      "Successful Payments",
      data.paymentSummary.successfulPayments,
    ],
    [
      "Pending Payments",
      data.paymentSummary.pendingPayments,
    ],
    [
      "Failed Payments",
      data.paymentSummary.failedPayments,
    ],
    [
      "Refunded Payments",
      data.paymentSummary.refundedPayments,
    ],
    [
      "Cash This Month",
      data.paymentSummary.cashThisMonth,
    ],
  ];

  const summarySheet =
    XLSX.utils.aoa_to_sheet(summaryRows);

  summarySheet["!cols"] = [
    { wch: 28 },
    { wch: 22 },
  ];

  XLSX.utils.book_append_sheet(
    workbook,
    summarySheet,
    "Summary"
  );


  /* -------------------------------------------------------
     CATEGORY BREAKDOWN
  ------------------------------------------------------- */

  const categoryRows = [
    [
      "Category",
      "Type",
      "Expected",
      "Collected",
      "Outstanding",
      "Overdue",
      "Collection Rate",
    ],
  ];

  data.categoryBreakdown.forEach((item) => {
    const mandatory = item.mandatory || {};
    const optional = item.optional || {};

    categoryRows.push([
      getCategoryLabel(item.category),
      "Mandatory",
      mandatory.expected || 0,
      mandatory.collected || 0,
      mandatory.outstanding || 0,
      mandatory.overdue || 0,
      Number(mandatory.collectionRate || 0) / 100,
    ]);

    categoryRows.push([
      getCategoryLabel(item.category),
      "Optional",
      optional.expected || 0,
      optional.collected || 0,
      optional.outstanding || 0,
      optional.overdue || 0,
      Number(optional.collectionRate || 0) / 100,
    ]);
  });

  const categorySheet =
    XLSX.utils.aoa_to_sheet(categoryRows);

  categorySheet["!cols"] = [
    { wch: 18 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
  ];

  XLSX.utils.book_append_sheet(
    workbook,
    categorySheet,
    "Category Breakdown"
  );


  /* -------------------------------------------------------
     OBLIGATION BREAKDOWN
  ------------------------------------------------------- */

  const obligationRows = [
    [
      "Obligation",
      "Category",
      "Type",
      "Active",
      "Expected",
      "Collected",
      "Outstanding",
      "Overdue",
      "Collection Rate",
    ],
  ];

  data.obligationBreakdown.forEach((item) => {
    obligationRows.push([
      item.name || "Unnamed Obligation",

      getCategoryLabel(item.category),

      item.isOptional
        ? "Optional"
        : "Mandatory",

      item.isActive
        ? "Active"
        : "Inactive",

      item.expected || 0,

      item.collected || 0,

      item.outstanding || 0,

      item.overdue || 0,

      Number(item.collectionRate || 0) / 100,
    ]);
  });

  const obligationSheet =
    XLSX.utils.aoa_to_sheet(obligationRows);

  obligationSheet["!cols"] = [
    { wch: 30 },
    { wch: 16 },
    { wch: 14 },
    { wch: 12 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
  ];

  XLSX.utils.book_append_sheet(
    workbook,
    obligationSheet,
    "Obligation Breakdown"
  );


  /* -------------------------------------------------------
     FORMAT EXCEL CELLS
  ------------------------------------------------------- */

  const currencyColumns = [
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ];

  for (
    let row = 6;
    row <= summaryRows.length;
    row++
  ) {
    const cell = summarySheet[`B${row}`];

    if (
      cell &&
      typeof cell.v === "number" &&
      row !== 10
    ) {
      cell.z = '₦#,##0';
    }
  }

  for (
    let row = 2;
    row <= categoryRows.length;
    row++
  ) {
    ["C", "D", "E", "F"].forEach(
      (column) => {
        const cell =
          categorySheet[`${column}${row}`];

        if (cell) {
          cell.z = '₦#,##0';
        }
      }
    );

    const rateCell =
      categorySheet[`G${row}`];

    if (rateCell) {
      rateCell.z = "0.00%";
    }
  }

  for (
    let row = 2;
    row <= obligationRows.length;
    row++
  ) {
    ["E", "F", "G", "H"].forEach(
      (column) => {
        const cell =
          obligationSheet[`${column}${row}`];

        if (cell) {
          cell.z = '₦#,##0';
        }
      }
    );

    const rateCell =
      obligationSheet[`I${row}`];

    if (rateCell) {
      rateCell.z = "0.00%";
    }
  }


  /* -------------------------------------------------------
     DOWNLOAD
  ------------------------------------------------------- */

  const filename =
    `ONW-GOSA-Financial-Report-${data.year}-${String(
      data.month
    ).padStart(2, "0")}.xlsx`;

  XLSX.writeFile(workbook, filename);
};


/* =========================================================
   PDF EXPORT
========================================================= */

export const exportFinancialReportToPDF = async (
  report
) => {
  const data = normalizeFinancialReport(report);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });


  /* -------------------------------------------------------
     HEADER
  ------------------------------------------------------- */

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  doc.text(
    "ONW GOSA",
    105,
    18,
    {
      align: "center",
    }
  );

  doc.setFontSize(14);

  doc.text(
    "Financial Report",
    105,
    27,
    {
      align: "center",
    }
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    data.reportPeriod,
    105,
    34,
    {
      align: "center",
    }
  );


  /* -------------------------------------------------------
     FINANCIAL SUMMARY
  ------------------------------------------------------- */

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Financial Summary",
    14,
    47
  );

  autoTable(doc, {
    startY: 52,

    head: [
      [
        "Metric",
        "Amount",
      ],
    ],

    body: [
      [
        "Expected",
        formatCurrency(
          data.summary.expected
        ),
      ],
      [
        "Collected",
        formatCurrency(
          data.summary.collected
        ),
      ],
      [
        "Outstanding",
        formatCurrency(
          data.summary.outstanding
        ),
      ],
      [
        "Overdue",
        formatCurrency(
          data.summary.overdue
        ),
      ],
      [
        "Collection Rate",
        formatRate(
          data.summary.collectionRate
        ),
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fontStyle: "bold",
    },
  });


  /* -------------------------------------------------------
     PAYMENT ACTIVITY
  ------------------------------------------------------- */

  let currentY =
    doc.lastAutoTable.finalY + 12;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Payment Activity",
    14,
    currentY
  );

  autoTable(doc, {
    startY: currentY + 5,

    head: [
      [
        "Metric",
        "Value",
      ],
    ],

    body: [
      [
        "Total Payments",
        formatNumber(
          data.paymentSummary.totalPayments
        ),
      ],
      [
        "Successful Payments",
        formatNumber(
          data.paymentSummary.successfulPayments
        ),
      ],
      [
        "Pending Payments",
        formatNumber(
          data.paymentSummary.pendingPayments
        ),
      ],
      [
        "Failed Payments",
        formatNumber(
          data.paymentSummary.failedPayments
        ),
      ],
      [
        "Refunded Payments",
        formatNumber(
          data.paymentSummary.refundedPayments
        ),
      ],
      [
        "Cash This Month",
        formatCurrency(
          data.paymentSummary.cashThisMonth
        ),
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
  });


  /* -------------------------------------------------------
     CATEGORY BREAKDOWN
  ------------------------------------------------------- */

  currentY =
    doc.lastAutoTable.finalY + 12;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Category Breakdown",
    14,
    currentY
  );

  const categoryPdfRows = [];

  data.categoryBreakdown.forEach((item) => {
    const mandatory = item.mandatory || {};
    const optional = item.optional || {};

    categoryPdfRows.push([
      getCategoryLabel(item.category),
      "Mandatory",
      formatCurrency(mandatory.expected),
      formatCurrency(mandatory.collected),
      formatCurrency(mandatory.outstanding),
      formatCurrency(mandatory.overdue),
      formatRate(mandatory.collectionRate),
    ]);

    categoryPdfRows.push([
      getCategoryLabel(item.category),
      "Optional",
      formatCurrency(optional.expected),
      formatCurrency(optional.collected),
      formatCurrency(optional.outstanding),
      formatCurrency(optional.overdue),
      formatRate(optional.collectionRate),
    ]);
  });

  autoTable(doc, {
    startY: currentY + 5,

    head: [
      [
        "Category",
        "Type",
        "Expected",
        "Collected",
        "Outstanding",
        "Overdue",
        "Rate",
      ],
    ],

    body: categoryPdfRows,

    theme: "grid",

    styles: {
      fontSize: 7.5,
      cellPadding: 2.5,
    },

    headStyles: {
      fontStyle: "bold",
    },
  });


  /* -------------------------------------------------------
     OBLIGATION BREAKDOWN
  ------------------------------------------------------- */

  currentY =
    doc.lastAutoTable.finalY + 12;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Obligation Breakdown",
    14,
    currentY
  );

  const obligationPdfRows =
    data.obligationBreakdown.map(
      (item) => [
        item.name || "Unnamed Obligation",

        getCategoryLabel(
          item.category
        ),

        item.isOptional
          ? "Optional"
          : "Mandatory",

        item.isActive
          ? "Active"
          : "Inactive",

        formatCurrency(item.expected),

        formatCurrency(item.collected),

        formatCurrency(
          item.outstanding
        ),

        formatCurrency(item.overdue),
      ]
    );

  autoTable(doc, {
    startY: currentY + 5,

    head: [
      [
        "Obligation",
        "Category",
        "Type",
        "Status",
        "Expected",
        "Collected",
        "Outstanding",
        "Overdue",
      ],
    ],

    body: obligationPdfRows,

    theme: "grid",

    styles: {
      fontSize: 6.5,
      cellPadding: 2,
    },

    headStyles: {
      fontStyle: "bold",
    },

    margin: {
      left: 8,
      right: 8,
    },
  });


  /* -------------------------------------------------------
     FOOTER
  ------------------------------------------------------- */

  const pageCount =
    doc.internal.getNumberOfPages();

  for (
    let page = 1;
    page <= pageCount;
    page++
  ) {
    doc.setPage(page);

    const pageHeight =
      doc.internal.pageSize.height;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    doc.text(
      `GOSA • Financial Report • ${data.reportPeriod}`,
      14,
      pageHeight - 10
    );

    doc.text(
      `Page ${page} of ${pageCount}`,
      196,
      pageHeight - 10,
      {
        align: "right",
      }
    );
  }


  /* -------------------------------------------------------
     DOWNLOAD
  ------------------------------------------------------- */

  const filename =
    `GOSA-Financial-Report-${data.year}-${String(
      data.month
    ).padStart(2, "0")}.pdf`;

  doc.save(filename);
};