import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Header from '../../components/header';

const categories = require('../../compileResults/categories.json');
const styles = require('./index.less');

class CategoryDetail extends React.Component<RouteComponentProps> {
  src: CompilerResult[];
  constructor(props: RouteComponentProps){
    super(props);
    this.src = categories[this.props.location.state.name];
  }
  render() {
    return (
      <div>
        <Header/>
        <div className={styles['category-detail']}>
          <header className={'animate-flow'}>{ this.props.location.state.name } <span style={{fontSize: '17px'}}>Category</span></header>
          <ul>
            {
              this.src.map((v: CompilerResult) => (
                <li key={v.index} className={'animate-flow'}>
                  <Link to={`/vr/article/detail/${v.index}`}>
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