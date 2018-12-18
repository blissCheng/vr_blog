个人博客

本博客采用 react全家桶， [Typescipt](https://www.tslang.cn)等。<br/>
使用[node.js](http://nodejs.cn) + marked.js提供本地编译服务。

## 使用

```
  git clone git@github.com:blissCheng/vr_blog.git
```

```
  npm install 或者 yarn
```

执行npm start启动本地服务。 start与build会执行```npm run marked```子进程，并启动 ```/config/user/start.js```脚本。然后执行babel配置转化与marked编译进程。 详情请看 package.json

```
  npm start
```

执行npm run deploy 推送到远程服务器

```
  npm run deploy
```

## 写文章

- 在 /src/marks/下新增文章
- 在文章标题前面需要首先填写配置model

  ```
    {
      title: 测试title;
      tag: 测试tag;
      time: 测试时间;
    }
  ```
- 注意，npm start 或npm run build 会帮助你编译md文件并添加到react组件， <br/>
所以，新增文章过后需要npm start重启本地服务或者通过 npm run deploy重新编译部署，推送到远程服务器