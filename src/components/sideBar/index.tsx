import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// import { AppActions } from '../../redux/index.actions';
import { AppStore } from '../../app.reducer';
const styles = require('./index.less');
interface Props{
  dispatch: Dispatch,
  appStore: AppStore
}

class SideBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    
  }
  render() {
    const { siderbarVisible } = this.props.appStore;
    return (
      <aside id='sidebar' className={siderbarVisible ? styles.sidebar : ''}>

      </aside>
    )
  }
}

export default connect((state: any) => {
  return {
    appStore: state.appStore
  }
})(SideBar);