import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { DashboardPage, HomePage, ListPage } from './components/pages';
import { Header } from './components/layout';
import { AuthWrapper } from './components/helpers';
import { Modal } from './components/helpers';

import { setAuthToken } from './modules/setAuthToken';

import './styles/main.scss';

import * as ROUTES from './constants/routes';

export default function App() {
    
    const [modalActive, setModalActive] = useState(false);
    const [modalType, setModalType] = useState("");
    const [user, setUser] = useState(null);
    
    const handleAuth = user => {
        if (user) {
            setUser(user);
        }
        else {
            setUser(null);
            localStorage.removeItem("authToken");
        };
    };
    
    useEffect(() => {
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
        decodeToken();
    }, []);

    let modalTypes = ["Auth","List","Item"]

    const handleModal = () => {
        let i = Math.floor(Math.random() * modalTypes.length);
        setModalType(modalTypes[i])
        setModalActive(true);
    }

    return (
        <div className="app">
            <Modal 
                modalActive={modalActive}
                modalType={modalType}
                setModalActive={setModalActive}
            />
            <Header user={user} />
            <Switch>
                {/* Maybe separate into separate utils file */}
                <Route exact path={ROUTES.HOME} render={() =>
                    <HomePage
                        handleAuth={handleAuth}
                        setModalActive={setModalActive}
                        setModalType={setModalType}
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
                            setModalActive={setModalActive}
                            setModalType={setModalType}
                            user={user}
                        />
                    } />
                    <Route 
                        path={`${ROUTES.LIST}/:id`} 
                        render={({ match }) => 
                        <ListPage
                            match={match}
                            setModalActive={setModalActive}
                            setModalType={setModalType}
                        />
                    } />
                    <button onClick={handleModal}>Click Me</button>
                </AuthWrapper>
            </Switch>
        </div>
    )
};