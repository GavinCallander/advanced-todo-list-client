import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { DashboardPage, HomePage, ListPage } from './components/pages';
import { Header } from './components/layout';
import { AuthWrapper } from './components/helpers';
import { Modal } from './components/helpers';

import { setAuthToken } from './modules/auth';

import './styles/main.scss';

import * as ROUTES from './constants/routes';

export default function App() {
    
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

    useEffect(() => {
        // console.log(userData);
    }, [userData])
    
    return (
        <div className="app">
            <Modal 
                handleAuth={handleAuth}
                methodType={methodType}
                modalActive={modalActive}
                modalType={modalType}
                route={route}
                setModalActive={setModalActive}
                setUser={setUser}
                user={user}
                userData={userData}
            />
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
                {/* Auth wrapper checks for authentication by looking for token in local storage */}
                {/* Will be checking against current user as well at App.js */}
                {/* THIS IS A BIG TODO */}
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