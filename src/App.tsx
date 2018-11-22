import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from './config/routes';
import history from './config/history';

import { Suspend, SideBar, Footer } from './components';
import { AppStore } from './app.reducer';

const styles = require('./App.less');

interface Props {
  appStore: AppStore;
}

class App extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    
    const { siderbarVisible } = this.props.appStore;

    return (
      <div style={{height: '100%', display: 'flex'}}>
        <div style={{flex: 1}}>
          <div style={{height: '3px',background: '#222'}}></div>
          <Router history={history}>
            <Switch>
              {
                routes.map((v: RouteData) => (
                  <Route
                    path={v.path}
                    key={v.name}
                    component={v.component}
                  />
                ))
              }
            </Switch>
          </Router>
          <Footer/>
        </div>
        <div className={`${styles['sidebar-container']} ${siderbarVisible ? styles['sidebar-showing'] : ''}`}>
          <SideBar/>
        </div>
        <Suspend/>
      </div>
    );
  }
}

export default connect((state: Qs) => {
  return {
    appStore: state.appStore
  }
})(App);
