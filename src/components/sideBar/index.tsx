import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppActions } from '../../redux/index.actions';
import { AppStore } from '../../redux/index.reducer';
//const styles = require('./index.less');
interface Props{
  dispatch: Dispatch,
  appStore: AppStore
}

class SideBar extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    const { setVisible }  = AppActions
    console.log(this.props);
    console.log(setVisible);

  }
  render() {
    return (
      <aside id='sidebar'>

      </aside>
    )
  }
}

export default connect((state: any) => {
  console.log(state);
  return {
    appStore: state.appStore
  }
})(SideBar);