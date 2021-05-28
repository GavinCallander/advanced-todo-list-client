import { useState } from 'react'

import { AuthButton, AuthModal } from '../../helpers';

export default function Home() {

    const [modalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState("");

    let modalClass = modalActive ? "auth-modal auth-modal--active" : "auth-modal";

    let modalId = modalType === "Sign Up" ? "sign-up" : "log-in";

    return (
        <div className="page">
            <AuthModal 
                modalClass={modalClass}
                modalId={modalId}
            />
            <div className="page__section">
                <p className="">Get organized alone</p>
                <p className="">Get organized together</p>
                <p className="">Make life easy</p>
            </div>
            <div className="page__section">
                <AuthButton
                    setModalActive={setModalActive}
                    setModalType={setModalType}
                    text="Sign Up"
                />
                <p className="">or</p>
                <AuthButton 
                    setModalActive={setModalActive}
                    setModalType={setModalType}
                    text="Log In"
                />
            </div>
        </div>
    );
};