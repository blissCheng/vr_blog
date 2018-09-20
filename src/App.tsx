import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PageData from './pages';
import history from './history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppStore from './app.reducer';
//import AppActions from './app.actions';


const store = createStore(AppStore);

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
                <Provider store={store}>
                <Route
                  exact
                  path={v.path}
                  key={v.name}
                  component={v.component}
                />
                </Provider>
              ))
            }
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
