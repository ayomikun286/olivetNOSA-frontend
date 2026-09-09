import API from "../config/app.js";



export const getChapters = async () => {
    try {

        const res = await fetch(`${API}/api/chapters`)


        if (!res.ok) {
            throw new Error("Failed to fetch year sets");
        }


        const data = await res.json();
         return data.data;

    } catch (err) {
        console.error(err);
    }
}