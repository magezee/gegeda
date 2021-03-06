## 执行上下文

> [理解 js 中的执行上下文](https://juejin.cn/post/6844903682283143181)
>
> [你真的了解执行上下文吗](https://juejin.cn/post/6945240902625394718#heading-18)
>
>  [理解 JavaScript 作用域和作用域链](https://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)

执行上下文是一个执行 js 代码的环境的抽象概念，js 代码运行在执行上下文中

**执行上下文类型**

js 中有三种执行上下文类型：

- 全局执行上下文：这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中，它会执行两件事：创建一个全局的顶层对象，并且设置  `this`  的值等于这个顶层对象（一个程序中只会有一个全局执行上下文）

- 函数执行上下文：每当一个函数被调用执行时，都会为该函数创建一个独立的函数执行上下文
- Eval 函数执行上下文：执行在 `eval` 函数内部的代码也会有它属于自己的执行上下文，eval 是一个用于转义字符传为可执行代码语句的函数，js里用的不多



------

### 调用栈

当一段脚本运行起来的时候，可能会调用很多函数并产生很多函数执行上下文，为了解决管理执行上下文的问题，js 引擎创建了 `调用栈` （执行上下文栈） 来管理执行上下文

调用栈是栈结构的，因此遵循先进后出的特性，代码执行期间创建的所有执行上下文，都会交给调用栈进行管理

- 当 JS 引擎开始解析脚本代码时，会首先创建一个 `全局执行上下文` 压入栈底（这个全局执行上下文从创建一直到程序销毁，都会存在于栈的底部）
- 每当引擎发现一处函数调用，就会创建一个新的 `函数执行上下文` 压入栈内，并将控制权交给该上下文，待函数执行完成后，即将该执行上下文从栈内弹出销毁，将控制权重新给到栈内上一个执行上下文

------

**函数间没有互相调用的关系的情况**

执行完一个函数会立即进行销毁（弹出栈）并加入新执行的函数

```js
function A() {	}
function B() {  }

A()
B()
```

![avatar](https://img-blog.csdnimg.cn/20200516181834164.png)

**函数间存在调用关系的情况**

由于A函数需要调用B函数，因此A函数真正执行完后是在执行完B函数后，因此需要保留A函数的栈，同时压入B函数，等待B函数执行完后弹出B函数，然后等待A执行完再弹出A

> 因此如果函数间互相调用的次数过多，过多的栈没有被销毁，可能会出现栈溢出（如高次数的递归）

```javascript
function A() {	
	B()
}
function B() {  }

A()
```

![avatar](https://img-blog.csdnimg.cn/20200516181610672.png)



-------

### 生命周期

**创建阶段**

在代码执行前，执行上下文将经历创建阶段，在创建阶段会发生三件事

1. 绑定 this 值，默认绑定到顶层对象
2. 创建词法环境组件
3. 创建变量环境组件

词法环境：

它是一种 `标识符 —— 变量` 的映射结构（这里标识符指的是声明变量或者函数时的名字，变量则是对实际对象或值类型数据的引用），一个词法环境由两个组件组成：

- 环境记录器：用于存储变量和函数声明时的实际位置，可分为两种类型
  - 对象环境记录器：用于定义在全局上下文中的变量和函数的关系
  - 声明式环境记录器：用于存储变量、函数和参数（对于函数环境，它还包含了传递给函数的 argument 对象）
- 外部环境引用：用于访问父级作用域

```tsx
// > 标识符：number    变量：123
const number = 123
```

词法环境可分为两种类型：

- 全局环境：由于在全局执行上下文中，不可能出现上级外部引用，因此该外部环境引用为 null，它包含任意定义的全局变量，且 this 值指向顶层对象
- 函数环境：引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数（this 值需要看作用域确定）

> 在全局环境中，环境记录器的类型是 `对象环境记录器`，函数环境中，类型则是 `声明式环境记录器`

变量环境：

它同样是一个词法环境，拥有词法环境的所有属性，其环境记录器持有 `变量声明语句` 在执行上下文中创建的绑定关系

> 词法环境用来存储函数声明和变量 `let`、`const ` 的绑定，而变量环境只用来存储 `var` 的绑定

在变量环境创建阶段，js 引擎会找出变量和函数的声明，然后将其存储，`var` 声明的变量会置初始值 undefined，而 `let` 和 `const` 不会置初始值，所以可以在声明前访问 var 声明的变量（变量提升）

> 函数声明时，会在存储的时候就进行对应的函数定义赋值，所以也可以在声明前调用（函数提升）

**执行阶段**

执行阶段中，JS 代码开始逐条执行，在这个阶段，JS 引擎开始对定义的变量赋值、开始顺着作用域链访问变量、如果内部有函数调用就创建一个新的执行上下文压入上下文执行栈，并定位到下一层执行栈开始执行

```tsx
// > 创建阶段：将标识符number存储，因为是var声明，所以同时置初始值undefined
// > 执行阶段：将变量值123的引用赋予number标识符
var number = 123

// > 创建阶段：将标识符fn存储，因为是函数声明，所以同时将函数内容与fn绑定
function fn() {
  console.log('fn is running')
}
```

**销毁阶段**

函数执行完成后，当前执行上下文（局部环境）会被弹出执行上下文栈并且销毁，往上层搜索执行上下文栈并定位执行

**过程总结**

1. 创建阶段首先创建全局上下文的词法环境：首先创建 `对象环境记录器`，接着创建它的外部环境引用，值为 null

2. 创建全局上下文的变量环境：过程同上

3. 确定 this 值为顶层对象（以浏览器为例，就是 window ）

4. 如果有函数被调用，创建函数上下文的词法环境：首先创建 `声明式环境记录器`，接着创建它的外部环境引用，值为 null、顶层对象或者父级词法环境

5. 创建函数上下文的变量环境：过程同上

6. 确定 this 值

7. 进入函数执行上下文的执行阶段

8. 执行完成后进入回收阶段

> 示例：

```tsx
function foo(){
  var a = 1
  let b = 2
  {
    let b = 3
    var c = 4
    let d = 5
    console.log(a)
    console.log(b)
  }
  console.log(b) 
  console.log(c)
  console.log(d)
}   
foo()
```

第一步：调用函数前先编译并创建执行上下文，在编译阶段将 `var` 声明的变量存放到变量环境中，`let、const` 声明的变量存放到词法环境中

> 此时在函数体内部块作用域中 `let` 声明的变量不会被存放到词法环境中

![](https://img-blog.csdnimg.cn/20210609211949404.png)

第二步：函数开始执行，对变量进行赋值操作，当执行代码刚进入块作用域内时( `let b = 3` 前)，将块作用域内声明的变量及函数重复上述步奏

> 作用域块中通过 `let、const` 声明的变量，会被存放在词法环境的一个单独的区域中，这个区域中的变量并不影响作用域块外面的变量，因此示例中在函数体内块作用域中声明的变量的 b 与函数作用域中声明的变量 b 都是独立的存在
>
> 在词法环境内部，实际上维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域内部的变量压到栈顶，当该块级作用域执行完成之后，该作用域的信息就会从栈顶弹出，这就是词法环境的结构
>
> 块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，js 也就同时支持了变量提升和块级作用域

![](https://img-blog.csdnimg.cn/20210609213421273.png)

第三步：当代码执行到作用域块中的 `console.log(a)` 时，就需要在词法环境和变量环境中查找变量 a 的值了，具体查找方式是：沿着词法环境的栈顶向下查询，如果在词法环境中的某个块中查找到了，就直接返回给 js 引擎，如果没有查找到，那么继续在变量环境中查找

![](https://img-blog.csdnimg.cn/20210609214336997.png)



第四步：当函数体内块作用域执行结束之后，其内部变量就会从词法环境的栈顶弹出

![](https://img-blog.csdnimg.cn/20210609214520940.png)

第五步：当foo函数执行完毕后执行栈将foo函数的执行上下文弹出



---

### 作用域链

在 js 中，函数、块、模块都可以形成作用域（一个存放变量的独立空间），它们之间可以相互嵌套，作用域之间会形成引用关系，这条链叫做作用域链，当一个变量无法在自身作用域内找到时，会顺着作用域链往上寻找最近的一个，直至找不到返回未定义错误（作用域链不像执行上下文是抽象概念，而是真实存在的，它是一个数组结构，该结构中保存着一个个变量对象）

> 作用域链是静态的，即在声明时已经确定

```tsx
const x = 'global'

function fn() {
  console.log(x)
}

function outerFn() {
  const x = 'outerFn'
  fn()                  // global，fn在声明时的父级作用域是全局域

  function innerFn() {
    console.log(x)      // outerFn，innerFn在声明时的父级作用域是outerFn函数域
  }
  innerFn()
}

outerFn()   
```

**函数作用域链**

js 里一切皆对象。函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供 js 引擎访问的内部属性，其中一个内部属性是 `[[Scope]]`，包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问

```tsx
const number = 123

function add(x, y) {
  const sum = x + y
  return sum
}
```

在声明函数时，便会在其作用域链中填入一个全局对象，该对象包含所有全局变量

![](https://img-blog.csdnimg.cn/20210609175732171.png)

而当执行函数时，会在作用域链内部创建一个 `函数执行上下文` 的内部对象，它定义了函数执行时的环境，函数执行下文拥有自己的作用域链，用于标识符解析，初始作用域链中的全局对象的值会按照在函数中使用的顺序复制到一个新的对象 —— `活动对象`，该对象包含了函数的 this、argument对象、局部变量、命名参数，然后该对象会被推入作用域链的最前端，当函数执行上下文被销毁时活动对象也会随之销毁

> 每次调用同一个函数都会产生一个独立的函数执行上下文

函数执行过程中，每遇到一个变量，都会解析一次标识符以决定从哪里获取和存储数据，该过程从作用域头部，即活动对象开始搜索查找同名标识符，如果找到了就使用标识符对应变量，如果没有汇总到就继续搜索作用域链中的下一个对象，直至找不到即认为该标识符未定义

```tsx
let number = 123

function add(x, y) {
  const sum = x + y
  return sum
}

const result = add(3,7)
```

![](https://img-blog.csdnimg.cn/20210609220121331.png)





----

**代码优化**

从作用域链的结构可以看出，在执行上下文的作用域链中，标识符所在的位置越深，读写速度就会越慢，因为全局变量总是存在于运行期上下文作用域链的最末端，因此在标识符解析的时候，查找全局变量是最慢的

所以在编写代码的时候应尽量少使用全局变量，尽可能使用局部变量，如果一个跨作用域的对象被引用了一次以上，则应先把它存储到局部变量里再使用

```tsx
const number = 123

function fn() {
  const resultA = 1 + number
  const resultB = 2 + number
}
```

> 引用了两次全局变量 num，查找变量必须遍历整个作用域链，直到在全局对象中找到，为了避免多次遍历该过程，可以使用局部变量接收

```tsx
const number = 123

function fn() {
  const num = number
  const resultA = 1 + num
  const resultB = 2 + num
}
```



