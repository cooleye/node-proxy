var express = require('express');

//安装request 模块
var request = require('request');

var path = require('path')
var app = express();



/*
* 使用 CORS 实现跨域
*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // * 换成你的前端服务器的主机地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
next();
});


/*
* 使用express做个接口，接口内去调用后端给你的线上接口,把返回的数据返回给前端
* 之后你就可以请求自己的接口地址  http://localhost:3000/users
* 上线后，这个proxy也需要上线运行，localhost应该是你的服务器域名
*/


// 这是后端给你的接口域名  比如给你一个 https://api.github.com/users ,你把https://api.github.com 写在这里
let serverUrl='https://api.github.com';//server地址

app.use(express.static(path.join(__dirname, './')));//静态资源index.html和node代码在一个目录下
app.use('/', function(req, res) {
  let url = serverUrl + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen('3000',function(){
  console.log('启动代理服务器')
})
