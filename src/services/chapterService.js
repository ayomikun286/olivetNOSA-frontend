import API from "../config/app.js";



export const getChapters = async () => {
  try {
    const res = await fetch(
      `${API}/api/chapters`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
        "Failed to fetch chapters."
      );
    }

    return data.data;

  } catch (err) {
    console.error(
      "Get chapters error:",
      err
    );

    throw err;
  }
};





export const getChapterObligation = async () => {
    try {

        const res = await fetch(`${API}/api/chapters/obligation`,{
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