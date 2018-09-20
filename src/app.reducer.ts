
import { combineReducers } from 'redux';
const initState: string = '';
export class AppReducer{
  setTest = (state: string = initState, action: any): string => {
    switch ( action.type) {
      case 'TEST':
        return action.text;
      default:
        return state;
    }
  }
}

export default combineReducers(new AppReducer());