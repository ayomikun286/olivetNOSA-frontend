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