import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// import { AppActions } from '../../redux/index.actions';
import { AppStore } from '../../app.reducer';
import config from '../../config/default';
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
    const { userModel } = config;
    return (
      <aside id='sidebar' className={`${styles.sidebar} ${siderbarVisible ? styles['sidebar-showing'] : ''}`}>
        <div className={styles['sidebar-inner']}>
          <section className={styles['section']}>
            <div className={styles.header}>
              <img src={require(`../../asset/images/${userModel.avator}`)}/>
              <p>{ userModel.name }</p>
            </div>
            <div className={styles['motto']}>{ userModel.motto }</div>
          </section>
        </div>
      </aside>
    )
  }
}

export default connect((state: Qs) => {
  return {
    appStore: state.appStore
  }
})(SideBar);