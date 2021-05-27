import { useState } from 'react'

import { AuthButton } from '../../helpers';

export default function Home() {

    const [modalType, setModalType] = useState("");

    return (
        <div className="page">
            <div className="page__section">
                <p className="">Get organized alone</p>
                <p className="">Get organized together</p>
                <p className="">Make life easy</p>
            </div>
            <div className="page__section">
                <AuthButton 
                    setModalType={setModalType}
                    text="Sign Up"
                />
                <p className="">or</p>
                <AuthButton 
                    setModalType={setModalType}
                    text="Log In"
                />
            </div>
        </div>
    )
};