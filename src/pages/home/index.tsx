import * as React from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import * as styles from './index.less';
import Header from '../../components/header';
import HomeContent from '../../components/homeContent';
const results = require('../../results.json');
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
        <Header active='tag'/>
        <section>
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
// const mapDisatchToProps = (dispath: any) => {
//   return {
//     actions: bindActionCreators(Actions as any, dispath)
//   }
// }
export default connect((state: any) => {return {test: state.setTest}})(Home);