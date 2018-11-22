import React from 'react';
import { Link } from 'react-router-dom';

const styles = require('./index.less');

interface Props {
  dataSrc: CompilerResult;
}

class HomeContent extends React.Component<Props>{
  
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { dataSrc } = this.props;
    return (
      <article className={`animate-flow ${styles.articale}`}>
        <header className={styles['articale-header']}>
          <h1>
            <Link 
              to={`/vr/article/detail/${this.props.dataSrc.id}`}
              className={styles['articale-header-title']}
            >{dataSrc.title}</Link>
          </h1>
          <div className={styles['title-meta']}>
            <span>Posted on <time>{dataSrc.time}</time></span>
            <span>&nbsp; | &nbsp; In <a>{dataSrc.tag}</a></span>
            <span>&nbsp; | &nbsp;{dataSrc.pv} views</span>
          </div>
        </header>
        <div className={styles['articale-body']}>
          <div>
            {
              dataSrc.introduce.split('\n').map((v: string, index: number) => {
                return (
                  <span key={index}>
                    {v}
                    {
                      index !== dataSrc.introduce.split('\n').length ? <br/> : null
                    }
                  </span>
                )
              })
            }
          </div>
          <div className={styles.readmore}>
            <Link 
              to={`/vr/article/detail/${this.props.dataSrc.id}`}
            >Readmore »</Link>
          </div>
        </div>
        <footer>
          <div className={styles['articale-footer']}></div>
        </footer>
      </article>
    )
  }
}

export default HomeContent;