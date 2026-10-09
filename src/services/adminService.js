import API from "../config/app.js";

export const getAdminDashboard = async () => {
  const response = await fetch(
    `${API}/api/admin/dashboard`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load admin dashboard."
    );
  }

  return data;
};

export const getAdminMembers = async (
  page = 1,
  limit = 20,
  search = "",
  status = ""
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    params.append("search", search.trim());
  }

  if (status) {
    params.append("status", status);
  }

  const response = await fetch(
    `${API}/api/admin/members?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load members."
    );
  }

  return data;
};


export const createAdminMember = async (memberData) => {
  const response = await fetch(
    `${API}/api/admin/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(memberData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create member."
    );
  }

  return data;
};



export const ApproveMember = async (userId) => {
  const response = await 
  fetch( `${API}/api/admin/members/${userId}/approve`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create member."
    );
  }

  return data;

}

// ========================================
// OBLIGATIONS
// ========================================

export const getObligations = async ({
  category = "",
  year = "",
  isActive = "",
} = {}) => {
  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }

  if (year) {
    params.append("year", String(year));
  }

  if (isActive !== "") {
    params.append("isActive", String(isActive));
  }

  const query = params.toString();

  const response = await fetch(
    `${API}/api/obligations${query ? `?${query}` : ""}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load obligations."
    );
  }

  return data;
};



// ========================================
// GET SINGLE OBLIGATION
// ========================================

export const getObligation = async (id) => {
  if (!id) {
    throw new Error("Obligation ID is required.");
  }

  const response = await fetch(
    `${API}/api/obligations/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load obligation."
    );
  }

  return data;
};


// ========================================
// CREATE OBLIGATION
// ========================================

export const createObligation = async (obligationData) => {
  const response = await fetch(
    `${API}/api/obligations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obligationData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create obligation."
    );
  }

  return data;
};


// ========================================
// UPDATE OBLIGATION
// ========================================

export const updateObligation = async (
  id,
  obligationData
) => {
  if (!id) {
    throw new Error("Obligation ID is required.");
  }

  const response = await fetch(
    `${API}/api/obligations/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obligationData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update obligation."
    );
  }

  return data;
};


// ========================================
// TOGGLE OBLIGATION STATUS
// ========================================

export const toggleObligationStatus = async (id) => {
  if (!id) {
    throw new Error("Obligation ID is required.");
  }

  const response = await fetch(
    `${API}/api/obligations/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update obligation status."
    );
  }

  return data;
};


export const getAdminPayments = async ({
    page = 1,
    limit = 20,
    search = "",
    status = "",
    gateway = "",
    paymentMethod = "",
    startDate = "",
    endDate = "",
} = {}) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (search.trim()) {
        params.append("search", search.trim());
    }

    if (status) {
        params.append("status", status);
    }

    if (gateway) {
        params.append("gateway", gateway);
    }

    if (paymentMethod) {
        params.append("paymentMethod", paymentMethod);
    }

    if (startDate) {
        params.append("startDate", startDate);
    }

    if (endDate) {
        params.append("endDate", endDate);
    }

    const response = await fetch(
        `${API}/api/admin/payments?${params.toString()}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load payments."
        );
    }

    return data.data;
};

export const getAdminPaymentById = async (paymentId) => {
    const response = await fetch(
        `${API}/api/admin/payments/${paymentId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load payment details."
        );
    }

    return data.payment;
};






// ========================================
// CALENDAR
// ========================================

// ========================================
// GET ADMIN CALENDAR EVENTS
// ========================================

export const getAdminCalendarEvents = async ({
  year = "",
  month = "",
  category = "",
  status = "",
  search = "",
} = {}) => {
  const params = new URLSearchParams();

  if (year) {
    params.append("year", String(year));
  }

  if (month) {
    params.append("month", String(month));
  }

  if (category) {
    params.append("category", category);
  }

  if (status) {
    params.append("status", status);
  }

  if (search.trim()) {
    params.append("search", search.trim());
  }

  const query = params.toString();

  const response = await fetch(
    `${API}/api/calendar/admin/all${query ? `?${query}` : ""}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load calendar events."
    );
  }

  return data;
};

// ========================================
// GET SINGLE ADMIN CALENDAR EVENT
// ========================================

export const getAdminCalendarEventById = async (id) => {
  if (!id) {
    throw new Error("Calendar event ID is required.");
  }

  const response = await fetch(
    `${API}/api/calendar/admin/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load calendar event."
    );
  }

  return data;
};

// ========================================
// CREATE CALENDAR EVENT
// ========================================

export const createCalendarEvent = async (eventData) => {
  const response = await fetch(
    `${API}/api/calendar/admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(eventData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create calendar event."
    );
  }

  return data;
};

// ========================================
// UPDATE CALENDAR EVENT
// ========================================

export const updateCalendarEvent = async (
  id,
  eventData
) => {
  if (!id) {
    throw new Error("Calendar event ID is required.");
  }

  const response = await fetch(
    `${API}/api/calendar/admin/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(eventData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update calendar event."
    );
  }

  return data;
};

// ========================================
// DELETE CALENDAR EVENT
// ========================================

export const deleteCalendarEvent = async (id) => {
  if (!id) {
    throw new Error("Calendar event ID is required.");
  }

  const response = await fetch(
    `${API}/api/calendar/admin/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete calendar event."
    );
  }

  return data;
};



// ========================================
// GET ADMIN YEAR SETS
// ========================================

export const getAdminYearSets = async (params = {}) => {
  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.append("status", params.status);
  }

  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API}/api/year-sets${query ? `?${query}` : ""}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load year sets."
    );
  }

  return data;
};

// ========================================
// GET SINGLE ADMIN YEAR SET
// ========================================

export const getAdminYearSetById = async (id) => {
  if (!id) {
    throw new Error("Year set ID is required.");
  }

  const response = await fetch(
    `${API}/api/year-sets/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load year set."
    );
  }

  return data;
};

// ========================================
// ASSIGN / REASSIGN YEAR SET LEADER
// ========================================

export const assignYearSetLeader = async (
  yearSetId,
  userId
) => {
  if (!yearSetId) {
    throw new Error("Year set ID is required.");
  }

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const response = await fetch(
    `${API}/api/leadership/year-set/${yearSetId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to assign year set leader."
    );
  }

  return data;
};



// ========================================
// GET ADMIN Chapter
// / ========================================

export const getAdminChapters = async (params = {}) => {
  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.append("status", params.status);
  }

  if (params.search?.trim()) {
    searchParams.append("search", params.search.trim());
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API}/api/chapter${query ? `?${query}` : ""}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load chapters."
    );
  }

  return data;
};

export const getAdminChapterById = async (id) => {
  if (!id) {
    throw new Error("Chapter ID is required.");
  }

  const response = await fetch(
    `${API}/api/chapter/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load chapters."
    );
  }

  return data;
};

export const assignChapterLeader = async (
  chapterId,
  userId
) => {
  if (!chapterId) {
    throw new Error("Chapter ID is required.");
  }

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const response = await fetch(
    `${API}/api/leadership/chapter/${chapterId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to assign chapter leader."
    );
  }

  return data;
};



/*
|--------------------------------------------------------------------------
| Get All Financial Reports
|--------------------------------------------------------------------------
*/

export const getFinancialReports = async (params = {}) => {
  const searchParams = new URLSearchParams();

  if (params.year) {
    searchParams.append("year", params.year);
  }

  if (params.status) {
    searchParams.append("status", params.status);
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API}/api/admin/financial-reports${
      query ? `?${query}` : ""
    }`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load financial reports."
    );
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| Get Financial Report By ID
|--------------------------------------------------------------------------
*/

export const getFinancialReportById = async (id) => {
  if (!id) {
    throw new Error(
      "Financial report ID is required."
    );
  }

  const response = await fetch(
    `${API}/api/admin/financial-reports/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load financial report."
    );
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| Create Financial Report
|--------------------------------------------------------------------------
*/

export const createFinancialReport = async (
  month,
  year
) => {
  if (!month) {
    throw new Error(
      "Report month is required."
    );
  }

  if (!year) {
    throw new Error(
      "Report year is required."
    );
  }

  const response = await fetch(
    `${API}/api/admin/financial-reports`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        month,
        year,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create financial report."
    );
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| Update / Regenerate Draft
|--------------------------------------------------------------------------
*/

export const updateFinancialReport = async (id) => {
  if (!id) {
    throw new Error(
      "Financial report ID is required."
    );
  }

  const response = await fetch(
    `${API}/api/admin/financial-reports/${id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update financial report."
    );
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| Publish Financial Report
|--------------------------------------------------------------------------
*/

export const publishFinancialReport = async (id) => {
  if (!id) {
    throw new Error(
      "Financial report ID is required."
    );
  }

  const response = await fetch(
    `${API}/api/admin/financial-reports/${id}/publish`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to publish financial report."
    );
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| Unpublish Financial Report
|--------------------------------------------------------------------------
*/

export const unpublishFinancialReport = async (id) => {
  if (!id) {
    throw new Error(
      "Financial report ID is required."
    );
  }

  const response = await fetch(
    `${API}/api/admin/financial-reports/${id}/unpublish`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to unpublish financial report."
    );
  }

  return data;
};



// ========================================
// AUDIT LOGS
// ========================================

export const getAdminAuditLogs = async ({
  page = 1,
  limit = 20,
  action = "",
  resource = "",
  from = "",
  to = "",
  search = "",
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (action) params.append("action", action);
  if (resource) params.append("resource", resource);
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  if (search.trim()) params.append("search", search.trim());

  const response = await fetch(
    `${API}/api/admin/audit-logs?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load audit logs.");
  }

  return data;
};