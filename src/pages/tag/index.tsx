import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import TagList from './tag-list';
import TagDetail from './tag-detail';

const route = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={ match.path } component={ TagList }></Route>
      <Route exact path={ `${match.path}/detail` } component={ TagDetail }></Route>
    </Switch>
  )
}
export default route;