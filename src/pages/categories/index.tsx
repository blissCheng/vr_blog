import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import CategoriesList from './categories-list';
import CategoriesDetail from './categories-detail';

const route = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={ match.path } component={ CategoriesList }></Route>
      <Route exact path={ `${match.path}/detail` } component={ CategoriesDetail }></Route>
    </Switch>
  )
}
export default route;