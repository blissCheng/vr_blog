import React from 'react';
import styles from './index.less';
interface Props {
  dataSrc: CompilerResult
}
class HomeContent extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { dataSrc } = this.props;
    return (
      <article className={`animate-flow ${styles.articale}`}>
        <header className={styles['articale-header']}>
          <h1>
            <a className={styles['articale-header-title']}>{dataSrc.title}</a>
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
                  <span>
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
            <a>Readmore »</a>
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