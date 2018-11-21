import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Header from '../../components/header';
import { time } from '../../classes';
const results = require('../../compileResults/results.json');

const styles = require('./index.less');

interface Src {
  [key: string]: CompilerResult[]
}
class Archive extends React.Component<RouteComponentProps> {
  src: Src;
  constructor(props: RouteComponentProps){
    super(props);
    this.src = time.divide(results, 'time');
  }
  render() {
    const list = (time: string) => {
      return (
        <>
          {
            this.src[time].map((v: CompilerResult) => (
              <li key={v.index} className={'animate-flow'}>
                <Link to={`/vr/article/detail/${v.index}`}>
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
          <header className={'animate-flow'}>OK! { results.length } posts in total. Keep on posting.</header>
          {
            Object.keys(this.src).map((v: string) => (
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