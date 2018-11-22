import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { Header } from '../../components';
import { animateFlow } from '../../classes';

const styles = require('./index.less');
//接口
const ajaxGetCategory = (params: Qs) =>
  axios.post('/api/system/posts', params);

interface State {
  categories: DividePost
}

class CategoryList extends React.Component<RouteComponentProps> {
  state: State;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      categories: {}
    }
  }

  async componentDidMount() {
    await this.getCategory({
      type: 1
    });
    animateFlow.start();
  }
  goDetail(v: string) {
    const { history } = this.props;
    
    history.push({
      pathname: '/vr/categories/detail',
      state: {
        name: v
      }
    })
  }
  async getCategory(params: Qs) {
    const res = await ajaxGetCategory(params);
    this.setState({
      categories: res.data.data
    });
  }
  render() {
    const keys = Object.keys(this.state.categories);

    return (
      <div className={styles['category-list']}>
        <Header/>
        <section className={styles.section}>
          <header className={'animate-flow'}>{ keys.length } categories in total</header>
          <div className={`animate-flow ${styles.group}`}>
            {
              keys.map((v: string) => (
                <span 
                  key={v} 
                  className={styles.item}
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

export default withRouter(CategoryList as any);