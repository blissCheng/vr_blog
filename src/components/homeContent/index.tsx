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
      <article className={`animate-flow`}>
        <header>
          <h1>
            <a className={styles['artical-header-title']}>{dataSrc.title}</a>
          </h1>
          <div>
            <span>Posted on{dataSrc.time}</span>
            <span>&nbsp; | &nbsp; In <a>{dataSrc.tag}</a></span>
          </div>
        </header>
      </article>
    )
  }
}

export default HomeContent;