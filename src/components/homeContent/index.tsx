import React from 'react';
import styles from './index.less';
import { Link } from 'react-router-dom';
interface Props {
  dataSrc: CompilerResult;
  index: number
}
class HomeContent extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    
  }

  render() {
    const { dataSrc } = this.props;
    return (
      <article className={`animate-flow ${styles.articale}`}>
        <header className={styles['articale-header']}>
          <h1>
            <Link 
              to={`/vr/article/detail/${this.props.index}`}
              className={styles['articale-header-title']}
            >{dataSrc.title}</Link>
          </h1>
          <div className={styles['title-meta']}>
            <span>Posted on <time>{dataSrc.time}</time></span>
            <span>&nbsp; | &nbsp; In <a>{dataSrc.tag}</a></span>
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
              to={`/vr/article/detail/${this.props.index}`}
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