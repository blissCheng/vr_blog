/**
 * 将md文件编译成tsx
 * */
require('babel-polyfill');
const fs = require('fs');
const marked = require('marked');
const path = require('path');
const mdPath = path.join(__dirname, './marks');
const jsonPath = path.join(__dirname, './results.json');

//取p标签中的值
const extractCenter = /<p.*?>\{([\s\S]*)\}<\/p>/;
//取p标签之后的值
const extractAfter = /\}<\/p>\n([\s\S]*)/;
//取所有类型的标签里的内容
const extractSome = /<.*?>([\s\S]*)<\/.*?>/;
//排除字符
const removeStr = /\s+/g;

class MarkedCompile {
  constructor() {
    this.buffs = [];
    this.files = [];
  }
  //读取文件夹下所有md文件
  readDirs(path, options) {
  
    this.files = fs.readdirSync(path, options);
  }

  //解析html字符串信息
  analysisInfo(data) {
    let text = data.match(extractCenter)[1].replace(removeStr, ""),
        strs = text.split(';'),
        attr = {};
    console.log(text);
    //提取标题及标签等信息
    strs.map(v => {
      if (v) {
        let str = v.split(':');
        attr[str[0]] = str[1];
      }
    });

    //剔除首个p标签
    attr.content = data.match(extractAfter)[1]

    console.log(attr);
    return {
      ...attr,
      ...{}
    }
  }

  //提取n个左右字符
  extract(src, n) {
    
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
      this.analysisInfo(data);
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