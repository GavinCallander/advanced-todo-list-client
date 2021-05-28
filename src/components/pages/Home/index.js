import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthButton, AuthModal } from '../../helpers';

import { DASHBOARD } from '../../../constants/routes';

export default function Home(props) {

    const [modalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState("");

    let modalClass = modalActive ? "auth-modal auth-modal--active" : "auth-modal";

    let modalId = modalType === "Sign Up" ? "sign-up" : "log-in";

    if (props.currentUser) return <Redirect to={DASHBOARD} />

    return (
        <div className="page">
            <AuthModal 
                handleAuth={props.handleAuth}
                modalClass={modalClass}
                modalId={modalId}
                modalType={modalType}
            />
            <div className="page__section">
                <p className="">Get organized alone</p>
                <p className="">Get organized together</p>
                <p className="">Make life easy</p>
            </div>
            <div className="page__section">
                <AuthButton
                    modalActive={modalActive}
                    setModalActive={setModalActive}
                    setModalType={setModalType}
                    text="Sign Up"
                />
                <p className="">or</p>
                <AuthButton 
                    modalActive={modalActive}
                    setModalActive={setModalActive}
                    setModalType={setModalType}
                    text="Log In"
                />
            </div>
        </div>
    );
};