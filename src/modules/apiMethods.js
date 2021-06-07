import axios from 'axios';

import { setAuthToken } from './setAuthToken';

/*
    postToApi
    *   need to define the data to be posted
    *   need to define the route for the func to hit
    *   need to do something with response or error
    Options: { data, route, handleSuccess, handleError };

    Post routes required:   
        -   Auth
            -   Login
            -   Signup
        -   List
*/



export const postToApi = ({ data, route, handleSuccess }) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        localStorage.setItem('authToken', response.data.token);
        setAuthToken(response.data.token);
        handleSuccess(response.data.user);
    })
    .catch(err => {
        console.log(err);
    });
};