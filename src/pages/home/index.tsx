import * as React from 'react';
import * as styles from './index.less';
import Header from '../../components/header';
import { AppReducer } from '../../app.reducer';
interface Props {
  appStore: AppReducer;
}
class Home extends React.Component<Props>{
  appStore: AppReducer;
  constructor(props: Props) {
    super(props);
    this.appStore = props.appStore;
  }
  componentDidMount() {
    console.log(this.props)
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