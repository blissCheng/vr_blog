//编译markedRegister脚本需要babel es2015以及stage-3
//而整个项目编译使用babel react-app，存在冲突
const fs = require('fs');
const process = require('process');
const path = require('path');

const handleFile = path.join(__dirname, './../../.babelrc');
const pref = process.argv[ process.argv.length - 1 ]; //命令行参数

class Transform {
  content() {
    let data = {
      presets: []
    };
    pref === '-b' ? data.presets = ['es2015', 'stage-3'] : data.presets = ['react-app'];

    return data;
  }

  writeStreamToBabelrc() {
    
    const data = JSON.stringify(this.content(), null, '\t');

    fs.writeFile(handleFile, data, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
      console.log('babel配置转换成功, 转换结果: ' + JSON.stringify(data))
    })
  }
}
new Transform().writeStreamToBabelrc()
