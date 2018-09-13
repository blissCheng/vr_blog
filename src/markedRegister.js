/**
 * 将md文件编译成tsx
 * */
require('babel-polyfill');
const fs = require('fs');
const marked = require('marked');
const path = require('path');
const mdPath = path.join(__dirname, './marks');
const jsonPath = path.join(__dirname, './results.json');
class MarkedCompile {
  constructor() {
    this.buffs = [];
    this.files = [];
  }
  //读取文件夹下所有md文件
  readDirs(path, options) {
  
    this.files = fs.readdirSync(path, options);
  }
  //遍历读取md文件内容
  async readContent() {
    await this.readDirs(mdPath, {
      encoding: 'utf-8'
    });
    this.files.forEach((v) => {
      //将所有文件流存入数组
      let val = fs.readFileSync(`${mdPath}/${v}`, {
        encoding: 'utf8'
      });
      let data = marked(val);
      this.buffs.push(
        {
          name: v.split('.')[0].toUpperCase(),
          value: data
        }
      )
    });
  }
  async writeStreamToJson() {
    await this.readContent();

    const data = JSON.stringify(this.buffs, null, '\t');

    fs.writeFile(jsonPath, data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }

      console.log('md编译结果写入成功-----------')
    })
  }
  start() {
    this.writeStreamToJson()
  }
}
const lig = new MarkedCompile();
lig.start();