## 模块化

> [JS模块化](https://es6.ruanyifeng.com/#docs/module-loader)

JS 模块分为两种：`CommonJS模块(CJS)` 和 `ES6模块(ESM)`，这两种模块有主要三大差异：

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
- CommonJS 模块的 require()  是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段







-----

### require

**使用**

导出：

- `module.exports` ：直接对外暴露对象（推荐）
- `exports.xxx` ：声明了一个变量指向暴露对象，再将其暴露（这个变量名多用于描述 -- 方便人理解）

```tsx
// a.js
const variate = 'variate from a'
const fn = () => {
  console.log('fn from a')
}

module.exports = { variate, fn }          // 方式一
exports.testRequire = { variate, fn }     // 方式二
```

引入：`require`

```tsx
const a = require('./a.js')

a.fn()                // 使用module.exports的调用
a.testRequire.fn()    // 使用exports的调用
```

**特点**

- 全部引入：将一个模块文件内所有导出内容全部引入，造成累赘

- 运行后加载：require 加载的是一个对象（`mondule.export` 内容为对象），该对象只有在脚本运行完才会生成

```tsx
// > 当运行b文件时，打印’a文件被执行‘，说明导入时便执行一次a.js代码中所有内容

// a.js
console.log('a文件被执行')
const variate = '变量'
const fn = () => { console.log('执行函数') }
module.exports = { variate, fn }

// b.js
const a = require('./a.js')
console.log(a)   // { variate: '变量', fn: [Function: fn] }
```

- 拷贝到引用文件：CommonJS 模块输出的是值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值

```tsx
// > a模块加载以后，它的内部变化就影响不到输出的a.counter了

// a.js
let counter = 0
function incCounter() {
  counter++
}

module.exports = {
  counter: counter,
  incCounter: incCounter,
}

// b.js
const a = require('./a')

console.log(a.counter)    // 0
a.incCounter()
console.log(a.counter)    // 0
```

> 这是因为`a.counter`是一个值类型，拷贝后不会对原始数据造成影响，如果是引用类型则可以影响（等同于浅拷贝）

```tsx
// a.js
let obj = {
  counter: 0
}
function incCounter() {
  obj.counter++
}

module.exports = {
  obj,
  incCounter
}

// b.js
const a = require('./a')

console.log(a.obj.counter)    // 0
a.incCounter()
console.log(a.obj.counter)    // 1
```





----

### import

**使用**

导出：

- `export ` ：按需导出，可重复使用导出多个内容，能直接导出变量表达式
- `export default` ：导出默认内容，只能使用一次

> 不推荐同时使用 `export default` 与 `export`

```tsx
// a.js
const variate = 'variate from a'
const fn = () => {
  console.log('fn from a')
}

export variate
export default fn
export const x = 'x'
```

引入：`import`

```tsx
import { variate, x } from './a.js'
import fn from './a.js'
```

> 可以使用 `as` 来给导出或导入的数据起别名

```tsx
import { variate, x as X } from './a.js'
```

> 可以使用 `*` 表示全部导入 `export` 语句导出的内容

```tsx
import * as a from './a.js'

a.fn()
```

**特点**

- 按需加载：可以只引入需要使用的部分内容

- 编译时加载：ES6模块不是一个对象，它相当于一种静态定义的对外接口，在代码静态解析时便会生成

```tsx
// > 当运行b文件时，没有打印任何东西，说明如果只是import不会执行a文件
// > 如果使用a文件内容的代码注释删掉，则会打印’a文件被执行‘（只打印一次），说明只有使用到文件功能时才会执行文件

// a.js
console.log('a文件被执行')
const variate = '变量'
const fn = () => { console.log('执行函数') }
export { variate, fn }

// b.js
import { variate, fn }  from './a'
// console.log(variate)
// fn()
```

- 只引用定义：ES6 模块的运行机制与 CommonJS 不一样，JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用，等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值


> 原始值变了，`import` 加载的值也会跟着变，因此 ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块

```tsx
// a.js
export let counter = 0
export function incCounter() {
  counter++
}

// b.js
import { counter, incCounter } from './a.js'
console.log(counter)    // 0
incCounter()
console.log(counter)    // 1
```

> 由于 ES6 输入的模块变量，只是一个 `符号连接`，所以这个变量是只读的，对它进行重新赋值会报错（和 const 特性一致，可以更改其内部属性）

```tsx
// a.js
export let obj = {}

// b.js
import { obj } from './a.js'

obj.prop = 'props'    // OK
obj = {}              // TypeError
```

> `export ` 输出的是同一个值，不同的文件加载该值，得到的都是同样的实例

```tsx
// a.js
class A {
  constructor() {
    this.counter = 0
    this.incCounter = function() {
      this.counter ++
    }
  }
}

export const a = new A()

// b.js
import { a } from './a'
a.incCounter()

// c.js
import { a } from './a'
console.log(a.counter)		// 1
```

**import()**

`import` 命令会被 JS 引擎静态分析，先于模块内的其他模块执行，不可置于代码块中

```tsx
if(type === 'lazy') {
  import a from './a.js'  // 报错
}
```

因此出现了 `import()` 方法用于动态加载问题，该方法返回的是一个 `Promise` 对象，代码执行到语句时才进行加载，与 require 的区别是 import() 是异步加载，而 require 是同步加载

```tsx
// a.js
console.log('执行了a')
let x = 1
let y = 2
let z = 3
export {x, y}
export default z

// b.js
// 注意，这里加载了两次a.js文件，但是只打印一次'执行了a'，这个特点和import类似
import('./a').then(mod => {
    console.log(mod)    // { x: 1, y: 2, default: 3 }
})

// 使用解构来来获取结果，但是不能解构default的值，只能用上面一种方式然后.default
import('./a').then(({x,y}) => {
    console.log(x)    // 1
    console.log(y)    // 2
})
```

> 如果需要同时加载多个模块，使用Promise的写法即可

```tsx
Promise.all([
  import('./moduleA.js'),
  import('./moduleB.js'),
  import('./moduleC.js'),
])
.then(([moduleA, moduleB, moduleC]) => {
   ···
})
```

> require 运行时加载，因此也可以做到动态加载

```tsx
// > 只有type值对应才打印'a文件被执行'

// a.js
console.log('a文件被执行')

// b.js
const type = 'lazy'
if(type === 'lazy') {
  const a = require('./a')
}
```

使用场合：

- 按需加载

```tsx
// 只有点击了按钮，才会加载这个模块
button.addEventListener('click', event => {
  import('./a.js')
  .then(module => {
    ...
  })
  .catch(error => {
    ...
  })
})
```

- 条件加载

```tsx
// 根据不同的情况，加载不同的模块
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

- 动态路径

  导入语句后只能跟常量字符串，不能跟变量，如果要实现动态控制路径，需要写成含常量字符+变量字符的形式

```tsx
const path = './index.js'
import(path)          // 报错
import(`${path}`)     // 报错

const path = 'index.js'
import(`./${path}`)   // 可以运行
```



