import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import history from './history';

class App extends React.Component {
  componentDidMount() {
    
  }
  public render() {
    return (
      <div style={{height: '100%'}}>
        <div style={{
          height: '3px',
          background: '#222'
        }}></div>
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
    );
  }
}

export default App;
