import * as React from 'react';
import * as styles from './index.less';
import Header from '../../components/header';
class Home extends React.Component{
  
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Header active='tag'/>
      </div>
    )
  }
}

export default Home;