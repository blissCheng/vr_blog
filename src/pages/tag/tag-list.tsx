import React from 'react';
import Header from '../../components/header';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const tags = require('../../compileResults/tags.json');
const styles = require('./index.less');

class TagList extends React.Component<RouteComponentProps> {
  keys: string[]
  constructor(props: RouteComponentProps) {
    super(props);
    this.keys = Object.keys(tags);
  }
  goDetail(v: string) {
    const { history } = this.props;
    
    history.push({
      pathname: '/vr/tags/detail',
      state: {
        name: v
      }
    })
  }
  //随机字体风格
  randomFontStyle(index: number) {
    const len = this.keys.length;
    let ran1 = Math.ceil(Math.random() * len / index),
      ran2= Math.ceil(Math.random() * len),
      ran3 = Math.ceil(Math.random() * 3);
    
      let num: number = 0;

    if (ran1 >= ran2) {
      num = ran3;
    }

    return `item-${num}`;
  }
  render() {

    return (
      <div className={styles['tag-list']}>
        <Header/>
        <section className={styles.section}>
          <header className={'animate-flow'}>{ this.keys.length } tags in total</header>
          <div className={`animate-flow ${styles.group}`}>
            {
              this.keys.map((v: string, index: number) => (
                <span 
                  key={v} 
                  className={`${styles.item} ${styles[this.randomFontStyle(index)]}`}
                  onClick={() => {
                    this.goDetail(v);
                  }}
                >{v}</span>
              ))
            }
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(TagList as any);