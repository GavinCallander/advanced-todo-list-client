import { useState } from 'react';
import axios from 'axios';

import { setAuthToken } from '../../../modules/setAuthToken';

import { LogInForm, SignUpForm } from './AuthForms';

export default function AuthModal(props) {

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    let route = props.modalType === "Sign Up" ? "signup" : "login";

    // TODO: This needs to be tidied along with the backend; req.body.data.whatever is not clean enough; need to ensure not overfetching though
    let data = props.modalType === "Sign Up" ?
        {email, first_name, last_name, password} :
        {email, password};

    // TODO: Should this be a JS module outside of the component for tidiness?
    const handleAuthSubmit = e => {
        e.preventDefault();
        if (props.modalType === "Sign Up" && password !== passwordConfirm) {
            setErrorMessage("Passwords do not match. Please reenter before resubmitting.")
        }
        else {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/${route}`, {data})
            .then(response => {
                localStorage.setItem('authToken', response.data.token);
                setAuthToken(response.data.token);
                props.handleAuth(response.data.user);
            })
            .catch(err => {
                setErrorMessage("Seems we ran into a problem :/ try again!");
            });
        }
    };

    let form = props.modalType === "Sign Up" ?
        <SignUpForm 
            errorMessage={errorMessage}
            handleAuthSubmit={handleAuthSubmit}
            setEmail={setEmail}
            setFirst_name={setFirst_name}
            setLast_name={setLast_name}
            setPassword={setPassword}
            setPasswordConfirm={setPasswordConfirm}
        /> :
        <LogInForm 
            errorMessage={errorMessage}
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