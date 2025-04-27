import { getCookie } from "./tokenModel.js";

export function getAllCrops(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/crop-monitor/api/v1/crop",
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"), // Ensure token is valid
            },
            success: (reponse) => {
                if (reponse.status === "success") {
                    resolve(reponse.data);
                } else {
                    reject(new Error("Failed to fetch crops"));
                }
            },
            error: (error) => {
                reject(new Error("Error fetching crops: " + error.statusText));
            }
        });
    });
}