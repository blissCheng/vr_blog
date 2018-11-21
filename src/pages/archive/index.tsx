import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Archive from './archive';

const route = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={ match.path } component={ Archive }></Route>
    </Switch>
  )
}
export default route;