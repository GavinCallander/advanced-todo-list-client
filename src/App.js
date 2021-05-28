import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Dashboard, Home, List } from './components/pages';
import { Header } from './components/layout';
import { AuthWrapper } from './components/helpers';

import './styles/main.scss';

import * as ROUTES from './constants/routes';

export default function App() {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuth = user => {
        if (user) {
            setUser(user);
            setIsAuthenticated(true);
        }
        else {
            setUser(null);
            setIsAuthenticated(null);
            localStorage.removeItem("authToken");
        };
    };

    return (
        <div className="container">
            <Header />
            <Switch>
                {/* Maybe separate into separate utils file */}
                <Route exact path={ROUTES.HOME} render={() =>
                    <Home 
                        handleAuth={handleAuth}
                        user={user}
                    />
                } />
                {/* Auth wrapper checks for authentication by looking for token in local storage */}
                {/* Will be checking against current user as well at App.js */}
                {/* THIS IS A BIG TODO */}
                <AuthWrapper isAuthenticated={isAuthenticated}>
                    <Route path={ROUTES.DASHBOARD} render={() => 
                        <Dashboard /> 
                    } />
                    <Route path={ROUTES.LIST} render={() => 
                        <List />
                    } />
                </AuthWrapper>
            </Switch>
        </div>
    )
};