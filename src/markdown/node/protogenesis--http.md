## Http

在原生的 node 中使用 [http](http://nodejs.cn/api/http.html) 构建服务器

```tsx
const http = require('http')
```

### 常用方法

**createServer (options? requestListener?)**

- 功能：创建服务器
- 参数：
  - `options: Object`：服务配置项
    - `insecureHTTPParser: boolean`：允许使用不安全的 HTTP 解析器，接受无效的 HTTP 标头，默认 false
    - `maxHeaderSize: number`：可选地覆盖此服务器接收到的请求的 [`--max-http-header-size`](http://nodejs.cn/api/cli.html#cli_max_http_header_size_size) 值，即请求头的最大长度（以字节为单位），默认 16384 (16 KB)
  - `requestListener: function(req, res)`：请求事件函数
    - req：包含拿到请求内容的方法
    - req：[http.ServerResponse类](http://nodejs.cn/api/http.html#http_response_end_data_encoding_callback)，包含了控制响应内容的方法
- 返回值：[http.Server实例](http://nodejs.cn/api/http.html#http_class_http_server)

```tsx
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })    // 响应头
  res.end(JSON.stringify({                                      // 响应内容，关闭连接
    data: '返回的请求数据'
  }))
})

server.listen(8000)                                             // 服务器启动端口
```

