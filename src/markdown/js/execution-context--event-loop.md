## 事件循环

js 是一个单线程语言，即在同一时刻只能有一个代码在执行，但是借助浏览器的多引擎，可以让 js 将耗时的任务放在另一个引擎上进行，等待任务结束后再放回浏览器的 js 执行引擎中去执行，这便称为 `异步`，而 js 同步与异步代码的执行顺序由事件循环（event loop）来控制

### 异步

**异步原理**

js 是单线程语言，但是 js 的宿主环境（浏览器，Node）是多线程的，所以具备了异步的属性，浏览器的内核是多线程的，它们在内核制控下相互配合以保持同步

一个浏览器至少实现三个常驻线程 —— JS引擎线程、UI渲染线程、异步处理线程（包括事件触发线程、http 请求线程、定时触发器线程）

- JS 引擎线程：单线程执行，一直等待着任务队列中任务的到来，然后加以处理，因此浏览器无论什么时候都只有一个 JS 线程在运行 JS 程序
- UI渲染线程：负责渲染浏览器界面，当界面需要 `重绘` 或者由于某种操作引发 `回流` 时，该线程就会被执行，UI渲染线程与 JS 引擎（包括异步处理引擎）是互斥的，当JS引擎执行时 UI 线程会被挂起，UI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行
- 事件触发线程，当一个异步任务被触发时该线程会把异步任务添加到待处理队列的队尾，等待JS引擎处理

**常见异步任务**

- 浏览器事件

- http请求

- 定时器

- 操作文件

- 建立网络连接

- 请求数据库服务

- 读取网络流数据

> 浏览器处理事件过程：浏览器开启事件触发线程，等待用户动作，事件触发线程解析为响应事件，转移到J S 引擎线程，排队等候等待 JS 引擎处理

**微任务与宏任务**

异步又分为 `微任务`与 `宏任务`，程序的执行顺序是：同步→异步[微任务→宏任务]

```tsx
// 打印： 1 2 3
setTimeout(() => {
  console.log(3)
})

Promise.resolve().then(() => {
  console.log(2)
})

console.log(1)
```

微任务（微队列） —— microtask，也称为 jobs，包括以下内容：

- Promise
- process.nextTick（Node环境独有）
- Object.observe
- MutationObserver

> 注意：声明 promise 函数是同步的，只有链式调用 resolve、reject、then 等代码块才是异步的

```tsx
// 打印: 1 2 3 4
console.log(1)

new Promise((resolve, reject) => {
  console.log(2)
  resolve()
})
.then(() => {
  console.log(4)
})

console.log(3)
```

宏异步（宏队列）—— macrotask，也称为tasks，包括以下内容：

- setTimeout
- setInterval
- setImmediate（Node环境独有）
- requestAnimationFrame（浏览器独有）
- I/O
- UI rendering（浏览器独有）

### 执行顺序

> [event loop 运行顺序机制](https://www.bilibili.com/video/BV1kf4y1U7Ln)

通常情况下，决定代码运行顺序的是函数调用栈，但是当有异步代码块，如 `setTimeout` 时，便很难再用函数调用栈去解释，栈的调用顺序是后进先出，而事件循环控制任务顺序使用的是队列，先进先出，即同步的代码块使用执行栈的规则执行，而异步代码块则通过队列来执行

可以把事件循环想象成一个调用栈，一个微任务队列，一个宏任务队列：

- 将异步任务推入调用栈时，不会立即执行，而是把异步任务的执行代码块放入宏任务或者微任务队列中，然后执行栈弹出异步任务，往下执行代码放入新的任务进执行栈，如此循环
- 等到执行栈中任务已经完全清空时，再将微任务按照队列顺序放入执行栈中执行并弹出
- 微任务队列完全清空时，将宏任务按照时间轴顺序放入执行栈中执行并弹出

> 注意：微任务队列的执行顺序是声明顺序，即入队列顺序，而宏任务队列的执行顺序由时间戳决定

```tsx
// 按照声明顺序入堆，但是执行顺序是按时间轴顺序，即先执行下面的函数再执行上面的
setTimeout(() =>{},1000)     
setTimeout(() =>{},0)
```

![avatar](https://img-blog.csdnimg.cn/20210603172437407.png)

**事件循环工作机制例子**

```tsx
// 打印顺序 1 2 3 4 5 6
const p = new Promise(resolve => {
  console.log(1)
  resolve(4)
})

function fun1() {
  console.log(2)
}

function fun2() {
  setTimeout(() => {
    console.log(6)
  })
  fun1()
  console.log(3)
  p.then(resolve => {
  console.log(resolve)
  })
  .then(() => {
    console.log(5)
  })
}

fun2()
```

上面代码的执行顺序：

1. 执行栈放入 `var p = new Promise` 放入执行后弹出
2. 执行栈放入 `console.log(1)` 执行，打印1后弹出
3. 执行栈放入 `fun2()` 执行
4. 执行栈放入 `setTimeou函数` 执行，将 `console.log(6)` 放入宏任务队列，弹出 `setTimeou函数`
5. 执行栈放入 `fun1()` 执行
6. 执行栈放入 `console.log(2)` 执行，打印2后，执行栈依次弹出 `console.log(2)` ，`fun1()`
7. 执行栈放入 `console.log(3)` 执行，打印3后弹出
8. 执行栈放入 第一个`p.then` 执行，将 `console.log(resolve)` 放入微任务队列后弹出 `p.then`
9. 执行栈放入第二个 `p.then` 执行，将 `console.log(5)` 放入微任务队列后，依次弹出 `p.then`，`fun2()`此时执行栈可执行代码已完全清空，开始将微任务队列代码放入执行栈
10. 执行栈放入`console.log(resolve)`执行，打印4后弹出
11. 执行栈放入`console.log(5)`执行，打印5并弹出，此时微任务队列已清空，开始将宏任务队列代码放入执行栈
12. 执行栈放入 `console.log(6)` 执行，打印6并弹出，清空宏任务队列，此时代码完全结束