import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthButton } from '../helpers';

import { DASHBOARD } from '../../constants/routes';

export default function HomePage(props) {

    /*
        ToDo: Refactor! Auth Buttons are can be mapped = dryer code
    */
    
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (props.user) {
            setRedirect(true);
        }
    }, [props.user]);

    if (redirect) return <Redirect to={DASHBOARD} />

    return (
        <div className="page">
            <div className="page__section">
                <p className="content content--one">Don't get twisted</p>
                <p className="content content--one">Get on Listed</p>
            </div>
            <div className="page__section">
                <AuthButton
                    route="auth/signup"
                    setMethodType={props.setMethodType}
                    setModalActive={props.setModalActive}
                    setModalType={props.setModalType}
                    setRoute={props.setRoute}
                    text="SignUp"
                />
                <p className="">or</p>
                <AuthButton
                    route="auth/login"
                    setMethodType={props.setMethodType}
                    setModalActive={props.setModalActive}
                    setModalType={props.setModalType}
                    setRoute={props.setRoute}
                    text="LogIn"
                />
            </div>
        </div>
    );
};