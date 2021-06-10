import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { DashboardPage, HomePage, ListPage } from './components/pages';

import { Header, Modal } from './components/layout';

import { AuthWrapper } from './components/helpers';

import { setAuthToken } from './modules/auth';

import './styles/main.scss';

import * as ROUTES from './constants/routes';

export default function App() {

/*
    ToDo:   Outline App-held state requirements for each child component
        *   Helpers
            *   AuthWrapper
                *   user
        *   Pages
            *   Dashboard
            *   Home
            *   List
        *   Layout
            *   Header
                *   user
            *   Modal
                *   methodType; modalActive; modalType; route
*/
    const [methodType, setMethodType] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState("");
    const [route, setRoute] = useState("");
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    // best practice would be to bundle what is actually needed
    // together and pass to the modal, rather than everything
    // can do this at each individual page

    const handleAuth = user => {
        if (user) {
            setUser(user);
        }
        else {
            setUser(null);
            localStorage.removeItem("authToken");
        };
    };
    
    const decodeToken = currentToken => {
        let token = currentToken || localStorage.getItem('authToken');
        if (token) {
            let decoded = jwtDecode(token);
            if (!decoded || Date.now() >= decoded.exp * 1000) {
                setUser(null);
            }
            else {
                setAuthToken(token);
                setUser(decoded);
                handleAuth(decoded);
            };
        }
        else {
            setUser(null);
        };
    };

    useEffect(() => {
        decodeToken();
    }, []);
    
    return (
        <div className="app">
            {
                modalActive ? 
                    <Modal 
                        // handleAuth={handleAuth}
                        methodType={methodType}
                        modalActive={modalActive}
                        modalType={modalType}
                        // route={route}
                        // setModalActive={setModalActive}
                        // setUser={setUser}
                        // user={user}
                        // userData={userData}
                    /> :
                    null
            }
            <Header user={user} />
            <Switch>
                {/* Maybe separate into separate utils file */}
                <Route exact path={ROUTES.HOME} render={() =>
                    <HomePage
                        handleAuth={handleAuth}
                        setMethodType={setMethodType}
                        setModalActive={setModalActive}
                        setModalType={setModalType}
                        setRoute={setRoute}
                        user={user}
                    />
                } />
                <AuthWrapper user={user}>
                    <Route 
                        path={ROUTES.DASHBOARD} 
                        render={() => 
                        <DashboardPage 
                            setMethodType={setMethodType}
                            setModalActive={setModalActive}
                            setModalType={setModalType}
                            setRoute={setRoute}
                            user={user}
                        />
                    } />
                    <Route 
                        path={`${ROUTES.LIST}/:id`} 
                        render={({ match }) => 
                        <ListPage
                            match={match}
                            setMethodType={setMethodType}
                            setModalActive={setModalActive}
                            setModalType={setModalType}
                            setRoute={setRoute}
                            setUserData={setUserData}
                            userData={userData}
                        />
                    } />
                </AuthWrapper>
            </Switch>
        </div>
    )
};