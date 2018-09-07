/**
 * 将md文件编译成tsx
 * */ 

const fs = require('fs');
const marked = require('marked');
const mdPath = './marks';
const tsxPath = './pages';

class MarkedCompile {
  constructor() {
    this.buffs = [];
    this.files = [];
  }
  //读取文件夹下所有md文件
  readDirs(path, options) {
    let files;

    this.files = fs.readdirSync(path, options);
  }

  //遍历读取md文件内容
  async readContent() {
    await this.readDirs(mdPath, {
      encoding: 'utf-8'
    });
    this.files.forEach(v => {
      //将所有文件流存入数组
      let val = fs.readFileSync(`${mdPath}/${v}`, {
        encoding: 'utf8'
      });

      this.buffs.push(
        {
          name: v.split('.')[0].toUpperCase(),
          value: marked(val)
        }
      )
    });
  }
}
new MarkedCompile().readContent();

