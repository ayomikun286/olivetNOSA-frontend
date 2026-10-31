import API from "../config/app.js";

// ============================================================
// SIGN UP
// ============================================================

export const Sign_up = async (formData) => {
  try {
    const res = await fetch(`${API}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const contentType = res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error("Signup request error:", err);

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to connect to the server.",
      },
    };
  }
};

// ============================================================
// LOGIN
// ============================================================

export const LoginUser = async (formData) => {
  try {
    const res = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const contentType = res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error("Login request error:", err);

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to connect to the server.",
      },
    };
  }
};

// ============================================================
// VERIFY EMAIL
// ============================================================

export const VerifyEmail = async (token) => {
  try {
    const res = await fetch(
      `${API}/user/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const contentType = res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        success: false,
        message: text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      ...data,
    };
  } catch (error) {
    console.error("Email verification error:", error);

    return {
      ok: false,
      success: false,
      message:
        error.message || "Unable to connect to the server.",
    };
  }
};

// ============================================================
// CHECK VERIFICATION STATUS
// ============================================================

export const checkVerificationStatus = async (email) => {
  try {
    const res = await fetch(
      `${API}/user/verification-status?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const contentType =
      res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error(
      "Check verification status error:",
      err
    );

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to check verification status.",
      },
    };
  }
};



export const resendVerifyLink = async (email) => {
  try {
    const res = await fetch(
      `${API}/user/resendVerifyEmailLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const contentType =
      res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text ||
          "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error(
      "Resend verification request error:",
      err
    );

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to connect to the server.",
      },
    };
  }
};



export const forgetPassword = async (email) =>{

   try {
    const res = await fetch(
      `${API}/user/forgetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const contentType =
      res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text ||
          "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error(
      "Reset password request error:",
      err
    );

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to connect to the server.",
      },
    };
  }

}


export const resetPassword = async (
  token,
  password,
  confirmPassword
) => {
  try {
    const res = await fetch(
      `${API}/user/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
        credentials: "include",
        
      }

    );

    const contentType =
      res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    console.error(
      "Reset password request error:",
      error
    );

    return {
      ok: false,
      data: {
        message:
          error.message ||
          "Unable to connect to the server.",
      },
    };
  }
};





// ===========//

export const setPassword = async (
  token,
  password,
  confirmPassword
) => {
  const response = await fetch(
    `${API}/api/auth/set-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        token,
        password,
        confirmPassword,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to set password."
    );
  }

  return data;
};

export const verifyAccountSetup = async (token) => {
  const response = await fetch(
    `${API}/api/auth/activate-account?token=${encodeURIComponent(token)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "This activation link is invalid or has expired."
    );
  }

  return data;
};



export const getMemberProfile = async () => {
  const response = await fetch(
    `${API}/auth/profile`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message 
    );
  }

  console.log(data)
  return data;
};


// getDirectoryMembers
export const getDirectoryMembers = async () => {
  const response = await fetch(
    `${API}/api/directory`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message 
    );
  }

  console.log(data)
  return data;
};



export const updateMemberProfile = async (profileData) => {
  const response = await fetch(`${API}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to update profile."
    );
  }

  return data;
};


export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();

  formData.append("profilePhoto", file);

  const response = await fetch(`${API}/auth/profile/photo`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to upload profile photo."
    );
  }

  return data;
};


// ============================================================
// GET PUBLIC MEMORIALS
// ============================================================

// ============================================================
// GET PUBLIC MEMORIALS
// ============================================================

export const getMemorials = async ({
  search = "",
  schoolSet = "",
  yearsAttended = "",
  graduationYear = "",
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (schoolSet) {
      params.set("schoolSet", schoolSet);
    }

    if (yearsAttended) {
      params.set("yearsAttended", yearsAttended);
    }

    if (graduationYear) {
      params.set("graduationYear", graduationYear);
    }

    const query = params.toString();

    const response = await fetch(
      `${API}/api/memorials${query ? `?${query}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load memorials."
      );
    }

    return data;
  } catch (error) {
    console.error("Get memorials error:", error);

    throw new Error(
      error.message || "Unable to load memorials."
    );
  }
};

// ============================================================
// GET MEMORIAL BY ID
// ============================================================

export const getMemorialById = async (id) => {
  try {
    const response = await fetch(
      `${API}/api/memorials/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load memorial."
      );
    }

    return data;
  } catch (error) {
    console.error("Get memorial by ID error:", error);

    throw new Error(
      error.message || "Unable to load memorial."
    );
  }
};



// ============================================================
// CREATE MEMORIAL SUBMISSION
// ============================================================

export const createMemorialSubmission = async (formData) => {
  try {
    const response = await fetch(
      `${API}/api/memorial-submissions`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const contentType =
      response.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to submit remembrance."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Create memorial submission error:",
      error
    );

    throw new Error(
      error.message || "Unable to submit remembrance."
    );
  }
};


// ============================================================
// GET MY MEMORIAL SUBMISSIONS
// ============================================================

export const getMyMemorialSubmissions = async () => {
  try {
    const response = await fetch(
      `${API}/api/memorial-submissions/mine`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to load your memorial submissions."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Get my memorial submissions error:",
      error
    );

    throw new Error(
      error.message ||
        "Unable to load your memorial submissions."
    );
  }
};



// ============================================================
// GET APPROVED MEMORIAL CONDOLENCES
// ============================================================

export const getMemorialCondolences = async (memorialId) => {
  try {
    const response = await fetch(
      `${API}/api/memorial-submissions/memorial/${memorialId}/condolences`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load condolences."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Get memorial condolences error:",
      error
    );

    throw new Error(
      error.message || "Unable to load condolences."
    );
  }
};


export const getCalendarEvents = async ({
  year,
  month,
  category,
  status,
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (year) params.append("year", year);
    if (month) params.append("month", month);
    if (category) params.append("category", category);
    if (status) params.append("status", status);

    const query = params.toString();

    const response = await fetch(
      `${API}/api/calendar${query ? `?${query}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load calendar events."
      );
    }

    console.log("Calendar events response:", data);
    return data;
  } catch (error) {
    console.error("Get calendar events error:", error);

    throw new Error(
      error.message || "Unable to load calendar events."
    );
  }
};


export const getCalendarEvent = async (id) => {
  try {
    const response = await fetch(
      `${API}/api/calendar/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

   
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load calendar event."
      );
    }

    return data;
  } catch (error) {
    console.error("Get calendar event error:", error);

    throw new Error(
      error.message || "Unable to load calendar event."
    );
  }
};



export const getPublishedFinancialReports = async () => {
  try {
    const response = await fetch(
      `${API}/api/monthly/financial-reports`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("Published financial reports response:", data);

    if (!response.ok) {
      const error = new Error(
        data.message || "Unable to load financial reports."
      );

      error.status = response.status;

      throw error;
    }

    return data;
  } catch (error) {
    console.error("Get published financial reports error:", error);

    throw error;
  }
};



// GET PUBLISHED PUBLIC WEBSITE CONTENT

export const getPublicWebsiteContent = async (pageKey) => {
  const response = await fetch(
    `${API}/api/content/${encodeURIComponent(pageKey)}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  console.log(data.message)

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load website content."
    );
  }

  return data;
};



export const submitContactForm = async (formData) => {
  const response = await fetch(`${API}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

 

  if (!response.ok) {
    throw new Error(data.message || "Failed to send your message.");
  }

  return data;
};







// GET PUBLIC LEGACY LEADERS

export const getPublicLegacyLeaders = async () => {
  try {
    const response = await fetch(
      `${API}/api/public/legacy-leaders`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load legacy leaders."
      );
    }

     console.log(data)
    

    return data;
  } catch (error) {
    console.error("Get public legacy leaders error:", error);

    throw new Error(
      error.message || "Unable to load legacy leaders."
    );
  }
};






// ============================================================
// COMPLETE MEMBER ONBOARDING
// ============================================================

export const completeMemberOnboarding = async () => {
  try {
    const response = await fetch(
      `${API}/auth/onboarding/complete`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to complete onboarding."
      );
    }

    return data;
  } catch (error) {
    console.error("Complete onboarding error:", error);
    throw error;
  }
};



// ============================================================
// GET PUBLISHED ANNOUNCEMENTS
// ============================================================

export const getAnnouncements = async () => {
  try {
    const response = await fetch(
      `${API}/api/announcements`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load announcements."
      );
    }

    return data;
  } catch (error) {
    console.error("Get announcements error:", error);
    throw error;
  }
};



// ============================================================
// CREATE ANNOUNCEMENT
// ============================================================

export const createAnnouncement = async (announcementData) => {
  try {
    const response = await fetch(
      `${API}/api/announcements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(announcementData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to publish announcement."
      );
    }

    return data;
  } catch (error) {
    console.error("Create announcement error:", error);
    throw error;
  }
};





// ============================================================
// GET ALL ANNOUNCEMENTS — PRESIDENT
// ============================================================

export const getAllAnnouncements = async () => {
  try {
    const response = await fetch(`${API}/api/announcements/manage`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to load announcements.");
    }

    return data;
  } catch (error) {
    console.error("Get all announcements error:", error);
    throw error;
  }
};


// ============================================================
// UPDATE ANNOUNCEMENT
// ============================================================

export const updateAnnouncement = async (id, announcementData) => {
  try {
    const response = await fetch(`${API}/api/announcements/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(announcementData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to update announcement.");
    }

    return data;
  } catch (error) {
    console.error("Update announcement error:", error);
    throw error;
  }
};


// ============================================================
// PUBLISH ANNOUNCEMENT
// ============================================================

export const publishAnnouncement = async (id) => {
  try {
    const response = await fetch(
      `${API}/api/announcements/${id}/publish`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to publish announcement.");
    }

    return data;
  } catch (error) {
    console.error("Publish announcement error:", error);
    throw error;
  }
};


// ============================================================
// ARCHIVE ANNOUNCEMENT
// ============================================================

export const archiveAnnouncement = async (id) => {
  try {
    const response = await fetch(
      `${API}/api/announcements/${id}/archive`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to archive announcement.");
    }

    return data;
  } catch (error) {
    console.error("Archive announcement error:", error);
    throw error;
  }
};



// ============================================================
// RESTORE ANNOUNCEMENT
// ============================================================

export const restoreAnnouncement = async (id) => {
  try {
    const response = await fetch(
      `${API}/api/announcements/${id}/restore`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to restore announcement.");
    }

    return data;
  } catch (error) {
    console.error("Restore announcement error:", error);
    throw error;
  }
};



// ============================================================
// DELETE ANNOUNCEMENT
// ============================================================

export const deleteAnnouncement = async (id) => {
  try {
    const response = await fetch(`${API}/api/announcements/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to delete announcement.");
    }

    return data;
  } catch (error) {
    console.error("Delete announcement error:", error);
    throw error;
  }
};



// ============================================================
// INITIALIZE DONATION
// ============================================================

export const initializeDonation = async (donationData) => {
  try {
    const response = await fetch(`${API}/api/donation/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to initialize donation."
      );
    }

    return data;
  } catch (error) {
    console.error("Initialize donation error:", error);
    throw error;
  }
};


// ============================================================
// VERIFY DONATION
// ============================================================

export const verifyDonation = async (reference) => {
  try {
    const response = await fetch(
      `${API}/api/donation/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to verify donation."
      );
    }

    return data;
  } catch (error) {
    console.error("Verify donation error:", error);
    throw error;
  }
};





export const getPublicNOSALeaders = async () => {
  try {
    const response = await fetch(`${API}/api/public/nosa-leaders`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to retrieve NOSA leaders."
      );
    }

    return data;
  } catch (error) {
    console.error("Get public NOSA leaders error:", error);
    throw error;
  }
};






// ============================================================
// GET PUBLISHED STEWARDSHIP REPORTS — MEMBERS
// ============================================================

export const getPublishedStewardshipReports = async () => {
  try {
    const response = await fetch(
      `${API}/api/stewardship-reports`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load stewardship reports."
      );
    }

    return data;
  } catch (error) {
    console.error("Get stewardship reports error:", error);
    throw error;
  }
};


// ============================================================
// GET PRESIDENT'S STEWARDSHIP REPORTS
// ============================================================

export const getPresidentStewardshipReports = async () => {
  try {
    const response = await fetch(
      `${API}/api/stewardship-reports/president`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load your stewardship reports."
      );
    }

    return data;
  } catch (error) {
    console.error("Get president stewardship reports error:", error);
    throw error;
  }
};


// ============================================================
// CREATE STEWARDSHIP REPORT — PRESIDENT
// ============================================================

export const createStewardshipReport = async (formData) => {
  try {
    const response = await fetch(
      `${API}/api/stewardship-reports`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to create stewardship report."
      );
    }

    return data;
  } catch (error) {
    console.error("Create stewardship report error:", error);
    throw error;
  }
};


// ============================================================
// UPDATE STEWARDSHIP REPORT — PRESIDENT
// ============================================================

export const updateStewardshipReport = async (id, formData) => {
  try {
    const response = await fetch(
      `${API}/api/stewardship-reports/${id}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to update stewardship report."
      );
    }

    return data;
  } catch (error) {
    console.error("Update stewardship report error:", error);
    throw error;
  }
};



// ============================================================
// EXCOM — MEMBERSHIP MANAGEMENT
// ============================================================

// GET ELIGIBLE MEMBERS
export const getEligibleExcomMembers = async () => {
  const response = await fetch(
    `${API}/api/excom/members/eligible-members`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load eligible members.");
  }

  return data;
};


// GET ACTIVE EXCOM MEMBERS
export const getExcomMembers = async () => {
  const response = await fetch(`${API}/api/excom/members`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load EXCOM members.");
  }

  return data;
};


// APPOINT EXCOM MEMBER
export const appointExcomMember = async (membershipData) => {
  const response = await fetch(`${API}/api/excom/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(membershipData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to appoint EXCOM member.");
  }

  return data;
};


// REMOVE EXCOM MEMBER
export const removeExcomMember = async (membershipId) => {
  const response = await fetch(
    `${API}/api/excom/members/${membershipId}/remove`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to remove EXCOM member.");
  }

  return data;
};


// ============================================================
// EXCOM — DISCUSSIONS
// ============================================================

// GET EXCOM DISCUSSIONS
export const getExcomConversations = async () => {
  const response = await fetch(`${API}/api/excom/conversations`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load EXCOM discussions.");
  }

  return data;
};


// CREATE EXCOM DISCUSSION — PRESIDENT
export const createExcomConversation = async (conversationData) => {
  const response = await fetch(`${API}/api/excom/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(conversationData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create discussion.");
  }

  return data;
};


// GET SINGLE EXCOM DISCUSSION
export const getExcomConversationDetails = async (conversationId) => {
  const response = await fetch(
    `${API}/api/excom/conversations/${conversationId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load discussion.");
  }

  return data;
};


// REPLY TO EXCOM DISCUSSION
export const replyToExcomConversation = async (
  conversationId,
  message
) => {
  const response = await fetch(
    `${API}/api/excom/conversations/${conversationId}/replies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ message }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to send reply.");
  }

  return data;
};



// ============================================================
// UPDATE EXCOM DISCUSSION STATUS — PRESIDENT
// ============================================================

export const updateExcomConversationStatus = async (
  conversationId,
  status
) => {
  const response = await fetch(
    `${API}/api/excom/conversations/${conversationId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to update discussion status."
    );
  }

  return data;
};


// ============================================================
// DELETE EXCOM DISCUSSION — PRESIDENT
// ============================================================

export const deleteExcomConversation = async (conversationId) => {
  const response = await fetch(
    `${API}/api/excom/conversations/${conversationId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to delete discussion."
    );
  }

  return data;
};