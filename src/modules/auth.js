import axios from 'axios';

// function to streamline axios requests
export function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    };
    console.log(axios.defaults.headers.common);
};