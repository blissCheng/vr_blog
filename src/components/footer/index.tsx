import React from 'react';
import config from '../../config/default';

const styles = require('./index.less')

class Footer extends React.Component{ 

  render() {
    return(
      <footer className={styles.footer}>
        <p>&copy; 2018 In {config.userModel.name}</p>
      </footer>
    )
  }
}

export default Footer;