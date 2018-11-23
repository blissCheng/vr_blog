//执行用户脚本，修改babelrc配置并编译marked

const path = require('path');
const process = require('process');
const child_process = require('child_process');

//npm 命令行参数
const NPMARGV = JSON.parse(process.env.npm_config_argv).cooked;
//用户服务地址
const ip = NPMARGV.length === 3 ? NPMARGV[2] : '127.0.0.1';

const { spawn }    = child_process;
const babelScript  = path.join(__dirname, './babelrcTransform.js');
const markedScript = path.join(__dirname, './markedRegister.js');

//执行babelrcTransform
console.log('开始转换babel, 目标es2015, stage-03');
const runBabelScriptStart = spawn('node', [ babelScript, '-b' ]);

runBabelScriptStart.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

runBabelScriptStart.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

runBabelScriptStart.on('close', (code) => {

  console.log(`babel初步转换已结束! \n 开始解析marked, 连接服务,目标服务： ${ip}`);
  runMarkedScript();
})

//执行markedRegister
const runMarkedScript= () => {

  const cp = spawn('babel-node', [ markedScript, ip ]);

  cp.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  cp.stderr.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  cp.on('close', (code) => {
    console.log(`mark解析已结束! \n 开始转化babel, 目标 react-app`);
    runBabelScriptEnd();
  })
}

//执行babelTransform

const runBabelScriptEnd = () => {
  const cp = spawn('node', [ babelScript ]);

  cp.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  cp.stderr.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  cp.on('close', (code) => {
    console.log(`用户脚本执行结束!`);
  })
}
