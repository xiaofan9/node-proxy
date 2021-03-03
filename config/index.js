module.exports = {
  "port": 3000,
  "portHandle": "modify",
  "cors": true,
  "corsConfig": {
    origin: '*',
    maxAge: 16, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowHeaders: ['*'], //设置服务器支持的所有头信息字段
    // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 设置所允许的HTTP请求方法
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] 设置获取其他自定义字段
  }
}
