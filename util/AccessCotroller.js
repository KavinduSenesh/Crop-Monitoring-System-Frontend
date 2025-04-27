import {getUserByEmail} from "../model/LoginModel.js";


export async function checkAccess(endpoint){
    const loginEmail = localStorage.getItem('userEmail');
    const role = await getUserByEmail(loginEmail)
    if (role === "MANAGER"){
        return true;
    } else if (role === "ADMINISTRATIVE"){
        if (endpoint === "crop" || endpoint === "field" || endpoint === "log"){
            alert("You do not have access to this action", "error");
            return false;
        }
        else {
            return true;
        }
    } else if (role === "SCIENTIST"){
        if (endpoint === "staff" || endpoint === "vehicle" || endpoint === "equipment"){
            alert("You do not have access to this action", "error");
            return false;
        }
        else {
            return true;
        }
    }

}