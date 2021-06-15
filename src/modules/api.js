import axios from 'axios';

import { setAuthToken } from './auth';

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
export const postRequest = ({ data, route, setUser }) => {
    console.log("Functioning, but barely");
    axios.post(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            setAuthToken(response.data.token);
        };
        if (response.data.user) {
            setUser(response.data.user);
        };
    })
    .catch(err => {
        console.log(err);
        return err;
    });
};

// PUT ROUTE
export const putRequest = ({ data, route }) => {
    console.log(data);
    console.log("Updating");
    axios.put(`${process.env.REACT_APP_SERVER_URL}/${route}`, { data })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
};