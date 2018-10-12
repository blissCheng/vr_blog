import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import $ from 'jquery';
import styles from './index.less';
const articles = require('../../results.json');

interface State {
  articleIndex: number //文章索引
}
interface Props extends RouteComponentProps {
  
}
class Article extends React.Component<Props>{
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      articleIndex: 0
    }
  }
  async componentDidMount() {
    await this.parseUrl();
    $('#article_content').append(
      articles[this.state.articleIndex].content
    )
  }
  //解析url参数
  parseUrl() {
    const dirs = this.props.location.pathname.split('/');
    this.setState({
      articleIndex: dirs[dirs.length - 1]
    });
  }

  //
  render() {
    return(
      <div id="article_content" className={styles['content-container']}></div>
    )
  }
}

export default withRouter(Article as any);