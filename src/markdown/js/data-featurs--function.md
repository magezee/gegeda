## 函数

### 特性

#### 匿名函数

即不需要声明函数名的函数，便于提高开发效率，往往用于赋值（函数表达式）或者回调函数传值

```tsx
const fn = function(callback) {
  callback()
}

fn(() => {
  console.log('callback is running')    // callback is running
})
```

> 不进行赋值直接使用时，可以称为 `立即执行函数`

```tsx
(function() {
  console.log('callback is running')   // callback is running
})()
```

-----

#### 纯函数

纯函数指多次执行一个函数，输入的形参相同，则结果一定相同的函数，同时，函数与外界交换数据只有一条渠道 `输入形参 → 输出返回值`，不会影响外界的非输入值和非接收返回值

```tsx
let result = undefined
let num = 0

const fn = (x, y) => {
  return x + y
}

// 只要传入形参相同，则结果一定相同，且不会影响外部数据num
result = fn(1, 2)
result = fn(1, 2)
```

> 非纯函数每次调用都会影响外部数据，调用后结果无法估计

```tsx
let result = undefined
let num = 0

const fn = (x, y) => {
  num += x + y
  return x + y
}

// 每次调用都会影响外部数据num
result = fn(1, 2)
console.log(num)      // 3
result = fn(1, 2)
console.log(num)      // 6
```

> 常见非纯函数种类：
>
> - 每次返回值不相同，如 `Math.ramdon()`
> - 影响外部数据，如 `array.push()` 会对原数组进行更改，执行多次原数组内容不断变化

-----

#### arguments对象

`arguments` 是一个类数组对象，在函数被调用时被隐式传进函数作用域中，因此可以在函数内直接读取

```tsx
function fn(x, y, z) {
  console.log(arguments)    // [Arguments] { '0': 1, '1': 2 }
}

fn(1, 2)
```

arguments 对象拥有 `callee` 属性，指向被调用函数

```tsx
function fn(){
  console.log(arguments.callee === fn);	// true
}

fn()
```

-----

#### rest数组

`rest` 用于获取函数未显式接收的参数，和 arguments 对象不同，rest 需要显式声明才能使用，语法是 `...变量名`

```tsx
function fn(...value) {
  console.log(value)    // [ 1, 2 ]
}

fn(1, 2)
```

> arguments 存储的是全部的参数值，而 rest 只读取没有明确定义形参的参数值（因此 rest 参数必须被声明在形参最后）

```tsx
function fn(value, ...params) {
  console.log(value)          // 1
  console.log(params)         // [2,3,4,5]
  console.log(arguments)      // [Arguments] {'0':1, '1':2, '2':3, '3':4, '4':5}
}

fn(1,2,3,4,5)
```



------

### 箭头函数

**特点**

与普通函数的区别：

- 不绑定 this，无法通过更改 this 方法更改，它的值和最近的父级普通函数的 this 值相同

```tsx
var name = 'global'
const A = {
  name: 'A',
  A_fn: function() {
    return {
      name: 'B',
      B_fn: function() {
        return {
          name: 'C',
          C_fn: () => {
            console.log(this.name)
          }
        }
      }
    }
  }
}

// 箭头函数this值与最近父级普通函数的this值相同，即与B_fn的this相同，B_fn的this指向A_fn的返回对象，所以name为B
A.A_fn().B_fn().C_fn()      
```

> 在 node 环境中，如果箭头函数没有 this 来源则指向一个空对象，而在浏览器环境中则指向 window，所以下面代码如果在 node 环境下调试结果会为 undefined

```tsx
var name = 'global'
const A = {
  name: 'A',
  A_fn: () => {
    return {
      name: 'B',
      B_fn: () => {
        return {
          name: 'C',
          C_fn: () => {
            console.log(this.name)
          }
        }
      }
    }
  }
}

// // 箭头函数找不到父级普通函数的this，因此this.name等同于wiondow.name值为'global'
A.A_fn().B_fn().C_fn()
```

- 没有 arguments 对象，取而代之的使用 rest 获取参数

```tsx
const fn = function() {
  console.log(arguments)          // [Arguments] { '0': 1, '1': 2 }
}

const arrowFn = (...rest) => {
  console.log(arguments)          // 报错：arguments is not defined
  console.log(rest)               // [ 1, 2 ]
}

fn(1,2)       
arrowFn(1,2)   
```

- 没有原型属性，所以不能充当构造函数使用 new 关键字生成实例

```tsx
const Fn = () => {}

const fn = new Fn()           // 报错： Fn is not a constructor
console.log(fn.prototype)     // undefined
```

- 不能充当 Generator 函数

```tsx
// 没有这种写法，语法报错
const fn = (x)* => {
  yield x
}
```

**使用技巧**

- 箭头函数直接返回返回值时，可以省略花括号，如果返回的是个对象，为了避免花括号混淆，需要加上一对圆括号

```tsx
const fn = (x, y) => x + y 
const fn_ = (x, y) => ({result: x + y})

console.log(fn(1, 2))       // 3
console.log(fn_(1, 2))      // { result: 3 }
```



-----

### Generator函数

使用 `function*` 关键字声明一个 Generator 函数

**特点**

- 调用 Generator 函数并非执行函数体内的内容，而是返回一个迭代器对象

```tsx
function* fn() {
  console.log('fn is running')
}

const g = fn()      // 不执行函数体，不会执行打印操作
console.log(g)      // Object [Generator] {}
```

- 执行函数需要通过迭代器对象的 `next` 方法来分步执行Generator 函数中的任务
  - 当迭代器对象调用 next 方法时，会开始执行函数体，直到遇到 yield 中断执行或 return 跳出函数
  - 继续调用 next 时，会从上一次的中断 yield 开始执行，直到遇到 yield 中断执行或 return 跳出函数

```tsx
function* fn() {
  console.log('任务一')
  yield 
  console.log('任务二')
  return
  console.log('任务三')
}

let g = fn()
g.next()   // 任务一
g.next()   // 任务二
g.next()   // 跳出函数，不进行打印
```

- next 方法会返回一个对象，`value` 属性表示 yield 或者 return 的返回值，`done` 表示该 Generator 函数内容是否已经全部执行完毕

```tsx
function* fn() {
  yield 1
  yield 
  return 3
}

let g = fn()
console.log(g.next())   // { value: 1, done: false }
console.log(g.next())   // { value: undefined, done: false }
console.log(g.next())   // { value: 3, done: true }
console.log(g.next())   // { value: undefined, done: true }
```

> 如果最末没有使用 `return` 而是使用 `yield` 进行返回，则需要多执行一步才会将 done 状态置为 true

```tsx
function* fn() {
  yield 1
  yield 
  yield 3
}

let g = fn()
console.log(g.next())   // { value: 1, done: false }
console.log(g.next())   // { value: undefined, done: false }
console.log(g.next())   // { value: 3, done: false }
console.log(g.next())   // { value: undefined, done: true }
```

**使用技巧**

- 在一个 Generator 函数里调用另外一个 Generator 函数时，可以使用关键字 `yield*` 将调用的 Generator 函数体里的内容全部执行完

```tsx
function* subFn() {
  console.log('子任务一')
  yield
  console.log('子任务二')
  return
}

function* fn() {
  console.log('任务一')
  yield 
  console.log('任务二')
  yield* subFn()
  console.log('任务三')
  return 
}

let g = fn()
let t1 = g.next()   // 任务一
let t2 = g.next()   // 任务二 子任务一 子任务二
let t3 = g.next()   // 任务三
```

- 在调用 next 的时候，可以配合 yield 语句来接收传递的参数（在调用 next 时，先进行赋值操作然后才往下执行）

```tsx
function* sum() {
  console.log('开始计算')
  
  let x = yield
  console.log('接收参数x:',x)
  
  let y = yield
  console.log('接收参数y:',y)
  return x + y
}

let g = sum()
let g1 = g.next()    // 开始计算
let g2 = g.next(3)   // 接收参数x: 3
let g3 = g.next(5)   // 接收参数y: 5

console.log(g1)     // { value: undefined, done: false }
console.log(g2)     // { value: undefined, done: false }
console.log(g3)     // { value: 8, done: true }
```

- 在对象中可以简写声明

```tsx
const obj = {
  *fn() {}    
}
```



------

### async函数

使用 `async function {}` 或 `async () => {}` 声明一个 async 函数，它是基于 Promise 封装成一个用同步代码习惯写异步的函数

**特点**

- 使用 `await` 关键字阻塞异步代码块，对同步代码块没有影响，保证代码可以按编写顺序执行（不使用则不会阻塞）

```tsx
function delay(callback) {
  return new Promise((resolve)=> {
    setTimeout(() => {
      callback()
      resolve()
    })
  })
}

function fn() {
  console.log(1)
  delay(() => {console.log(2)})
  console.log(3)
}

async function asyncFn() {
  console.log(1)
  await delay(() => {console.log(2)})
  console.log(3)
}

fn()          // 1 3 2
asyncFn()     // 1 2 3
```

> 一般需要阻塞的异步代码块需要用  Promise 对象进行封装，否则可能无效

```tsx
async function fn() {
  console.log(1)
  await setTimeout(()=>{console.log(2)})	
  console.log(3)
}
fn()   // 1 3 2
```

- `await` 会影响代码返回值，使用该关键字，返回的是 Promise 对象，否则返回的是 Promise 的 resolve 或 reject 结果

```tsx
function delay() {
  return new Promise((resolve)=> {
    setTimeout(() => {
      resolve('resolve返回值')
    })
  })
}

async function fn() {
  const result = await delay()
  console.log(result)
}

async function contrastFn() {
  const result = delay()
  console.log(result)
}

fn()              // Promise { <pending> }
contrastFn()      // resolve返回值
```

- `await` 的 Promise 对象变成 reject 状态时，整个 async 函数会中断，后面的程序不会继续执行

```tsx
function delay() {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      reject('reject信息')
    })
  })
}

async function fn() {
  console.log(1)
  await delay()
  console.log(2)
}

fn()  // 1
```

**async函数与Promise对象的区别**

- 错误处理方式不同：async 函数用 `try-catch` 代码块，而 Promise 使用链式调用

```tsx
async function fn() {
  try {
    const res = await Promise.reject()
  }
  catch(err) {
    console.log(err)
  }
}
```

```tsx
Promise.resolve()
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })
```

- async 函数获取中间值更方便

```tsx
async function fn() {
  const value1 = await promiseFun1()
  const value2 = await promiseFun2(value1)
  const res = await promiseFun3(value1, value2)
  console.log(res)
}
```

```tsx
function fn() {
  return promiseFun1().then((value1) => {
    return promiseFun2(value1).then((value2) => {
      return promiseFun3(value1, value2).then((res) => {
        console.log(res)
      })
    })
  })
}
```

- async 函数无法独立处理并行 Promise 任务，需要借助 Promise 的方法

```tsx
async function fn() {
  const res = await Promise.all[
    promiseFun1(),
    promiseFun2()
  ]
  return res
}
```



----

### 使用技巧

#### 可选参数

在 js 中没有可选参数的概念，因为 js 函数不传入足够的形参也不会报错，而在 ts 中需要使用可选符 `?` 手动设置可选参数

```tsx
// js写法
function fn (x, y) {
  if(y) return x + y
  else return x
}

console.log(fn(1))      // 1
```

```tsx
// ts写法
function fn (x, y?) {
  if(y) return x + y
  else return x
}

console.log(fn(1))      // 1
```

> 可选参数必须放在非可选参数后面，否则会报错

------

#### 参数默认值

为经常使用的特定形参值添加默认值，便于开发效率，只有传入 `undefined` 不会更改默认值，其他数据都会覆盖其默认值

```tsx
function fn (x, y, type = 'add') {
  switch (type) {
    case 'add': 
      return x + y
    case 'dec': 
      return x - y
    default: 
      return '参数错误'
  }
}

console.log(fn(2, 1))               // 3
console.log(fn(2, 1, 'dec'))        // 1
console.log(fn(2, 1, undefined))    // 3
console.log(fn(2, 1, null))         // 参数错误
```

> 为形参默认值可以放在任意位置

```tsx
function fn (x = 1, y) {
  console.log(arguments)    // [Arguments] { '0': 2 }
}

fn(2)
```

-----

#### 参数储存结果

看似结果储存在回调函数的参数，实际上只是将数据处理完毕后通过形参的方式传给回调函数，回调函数拿到数据而已

```tsx
function fn(callback) {
  const data = 'data'
	callback(data)                // 传进回调函数
}

fn((callbackResult) => { 
  console.log(callbackResult)    // data
})	
```

