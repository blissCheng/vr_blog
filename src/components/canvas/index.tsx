import React from 'react';
const styles = require('./index.less');
class HomeCanvas extends React.Component {
  canvas: any
  ctx: any
  componentDidMount() {
    this.canvas = document.getElementById('hj');
    this.ctx = this.canvas.getContext('2d');
    this.init();
  }
  init() {
    this.addHJ();
  }
  addHJ() {
    let img = new Image();
    img.src = require('../../asset/images/huaji.jpg');
    img.onload = () => {
      this.ctx.drawImage(img, 10, 10, 150, 100);
    }
  }
  drawRain() {
    //const { ctx } = this;
    
  }
  render() {
    return (
      <canvas 
        className={styles.canvas}
        id='hj'
        width='1000' 
        height='1000'
      >
        您的浏览器过于古老，请更换或升级浏览器！
      </canvas>
    )
  }
}

export default HomeCanvas;