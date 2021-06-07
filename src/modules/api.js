import axios from 'axios';

import { setAuthToken } from './auth';

/*
    postToApi
    *   need to define the data to be posted
    *   need to define the route for the func to hit
    *   need to do something with response or error
    Options: { data, route, handleSuccess, handleError };

    DELETE routes required:
        -   List
        -   List Item
    POST routes required:   
        -   Auth
            -   Login
            -   Signup
        -   List
            -   With user flow
    PUT routes required:
        -   List
            -   Updating collaborators; fields etc.
        -   ListItem
            -   For creating a new item
*/

export const deleteRequest = ({ data, route }) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
};

// GET ROUTE
export const getRequest = ({ data, route }) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
};

// POST ROUTE
export const postRequest = ({ data, route }) => {
    console.log(route); 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        localStorage.setItem('authToken', response.data.token);
        setAuthToken(response.data.token);
    })
    .catch(err => {
        console.log(err);
    });
};

// PUT ROUTE
export const putRequest = ({ data, route, handleSuccess, handleError }) => {
    axios.put(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
};