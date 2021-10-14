## socket.io

[Socket.IO](https://socket.io/docs/v4/) 是一个库，可以在浏览器和服务器之间实现实时、双向和基于事件的通信

使用 socket.io 时，客户端和服务端需要配套使用，即如果服务端使用了该库，则客户端也同样须使用该库才能生效

### 使用

#### 构建服务

要搭起一个通信桥梁，需要客户端和服务端的共同配合

**服务端**

使用 `socket.io` 包进行搭建服务

```shell
yarn add socket.io
```

搭建服务有多种方式，这里以 `express` 为例，其他方式[官方文档](https://socket.io/docs/v4/server-initialization/)写的很清楚

```tsx
const express = require('app')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)			// io为socket 服务器实例

io.on('connection', (socket) => {
  // 处理连接事件
})

httpServer.listen(3000)
```

**客户端**

可以直接引入外部文件或使用 `socket.io-client` 来建立客户端实例

```shell
yarn add socket.io-client
```

```tsx
// html中直接引用
<script src="/socket.io/socket.io.js"></script>		

// 引用包
import { io } from 'socket.io-client'

// 建立连接
const socket = io()       // 客户端与服务端不跨域的情况可以直接建立连接
const socket = io(url)    // 存在跨域时，需要填入服务的服务url
```

**特点**

每一个客户端与服务端建立连接时，服务端都会记录该客户端的信息，这里的一个客户端连接指的是一个 TCP 长连接，即如果一个浏览器打开多个标签页，连接服务端就算多个客户端进行了连接

> socket.io 通过一串随机字符来给每个客户端进行标记，这个标志服务端与客户端一致

```tsx
// 服务端
io.on('connection', (socket) => {
  console.log(socket.id)       // OkjEBxN0ibKNYEoDAAAB
})

// 客户端
socket.on('connect', () => {
  console.log(socket.id)      // OkjEBxN0ibKNYEoDAAAB
})
```



-------

 #### 通信例子

> [官方的开始使用文档](https://socket.io/get-started/chat)
>
> [掘金上一个写得很详细的搭建例子](https://juejin.cn/post/6844903700905852936)

服务端：

```tsx
// index.js
const express = require('express')
const { Server } = require('socket.io')

const app = express()
const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

// 设置访问服务路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// 开启socket服务
io.on('connection', (socket) => {
  // chat message为一个接受消息的盒子标志，服务端和客户端须使用同一标志才能收发盒子中的消息
  socket.on('chat message', (msg) => {    
    console.log(`message: ${msg}`)
    io.emit('chat message', `从服务端接受的消息: ${msg}`)  // 向客户端发送消息
  })
})

// 开启服务端，设为0.0.0.0主要用于让其他电脑可以通过ip访问到该服务
// 这里要用server去监听端口，而非app.listen去监听(不然找不到socket.io.js文件)
server.listen(3000, '0.0.0.0', () => {
  console.log('服务器已开启在本机3000端口')
})
```

客户端

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>

    <script src="/socket.io/socket.io.js"></script>
    <script>
      // 客户端建立socket并和服务端建立连接，这里没有指定服务器的url是因为服务端渲染该html文件，io默认指向渲染页面的主机
      var socket = io()
      var messages = document.getElementById('messages')
      var form = document.getElementById('form')
      var input = document.getElementById('input')

      // 客户端向服务端发消息
      form.addEventListener('submit', function(e) {
        e.preventDefault()
        if(input.value) {
          socket.emit('chat message', input.value)
          input.value = ''
        }
      })

      // 客户端接收服务端发回的消息
      socket.on('chat message', function(msg) {
        var item = document.createElement('li')
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight)
      })
    </script>
  </body>
</html>
```

![](https://img-blog.csdnimg.cn/ce604321b70a44838d1fdd6cb81c901f.gif#pic_center)



-----

### 通信

#### 命名空间

在服务端可以设置多个命名空间，每个命名空间相当于一个完全独立的域，不会对另外的域进行通信

默认连接的都是主域名空间，路径为 `/`

服务实例 `io` 继承了命名空间 Namespace 类的所有属性方法，直接使用 `io.xxx` 相当于 `io.of('/').xxx` 的简写形式

> 注意：使用简写形式时，直接使用命名空间的属性 `io.name` 和 `io.of('/').name` 的结果是不同的，需要用后者的方式调用

```tsx
// 服务端
const nsp = io.of('my-namespace')          // 创建新的命名空间

nsp.on('connection', (socket) => {
  // 在这个命名空间下的通信操作
})

// 客户端
const socket = io()                        // 同源连接主域名空间
const nspSocket = io('my-namespace')       // 同源连接自定义命名空间

const socket = io('URL')                   // 非同源连接主域名空间
const nspSocket = io('URL/my-namespace')   // 非同源连接自定义命名空间
```



------

#### 房间

如果把服务端比作 QQ 聊天平台，客户端比作每一个 QQ 用户，房间即表示的是每一个 QQ 群，那么用户之间的消息通信在 socket.io 中的实现相当于下图

> 房间是仅限服务器的概念，客户端无权访问其已加入的房间列表

![](https://img-blog.csdnimg.cn/9fb1b88eb798403497a7770be037e525.png)

但是实际上在 socket.io 中，服务端广播的最小单位不是客户端而是房间，在客户端与服务端建立连接时，socket.io 就为每一个用户端建立了一个房间，相当于只有自己的 QQ 群

```tsx
// >可以看出，每个客户端都存在自己的一个默认房间
io.on('connection', (socket) => {
  console.log(socket.id)                   // pIIOvkRbTklbjT5FAAAB
  console.log(io.sockets.adapter.rooms)    // Map(1) { 'pIIOvkRbTklbjT5FAAAB' => Set(1) { 'pIIOvkRbTklbjT5FAAAB' } }
  
  socket.join('test-room')                 // 手动将当前客户端加入指定房间
  console.log(io.sockets.adapter.rooms)    
  /*
    Map(2) {
      'pIIOvkRbTklbjT5FAAAB' => Set(1) { 'pIIOvkRbTklbjT5FAAAB' },
      'test-room' => Set(1) { 'pIIOvkRbTklbjT5FAAAB' }
    }
  */
})
```

即如果要实现单个客户端与单个客户端之间的通信，实现应该为下图

![](https://img-blog.csdnimg.cn/a158099a972f407b81cc140c2303ae6c.png)

-----

#### 事件

事件分为发出事件和监听事件，socket.io 是双向通信，因此客户端和服务端皆可发出和监听事件，事件名需相同

```tsx
// 服务端
io.on('connection', (socket) => {
  socket.emit('server-to-client', 'hello')
})

// 客户端
socket.on('server-to-client', (msg) => {
  console.log(msg)     // hello
})
```

```tsx
// 服务端
io.on('connection', (socket) => {
  socket.on('client-to-server', (msg) => {
    console.log(msg)   // hello
  })
})

// 客户端
socket.emit('server-to-client', 'hello')
```

可以传入回调函数，使之处理发出事件成功后的行为

```tsx
// 服务端
io.on('connection', (socket) => {
  socket.emit('server-to-client', 'hello', (id) => {
    console.log(`$客户端{id}已接收到信息`)
  })
})

// 客户端
socket.on('server-to-client', (msg, callback) => {
  console.log(msg)     // hello
  callback(socket.id)  // 客户端xxxxx已接收到信息
})
```



-----

### API

#### namespace

> io 继承 namespace 的所有属性方法，但是如果使用简写形式调用属性（非方法）时，则需要 `io.of('/').xxx` 来调用

**namespace.name**

- 功能：获取命名空间名字

```tsx
console.log(io.name)                // undefined
console.log(io.of('/').name)        // /
```



-----

#### io

**io.on(eventName, callback)**

- 功能：服务器监听事件
- 范围：服务端
- 参数：
  - `eventName: string`：事件名
    - `connection` ：内置事件，每一个客户端与服务端建立连接时触发
  - `callback: function(socket)`：回调函数
    - `socket`：[服务端 socket 实例](https://socket.io/docs/v4/server-socket-instance/)，指的是当前建立连接的这个客户端，因此使用该实例操作事件都是针对单一的一个客户端的行为
- 返回值：待确认

```tsx
io.on("connection", (socket) => {
  // 处理连接事件
})
```

-------

**io.emit(eventName, ...arg?, callback)**

- 功能：向所有连接的客户端发出事件
- 范围：服务端
- 参数：
  - `eventName: string`：事件名，需与监听事件定义的名字一致
  - `arg: any`：传递的数据
  - `callback: Function`：回调事件
- 返回值：`true`

```tsx
io.emit()
```



-----

#### socket

**socket.id**

- 功能：获取当前连接的客户端标志 ID，两者标志一致
- 范围：服务端、客户端
- 返回值：`string`

```tsx
// 服务端
io.on('connection', (socket) => {
  console.log(socket.id)       // OkjEBxN0ibKNYEoDAAAB
})

// 客户端
socket.on('connect', () => {
  console.log(socket.id)      // OkjEBxN0ibKNYEoDAAAB
})
```

------

**socket.rooms**

- 功能：获取当前客户端所处在的全部房间
- 范围：服务端
- 返回值：`Set`

```tsx
io.on('connection', (socket) => {
  console.log(socket.rooms)     // Set(1) { 'rvBjnbCjlP-CCIhIAAAB' }
  
  socket.join('my-room')        
  console.log(socket.rooms)    // Set(2) { 'rvBjnbCjlP-CCIhIAAAB', 'my-room' }
})
```

------

**socket.emit (eventName, ...arg?, callback)**

- 功能：发送指定事件
- 范围：服务端、客户端
- 参数：
  - `eventName: string`：事件名，需与监听事件定义的名字一致
  - `arg: any`：传递的数据
  - `callback: Function`：回调事件
- 返回值：`true`

```tsx
// 服务端
io.on('connection', (socket) => {
  socket.emit('server-to-client', 'hello', (id) => {
    console.log(`$客户端{id}已接收到信息`)
  })
})
```

------

**socket.on (eventName, callback)**

- 功能：监听指定事件
- 范围：服务端、客户端
- 参数：
  - `eventName: string`：事件名
  - `callback: function(...args)`：用于接受发送事件的数据，发送数据有多少条这里就声明多少个变量接收
- 返回值：`Socket`

```tsx
// 客户端
socket.on('server-to-client', (msg, callback) => {
  console.log(msg)     // hello
  callback(socket.id)  // 客户端xxxxx已接收到信息
})
```

-----

**socket.join (room)**

- 功能：将当前客户端加入指定房间
- 范围：服务端
- 参数：
  - `room: string | Array<string>`：房间名
- 返回值：`void | Promise`

```tsx
io.on('connection', (socket) => {
  console.log(socket.rooms)     // Set(1) { 'rvBjnbCjlP-CCIhIAAAB' }
  
  socket.join('my-room')        
  console.log(socket.rooms)    // Set(2) { 'rvBjnbCjlP-CCIhIAAAB', 'my-room' }
})
```

-----

**socket.leave (room)**

- 功能：将当前客户端退出指定房间
- 范围：服务端
- 参数：
  - `room: string | Array<string>`：房间名
- 返回值：`void | Promise`

```tsx
io.on('connection', (socket) => {
  socket.join('my-room')        
  console.log(socket.rooms)     // Set(2) { 'rvBjnbCjlP-CCIhIAAAB', 'my-room' }
  
  socket.leave('my-room')
  console.log(socket.rooms)     // Set(1) { 'YjckkrmGIv6Nd1KlAAAB' }
})
```

-----

**socket.to (room)**

- 功能：为后续发出事件指定房间（即不会广播给房间外的客户端）
- 范围：服务端
- 参数：
  - `room: string | Array<string>`：房间名
- 返回值：`Socket`

> 客户端的默认房间名为自己的 ID，即如果 room 为 `socket.id` ，即实现了跟指定客户端通信

```tsx
io.on("connection", (socket) => {
  socket.to('a-room').emit('message', '发送数据')
  socket.to('a-room').to('b-room').emit('message', '发送数据')   // 因为返回的是Socket，因此可以链式调用通信多个房间
  socket.to(['a-room', 'b-room']).emit('message', '发送数据')    // 数组写法，功能相同
})
```

-----

**socket.except (room)**

- 功能：为后续发出事件指定排除房间（即不会广播给指定房间内的客户端）
- 范围：服务端
- 参数：
  - `room: string | Array<string>`：房间名
- 返回值：`BroadcastOperator`

```tsx
socket.except('a-room').emit()
socket.to('a-room').except('b-room')    // 包含a-room排除b-room
```

------

**socket.broadcast**

- 功能：标记、表示广播时排除发出者

```tsx
socket.broadcast.emit()    // 除了发出客户端都能收到
```

