import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Home from './home';

const route = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={ match.path } component={ Home }></Route>
    </Switch>
  )
}
export default route;