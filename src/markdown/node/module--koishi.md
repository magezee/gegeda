## koishi

### 准备

[koishi]([Koishi](https://koishi.js.org/)) 是一个跨平台的机器人框架

#### 接入QQ

首先需要使用 [go-cqhttp](https://docs.go-cqhttp.org/) 来接入 QQ 服务，以便之后 koishi 接入可以操作用户 QQ，[下载地址](https://docs.go-cqhttp.org/guide/quick_start.html)

> OneBot 是一个聊天机器人应用接口标准，可用于实现 QQ 聊天机器人，go-cqhttp 是它的一个集成框架

go-cqhttp 包含 `config.yml` 和 `device.json` 两个配置文件, 其中 `config.yml` 为运行配置 `device.json` 为虚拟设备信息，[配置信息](https://docs.go-cqhttp.org/guide/config.html#%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF)

> 注意：在 linux 环境中启动程序生成的文件放在了 `/user` 路径下而非程序的目录
>
> `config.yml` 会在首次运行 go-cqhttp 的时候自动生成，`device.json` 会在首次登陆账户的时候自动生成

需要配置一下 `config.yml` 的信息，这里以官方生成的文件为模板，直接修改一下 QQ 号和密码，如果不需要反向 socket 代理则删掉该配置（因为默认没配服务地址，直接启动会失败），然后直接启动程序即可接入 QQ

![](https://img-blog.csdnimg.cn/f24fcb3be40f48c6a7b75baa62f29fe9.png)



-----

#### 接入机器人

使用 koishi 接入机器人，首先需安装 koishi 及相关库

```shell
# 选择一个文件夹充当项目文件夹并在根目录执行
yarn init
yarn add koishi koishi-adapter-onebot koishi-plugin-common -D
```

建立入口文件 `index.js` 以及 配置文件 `koishi.config.js` 

```tsx
// index.js
const { App } = require('koishi')
const config = require('./koishi.config')
require('koishi-adapter-onebot')

// 注入配置
const app = new App({
  ...config
})

// 注册插件
app.plugin(require('koishi-plugin-common'))

app.start()
```

```tsx
// koishi.config.js
module.exports = {
  // Koishi 服务器监听的端口
  port: 8080,
  onebot: {
    path: '',
    secret: '',
  },
  bots: [{
    type: 'onebot:ws',
    server: 'http://localhost:6700',
    selfId: '这里填写QQ号',
    token: '这里填写QQ密码',
  }],
  plugins: {
    
  },
}
```

> 注意：koishi 配置的服务需与 go-cqhttp 启动的服务信息一致才能建立通信，这里选用 socket 协议，使用 http 协议不知为何机器人无响应

启动项目后即可使用命令与机器人进行通信

![](https://img-blog.csdnimg.cn/e4d93a4eea42469abcb7dfc8450d5c97.png)

到这里已经完成 QQ 机器人接入 QQ 的操作，剩下的就是通过代码让机器人智能发言



-----

### 中间件

使用中间件告诉机器人该如何处理消息，机器人所能接收到的每一条信息都会触发中间件

> 因为每一条消息都会触发中间件，因此这里一定要使用条件语句过滤掉需要回话的信息，否则就会产生每接收到一条任意信息就会回复一条信息的情况
>
> 机器人发送信息会往接受到信息的地方发送，如接收到 A 群的信息就会只会发往 A 群

```tsx
// plugin.js
module.exports = (ctx) => {
  ctx.middleware((session, next) => {
    if(xxx) {
      console.log(session)
    }
    return next()
  })
}
```

``` tsx
// index.js
// >在入口文件加载插件
app.plugin(require('./plugin'))
```

使用 `850300443 咯咯哒` 作为机器人载体，`2536671541 秋刀鱼` 作为触发机器人的发言用户，分别在私聊和群聊 `56546216` 中发言，拿到的 `session` 信息如下：

![](https://img-blog.csdnimg.cn/fc3f27bac35c49e9a8bd6cb271b49fd8.png)

可以看出此时已经可以很方便的获取到下面主要信息：

- 发言人信息，如 QQ 号，昵称等
- QQ群信息，如 QQ 群号等
- 聊天内容，如文本及图片信息，发出时间等

-------

**中间件使用**





