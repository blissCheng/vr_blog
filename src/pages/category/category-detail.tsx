import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';

import { Header } from '../../components';
import { animateFlow } from '../../classes';

const styles = require('./index.less');

//接口
const ajaxGetCategory = (params: Qs) =>
  axios.post('/api/system/posts', params);

interface State {
  src: CompilerResult[]
}

class CategoryDetail extends React.Component<RouteComponentProps> {
  state: State;
  constructor(props: RouteComponentProps){
    super(props);
    this.state = {
      src: []
    }
  }
  async componentDidMount() {
    await this.getCategory({
      type: 1
    });

    animateFlow.start();
  }
  async getCategory(params: Qs) {
    const res = await ajaxGetCategory(params);
    this.setState({
      src: res.data.data[this.props.location.state.name]
    });
  }
  render() {

    const { src } = this.state;
    return (
      <div>
        <Header/>
        <div className={styles['category-detail']}>
          <header className={'animate-flow'}>{ this.props.location.state.name } <span style={{fontSize: '17px'}}>Category</span></header>
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

export default withRouter(CategoryDetail as any);