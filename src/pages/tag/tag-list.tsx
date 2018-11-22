import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { Header } from '../../components';
import { animateFlow } from '../../classes';

const styles = require('./index.less');

//接口
const ajaxGetTags = (params: Qs) =>
  axios.post('/api/system/posts', params);

interface State {
  tags: DividePost;
}

class TagList extends React.Component<RouteComponentProps> {
  state: State;
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      tags: {}
    }
  }
  async componentDidMount() {
    await this.getTags({
      type: 2
    });
    animateFlow.start();
  }
  async getTags(params: Qs) {
    const res = await ajaxGetTags(params);
    this.setState({
      tags: res.data.data
    });
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
    const keys = Object.keys(this.state.tags);
    const len = keys.length;
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

    const keys = Object.keys(this.state.tags);

    return (
      <div className={styles['tag-list']}>
        <Header/>
        <section className={styles.section}>
          <header className={'animate-flow'}>{ keys.length } tags in total</header>
          <div className={`animate-flow ${styles.group}`}>
            {
              keys.map((v: string, index: number) => (
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