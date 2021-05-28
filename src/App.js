import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Dashboard, Home, List } from './components/pages';
import { Header } from './components/layout';
import { AuthWrapper } from './components/helpers';

import './styles/main.scss';

import * as ROUTES from './constants/routes';

export default function App() {

    const [user, setUser] = useState(null);


    return (
        <div className="container">
            <Header />
            <Switch>
                <Route exact path={ROUTES.HOME} render={() =>
                    <Home />
                } />
                {/* Auth wrapper checks for authentication by looking for token in local storage */}
                {/* Will be checking against current user as well at App.js */}
                {/* THIS IS A BIG TODO */}
                <AuthWrapper user={user} >
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