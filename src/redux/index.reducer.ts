import { combineReducers } from 'redux';
import appStore, { AppStore } from './app/app.reducer';
export {
  AppStore
};
export default combineReducers({
  appStore
});