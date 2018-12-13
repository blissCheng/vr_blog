{
	title: pwa初体验;
	time: 2018-12-7;
	category: 技术;
	tag: PWA, JavaScript, 移动端;
}


PWA，即[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)(渐进式网页应用)， 是由谷歌提出的一个全新web应用概念。其主要功能就是可以将网页应用添加到桌面，达到类似Native App的效果，并且实现了离线缓存功能，可以让用户在没有网络的情况下也能使用部分功能。

通过```manifest.json```将应用添加到主屏幕

```
manifest.json

{
  "name": "Minimal PWA", //  应用名称
  "short_name": "PWA Demo",
  "description": "The app that helps you understand PWA", // 应用描述
  "display": "standalone", // 定义开发人员对Web应用程序的首选显示模式。standalone模式会有单独的
  "start_url": "/", // 应用启动时的url
  "theme_color": "#313131", // 桌面图标的背景色
  "background_color": "#313131",
  "icons": [ // 桌面图标，是一个数组
	    {
		    "src": "pwa.png",
		    "sizes": "48x48",  
		    "type": "image/png"
	  	}
 	]
}
```

在HTML文件中引入 ```manifest.json```

```
index.html


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <img src='./images/hello.png'/>
</body>
</html>
```

### serviceWorker实现离线缓存

我们都知道传统的浏览器缓存主要是http缓存。在请求资源的时候由服务端在 **response header** 中添加 **Cache-Control** 来标注缓存规则，一般存在一个新鲜度限值 **max-age** ，在此值规定的时间内不再请求服务器，当缓存资源过期以后再重新请求服务器查找资源。如果在这个期间资源有变更，我们可以在响应头里设置一个 **Etag** ,这个Etag是唯一标识资源的东西，可以由资源版本等生成一个唯一值返回。然后浏览器在请求的时候在请求头里添加一组key为 **if-none-match** ，值为 **Etag** 的属性。 请求服务端验证资源。

而在 [service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)标准中， 定义了一个[Cache](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) API。它可以拦截请求并缓存资源。

因为 **service worker** 功能过于强大，所以基于安全性考虑，要求所有请求的网络都必须遵循https协议。当然，开发环境 localhost 除外。因此，我们要使用 [http-server](https://www.npmjs.com/package/http-server) 来启动一个本地服务。

#### 注册serviceWorker

```
index.html

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <img src='./images/hello.png'/>
  
  <script>
  		if ('serviceWorker' in navigator) {
  		
  		  // scope 指seriveworker作用范围，及拦截请求的范围
  		  
        navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function (registration) {
          console.log('注册成功: ', registration.scope);
        }).catch(function (err) {                
          console.log('注册失败: ', err);
        });
      }
  </script>
</body>
</html>
```

**service worker** 基于事件驱动 **worker**, 所以 ```service-worker```完全独立于js主线程，运行在一个单独的子线程里面。

缓存资源

```
service-worker.js

self.addEventListener('install', event => {
  
  //在安装并注册serviceWorker时
  
  event.waitUntil(
  	
  	//开启一个缓存域
    caches.open('PWACACHE')
    	
    	//添加一组缓存资源
      
      .then(cache => cache.addAll([ //如果所有文件都缓存成功，serviceWorker才会安装成功
        'image/hello.png'
      ]))
  )
})

//拦截fetch缓存资源

self.addEventListener('fetch', event => {
	event.respondWith(
		
		// 检查传入的url是否匹配当前缓存中的response响应，如果匹配返回缓存的资源，
		// 如果不匹配请求资源并缓存
		
		caches.match(event.request)
			.then(response => {
				if (response) {
					return response
				};
				
				var cloneRequest = event.request.clone();
				
				return fetch(cloneRequest)
					.then(response => {
						if (!response || response.status !== 200) {
							return response;
						}
						
						caches.open('PWACACHE')
							.then(cache => {
								cache.push(cloneRequest, response.clone())
							})
					})
			})
	)
})
```

pwa现在还并不是一个可实际应用的方案，仍需社区的大力推动发展。相比于 ```React-Native``` 等跨平台应用方案，我更看好 pwa的前景，实时关注一下吧。







