import React from 'react';
import config from '../../config';
import { Link } from 'react-router-dom';
import { animateFlow } from '../../classes';
const { tags } = config;
const styles = require('./index.less');
interface Props {
  active: string;
}
export default class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    animateFlow.start();    
  }
  render() {
    return (
      <div className={`${styles['site-meta']}`}>
        <div className={`${styles['site-title-logo']} animate-flow`}>bliss Cheng</div>
        <p className={`${styles['site-subtitle']} animate-flow`}>Life is now</p>
        <ul className={`${styles.ul} animate-flow`}>
          {
            tags.map((v: Tag) => (
              <li key={v.name}>
                <Link to={v.to} className={styles.li}>
                  <i className={`iconfont icon-${v.icon}`}/>
                  <div>{v.name}</div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}