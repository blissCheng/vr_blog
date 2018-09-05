import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PageData from './pages';
import history from './history';
class App extends React.Component {
  componentDidMount() {

  }
  public render() {
    return (
      <div style={{height: '100%'}}>
        <Router history={history}>
          <Switch>
            {
              PageData.map((v: PageData) => (
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
