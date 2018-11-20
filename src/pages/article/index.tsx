import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Article from './article';

const route = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={ match.path } component={ Article }></Route>
    </Switch>
  )
}
export default route;