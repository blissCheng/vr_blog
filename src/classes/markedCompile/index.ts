/**
 * 将md文件编译成tsx
 * */ 

import config from '../config';
import fs from 'fs';
const marked = require('marked');
const mdPath = './marks';
class MarkedCompile {
  private buffs: any[];
  private files: string[];

  //读取文件夹下所有md文件
  readDirs = (path: string, options: any) => {

    this.files = fs.readdirSync(path, options);
  }

  //遍历读取md文件内容
  readContent = async () => {
    await this.readDirs(mdPath, {
      encoding: 'utf-8'
    });
    this.files.forEach((v: string) => {
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

  start = async () => {
    await this.readContent();

    config.setVal('coPage', this.buffs);

    console.log(config.getCoPage());
  }
}
const lig = new MarkedCompile();
lig.start();

