import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import FieldsList from './pages/Fields/FieldsList';
import FieldDetail from './pages/Fields/FieldDetail';
import Settings from './pages/Settings/Settings';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/fields" exact component={FieldsList} />
        <Route path="/fields/:id" component={FieldDetail} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default Routes;