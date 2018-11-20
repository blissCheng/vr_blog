import * as React from 'react';
import * as styles from './index.less';
import Header from '../../components/header';
import HomeContent from '../../components/homeContent';
const results = require('../../compileResults/results.json');
interface Props {
  dispatch: (creater: any) => void;
  test: string;
}
class Home extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header/>
        <section style={{
          paddingTop: '40px'
        }}>
          {
            results.map((v: CompilerResult) => (
              <HomeContent dataSrc={v} key={v.name}/>
            ))
          }
        </section>
      </div>
    )
  }
}

export default Home;