import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import CategoryList from './category-list';
import CategoryDetail from './category-detail';

const route = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={ match.path } component={ CategoryList }></Route>
      <Route exact path={ `${match.path}/detail` } component={ CategoryDetail }></Route>
    </Switch>
  )
}
export default route;