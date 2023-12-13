import axios from "axios";
import { flashMessageAction } from "../helpers/helpers";
axios.defaults.baseURL = 'http://34.170.57.59/api/v1';

axios.interceptors.response.use(
    (response) => {
        switch (response.status) {
            case 200:
                if (response.data.interceptor) {
                    flashMessageAction(
                        response.data.message,
                        "success"
                    );
                }
                break;
            case 201:
                if (response.data.interceptor) {
                    flashMessageAction(
                        response.data.message,
                        "success"
                    );
                }
                break;
            case 202:
                if (response.data.interceptor) {
                    flashMessageAction(
                        response.data.message,
                        "success"
                    );
                }
                break;
            default:
                console.clear();
        }
        return response;
    }, function (error) {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    if (error.response.data.interceptor) {
                        flashMessageAction(
                            error.response.data.message,
                            "warning"
                        );
                    }
                    break;
                default:
            }
        }
        return Promise.reject(error);
    });