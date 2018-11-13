import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import history from './config/history';
import Suspend from './components/suspend';
import SideBar from './components/sideBar';

class App extends React.Component {
  componentDidMount() {
  }
  public render() {
    return (
      <div style={{height: '100%'}}>
        <div style={{height: '3px',background: '#222'}}></div>
        <div style={{display: 'flex'}}>
          <div style={{
            flex: 1
          }}>
            <Router history={history}>
              <Switch>
                {
                  routes.map((v: RouteData) => (
                      <Route
                        exact
                        path={v.path}
                        key={v.name}
                        component={v.component}
                      />
                  ))
                }
              </Switch>
            </Router>
          </div>
          <SideBar/>
        </div>
        <Suspend/>
      </div>
    );
  }
}

export default App;
