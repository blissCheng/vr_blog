import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppStore from './redux/index.reducer';
//import AppActions from './app.actions';


const store = createStore(AppStore, applyMiddleware(thunk));
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
