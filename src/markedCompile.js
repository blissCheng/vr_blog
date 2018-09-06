/**
 * 将md文件编译成tsx
 * */ 

const fs = require('fs');
const marked = require('marked');
const mdPath = './marks';
const tsxPath = './pages';

class MarkedCompile {
  constructor() {

  }
  //读取所有md文件
  readDirs(path, options) {
    let files;
    fs.readdirSync(path, options, (err, results) => {
      files = results;
    });

    return files;
  }
  
  //
  init() {

    //console.log(marked(a));
  }
}
new MarkedCompile().init();

