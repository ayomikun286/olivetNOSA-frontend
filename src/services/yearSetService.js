import API from "../config/app.js";



export const getyearSetObligation = async () => {
    try {

        const res = await fetch(`${API}/api/yearSet/obligation`,{
             credentials: "include",
        })


        if (!res.ok) {
            throw new Error("Failed to fetch year sets");
        }


        const data = await res.json();
        console.log(data.data)
         return data.data;
        

    } catch (err) {
        console.error(err);
    }
}


export const approveYearSetMember = async (userId) => {
  try {
    const res = await fetch(
      `${API}/api/yearSet/members/${userId}/approve`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to approve member.");
    }

    return data;
  } catch (err) {
    console.error("Approve Year Set member error:", err);
    throw err;
  }
};