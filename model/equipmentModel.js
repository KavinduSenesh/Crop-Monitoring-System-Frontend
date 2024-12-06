import { getCookie } from "./tokenModel.js";

export function getAllEquipments(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:5055/greenShadow/api/v1/equipment",
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            contentType: "application/json",
            success: (response) => {
                console.log("equipment fetched successfully:", response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch equipment:", error);
                reject(error);
            },
        });
    });
}

export function getEquipment(id){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/greenShadow/api/v1/equipment/${id}`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            contentType: "application/json",
            success: function (result) {
                resolve(result);
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        });
    })
}

export function updateEquipment(equipment_id, equipment, staff_id, fieldCode) {
    console.log("Updating Equipment:", equipment, staff_id, equipment_id,fieldCode);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/greenShadow/api/v1/equipment/${equipment_id}?staffId=${staff_id}&fieldCode=${fieldCode}`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("authToken"),
            },
            data: JSON.stringify(equipment),
            success: function (result) {
                resolve(result);
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        });
    });
}

export function saveEquipment(equipment){
    return new Promise((resolve, reject) => {
        $.ajax({
            url : "http://localhost:5055/greenshadow/api/v1/equipment",
            type : "POST",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
            },
            data : JSON.stringify(equipment),
            contentType: "application/json",
            success: function(result){
                resolve(result);
            },
            error: function(xhr, status, error){
                reject(error);
            },
        })
    })
}

export function deleteEquipment(equipmentId){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5055/greenShadow/api/v1/equipment/${equipmentId}`,
            type: "DELETE",
            headers: {
                Authorization: "Bearer " + getCookie("authToken"),
                "content-type": "application/json",
            },
            success: (response) => {
                console.log("Equipment deleted successfully:", response);
                resolve(response);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error(`Failed to delete equipment: ${textStatus}, ${errorThrown}`);
                reject(`Request failed with status: ${jqXHR.status}`);
            },
        });
    });
}