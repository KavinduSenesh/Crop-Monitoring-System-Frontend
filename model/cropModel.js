export function getAllCrops(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/crop-monitor/api/v1/crop",
            type: "GET",
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