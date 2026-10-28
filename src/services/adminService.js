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

export const SuspendMember = async (userId) => {
  const response = await fetch(
    `${API}/api/admin/members/${userId}/suspend`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to suspend member."
    );
  }

  return data;
};


export const ReactivateMember = async (userId) => {
  const response = await fetch(
    `${API}/api/admin/members/${userId}/reactivate`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to reactivate member."
    );
  }

  return data;
};

export const DeleteMember = async (userId) => {
  const response = await fetch(
    `${API}/api/admin/members/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete member.");
  }

  return data;
};

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



export const recoverAdminPayment = async (paymentId, reason) => {
  if (!paymentId) {
    throw new Error("Payment ID is required.");
  }

  if (!reason?.trim()) {
    throw new Error("Recovery reason is required.");
  }

  const response = await fetch(
    `${API}/api/admin/payments/${paymentId}/recover`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        reason: reason.trim(),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to recover payment."
    );
  }

  return data;
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
// CREATE ADMIN YEAR SET
// ========================================

export const createAdminYearSet = async (yearSetData) => {
  const response = await fetch(`${API}/api/admin/year-sets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(yearSetData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create Year Set."
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






// ========================================
// SUPPORT TICKETS
// ========================================

export const getAdminSupportTickets = async ({
  page = 1,
  limit = 20,
  search = "",
  status = "",
  category = "",
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) params.append("search", search.trim());
  if (status) params.append("status", status);
  if (category) params.append("category", category);

  const response = await fetch(
    `${API}/api/support/admin?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load support tickets."
    );
  }

  return data;
};

export const getAdminSupportTicketById = async (ticketId) => {
  if (!ticketId) {
    throw new Error("Support ticket ID is required.");
  }

  const response = await fetch(
    `${API}/api/support/${ticketId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load support ticket."
    );
  }

  return data;
};

export const replyToSupportTicket = async (
  ticketId,
  message
) => {
  if (!ticketId) {
    throw new Error("Support ticket ID is required.");
  }

  if (!message?.trim()) {
    throw new Error("Reply message is required.");
  }

  const response = await fetch(
    `${API}/api/support/${ticketId}/replies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        message: message.trim(),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to send reply."
    );
  }

  return data;
};

export const updateSupportTicketStatus = async (
  ticketId,
  status,
  assignedTo = ""
) => {
  if (!ticketId) {
    throw new Error("Support ticket ID is required.");
  }

  const payload = { status };

  if (assignedTo) {
    payload.assignedTo = assignedTo;
  }

  const response = await fetch(
    `${API}/api/support/${ticketId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update support ticket."
    );
  }

  return data;
};





export const assignTeamRole = async ({ email, role }) => {
    const response = await fetch(`${API}/api/admin/team`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, role }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to assign team role.");
    }

    return data;
};



export const getTeamMembers = async () => {
  const response = await fetch(`${API}/api/admin/team`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch team members."
    );
  }

  return data.teamMembers;
};


export const suspendTeamRole = async (memberId) => {
    const response = await fetch(
        `${API}/api/admin/team/${memberId}/suspend`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to suspend team role."
        );
    }

    return data;
};



/*
|--------------------------------------------------------------------------
| ADMIN GENERAL SETTINGS
|--------------------------------------------------------------------------
*/

export const getGeneralSettings = async () => {
  const response = await fetch(
    `${API}/api/admin/settings/general`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load general settings."
    );
  }

  return data.settings;
};

export const updateGeneralSettings = async (settings) => {
  const response = await fetch(
    `${API}/api/admin/settings/general`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to save general settings."
    );
  }

  return data.settings;
};

export const getPublicGeneralSettings = async () => {
  const response = await fetch(
    `${API}/api/public/settings/general`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load public settings."
    );
  }

  return data.settings;
};




// ========================================
// WEBSITE CONTENT CMS
// ========================================

export const getAdminWebsiteContent = async (pageKey) => {
  const response = await fetch(
    `${API}/api/admin/website-content/${pageKey}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load website content."
    );
  }

  return data.page;
};

export const saveWebsiteContentDraft = async (
  pageKey,
  content
) => {
  const response = await fetch(
    `${API}/api/admin/website-content/${pageKey}/draft`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to save website content draft."
    );
  }

  return data.page;
};

export const publishWebsiteContent = async (pageKey) => {
  const response = await fetch(
    `${API}/api/admin/website-content/${pageKey}/publish`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to publish website content."
    );
  }

  return data.page;
};


export const uploadWebsiteContentImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(
    `${API}/api/admin/website-content/upload-image`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload website image."
    );
  }

  return data;
};









// ============================================================
// ADMIN MEMORIAL API
// ============================================================

const adminMemorialRequest = async (path, options = {}) => {
  const response = await fetch(`${API}/api/admin${path}`, {
    credentials: "include",
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { message: await response.text() };

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to complete memorial request."
    );
  }

  return data;
};

// Get memorial records
export const getAdminMemorials = async ({
  search = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);

  const query = params.toString();

  return adminMemorialRequest(
    `/memorials${query ? `?${query}` : ""}`
  );
};

// Get one memorial
export const getAdminMemorialById = async (id) => {
  return adminMemorialRequest(`/memorials/${id}`);
};

// Create memorial
export const createAdminMemorial = async (formData) => {
  return adminMemorialRequest("/memorials", {
    method: "POST",
    body: formData,
  });
};

// Update memorial
export const updateAdminMemorial = async (id, formData) => {
  return adminMemorialRequest(`/memorials/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

// Delete memorial
export const deleteAdminMemorial = async (id) => {
  return adminMemorialRequest(`/memorials/${id}`, {
    method: "DELETE",
  });
};

// ============================================================
// ADMIN MEMORIAL SUBMISSIONS
// ============================================================

// Get submissions
export const getAdminMemorialSubmissions = async ({
  search = "",
  status = "",
  submissionType = "",
} = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);
  if (submissionType) params.set("submissionType", submissionType);

  const query = params.toString();

  return adminMemorialRequest(
    `/memorial-submissions${query ? `?${query}` : ""}`
  );
};

// Get one submission
export const getAdminMemorialSubmissionById = async (id) => {
  return adminMemorialRequest(`/memorial-submissions/${id}`);
};

// Approve or reject submission
export const reviewAdminMemorialSubmission = async (
  id,
  { status, adminNotes = "" }
) => {
  return adminMemorialRequest(
    `/memorial-submissions/${id}/review`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, adminNotes }),
    }
  );
};

// ============================================================
// ADMIN LEGACY LEADERSHIP API
// ============================================================

// Get legacy leaders
export const getAdminLegacyLeaders = async ({
  search = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);

  const query = params.toString();

  return adminMemorialRequest(
    `/legacy-leaders${query ? `?${query}` : ""}`
  );
};

// Get one legacy leader
export const getAdminLegacyLeaderById = async (id) => {
  if (!id) {
    throw new Error("Legacy leader ID is required.");
  }

  return adminMemorialRequest(`/legacy-leaders/${id}`);
};

// Create legacy leader
export const createAdminLegacyLeader = async (formData) => {
  return adminMemorialRequest("/legacy-leaders", {
    method: "POST",
    body: formData,
  });
};

// Update legacy leader
export const updateAdminLegacyLeader = async (id, formData) => {
  if (!id) {
    throw new Error("Legacy leader ID is required.");
  }

  return adminMemorialRequest(`/legacy-leaders/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

// Delete legacy leader
export const deleteAdminLegacyLeader = async (id) => {
  if (!id) {
    throw new Error("Legacy leader ID is required.");
  }

  return adminMemorialRequest(`/legacy-leaders/${id}`, {
    method: "DELETE",
  });
};




// ========================================
// EXPORT ADMIN PAYMENT HISTORY
// ========================================

export const getAdminPaymentHistoryExport = async ({
  startDate,
  endDate,
} = {}) => {
  if (!startDate || !endDate) {
    throw new Error("Both start and end dates are required.");
  }

  if (startDate > endDate) {
    throw new Error("Start date cannot be after end date.");
  }

  const params = new URLSearchParams({
    startDate,
    endDate,
  });

  const response = await fetch(
    `${API}/api/admin/payments/export-history?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to export payment history."
    );
  }

  // Adjust this return only if your controller uses a different response shape.
  return data.data;
};