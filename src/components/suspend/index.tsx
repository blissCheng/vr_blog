import React from 'react';
const styles = require('./index.less');
interface Props {
  
}
interface State {
  timer: any;
}
export default class Suspend extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      timer: null
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

  render() {
    return (
      <div className={styles['suspend']}>
        <div className={styles['sidebar-toggle']}>
          <div className={styles['line-wrap']}>
            <span className={`${styles['line']} ${styles['line-first']}`}></span>
            <span className={`${styles['line']} ${styles['line-middle']}`}></span>
            <span className={`${styles['line']} ${styles['line-last']}`}></span>
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