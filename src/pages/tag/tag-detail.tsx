import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';

import { Header } from '../../components';
import { animateFlow } from '../../classes';

const styles = require('./index.less');
//接口
const ajaxGetTags = (params: Qs) =>
  axios.post('/api/system/posts', params);

interface State {
  src: CompilerResult[]
}
class TagDetail extends React.Component<RouteComponentProps> {
  state: State;
  constructor(props: RouteComponentProps){
    super(props);
    this.state = {
      src: []
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
      src: res.data.data[this.props.location.state.name]
    });
  }
  render() {
    const { src } = this.state;
    return (
      <div>
        <Header/>
        <div className={styles['tag-detail']}>
          <header className={'animate-flow'}>{ this.props.location.state.name } <span>Tag</span></header>
          <ul>
            {
              src.map((v: CompilerResult) => (
                <li key={v.id} className={'animate-flow'}>
                  <Link to={`/vr/article/detail/${v.id}`}>
                    {`${v.time} ${v.title}`}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(TagDetail as any);