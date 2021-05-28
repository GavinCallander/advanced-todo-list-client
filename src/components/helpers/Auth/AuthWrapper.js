import { Redirect } from 'react-router-dom';

import { HOME } from '../../../constants/routes';

export default function AuthWrapper(props) {
    
    function checkAuthentication() {
        let token = localStorage.getItem('authToken');
        if (props.isAuthenticated && token) {
            return true
        };
        return false;
    };
    return (
        <>
            { checkAuthentication() ? props.children : <Redirect to={HOME} /> }
        </>
    )
};