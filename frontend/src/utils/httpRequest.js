import axios from 'axios';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 2000,
    withCredentials: true,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
});

// httpRequest.defaults.withCredentials = true

export const get = async (path, options = {}) => {
    try {
        const res = await httpRequest.get(path, options);

        return res;
    } catch (error) {
        return error;
    }
};

export const post = async (path, data = {}) => {
    try {
        const res = await httpRequest.post(path, data);

        return res;
    } catch (error) {
        return error;
    }
};

export const put = async (path, data = {}) => {
    try {
        const res = await httpRequest.put(path, data);

        return res;
    } catch (error) {
        return error;
    }
};

export const Delete = async (path) => {
    try {
        const res = await httpRequest.delete(path);

        return res;
    } catch (error) {
        return error;
    }
};

// // Add a httpRequest interceptor
httpRequest.interceptors.request.use(function (config) {
    // Do something before httpRequest is sent
    NProgress.start();
    return config;
  }, function (error) {
    // Do something with httpRequest error
    return Promise.reject(error);
  });

// // Add a response interceptor
httpRequest.interceptors.response.use(
    function (response) {
        NProgress.done();

        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response?.status || 500;

        switch (status) {
            // authentication (token related issues)
            case 401: {
                toast.error('Unauthorized the user, please login');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            // forbidden (permission related issues)
            case 403: {
                // toast.error('This actions is not permitted.');
                return error.response.data;
            }

            // bad httpRequest
            case 400: {
                return Promise.reject(error);
            }

            // not found
            case 404: {
                return Promise.reject(error);
            }

            // conflict
            case 409: {
                return Promise.reject(error);
            }

            // unprocessable
            case 422: {
                return Promise.reject(error);
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject(error);
            }
        }
    },
);

export default httpRequest;
