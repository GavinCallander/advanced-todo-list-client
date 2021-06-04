import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthButton, AuthModal } from '../../helpers';

import { DASHBOARD } from '../../../constants/routes';

export default function HomePage(props) {

    // const [modalActive, setModalActive] = useState(false);
    // const [modalType, setModalType] = useState("");

    // let modalClass = modalActive ? "auth-modal auth-modal--active" : "auth-modal";

    // let modalId = modalType === "Sign Up" ? "sign-up" : "log-in";

    if (props.user) return <Redirect to={DASHBOARD} />

    return (
        <div className="page">
            {/* <AuthModal 
                handleAuth={props.handleAuth}
                modalClass={modalClass}
                modalId={modalId}
                modalType={modalType}
            /> */}
            <div className="page__section">
                <p className="content content--one">Don't get twisted</p>
                <p className="content content--one">Get on Listed</p>
            </div>
            <div className="page__section">
                <AuthButton
                    // modalActive={props.modalActive}
                    setModalActive={props.setModalActive}
                    setModalType={props.setModalType}
                    text="SignUp"
                />
                <p className="">or</p>
                <AuthButton 
                    // modalActive={modalActive}
                    setModalActive={props.setModalActive}
                    setModalType={props.setModalType}
                    text="LogIn"
                />
            </div>
        </div>
    );
};