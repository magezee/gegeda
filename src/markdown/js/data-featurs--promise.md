## Promise

### 特性

#### 创建实例

一：使用构造函数创建，该方式接受一个回调函数，其中会传进去 `resolve` 和 `reject` 方法

```tsx
const promise = new Promise((resolve, reject) => {
  resolve('data')
})

promise.then((data) => {
  console.log(data)                         // data，后打印
})

console.log(promise instanceof Promise)     // true，先打印
```

> 该方法的好处是灵活，可以控制创建 promise 实例时做的额外操作，但是代码比较累赘
>
> 代码执行构造函数时是同步的，只有开始链式调用的时候才是异步

二：使用静态方法 `Promise.resolve()` 或 `Promise.reject()` 创建

```tsx
const promise = Promise.resolve('data')
promise.then((data) => {
  console.log(data)       // data
})
```

> `Promise.resolve()` 是 `new Promise((resolve) => { resolve() })` 的语法糖，功能完全一样，reject 方法同理
>
> Promise 的链式调用过程中，每一次链式调用链式方法（如 `resolve`、`reject`、`then` 、`catch`、`finally`）返回的都是一个全新的 promise 实例，因此该方法自然也可以当成创建 promise 使用

声明实例是是同步操作，只有开始链式调用才会产生异步任务

```tsx
const promise = new Promise((resolve) => {
  resolve('promise')
})

const promiseTask = promise.then(() => 'promiseTask')

console.log('同步任务开始.....')
console.log('promise:')
console.log(promise)
console.log('promiseTask:')
console.log(promiseTask)

setTimeout(() => {
  console.log('异步任务开始.....')
  console.log('promise:')
  console.log(promise)
  console.log('promiseTask:')
  console.log(promiseTask)
})
```

![](https://img-blog.csdnimg.cn/20210712200133701.png)

-----

#### 状态变更

Promise 有三种状态：

- Pending：进行中
- Resolved：已完成（该状态也称为 `fulfilled`）
- Rejected：已失败

其中状态更改只有两种：

- Pending → Resolved
- Pending → Rejected

> 一个 promise 的状态从 pengding 进到另一任意状态时，该 promise 的状态就会一直停留在该状态，无法被更改
>
> 链式调用中如果没有发生错误，则都是 `pending → resolved` 的状态转变

------

#### 异步阻塞

在 promise 的链式调用中，会等待上一个 promise 的状态置为非 `pending` 才会开始执行下一个，这里需要注意的是，阻塞只对 promise 有效，无法直接作用于其他异步函数

```tsx
Promise.resolve()
  .then(() => {
    setTimeout(() => {
      console.log('执行了setTimeout方法')
    })
  })
  .then(() => {
    console.log('任务完成')
  })
```

![](https://img-blog.csdnimg.cn/20210712200955794.png)

> 如果想阻塞这些任务需要用 promise 进行封装

```tsx
Promise.resolve()
  .then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('执行了setTimeout方法')
        resolve()
      })
    })
  })
  .then(() => {
    console.log('任务完成')
  })
```

![](https://img-blog.csdnimg.cn/20210712201220279.png)

-------

#### 数据传递

promise 的数据传递只能由下一个链式调用接受上一个数据，无法跨级传递数据

```tsx
Promise.resolve('A')
  .then((data) => {
    console.log(data)				// A
    return 'B'
  })
  .then((data) => {
    console.log(data)				// B
  })
```

> then 的回调方法中使用的是 `return` 传递结果，而 Promise 使用 `resolve` 传递结果，这是因为编译器会将 then 中 return 的值解析为 `return Promise.resolve(...)`，相当于返回了一个新的 promise 实例

-------

#### 错误处理

promise 使用 `reject` 和 `catch` 捕获错误

> reject 方法返回的是一个失败状态的 promise，用于抛出错误

```tsx
const promise =  Promise.resolve().then(() => {
  return new Promise((resolve, reject) => {
    reject('出大事儿啦!!!')
  })
})

console.log(promise)

setTimeout(() => {
  console.log(promise)
})
```

![](https://img-blog.csdnimg.cn/20210712214208347.png)

> catch 方法返回的是一个成功状态的 promise，用于处理错误

```tsx
const promise =  Promise.resolve().then(() => {
  throw new Error('出大事儿啦！！！')
})
  .catch((err) => {
    console.log(err)
    return '错误信息'
  })

console.log(promise)

setTimeout(() => {
  console.log(promise)
})
```

![](https://img-blog.csdnimg.cn/20210712214446706.png)

关联关系：

- 上一个 promise 置为 reject 状态后，其数据会被传入下个 then 方法的第二个回调函数，如果没有进行该回调函数的声明，则数据会被之后的 catch 方法捕获
- 如果是网络原因造成的错误，则错误只能由 catch 捕获

> 所以一般直接用 catch 方法就完事儿了

```tsx
const promise =  Promise.reject('出大事儿啦!!!')
  .then(
    (data) => {console.log(data)},      // 无数据打印
    (err) => {console.log(err)}         // 出大事儿啦!!!
  )
```

```tsx
const promise =  Promise.reject('出大事儿啦!!!')
  .then(
    (data) => {},      
    (err) => {}                
  )
  .catch((err) => {
    console.log(err)                    // 无数据打印，因为错误已经在之前被捕获到了
  })
```

处理顺序：如果其中一个 promise 置为了失败状态，则在错误捕获前的 promise 任务不会被执行

```tsx
// > 3、4任务不会被执行，使用then的第二个回调函数的方式捕获错误同样功能
Promise.resolve()
  .then(() => {console.log('执行第1个任务')})
  .then(() => {
    console.log('执行第2个任务')
    throw new Error('出大事儿啦!!!')
  })
  .then(() => {console.log('执行第3个任务')})
  .then(() => {console.log('执行第4个任务')})
  .catch((err) => {
    console.log('执行第5个任务')
    console.log(err)
  })
  .then(() => {console.log('执行第6个任务')})
  
```

![](https://img-blog.csdnimg.cn/20210712221529873.png)

> 如果存在多个错误，则捕获 `出现错误 → 捕获` 过程中最开始的错误

```tsx
Promise.reject('出大事儿啦!!!')
  .then(() => {
    throw new Error('又出大事儿啦!!!')
  })
  .catch((err) => {
    console.log(err)                      // 出大事儿啦!!!
  })
  .catch((err) => {
    console.log(err)                      // 无数据打印
  })
  .then(() => {
    throw new Error('又又出大事儿啦!!!')
  })
  .catch((err) => {
    console.log(err)                      // 又又出大事儿啦!!!
  })
  
```



------

### Promise方法

#### 链式调用

**promise.then (callback?, errorCallback?)**

- 功能：链式调用下一个任务
- 参数：
  - `callback?: function(data)`：
    - data：上一个 promise 成功时传递的数据
  - `errorCallback?: function(error)`：
    - error： `出现错误 → 捕获` 过程中最开始的错误
- 返回值：`Promise`：返回一个新的 promise

```tsx
Promise.resolve('传递的数据')
  .then((data) => {
    console.log(data)       // 传递的数据
  })
  .then((data) => {
    console.log(data)       // undefined，因为上一个promise没有值传递
  })
```

------

**promise.catch (callback?)**

- 功能：捕获链式任务过程中的错误
- 参数：
  - `callback?: function(error)`：
    - error： `出现错误 → 捕获` 过程中最开始的错误
- 返回值：`Promise`：返回一个新的 promise

```tsx
Promise.reject('出大事儿啦!!!')
  .catch((err) => {
    console.log(err)      // 出大事儿啦!!!
  })
```

-------

**promise.finally (callback?)**

- 功能：无论任务链是否有报错，都会执行该方法
- 参数：
  - `callback?: function()`：执行内容
- 返回值：`Promise`：返回一个新的 promise

```tsx
new Promise((resolve, reject) => {
  resolve()
})
  .then(() => new Promise((resolve, reject) => {
    reject()
  }))
  .finally(() => {
    console.log('任务完毕')       // 任务完毕
  })
```



-------

#### 并行处理

**Promise.all (promiseTasks)**

- 功能：并行处理多个 promise 任务，只有全部的 promise 都成功了返回的 promise 才会成功，否则失败
  - 成功时，将各 promise 传递的数据按照任务声明顺序存在一个数组中，传递给下一个 promise
  - 失败时，将首个失败的 promise 错误信息传递给下一个 promise
- 参数：
  - `promiseTasks: Array<Promise>`：promise 任务集
- 返回值：`Promise`：返回一个新的 promise，传递包含所有成功任务数据数组，或首个失败任务信息

> 每个 promise 在并行处理的过程中是独立的，因此不会因为某个 promise 失败了而影响到其他的 promise，它只影响并行函数的结果

```tsx
// > 顺序打印 1 5 10，说明是并行处理任务
const delay = (time, callback) => new Promise((resolve) => {
  setTimeout(() => {
    callback()
    resolve(time)
  }, time)
})

const result = Promise.all([
  delay(10, () => {console.log(10)}),
  delay(1, () => {console.log(1)}),
  delay(5, () => {console.log(5)}),
])

result.then((data) => {
  console.log(data)       // [ 10, 1, 5 ]
})
```

> `Promise.all ` 在任务成功时会阻塞所有任务，直到所有任务都成功了才会继续往下链式调用，但是如果有任意任务失败了，立即会跳出该方法往下链式调用（不会影响 `Promise.all` 内部 promise 任务集的继续执行）

```tsx
// > 顺序打印 出大事啦!!! 1 5 10，说明 Promise.all 失败时立即退出链式调用下一个任务
const result = Promise.all([
  delay(10, () => {console.log(10)}),
  delay(1, () => {console.log(1)}),
  Promise.reject('出大事啦!!!'),
  delay(5, () => {console.log(5)}),
  Promise.reject('又出大事啦!!!'),
])

result.then(
  () => {},
  (err) => {console.log(err)}       // 出大事啦!!!
)
```

------

**Promise.race (promiseTasks)**

- 功能：并行处理多个 promise 任务，只要其中一个 promise 非 pengding 状态则立即跳出该方法往下链式调用（其他仍在执行的任务不会被中断，继续执行）
- 参数：
  - `promiseTasks: Array<Promise>`：promise 任务集
- 返回值：`Promise`：返回一个新的 promise，传递首个成功或失败任务的数据

```tsx
// > 顺序打印 1 5 10
const delay = (time, callback) => new Promise((resolve) => {
  setTimeout(() => {
    callback()
    resolve(time)
  }, time)
})

const result = Promise.race([
  delay(10, () => {console.log(10)}),
  delay(1, () => {console.log(1)}),
  delay(5, () => {console.log(5)}),
])

result.then((data) => {
  console.log(data)       // 1
})
```

------

**Promise.allSettled (promiseTasks)**

- 功能：并行处理多个 promise 任务，只有全部的 promise 都为非 penging 状态时才会继续往下链式调用
- 参数：
  - `promiseTasks: Array<Promise>`：promise 任务集
- 返回值：`Promise`：返回一个新的 promise，传递所有 promise 的任务信息

```tsx
// > 顺序打印 1 5 10
const delay = (time, callback) => new Promise((resolve) => {
  setTimeout(() => {
    callback()
    resolve(time)
  }, time)
})

const result = Promise.allSettled([
  delay(10, () => {console.log(10)}),
  delay(1, () => {console.log(1)}),
  Promise.reject('出大事啦!!!'),
  delay(5, () => {console.log(5)}),
  Promise.reject('又出大事啦!!!'),
])

result.then((data) => {
  console.log(data)       
})
```

![](https://img-blog.csdnimg.cn/20210713140833851.png)



-------

### 使用技巧

#### 延时函数

使用 promise 制作一个延时函数可以放在 promise 任务链或 async 函数中来阻塞异步操作

```tsx
// 顺序打印 1 2 3
const delay = (time, callback) => new Promise((resolve) => {
  setTimeout(() => {
    callback()
    resolve()
  }, time)
})

const fn = async () => {
  console.log(1)
  await delay(50, () => {console.log(2)})
  console.log(3)
}

fn()
```

------

#### 超时处理

通过 `Promise.race` 的特性可以制作一个超时处理函数，往往用在网络请求超时中

> 原生 promise 无法直接取消或中断进行中的任务，最多只能通过报错来阻止数据的传递

```tsx
// 顺序打印 1 2 3
const delay = (time, callback) => new Promise((resolve) => {
  setTimeout(() => {
    callback()
    resolve()
  }, time)
})

Promise.race([
  delay(500, () => {console.log('请求结束')}),      // 模拟请求需要500ms
  delay(300, () => {throw new Error('请求超时')})
])
```

