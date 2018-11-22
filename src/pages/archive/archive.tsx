import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
//component and service
import { Header } from '../../components';
import { time, animateFlow } from '../../classes';

const styles = require('./index.less');

//获取全部文章
const ajaxGetPosts = () => 
  axios.post('/api/system/posts');

interface State {
  src: DividePost;
  posts: CompilerResult[]
}

class Archive extends React.Component<RouteComponentProps> {

  state: State

  constructor(props: RouteComponentProps){
    super(props);
    this.state = {
      src: {},
      posts: []
    }
  }

  async componentDidMount() {
    await this.getPosts();
    animateFlow.start();
  }

  async getPosts() {
    const res = await ajaxGetPosts();
    this.setState({
      posts: res.data.data,
      src: time.divide(res.data.data, 'time')
    })
  }

  render() {

    const { posts, src } = this.state;

    const list = (time: string) => {
      return (
        <>
          {
            src[time].map((v: CompilerResult) => (
              <li key={v.id} className={'animate-flow'}>
                <Link to={`/vr/article/detail/${v.id}`}>
                  {`${v.time} ${v.title}`}
                </Link>
              </li>
            ))
          }
        </>
      )
    };

    return (
      <div>
        <Header/>
        <div className={styles['archive']}>
          <header className={'animate-flow'}>OK! { posts.length } posts in total. Keep on posting.</header>
          {
            Object.keys(src).map((v: string) => (
              <ul key={v}>
                <li className={`animate-flow ${styles['year']}`}>{v}</li>
                { list(v) }
              </ul>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Archive as any);