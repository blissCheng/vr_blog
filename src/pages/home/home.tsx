import * as React from 'react';
import * as styles from './index.less';
import Header from '../../components/header';
import HomeContent from '../../components/homeContent';
import axios from 'axios';

//获取全部文章
const ajaxGetPosts = () => 
  axios.post('/api/system/posts');

interface Props {
  dispatch: (creater: any) => void;
  test: string;
}
interface State {
  results: CompilerResult[]
}
class Home extends React.Component<Props>{
  state: State
  constructor(props: Props) {
    super(props);
    this.state = {
      results: []
    }
  }
  
  componentDidMount() {
    this.getPosts();
    
  }
  async getPosts() {
    const res = await ajaxGetPosts();
    this.setState({
      results: res.data.data
    })
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Header/>
        <section style={{
          paddingTop: '40px'
        }}>
          {
            this.state.results.map((v: CompilerResult) => (
              <HomeContent dataSrc={v} key={v.name}/>
            ))
          }
        </section>
      </div>
    )
  }
}

export default Home;