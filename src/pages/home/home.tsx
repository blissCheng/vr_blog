import * as React from 'react';
import axios from 'axios';

import { Header, HomeContent } from '../../components';
import { animateFlow } from '../../classes';

const styles = require('./index.less');
//获取全部文章
const ajaxGetPosts = () => 
  axios.post('/api/system/posts');

interface Props {
  dispatch: (creater: any) => void;
}

interface State {
  posts: CompilerResult[]
}

class Home extends React.Component<Props>{
  state: State
  constructor(props: Props) {
    super(props);
    this.state = {
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
      posts: res.data.data
    })
  }
  render() {
    const { posts } = this.state;
    return (
      <div className={styles.wrapper}>
        <Header/>
        <section style={{
          paddingTop: '40px'
        }}>
          {
            posts.map((v: CompilerResult) => (
              <HomeContent dataSrc={v} key={v.name}/>
            ))
          }
        </section>
      </div>
    )
  }
}

export default Home;