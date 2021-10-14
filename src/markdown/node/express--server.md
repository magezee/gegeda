## 服务器

### 应用实例

使用 express 创建一个服务器应用

```tsx
const express = require('express')

const app = new express()

app.get('/', (req, res) => {
  res.send('返回内容')
})

app.listen(8000)
```



------

### 路由

**app路由**

普通路由

```tsx
// 访问localhost:8000/router?parmas=xxx,打印{ parmas: 'xxx' }
// 访问localhost:8000/router/parmas=xxx 找不到路由
app.get('/router', (req, res) => {
  console.log(req.query)    
  res.send('路由返回内容')
})
```

动态路由

```tsx
// 访问localhost:8000/router/parmas=xxx,打印{ parmas: 'xxx' }
// 访问localhost:8000/router?parmas=xxx 找不到路由
app.get('/router/:parmas', (req, res) => {
  console.log(req.query)    
  res.send('路由返回内容')
})
```

**route路由**

在express后续更新中，加入了 `route` 来进行路由的额外配置，注意和直接用 app 进行配置路由的区别

```tsx
const router = express.Router()

// 访问localhost:8000/sample时触发
app.get('/sample', function(req, res) {
  res.send('this is a sample!')
})

// 访问localhost:8000/app时触发
router.get('/', function(req, res) {
  res.send('home page!')
});

// 访问localhost:8000/app/about时触发
router.get('/about', function(req, res) {
  res.send('about page!')
});

app.use('/app', router);		// 使用中间件进行配置，如果这里使用的路径是 / 那就和使用app没什么区别
```



-----

### 中间件

本质上来说，一个 Express 应用就是在调用各种中间件

中间件是一个函数，它可以访问请求和响应对象，和 web 应用中处理 `请求-响应` 循环流程中的中间件（一般被命名为 next 的变量）

**中间件功能：**

- 执行代码
- 修改请求和响应对象
- 终结 `请求-响应` 循环
- 调用堆栈中的下一个中间件

**中间件和路由匹配原理**

匹配顺序：由声明顺序决定

> 当存在 `app.use('/')` 和 `app.use('/news')` 时，访问 `~/news` 会执行 `/` 和 `/news` 的方法（执行顺序看定义的顺序 如果先定义 `app.use('/news')` 则先执行 `/news`）

中间件匹配机制：模糊匹配，从根路径开始向子路径匹配，如果存在满足的父路径，也可匹配

> 如访问 `~/news/app` 可以匹配到 `/news` 中间件

路由匹配机制：精确匹配

**next**

- 决定了是否继续往下匹配路由并执行对应操作
- 声明路由和中间件都是在往同一个express框架中内置存放函数的数组里做push操作，当请求地址满足路由条件时会依次从这个内置数组里，寻找可以满足匹配条件的方法并执行，直到没有 `next() `或者再也找不到满足匹配条件的函数

```tsx
// 如(假定ABD函数里都有next(),C没有 )：
// 访问/news/app时,执行顺序为:B→C,虽然D也可被匹配到,但是因为C中没有next(),D在C后声明,所以不会执行D
app.get('/news', function A(){})

app.use('/news/app', function B(){})  

app.get('/news/app', function C(){})

app.use('/',  function D(){})
```

**应用级中间件**

```tsx
let time = new Date()

// 如果这里不写next() 则只会打印时间而不会向下匹配路由 即打印了时间但不会执行news路由的操作
app.use('/', (req,res,next) => {
  console.log(`/的时间: ${time}`);     
  next();     
})  

// 访问localhost:3001/news时,先打印/的时间,再打印/news的时间,最后才响应/news路由 (如果此方法里没有写next() 则不会执行匹配get路由并send网页
app.use('/news', (req,res,next) => {     
  console.log(`news的时间: ${time}`)
  next()
})

app.get('/', (req,res) => {
  res.send('主页')
})

app.get('/news',function(req,res){
  res.send('新闻页')
})
```

**路由中间件**

```tsx
// 都是匹配/news路由,先在第一个路由里设置自己想要的操作然后next()去匹配下一个/news路由并响应,即实现了/news路由在渲染页面前执行一系列操作的功能
app.use('/news', (req,res,next) => {     
  console.log('这是路由中间件')      
  next()
})

app.get('/news', (req,res) => {
  res.send('这是路由中间件news')
})
```

**错误处理中间件**

```tsx
app.get('/', (req,res) => {
  res.send('/路由')
})

app.get('/news', (req,res) => {
  res.send('news/路由')
})

// 匹配所有路由,并且错误处理的路由一定要放在最后声明 
app.use('/', (req,res) => {
  res.status(404).send('这是404,表示路由没有匹配到')    
})
```

**内置中间件**

```tsx
// 在项目根目录下public目录中放置静态文件 然后在浏览器里访问localhost:8000/文件名时,会自动在public寻找该文件并响应
app.use(express.static('public'))

// 使用虚拟路径,指定一个虚拟路径(原文件夹下不存在该路径),浏览器里访问localhost:3000/文件名,和访问localhost:8000/static/文件名时 效果一样 起到注明效果
app.use('/static',express.static('public'))
```
