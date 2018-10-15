import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import $ from 'jquery';
import styles from './index.less';
import { animateFlow } from '../../classes';
import Header from '../../components/header';
const articles = require('../../results.json');

interface State {
  articleIndex: number, //文章索引\
  article: any;
}
interface Props extends RouteComponentProps {
  
}
class Article extends React.Component<Props>{
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      articleIndex: 0,
      article: {}
    }
  }
  async componentDidMount() {
    animateFlow.start();
    await this.parseUrl();

    $('#article_content').append(
      this.state.article.content
    )
  }
  //解析url参数
  parseUrl() {
    const dirs = this.props.location.pathname.split('/');
    this.setState({
      articleIndex: dirs[dirs.length - 1],
      article: articles[dirs[dirs.length -1]]
    });
  }
  //
  render() {
    const { article } = this.state;
    return(
      <div>
        <Header/>
        <div id="article_content" className={`animate-flow ${styles['content-container']}`}>
          <header className={styles['articale-header']}>
            <h1 className={styles['articale-header-title']}>
              {article.title}
            </h1>
            <div className={styles['title-meta']}>
              <span>Posted on <time>{article.time}</time></span>
              <span>&nbsp; | &nbsp; In <a>{article.tag}</a></span>
            </div>
          </header>
        </div>
      </div>
    )
  }
}

export default withRouter(Article as any);