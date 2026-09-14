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