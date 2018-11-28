{
	title: 关于使用npm run scripts与babel-node启动脚本时表现不一致的情况分析;
	time: 2018-11-27;
	tag: JavaScript, node, babel;
	category: 技术;
}

这两天在写这篇博客的启动脚本时，使用到了[babel-node](https://www.npmjs.com/package/babel-node) + [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill/)在node环境中运行ES6+语法，遇到了一个很有意思的问题，最终还是没能搞清楚原因，写此博客记录一下。

这个问题实际上对项目运行并没有什么影响，可是确实实在在的存在。

如下例子

我们首先有个在node环境中运行的脚本 ```test.js```

```
require('babel-polyfill');
console.log('this is a test script')
```

在```package.json```里面添加一组npm启动命令

```
scripts: {
	"test": "babel-node test.js"
}
```

接下来我们分别使用```npm run test``` 与 ```babel-node test.js```启动脚本：

```
npm run test //this is a test script
 
> vr_blog@0.1.0 test1 /Users/apsun/Applications/vr_blog
> babel-node test.js

```

```
babel-node test.js
	
/Users/apsun/Applications/vr_blog/node_modules/babel-polyfill/lib/index.js:10
  throw new Error("only one instance of babel-polyfill is allowed");
  ^

Error: only one instance of babel-polyfill is allowed
	at Object.<anonymous> (/Users/apsun/Applications/vr_blog/node_modules/babel-polyfill/lib/index.js:10:9)
	at Module._compile (module.js:649:30)
	at Module._extensions..js (module.js:660:10)
	at Object.require.extensions.(anonymous function) [as .js] (/usr/local/lib/node_modules/babel-cli/node_modules/babel-register/lib/node.js:152:7)
	at Module.load (module.js:561:32)
	at tryModuleLoad (module.js:501:12)
	at Function.Module._load (module.js:493:3)
	at Module.require (module.js:593:17)
	at require (internal/module.js:11:18)
	at Object.<anonymous> (/Users/apsun/Applications/vr_blog/test.js:2:1)
```

从上面可以看到，同样是启动一个```test.js```脚本， 使用npm与babel-node的表现截然不同。 上面一个报错的意思是只允许存在一个```babel-polyfill```实例，然后我查看了一下```babel-polyfill```的源码，看一下在什么情况下会报这个错误：

```
if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;
```

发现，原来它会在被加载的时候在global上挂载一个 ```_babelPolyfill```属性。 既然这样，我们可以打印一下这个属性，看看在使用不同命令启动的时候是否存在差异

```
test.js
	//reuqire('babel-polyfill')；
	console.log(global._babelPolyfill); 
	
npm run test
  print: true;

babel-node test.js
  print: true;
```

使用```npm run test```与```babel-node```同样都打印出了true，说明```babel-polyfill```在某个黑盒环境被加载过了,而npm却忽略了这个错误, 那我们就要来看看npm run时发生了什么？

首先我们在安装一个package的时候，会把它安装在当前项目的```node_moduels```里面。其次， 在```./node_modules/.bin```文件夹下自动生成一个符号链接 ```./node_modules/.bin/babel-node```，指向它的可执行脚本。具体参考阮一峰老师的[JavaScript标准参考教程](http://javascript.ruanyifeng.com/nodejs/npm.html#toc14)

```
node_modules
	.bin
		babel-node
		
		#!/usr/bin/env node
		require("../lib/babel-node");
```

当我们在```npm run test```的时候，它会自动执行 ```./node_modules/.bin/../lib/babel-node test.js```。 问题进行到这里所体现出来的这两种执行方式所表现出来的唯一差别就是，```npm run test```使用的是局部命令，而```babel-node```使用的是全局命令， 接下来我开始查看局部的babel-node源码，是随babel-cli安装的，所以找到```./node_modules/babel-cli/lib```, 我们主要看下面两个文件

```
_babel-node.js
babel-node.js
```

**babel-node.js** 只有短短的80几行代码, 通过打印，确定程序走到了下面代码中的catch里面， 开启了一个子进程

```
try {
    var kexec = require("kexec");
    kexec(process.argv[0], args);
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") throw err;
    var child_process = require("child_process");
    var proc = child_process.spawn(process.argv[0], {stdio: 'inherit'});
	//以下是我自己添加的代码
	console.log(argv[0]);
	console.log(args);
	//
    proc.on("exit", function (code, signal) {
      process.on("exit", function () {
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exit(code);
        }
      });
    });
  }
```

我在上面添加了两个console.log,用于确定这个脚本开启了一个什么样的子进程。下面我们执行 ```npm run test```,打印结果如下：

```
/usr/local/bin/node    //argv[0]

[ '/Users/apsun/Applications/vr_blog/node_modules/babel-cli/lib/_babel-node',
  'test.js' ]      //args
```

所以开启的这个子进程为```node /Users/.../babel-cli/lib/_babel-node test.js```, 也就说说最终使用node开启了 _babel-node 这个服务。OK, 接下来查看**_babel-node.js**，这部分代码同样不长

```
...
...
var _vm = require("vm");

var _vm2 = _interopRequireDefault(_vm);

console.log(global._babelPolyfill)  //undefined

require("babel-polyfill"); //确认发现在这个脚本里发现有一个babel-polyfill实例

console.log(global._babelPolyfill)  //true


var _babelRegister = require("babel-register");
```

发现在**_babel-node.js**里面已经有一个```babel-polyfill```实例， 并且定位到程序走到了以下代码里

```
if (program.args.length) {
    var args = process.argv.slice(2);

    var i = 0;
    var ignoreNext = false;
    args.some(function (arg, i2) {
      if (ignoreNext) {
        ignoreNext = false;
        return;
      }

      if (arg[0] === "-") {
        var parsedArg = program[arg.slice(2)];
        if (parsedArg && parsedArg !== true) {
          ignoreNext = true;
        }
      } else {
        i = i2;
        return true;
      }
    });
    args = args.slice(i);

    var filename = args[0];

    if (!(0, _pathIsAbsolute2.default)(filename)) args[0] = _path2.default.join(process.cwd(), filename);

    process.argv = ["node"].concat(args);

    process.execArgv.unshift(__filename);
    
    console.log(process.argv) //执行结果[ 'node', '/Users/apsun/Applications/vr_blog/test.js' ]
	//此时依然为true
	console.log(global._babelPolyfill)  //true

    _module3.default.runMain();
    
    //此时依然为true
	console.log(global._babelPolyfill)  //true
  } else {
    replStart();
  }
```

这这段代码末尾打印一下```process.argv```，发现最终进程参数变为了如上所示，最后一句```_module3.default.runMain()```	的意思需要参照一下node的源码部分([参考](https://segmentfault.com/a/1190000010858357))：

```
// bootstrap main module.
Module.runMain = function() {
  // Load the main module--the command line argument.
  Module._load(process.argv[1], null, true);
  // Handle any nextTicks added in the first tick of the program
  process._tickCallback();
};
```

执行结果是```Module._load('test.js')```。所以最终是由node的module模块加载执行了```test.js```，相当于内部执行了一次```require('test.js')```。

至此，在```_babel-node.js， test.js```中各加载了一次```babel-polyfill```，在第一次被加载后```global. _babelPolyfill```的值始终为true，而第二次加载并没有报错，所以此值有可能出现被变更或者忽略的隐藏逻辑有可能在```nodejs module```模块的源码中。

此问题实际上并不是一个值得解决的问题，因为根本原因是```babel-polyfill```只应该存在一个实例，所以我们只要把自己项目中的删掉就可以了。

