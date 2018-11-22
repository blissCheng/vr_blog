import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

import { Header } from '../../components';
import { animateFlow } from '../../classes';

const styles = require('./index.less')
//获取全部文章
const ajaxGetPostByPost = (id: number) => 
  axios.get(`/api/system/posts/${id}`);

interface State {
  id: number, //文章索引\
  article: any;
}

class Article extends React.Component<RouteComponentProps>{
  state: State;
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: 0,
      article: null
    }
  }
  async componentDidMount() {
    await this.parseUrl();
    await this.getPostById(this.state.id);
    $('#article_content').append(
      this.state.article.content
    );

    animateFlow.start();
  }
  //解析url参数
  parseUrl() {
    const dirs = this.props.location.pathname.split('/');
    this.setState({
      id: dirs[dirs.length - 1],
    });
  }
  //根据id查找文章
  async getPostById(id: number) {
    const res = await ajaxGetPostByPost(id);
    await this.setState({
      article: res.data.data
    });
  }
  //
  render() {
    const { article } = this.state;
    return(
      <div>
        <Header/>
        {
          article ? (
            <div id="article_content" className={`animate-flow ${styles['content-container']}`}>
              <header className={styles['articale-header']}>
                <h1 className={styles['articale-header-title']}>
                  {article.title}
                </h1>
                <div className={styles['title-meta']}>
                  <span>Posted on <time>{article.time}</time></span>
                  <span>&nbsp; | &nbsp; In <a>{article.tag}</a></span>
                  <span>&nbsp; | &nbsp;{article.pv} views</span>
                </div>
              </header>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default withRouter(Article as any);