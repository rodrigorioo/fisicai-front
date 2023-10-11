import {axiosInstance} from "@/plugins/axios";

const checkLogin = () => {
    return new Promise( (success, failure) => {
        axiosInstance.get(`${process.env.VUE_APP_API_URL}auth`, {
            headers: {
                "x-access-token": localStorage.getItem("user") ?? null,
            }
        }).then( () => {

            // Return true
            success();

        }).catch( () => {

            // Return failure
            failure();

        });
    });
}

export function requiredLogout ({ next }){

    checkLogin().then( () => {
        return next({ name: 'home' });
    }).catch( () => {
        return next();
    });
}

export function requiredLogin ({ next }) {

    checkLogin().then( () => {
        return next();
    }).catch( () => {
        return next({ name: 'login' });
    });
}
