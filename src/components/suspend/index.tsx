import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import AppAction from '../../app.action';

const styles = require('./index.less');

interface Props {
  dispatch: Dispatch
}

interface State {
  timer: any;
  isArrow: Boolean;
  isClose: Boolean;
}

class Suspend extends React.Component<Props> {

  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      timer: null,
      isArrow: false,
      isClose: false
    }
  }

  backToTop() {
    //cancelAnimationFrame(this.state.timer);
    const fn = () => {
      const oTop = document.body.scrollTop || document.documentElement.scrollTop;

      if (oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
        this.setState({
          timer: requestAnimationFrame(fn)
        })
      } else {
        cancelAnimationFrame(this.state.timer);
      }
    }
    this.setState({
      timer: requestAnimationFrame(fn)
    });
  }

  toggleHover() {
    if (!this.state.isArrow && !this.state.isClose) {
      $('#line-first').addClass('sidebar-toggle-line-rotate-first');
      $('#line-last').addClass('sidebar-toggle-line-rotate-last');
      this.setState({
        isArrow: true
      });
    }
  }
  toggleLeave() {
    if (this.state.isArrow) {
      $('#line-first').removeClass('sidebar-toggle-line-rotate-first');
      $('#line-last').removeClass('sidebar-toggle-line-rotate-last');

      this.setState({
        isArrow: false
      })
    }
  }
  toggleClick() {
    const { setVisible } = AppAction;
    const { dispatch } = this.props;
    if (!this.state.isClose) {
      this.toggleLeave();
      $('#line-first').addClass('sidebar-toggle-line-close-first');
      $('#line-last').addClass('sidebar-toggle-line-close-last');
      $('#line-middle').css({'display': 'none'});
      this.setState({
        isArrow: false,
        isClose: true
      });
      dispatch(setVisible(true));
    } else if (this.state.isClose) {
      $('#line-first').removeClass('sidebar-toggle-line-close-first');
      $('#line-last').removeClass('sidebar-toggle-line-close-last');
      $('#line-middle').css({'display': 'inline-block'});
      this.setState({
        isClose: false
      });
      dispatch(setVisible(false));
    }
  }
  render() {
    return (
      <div className={styles['suspend']}>
        <div 
          className={styles['sidebar-toggle']} 
          id='sidebar-toggle'
          onMouseMove={() => {
            this.toggleHover();
          }}
          onMouseLeave={() => {
            this.toggleLeave();
          }}
          onClick={(e) => {
            e.stopPropagation();
            this.toggleClick();
          }}
        >
          <div className={styles['line-wrap']}>
            <span className={`${styles['line']} ${styles['line-first']}`} id='line-first'></span>
            <span className={`${styles['line']} ${styles['line-middle']}`} id='line-middle'></span>
            <span className={`${styles['line']} ${styles['line-last']}`} id='line-last'></span>
          </div>
        </div>
        <div 
          className={`${styles['back-to-top']}`}
          onClick={() => {
            this.backToTop();
          }}
        >
          <i className={`iconfont icon-jiantou`}/>
        </div>
      </div>
    )
  }
}

export default connect((state: Qs) => {
  return {
    appStore: state.appStore
  }
})(Suspend);