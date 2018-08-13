import React from 'react';
import config from '../../config';
import { Link } from 'react-router-dom';
const { tags } = config;
const styles = require('./index.less');
interface Props {
  active: string;
}
export default class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['header']}>
        <button>bliss Cheng</button>
        <p>Life is now</p>
        <ul>
          {
            tags.map((v: Tag) => (
              <li>
                <Link to={v.to}>
                  <i className={`iconfont icon-${v.icon}`}/>
                  <span>{v.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}