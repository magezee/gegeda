## koishi

### 准备

[koishi]([Koishi](https://koishi.js.org/)) 是一个跨平台的机器人框架

#### 接入QQ

首先需要使用 [go-cqhttp](https://docs.go-cqhttp.org/) 来接入 QQ 服务，以便之后 koishi 接入可以操作用户 QQ，[下载地址](https://docs.go-cqhttp.org/guide/quick_start.html)

> OneBot 是一个聊天机器人应用接口标准，可用于实现 QQ 聊天机器人，go-cqhttp 是它的一个集成框架

go-cqhttp 包含 `config.yml` 和 `device.json` 两个配置文件, 其中 `config.yml` 为运行配置 `device.json` 为虚拟设备信息，[配置信息](https://docs.go-cqhttp.org/guide/config.html#%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF)

> 注意：在 linux 环境中启动程序生成的文件放在了用户家目录下
>
> `config.yml` 会在首次运行 go-cqhttp 的时候自动生成，`device.json` 会在首次登陆账户的时候自动生成

需要配置一下 `config.yml` 的信息，这里以官方生成的文件为模板，直接修改一下 QQ 号和密码，如果不需要反向 socket 代理则删掉该配置（因为默认没配服务地址，直接启动会失败），然后直接启动程序即可接入 QQ

![](https://img-blog.csdnimg.cn/f24fcb3be40f48c6a7b75baa62f29fe9.png)



-----

#### 接入机器人

使用 koishi 接入机器人，首先需安装 koishi 及相关库

```shell
选择一个文件夹充当项目文件夹并在根目录执行
yarn init -y
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
    'common': {}
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

```tsx
// koishi.config.js
module.exports = {
  // ...
  plugins: {
    './my-plugin': true, // true 和 {} 的效果等价
  },
}
```



使用 `850300443 咯咯哒` 作为机器人载体，`2536671541 秋刀鱼` 作为触发机器人的发言用户，分别在私聊和群聊 `56546216` 中发言，拿到的 `session` 信息如下：

![](https://img-blog.csdnimg.cn/fc3f27bac35c49e9a8bd6cb271b49fd8.png)

可以看出此时已经可以很方便的获取到下面主要信息：

- 发言人信息，如 QQ 号，昵称等
- QQ群信息，如 QQ 群号等
- 聊天内容，如文本及图片信息，发出时间等

-------

**中间件使用**









-----

### 指令

> [官方文档](https://koishi.js.org/guide/command.html)

使用 `app.command()` 定义指令，指令通过 `指令名 指令参数` 的方式触发

```tsx
app.command('test <message>')
  .action((_, message) => {
    // 机器人操作
})
```

> `_` 为 Argv 对象，该对象包含会话对象 `Session`

```tsx
app.command('test <message>')
  .action((_, message) => {
    _.session.send(`发送的信息为${message}`)
})
```



-----

### 消息段

可以用消息段控制 koishi 发送特定媒体或者做特定操作，它的原理是使用 `CQcode` 让 QQ 知道一个用户的操作，由于接入 QQ 使用的是 go-cqhttp，因此在 koishi 中消息段完全对应该框架， [CQcode参考](https://docs.go-cqhttp.org/cqcode/)

```tsx
// >输入指令发图，则会发出一张指定图片地址的图片
const { segment } = require('koishi')

function apply(ctx) {
ctx
  .command('send.img', '发送图片指令')
  .shortcut('发图')
  .action(async ({ session }) => {
    return segment('image', { url: xxx })   // segment传的值为CQcode，配置在上面参考 
  }
```











-----

### 特别补充

#### QQxml

koishi 可以通过 QQcode 去发送一段 xml 代码，这段 xml 会被 QQ 内部解析，然后变成特定的消息效果，如 QQ 的卡片信息，这里主要补充 QQ 卡片的 xml 写法

xml 代码需要有专门的头部声明，如下所示

```xml
<?xml version='1.0' encoding='UTF-8' standalone='yes'?>
```

QQ 卡片使用 `<msg></msg>` 标签进行包裹内容

```xml
<msg serviceID="1" templateID="1" action="web" brief="点击进入直播间" sourceMsgId="0" url="https://live.bilibili.com/21452505?spm_id_from=333.999.0.0" flag="0" adverSign="0" multiMsgFlag="0">
  <!-- 卡片内容 -->
</msg>
```

> brief：在聊天框外看到的预览信息
>
> url：点击卡片进行跳转
>
> 其他的暂不知道什么效果

以下是试出来的两种 xml 卡片的模板，其他的配置尝试感觉有点问题

```xml
<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
  <msg serviceID="1" templateID="1" action="web" brief="点击进入直播间" sourceMsgId="0" url="https://live.bilibili.com/21452505?spm_id_from=333.999.0.0" flag="0" adverSign="0" multiMsgFlag="0">
  <item layout="6" advertiser_id="0" aid="0">
  <picture cover="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-094758B3DD39603D0E8563D47959D8E7/0" w="0" h="0" />
  </item>
  <item layout="6" advertiser_id="0" aid="0">
  <title>海子姐直播间</title>
    <summary>直播状态：${liveStatus}${liveStartTime}${liveTime}</summary>
  </item>
  <source name="哔哩哔哩" icon="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-01006648643525F8630A9A97C5959700/0" action="" appid="-1" />
</msg>
```

![](https://img-blog.csdnimg.cn/bed666a900a74c348fc0c207a6a4d661.png)

```xml
<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
<msg serviceID="1" templateID="1" action="web" brief="点击进入直播间" sourceMsgId="0" url="https://live.bilibili.com/21452505?spm_id_from=333.999.0.0" flag="0" adverSign="0" multiMsgFlag="0">
  <item layout="2" advertiser_id="0" aid="0">
    <picture cover="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-094758B3DD39603D0E8563D47959D8E7/0" w="0" h="0" />
    <title>海子姐直播间</title>
    <summary>直播状态：${liveStatus}${liveStartTime}${liveTime}</summary>
  </item>
  <source name="哔哩哔哩" icon="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-01006648643525F8630A9A97C5959700/0" action="" appid="-1" />
</msg>
```

![](https://img-blog.csdnimg.cn/8c0788d95d0e4f5499d80ad1a4849f1f.png)



> 注意：直接使用网络的图片在手机上可以正常显示在卡片中，但是在 PC 端则会裂掉，这是因为 PC 卡片引用用的是 QQ 自己的图床内的图，需要手动拿到一张下载的图片的 MD5 的值（需全部转为大写）然后使用 QQ 发送一段信息 `http://gchat.qpic.cn/gchatpic_new/0/530077417-0-<把md5值填在这，不需要尖括号>/0 `，这样就可以实现在 PC 也显示卡片的图片，[B站教程](https://www.bilibili.com/video/av754152408/)



