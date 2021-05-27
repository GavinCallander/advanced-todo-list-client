import { Route } from 'react-router-dom';

import { Dashboard, Home, List } from './components/pages';

import { Header } from './components/layout';

import './styles/main.scss';

import * as ROUTES from './constants/routes';

export default function App() {
    return (
        <div className="app">
            <Header />
            <Route exact path={ROUTES.HOME} render={() =>
                <Home />
            } />
            <Route path={ROUTES.DASHBOARD} render={() => {
                <Dashboard />
            }} />
            <Route path={ROUTES.LIST} render={() => {
                <List />
            }} />
        </div>
    )
};