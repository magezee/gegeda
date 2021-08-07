## 闭包

### 特性

在 js 的机制中，函数执行完后立即被销毁，因此函数中局部变量无法保存，闭包就是为了解决这个问题诞生的

由于作用域链的机制，导致了内层的函数可以访问到外层函数的局部变量，同时由于调用栈的关系，在 fn 函数内部执行 subFn 函数时，会优先执行完 subFn 函数并销毁，接着继续执行完 fn 并销毁，所以 subFn 可以安全使用 fn 内部的变量，不用担心执行中 fn 函数销毁的问题

```tsx
const fn = () => {
  let count = 0
  const subFn = () => {
    count += 1
    console.log(count)
  }
  subFn()
}

fn()    // 1
fn()    // 1
```

闭包的原理就是 fn 将 subFn返回，并且用全局变量接收，由于被全局引用因此 subFn 不会被 GC 回收掉，同时 subFn 是 fn 执行产生的，subFn 不被销毁，调用栈上的 Fn 自然无法被销毁

同时作用域链是在声明时就已经决定的，而非运行时，因此虽然 subFn 在全局环境下调用，它的父级作用域依然是 fn，因此自身内部访问不到 `count` 即寻找 fn 中的

```tsx
const fn = () => {
  let count = 0
  return () => {
    count += 1
    console.log(count)
  }
}

const subFn = fn()

subFn()     // 1
subFn()     // 2
```

![](https://img-blog.csdnimg.cn/472a1713a45447e1bf3c6e4d14d9f255.png)

> this 和闭包不同，this 的作用是指向一个变量的内存地址，以便可以访问该变量的内部数据，而闭包是作用域链间的关系，在全局中调用 subFn 的 this 指向顶层对象这点是没有问题的

```tsx
const fn = () => {
  let count = 0
  return () => {
    console.log(this)
  }
}

const subFn = fn()

subFn()     // window
```



-----

### 使用场景

#### 防抖

用于处理高频事件，即一个事件在 n 秒内再次触发，则重新计算时间

场景：

- 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求
- 调整浏览器窗口大小时，回流次数过于频繁，造成计算过多
- 文本编辑器实时保存，当无任何更改操作一秒后进行保存
- 搜索联想，用户在不断输入值时不进行联想，节约请求资源

代码思路：

- 通过闭包保存一个计时器标记，用于联系全部的执行事件函数
- 当触发事件时，清空计时器标志，取消之前执行的事件，重新开始计时

```tsx
// > 只打印一次callback is running
const fn = (time, callback, ...rest) => {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...rest)
    }, time)
  }
}

const callback = (str) => {
  console.log(str)
}

const result = fn(500, callback, 'callback is running')

result()
result()
```



-------

#### 节流

用于处理高频事件，即一个事件在 n 秒内只能执行一次

场景：

- 滚动条事件每隔 n 秒计算一次位置信息
- 视频播放每隔 n 秒计算一次进度信息
- 鼠标高频点击，在 n 秒计算只计算一次有效点击

代码思路：

- 通过闭包保存一个标记（该标记与防抖不同，仅做标记使用，不使用到计时器功能，之后用于接收 `setTimeout` 的结果也只是为了顺便赋值非 `false` 而已）
- 判断标志是否为真值，为真值则不执行，为假值则先将值置为真值，然后在延时执行完回调任务后再置为假值，阻止执行中又开始新的一个任务

```tsx
// > 每5秒打印一次callback is running
const fn = (time, callback, ...rest) => {
  let timer
  return () => {
    if(timer) return
    timer = setTimeout(() => {
      callback(...rest)
      timer = null
    }, time)
  }
}

const callback = (str) => {
  console.log(str)
}

const result = fn(5000, callback, 'callback is running')

setInterval(() => {
  result()
}, 1000)
```



------

#### 函数科里化

柯里化是编程语言中的一个通用的概念，是指把接收多个参数的函数变换成接收单一参数的函数，嵌套返回直到所有参数都被使用并返回最终结果

```tsx
const fn = (a, b, c) => {
  return a + b + c
}

fn(1,2,3)
```

柯里化是一个函数变换的过程，是将函数从调用方式：`f(a,b,c)` 变换成调用方式：`f(a)(b)(c)` 的过程，柯里化不会调用函数，它只是对函数进行转换

```tsx
const fn = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c
    }
  }
}

fn(1)
fn(2)
fn(3)
```

科里化封装函数代码思路：

- 当传入参数没有达到回调函数的参数长度时递归返回中间状态函数，直到接受参数足够才进行最终调用
- 使用闭包特性存储已经传入的参数 `rest`，确保下一次递归执行时能将全部参数传入

```tsx
const curry = (callback) => {
  const fn = (...rest) => {
    if(rest.length === callback.length) {
      return callback(...rest)
    } else {
      return (newRest) => {
        return fn(...rest, newRest)
      }
    }
  }
  return fn
}
```

**使用场景**

一、延时执行

```tsx
const callback = (a, b, c) => {
  return Number(a) + Number(b) + Number(c)
}

const result = curry(callback)

console.log(result(1)(2)(3)) 	// 6，传入全部参数后才执行
```

二、参数复用

```tsx
const fn = (lastName, familyName) => {
  return `${lastName}${familyName}`
}

const curryFn = curry(fn)
const publicFn = curryFn('阿')    // 复用此参数

console.log(publicFn('明'))       // 阿明
console.log(publicFn('东'))       // 阿东
```



----

#### 懒计算函数

功能：传入任意个参数，通过一个固定方法开始调用

代码思路：

- 使用闭包保存一个结果 `result`
- 每次执行 `sum` 返回的是 `add` 函数

```tsx
const sum = (...rest) => {
  let result = 0
  result = rest.reduce((pre, cur) => {
    return pre + cur
  },0)
  
  const add = (...rest) => {
    result = rest.reduce((pre, cur) => {
      return pre + cur
    },result)
    return add                            // 这里return add函数是重点
  }

  add.valueOf = () => {
    return result
  }

  return add
}

console.log(sum(1,2,3)(2).valueOf())    // 8
```

