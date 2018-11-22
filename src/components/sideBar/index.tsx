import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';

import config from '../../config/default';
import { AppStore } from '../../app.reducer';

const styles = require('./index.less');

//获取全部文章
const ajaxGetPosts = () => 
  axios.post('/api/system/posts');

interface Props{
  dispatch: Dispatch,
  appStore: AppStore
}

interface State {
  posts: CompilerResult[]
}

class SideBar extends React.Component<Props> {

  state: State;

  constructor(props: Props) {
    super(props);
    
    this.state = {
      posts: []
    }
  }

  componentDidMount() {

    this.getPosts();

  }

  async getPosts() {
    const res = await ajaxGetPosts();
    this.setState({
      posts: res.data.data
    })
  }

  //通过category划分
  divideByCategory(src: CompilerResult[]) {

    let result = {};

    src.forEach((v: CompilerResult) => {

      if (!result[v.category]) {
        result[v.category] = []
      }

      result[v.category].push(v);
    });
    return result;
  }
  //通过tag划分
  divideByTag(src: CompilerResult[]) {

    let result = {};

    src.forEach((v: CompilerResult) => {

      let tags = v.tag.split(',');

      tags.forEach((i) => {

        if (!result[i]) {
          result[i] = []
        };

        result[i].push(v);
      })

    });

    return result;
  }

  render() {
    const { siderbarVisible } = this.props.appStore;
    const { posts } = this.state;
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
            <nav>
              <span className={styles['nav-item']}>
                <div>{ posts.length }</div>
                <div>posts</div>
              </span>
              <span className={styles['nav-item']}>
                <div>{ Object.keys(this.divideByCategory(posts)).length }</div>
                <div>categories</div>
              </span>
              <span className={styles['nav-item']}>
                <div>{ Object.keys(this.divideByTag(posts)).length }</div>
                <div>tags</div>
              </span>
            </nav>
            
            <div className={styles['link']}>
              {
                Object.keys(userModel.links).map((v: any) => (
                  <a href={userModel.links[v]} key={v}>
                    <i className={`iconfont icon-diqiu`}/>
                    {v}
                  </a>
                ))
              }
            </div>
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