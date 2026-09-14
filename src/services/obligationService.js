import API from "../config/app.js";



export const getMyObligation = async () => {
    try {

        const res = await fetch(`${API}/myObligations`,{
             credentials: "include",
        })


        if (!res.ok) {
            throw new Error("Failed to fetch year sets");
        }


        const data = await res.json();
        console.log
         return data;

    } catch (err) {
        console.error(err);
    }
}