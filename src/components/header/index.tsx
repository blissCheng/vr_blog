import React from 'react';
import { Link } from 'react-router-dom';
import { animateFlow } from '../../classes';
import config from '../../config/default';
const { tags, userModel } = config;
const styles = require('./index.less');
interface Props {
  
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
        <div className={`${styles['site-title-logo']} animate-flow`}>{userModel.name}</div>
        <p className={`${styles['site-subtitle']} animate-flow`}>{userModel.motto}</p>
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