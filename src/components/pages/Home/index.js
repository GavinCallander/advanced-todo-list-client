import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthButton } from '../../helpers';

import { DASHBOARD } from '../../../constants/routes';

export default function HomePage(props) {
    
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