import * as React from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import * as styles from './index.less';
import Header from '../../components/header';
import Actions from '../../app.actions';
interface Props {
  dispatch: (creater: any) => void;
  test: string;
}
class Home extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(Actions.test('cc'));
    console.log(this);
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Header active='tag'/>
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