import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { setAuthToken } from '../../../utils/setAuthToken';

import { LogInForm, SignUpForm } from './AuthForms';

import { DASHBOARD } from '../../../constants/routes';

export default function AuthModal(props) {

    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [redirect, setRedirect] = useState(false);

    let route = props.modalType === "Sign Up" ? "signup" : "login";

    let data = props.modalType === "Sign Up" ?
        {email, first_name, last_name, password} :
        {email, password};

    const handleAuthSubmit = e => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/${route}`, {data})
        .then(response => {
            console.log(response);
            localStorage.setItem('authToken', response.data.token);
            console.log('Set storage good')
            setAuthToken(response.data.token);
            console.log('Set Auth good')
            props.handleAuth(response.data.user);
            console.log('Handle auth isnt fucked')
            setRedirect(true);
        })
        .catch(err => {
            console.log(err);
        });
    };

    if (redirect) return <Redirect to={DASHBOARD} />;

    let form = props.modalType === "Sign Up" ?
        <SignUpForm 
            handleAuthSubmit={handleAuthSubmit}
            setEmail={setEmail}
            setFirst_name={setFirst_name}
            setLast_name={setLast_name}
            setPassword={setPassword}
            setPasswordConfirm={setPasswordConfirm}
        /> :
        <LogInForm 
            handleAuthSubmit={handleAuthSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
        />;

    return (
        <div className={props.modalClass} id={props.modalId}>
            <p className="">{props.modalType}</p>
            {form}
        </div>
    );
};