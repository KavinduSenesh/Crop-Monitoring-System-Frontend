import { getCookie } from "./tokenModel.js";

export function getAllFields(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/greenShadow/api/v1/field",
            type: "GET",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            success: function (result) {
                console.log(result);
                resolve(result);
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        })
    })
}