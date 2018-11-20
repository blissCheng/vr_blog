import React from 'react';
import Header from '../../components/header';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const categories = require('../../compileResults/categories.json');
const styles = require('./index.less');

class Categories extends React.Component<RouteComponentProps> {

  goDetail(v: string) {
    const { history } = this.props;
    
    history.push({
      pathname: '/vr/categories/detail',
      state: {
        name: v
      }
    })
  }
  render() {
    const keys = Object.keys(categories);

    return (
      <div className={styles['categories-list']}>
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

export default withRouter(Categories as any);