import { Redirect } from 'react-router-dom';

import { HOME } from '../../../constants/routes';

export default function AuthWrapper(props) {
    
    function checkAuthentication() {
        let token = localStorage.getItem('authToken');
        let result = token ? true: false;
        if (props.user && result) {
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