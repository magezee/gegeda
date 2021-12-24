## puppeteer

> [初始 puppeteer](https://juejin.cn/post/6984685772632752164)
>
> [官方中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)

### 组成结构

puppeteer 可以用于开启一个无界面的 chrom 浏览器（又称[无头浏览器](https://zhuanlan.zhihu.com/p/27100187)）进程，用代码实现操控浏览器的操作

```shell
yarn add puppeteer
yarn add puppeteer-core
```

puppeteer 的 API 仿造了浏览器的结构（透明部分表示这些浏览器结构再 puppeteer 中暂未实现：

- **Browser**： 对应一个浏览器实例，一个 `Browser` 可以包含多个 `BrowserContext`
- **BrowserContext**： 对应浏览器一个上下文会话，如打开普通浏览器和无痕浏览器，`BrowserContext` 具有独立的 `Session` ，一个 `BrowserContext` 可以包含多个 `Page`
- **Page**：表示一个 `Tab` 页面，通过 `browserContext.newPage()` 或 `browser.newPage()` 创建，`browser.newPage()` 创建页面时会使用默认的 `BrowserContext`，一个 `Page` 可以包含多个 `Frame`
- **Frame**: 一个框架，每个页面有一个主框架（`page.MainFrame()`）,也可以多个子框架，主要由 `iframe` 标签创建产生的
- **ExecutionContext**： 是 js 的执行环境，每一个 `Frame` 都一个默认的 js 执行环境

![](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png)

-------

#### Browser

**新建实例**

使用 [puppeteer.launch(options?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-puppeteerlaunchoptions) 来创建一个浏览器实例

> 创建实例后，在页面操作完毕时，需要手动把实例关闭，否则实例会越来越多导致内存泄漏

```tsx
const puppeteer = require('puppeteer')

const init = async() => {
  const browser = await puppeteer.launch()
  // 操作...  
  await browser.close()
}

init()
```

> 为了可视化调试，可以将无头模式关闭

```tsx
const browser = await puppeteer.launch({ headless: false })
```

可以建立多个实例

```tsx
const init = async() => {
  const browserA = await puppeteer.launch({ headless: false })
  const browserB = await puppeteer.launch({ headless: false })
}

init()
```

------

**连接实例**

当已经存在浏览器实例时，就没必要重新建立实例，因此使用 [puppeteer.connect(options?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-puppeteerconnectoptions) 来连接的浏览器实例

连接的是一个浏览器 websocket 端点链接，该链接可通过 [browser.wsEndpoint ()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-browserwsendpoint) 返回

```tsx
// >现象:打开浏览器,在同一个浏览器中不断打开新的标签页并关闭
const puppeteer = require('puppeteer')

let browserWSEndpoint = ''

const init = async() => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  
  // 使用puppeteer.connect的方式时就不要关闭浏览器了
  browserWSEndpoint = await browser.wsEndpoint()
  // ws://127.0.0.1:62989/devtools/browser/4eb19a2a-c019-4e2f-b476-9d9a6182e67d
  console.log(browserWSEndpoint)   
  
}

init()

setInterval(async() => {
  const browser = await puppeteer.connect({ browserWSEndpoint })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com/')
  await page.close()  
},5000)
```



-------

#### BrowserContext

在创建浏览器实例时，会自动创建一个默认的浏览器上下文，它是最基本的执行环境

> 不同浏览器上下文的环境中，不会共享 cookies 和 cache

可以使用 [browser.createIncognitoBrowserContext()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-browsercreateincognitobrowsercontext) 创建一个新的浏览器上下文

> 每一个上下文都有一个 `_id` 作为标志，默认上下文的标志为`null`

```tsx
const puppeteer = require('puppeteer')

const init = async() => {
  const browser = await puppeteer.launch()
  const defaultContext = browser.defaultBrowserContext() 
  const newContextA = await browser.createIncognitoBrowserContext()
  const newContextB = await browser.createIncognitoBrowserContext()
  const contexts = await browser.browserContexts()
  
  // 验证上下文
  console.log(defaultContext._id)               // null
  console.log(newContextA._id)                  // B071B622CF995C82950F273E59F70B34
  console.log(newContextB._id)                  // FBC321F5FEF60814255BEF7CF23E6C37

  // 验证上下文数组
  console.log(contexts[0] === defaultContext)   // true
  console.log(contexts[1] === newContextA)      // true
  console.log(contexts[2] === newContextB)      // true
  console.log(contexts[3])                      // undefined

  browser.close()
}

init()
```

> [browser.browserContexts()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-browserbrowsercontexts) ：返回所有打开浏览器的上下文数组
>
>[browser.defaultBrowserContext()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-browserdefaultbrowsercontext) ：返回默认的浏览器上下文

浏览器实例包含了所有的浏览器上下文内容

```tsx
console.log(browser._defaultContext === defaultContext)                 // true
console.log(browser._contexts.get(newContextA._id) === newContextA)     // true
console.log(browser._contexts.get(newContextB._id) === newContextB)     // true
```

一个浏览器上下文代表的是一个浏览器窗口，即有 n 个实例就会在可视化调试中打开 n 个窗口，但是打开窗口需要有条件，即需要有页面存在，就像打开浏览器一定会有一个初始页面一样

> 浏览器实例并不代表浏览器窗口，在初始化实例时之所以会打开一个窗口是因为自带了默认上下文和默认页面

```tsx
// 现象：打开两个浏览器窗口，默认窗口拥有两个标签页（因为默认自带一个），newContextA窗口拥有一个标签页
const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const newContextA = await browser.createIncognitoBrowserContext()
  const newContextB = await browser.createIncognitoBrowserContext()

  const defaultPage = await browser.newPage()
  const pageA = await newContextA.newPage()
}
```

而一个浏览器实例实际上代表的是一个浏览器进程，下面为多个浏览器实例与单个浏览器实例多个上下文的区别

```tsx
const init = async() => {
  const browserA = await puppeteer.launch({ headless: false })
  const browserB = await puppeteer.launch({ headless: false })
}
```

![](https://img-blog.csdnimg.cn/2984c7cd9d5847978bdc2b935bd91a4e.png)

```tsx
const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const newContext = await browser.createIncognitoBrowserContext()
}
```

![](https://img-blog.csdnimg.cn/50f4d71d518545b583229cdbc22560a5.png)



------

#### Page

页面运行在浏览器上下文中，使用 [browserContext.newPage()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-browsernewpage) 去建立一个标签页，就像一个浏览器窗口可以打开多个标签页一样，一个上下文可以建立多个页面

> 如果使用浏览器实例去创建页面，则会建立在默认上下文中，即 `browser.newPage()` 相当于 `browser._defaultContext.newPage()` 的简写

```tsx
const init = async() => {
  const browser = await puppeteer.launch()
  const newContextA = await browser.createIncognitoBrowserContext()
  const newContextB = await browser.createIncognitoBrowserContext()

  const defaultPage = await browser.newPage()
  const pageA = await newContextA.newPage()
  const pageB = await newContextB.newPage()

  console.log(defaultPage.browser() === browser)      // true
  console.log(pageA.browser() === browser)            // true
  console.log(pageB.browser() === browser)            // true

  browser.close()
}
```

> [page.browser()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pagebrowser)：返回当前页面所属的浏览器实例



----

#### Frame

框架代表一个页面的具体内容，一个页面默认拥有默认框架  `mainFrame` ，一般而言，浏览器页面级的操作发生在 Page 类，而页面内的操作发生在 Frame

如设置页面 cookie [page.setCookie(...cookies)](https://img-blog.csdnimg.cn/50f4d71d518545b583229cdbc22560a5.png) 和查询页面元素 [page.mainFrame().$(selector)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-frameselector) 的方法继承的是不同的载体，puppeteer 为了使用方便，统一将 `page.mainFrame().xxx` 可简写为 `page.xxx`，这样就不需要过多考虑他们的区别，统一都认为是操作页面



-----

#### ExecutionContext

它代表的是一个 js 执行上下文环境，当将本地的代码注入到页面中去执行时，它将产生作用

> 使用 `<script>` 方式注入的方式并不算

如使用 [page.mainFrame().evaluate(pageFunction, ...args?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pageevaluatepagefunction-args) 注入本地代码，同理可以简写为 `page.evaluate`

```tsx
const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com/')
  
  const data = 'data'
  
  await page.evaluate(() => {
    alert(data)
  })
  
}
```

上面代码执行时会报错，因为在代码会放在网页中的执行上下文中去执行，而非在本地执行，因此会找不到 `data` 的变量声明



-----

### 功能脚本

#### 录制脚本

如果想体验写脚本可以先用一款 chrom 插件 `Headless Recorder` 来录制操作并转为 puppeteer 脚本来感受一下

![](https://img-blog.csdnimg.cn/622eec54a937431a8bb2eb33d561c140.png)



------

#### 页面导航

相关 API：

- [page.goto(url, options?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pagegotourl-options) ：导航到指定地址
- [page.goForward(options?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pagegoforwardoptions)：导航到页面历史的下一个页面
- [page.goBack(options?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pagegobackoptions)：导航到历史的上一个页面
- [page.url()](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pageurl)：返回当前页面 url

```tsx
const puppeteer = require('puppeteer')

const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com')
}

init()
```

> 为了调试方便，可以使用本地的网页文件进行调试

```tsx
const puppeteer = require('puppeteer')
const path = require('path')

const filePrefix = 'file://'
const templatePath = `${filePrefix}${path.resolve(__dirname, './index.html')}` 

const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(templatePath)
  // 操作...
  await page.close()  
  await browser.close()
}

init()
```



-----

#### 脚本注入

相关 API：

- [page.evaluate(pageFunction, ...args?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.1&show=api-pageevaluatepagefunction-args)：将指定方法放在页面中执行

- [page.evaluateHandle(pageFunction, ...args)](https://img-blog.csdnimg.cn/f62694de122447d1ad27df9add111295.png)：将指定方法放在页面中执行

  > 和 `page.evaluate` 仅返回数据类型不同，该方法返回的是 `JSHandle` 类型

- [page.evaluateOnNewDocument(pageFunction, ...args?)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pageevaluateonnewdocumentpagefunction-args)：将指定方法放在页面中执行

  > 该方法会页面任意 script 执行前被调用，因此可以用来修改全局代码属性

- [page.exposeFunction(name, puppeteerFunction)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pageexposefunctionname-puppeteerfunction)：将指定方法挂载到页面的 `window` 对象

  > 使用该方法的好处是即使同一页面经过多次导航，也能继续使用暴露的方法

- [page.addScriptTag(options)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pageaddscripttagoptions)：在页面上建立 `<script>` 标签并引入网络或本地的脚本代码

- [page.addStyleTag(options)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v13.0.0&show=api-pageaddstyletagoptions)：在页面上建立 `<link>` 标签并引入网络或本地的样式代码

```tsx
const puppeteer = require('puppeteer')

const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com')
  await page.evaluate(() => {
    alert('在网页上执行的代码')
  })
}

init()
```

> 如果在注入的脚本中去执行异步操作，则需要通过返回 promise 来阻塞本地代码的后续操作，因为本质上 `await` 阻塞的是 promise，如果不这样操作后果你懂得~

```tsx
const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com')
  await page.evaluate(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('阻塞了10秒')
        resolve()
      })
    })
  })

  console.log('在页面阻塞操作完毕后执行')
}
```

需要注意的是，脚本的执行环境是在网页中，因此应该把注入网页中的代码看做完全独立的一部分，因此需要注意：

- 变量数据无法通过代码中的上下文访问到，注入的方法所需要的数据完全需要从外部传进或在内部声明
- 浏览器无法识别 `require` 或 `import` ，无法直接在网页中使用本地的 npm 库文件，需要在网页中建立 `<script>` 标签并手动引入库的 cdn 链接，可以在 [BootCDN](https://www.bootcdn.cn/) 找到对应包的 cdn 地址

因此要想在页面上使用第三方库需要额外引入

```tsx
const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com')
  
  // 将dayjs引入网页
  await page.addScriptTag({
    url: 'https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js'
  })
  await page.evaluate(() => {
    const result = dayjs().format('YYYY年MM月DD日')
    alert(result)
  })
}
```

> 如果无法正常加载 cdn，检查浏览器代理

或者将库的某个方法暴露给 window 对象

> 需要注意 `page.exposeFunction` 将返回一个 promise 对象，后续操作要使用 `await` 去拿到最终数据

```tsx
const dayjs = require('dayjs')

const init = async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com')
  
  await page.exposeFunction('format', (rules) => {
    return dayjs().format(rules)
  })

  await page.evaluate(async () => {
    const result = await window.format('YYYY年MM月DD日')
    alert(result)
  })
}
```











----

### 使用场景

#### 截图







