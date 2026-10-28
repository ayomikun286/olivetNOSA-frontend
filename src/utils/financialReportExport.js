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

export const exportAdminFinancialReportToExcel = async (
  report
) => {
  const data = normalizeFinancialReport(report);

  const workbook = XLSX.utils.book_new();


  /* -------------------------------------------------------
     SUMMARY SHEET
  ------------------------------------------------------- */

  const summaryRows = [
    [" GOSA"],
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
    `GOSA-Financial-Report-${data.year}-${String(
      data.month
    ).padStart(2, "0")}.xlsx`;

  XLSX.writeFile(workbook, filename);
};


/* =========================================================
   PDF EXPORT
========================================================= */

export const exportAdminFinancialReportToPDF = async (
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





/* =========================================================
   PAYMENT HISTORY EXCEL EXPORT
   Separate from existing financial report exports
========================================================= */

const formatExportDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatExportAmount = (amount) =>
  Number(amount || 0);


export const exportAdminPaymentHistoryToExcel = async (report) => {
    const {
        startDate,
        endDate,
        collectionSummary = {},
        yearSetSummary = [],
        chapterSummary = [],
        individualObligations = [],
        paymentHistory = [],
    } = report || {};

    if (!startDate || !endDate) {
        throw new Error("A start date and end date are required.");
    }

    const workbook = XLSX.utils.book_new();

    const addSheet = (name, rows, widths) => {
        const sheet = XLSX.utils.aoa_to_sheet(rows);
        sheet["!cols"] = widths.map((wch) => ({ wch }));

        XLSX.utils.book_append_sheet(workbook, sheet, name);

        return sheet;
    };

    const formatCurrencyColumn = (
        sheet,
        column,
        startRow,
        endRow
    ) => {
        for (let row = startRow; row <= endRow; row++) {
            const cell = sheet[`${column}${row}`];

            if (cell && typeof cell.v === "number") {
                cell.z = '₦#,##0.00';
            }
        }
    };

    // --------------------------------------------------
    // 1. COLLECTION RECONCILIATION
    // --------------------------------------------------

    const breakdown = collectionSummary.collectionByCategory || {};

    const reconciliationRows = [
        ["ONW GOSA — COLLECTION RECONCILIATION"],
        ["Report Start Date", startDate],
        ["Report End Date", endDate],
        [],
        ["Collection Metric", "Value"],
        [
            "Successful Transactions",
            Number(collectionSummary.successfulTransactionCount || 0),
        ],
        [
            "Total Collected",
            Number(collectionSummary.totalCollected || 0),
        ],
        [
            "Category Breakdown Total",
            Number(collectionSummary.categoryCollected || 0),
        ],
        [
            "Reconciliation Difference",
            Number(collectionSummary.reconciliationDifference || 0),
        ],
        [
            "Reconciliation Status",
            collectionSummary.reconciled ? "RECONCILED" : "CHECK REQUIRED",
        ],
        [],
        ["Category", "Successful Transactions", "Amount Collected"],
        [
            "Individual",
            Number(breakdown.individual?.transactions || 0),
            Number(breakdown.individual?.amount || 0),
        ],
        [
            "Year Set",
            Number(breakdown.yearSet?.transactions || 0),
            Number(breakdown.yearSet?.amount || 0),
        ],
        [
            "Chapter",
            Number(breakdown.chapter?.transactions || 0),
            Number(breakdown.chapter?.amount || 0),
        ],
        [
            "Unclassified",
            Number(breakdown.unclassified?.transactions || 0),
            Number(breakdown.unclassified?.amount || 0),
        ],
        [],
        [
            "Unclassified Transactions Requiring Review",
            Number(collectionSummary.unclassifiedTransactionCount || 0),
        ],
        [
            "Unclassified Amount Requiring Review",
            Number(collectionSummary.unclassifiedAmount || 0),
        ],
        [],
        [
            "Basis",
            "Only successful payments with paidAt within the selected period.",
        ],
        [
            "Important",
            "Unclassified payments remain included in Total Collected.",
        ],
    ];

    const reconciliationSheet = addSheet(
        "Collection Reconciliation",
        reconciliationRows,
        [43, 30, 24]
    );

    ["B", "C"].forEach((column) => {
        [7, 8, 9, 13, 14, 15, 16, 19].forEach((row) => {
            const cell = reconciliationSheet[`${column}${row}`];

            if (cell && typeof cell.v === "number") {
                cell.z = '₦#,##0.00';
            }
        });
    });

    // --------------------------------------------------
    // 2. YEAR SET SUMMARY
    // --------------------------------------------------

    const yearSetRows = [
        [
            "Year Set",
            "Amount Due",
            "Amount Paid During Period",
            "Current Outstanding",
            "Successful Payment Count",
        ],
        ...yearSetSummary.map((item) => [
            item.name || "Unassigned",
            formatExportAmount(item.amountDue),
            formatExportAmount(item.amountPaid),
            formatExportAmount(item.outstanding),
            Number(item.successfulPaymentCount || 0),
        ]),
    ];

    const yearSetSheet = addSheet(
        "Year Set Summary",
        yearSetRows,
        [28, 20, 28, 22, 26]
    );

    ["B", "C", "D"].forEach((column) =>
        formatCurrencyColumn(
            yearSetSheet,
            column,
            2,
            yearSetRows.length
        )
    );

    // --------------------------------------------------
    // 3. CHAPTER SUMMARY
    // --------------------------------------------------

    const chapterRows = [
        [
            "Chapter",
            "Amount Due",
            "Amount Paid During Period",
            "Current Outstanding",
            "Successful Payment Count",
        ],
        ...chapterSummary.map((item) => [
            item.name || "Unassigned",
            formatExportAmount(item.amountDue),
            formatExportAmount(item.amountPaid),
            formatExportAmount(item.outstanding),
            Number(item.successfulPaymentCount || 0),
        ]),
    ];

    const chapterSheet = addSheet(
        "Chapter Summary",
        chapterRows,
        [28, 20, 28, 22, 26]
    );

    ["B", "C", "D"].forEach((column) =>
        formatCurrencyColumn(
            chapterSheet,
            column,
            2,
            chapterRows.length
        )
    );

    // --------------------------------------------------
    // 4. INDIVIDUAL OBLIGATIONS
    // --------------------------------------------------

    const individualRows = [
        [
            "Alumni ID",
            "Member Name",
            "Year Set",
            "Obligation",
            "Amount Due",
            "Paid During Period",
            "Current Outstanding",
            "Current Amount Paid",
            "Assignment Status",
            "Record Note",
        ],
        ...individualObligations.map((item) => [
            item.alumniId || "",
            item.memberName || "",
            item.yearSet || "",
            item.obligation || "",
            formatExportAmount(item.amountDue),
            formatExportAmount(item.amountPaid),
            formatExportAmount(item.outstanding),
            formatExportAmount(item.currentAmountPaid),
            item.assignmentStatus || "",
            item.recordNote || "",
        ]),
    ];

    const individualSheet = addSheet(
        "Individual Obligations",
        individualRows,
        [18, 28, 18, 32, 18, 22, 22, 22, 20, 42]
    );

    ["E", "F", "G", "H"].forEach((column) =>
        formatCurrencyColumn(
            individualSheet,
            column,
            2,
            individualRows.length
        )
    );

    // --------------------------------------------------
    // 5. SUCCESSFUL PAYMENT HISTORY
    // --------------------------------------------------

    const historyRows = [
        [
            "Transaction Date",
            "Payment ID",
            "Payer",
            "Email",
            "Alumni ID",
            "Payer Category",
            "Year Set",
            "Chapter",
            "Obligation",
            "Reference",
            "Payment Status",
            "Payment Method",
            "Gateway",
            "Currency",
            "Amount",
            "Record Note",
        ],
        ...paymentHistory.map((item) => [
            formatExportDate(item.transactionDate),
            item.paymentId || "",
            item.payer || "",
            item.email || "",
            item.alumniId || "",
            item.payerCategory || "",
            item.yearSet || "",
            item.chapter || "",
            item.obligation || "",
            item.reference || "",
            item.paymentStatus || "",
            item.paymentMethod || "",
            item.gateway || "",
            item.currency || "NGN",
            formatExportAmount(item.amount),
            item.recordNote || "",
        ]),
    ];

    const historySheet = addSheet(
        "Payment History",
        historyRows,
        [
            24, 26, 26, 32, 18, 18, 18, 24,
            32, 32, 18, 20, 16, 12, 18, 48,
        ]
    );

    formatCurrencyColumn(
        historySheet,
        "O",
        2,
        historyRows.length
    );

    // --------------------------------------------------
    // DOWNLOAD
    // --------------------------------------------------

    const filename =
        `ONW-GOSA-Payment-History-${startDate}-to-${endDate}.xlsx`;

    XLSX.writeFile(workbook, filename);
};
