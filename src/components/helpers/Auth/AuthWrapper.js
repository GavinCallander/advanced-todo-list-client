import { Redirect } from 'react-router-dom';

import { HOME } from '../../../constants/routes';

export default function AuthWrapper(props) {

    return (
        <>
            { props.user ? props.children : <Redirect to={HOME} /> }
        </>
    )
};