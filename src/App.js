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
// STATE
    const [method, setMethod] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState("");
    const [route, setRoute] = useState("");
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

// TEMP VARIABLES
    let userId = user ? user._id : "";

// COMPONENT LIFECYCLE
    useEffect(() => {
        console.log("App: componentDidMount");
        decodeToken();
    }, []);

// METHODS
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
    const handleAuth = user => {
        if (user) {
            setUser(user);
        }
        else {
            setUser(null);
            localStorage.removeItem("authToken");
        };
    };
    
    
    return (
        <div className="app">
            {
                modalActive ? 
                    <Modal 
                        handleAuth={handleAuth}
                        method={method}
                        modalActive={modalActive}
                        modalType={modalType}
                        route={route}
                        userId={userId}
                    /> :
                    null
            }
            <Header user={user} />
            <Switch>
                {/* Maybe separate into separate utils file */}
                <Route exact path={ROUTES.HOME} render={() =>
                    <HomePage
                        handleAuth={handleAuth}
                        setMethod={setMethod}
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
                            setMethod={setMethod}
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
                            setMethod={setMethod}
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