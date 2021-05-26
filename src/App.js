import { Route } from 'react-router-dom';

import { Dashboard, Home, List } from './components/pages';

import './App.css';

import * as ROUTES from './constants/routes';

export default function App() {
    return (
        <div className="container">
            <Route exact path={ROUTES.HOME} render={() =>
                <Home />
            } />
        </div>
    )
};