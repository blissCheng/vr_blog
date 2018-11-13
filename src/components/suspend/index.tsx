import React from 'react';
import $ from 'jquery';
const styles = require('./index.less');
interface Props {
  
}
interface State {
  timer: any;
  isArrow: Boolean;
  isClose: Boolean;
}
export default class Suspend extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      timer: null,
      isArrow: false,
      isClose: false
    }
  }
  componentDidMount() {
    
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
    if (this.state.isArrow) {
      this.toggleLeave();
      $('#line-first').addClass('sidebar-toggle-line-close-first');
      $('#line-last').addClass('sidebar-toggle-line-close-last');
      $('#line-middle').css({'display': 'none'});
      this.setState({
        isArrow: false,
        isClose: true
      });
    } else if (this.state.isClose) {
      this.toggleHover();
      $('#line-first').removeClass('sidebar-toggle-line-close-first');
      $('#line-last').removeClass('sidebar-toggle-line-close-last');
      $('#line-middle').css({'display': 'inline-block'});
      this.setState({
        isClose: false
      });
    }
  }
  render() {
    return (
      <div className={styles['suspend']}>
        <div 
          className={styles['sidebar-toggle']} 
          id='sidebar-toggle'
          onMouseOver={() => {
            this.toggleHover();
          }}
          onMouseLeave={() => {
            this.toggleLeave();
          }}
          onClick={() => {
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