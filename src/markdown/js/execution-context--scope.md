## 作用域

一共有四种作用域：

| 对象          | 类型                          |
| ------------- | ----------------------------- |
| global/window | 全局作用域                    |
| function      | 函数作用域（局部作用域）      |
| {}            | 块状作用域（if语句，for语句） |
| this          | 动态作用域                    |



-----

### 全局作用域

全局作用域特指 `global` 或 `window` 顶层对象，在浏览器环境中指的是 `window` ，在Node环境中指的是 `global` ，浏览器环境无 `global`，Node环境无 `window`

>变量只有全局变量和局部变量两种，顶层对象实质就是一个全局变量，只是因为在创建变量时全局执行上下文默认将 this 指向了该变量

**global和window**

在node环境中，使用关键字声明的对象是全局变量，而顶层对象global是比全局变量还要更高一级的，因此在作用链下寻找时，先找到全局变量 ，找不到会往上层的顶级对象中找

```tsx
// vscode下调试
const x = 'x'
global.y = 'y'						// 使用global声明顶级对象变量，和不用关键字直接声明(y = 'y')作用一样

console.log(global.x)				// undefined，顶级对象中找不到，父级无法拥有子级内容
console.log(y)						// y，全局对象中找不到，会往父级对象中找
```

在浏览器环境中，使用 `var` 关键字声明的变量在变量提升中会声明在 window 属性中

```jsx
// Chrome下调试
var x = 'x'
const y = 'y'

console.log(window.x)	// x
console.log(x)			// x
console.log(window.y)	// undefined
```

**全局作用域可能产生影响**

- 变量泄漏

  如果不使用声明语句，则相当于声明了一个顶级对象属性，不用的话实际上声明了一个全局变量（无论node环境还是浏览器环境都是），造成变量泄漏（危险）

```tsx
function fn() {
  x = 'x'
}
fn()
console.log(x)	// x
```

- this 指向顶级对象不同

  全局调用一个函数时，node环境下this指向global，浏览器环境下this指向window

```tsx
var x = 'x'

function fn () {  
	console.log(this.x)
}

fn()	
// 全局调用时，this指向顶级对象
// vscode调试打印 undefined，因为没有找不到global.x
// chrome调试打印 x，var x 等同于window.x 因此能寻找到
```

```tsx
x = 'x'

function fn () {  
	console.log(this.x)
}

fn()
// vscode调试打印 1
// chrome调试打印 1
```



-----

### 函数作用域

函数作用域即指声明函数内部的作用域

**特性**

特性一：函数作用域是一个封闭的区域，在里面声明的变量为局部变量，且只能访问上层作用域的变量，不能访问子层作用域的变量

```tsx
const global = 'global'
console.log(outer)          // 报错：outer is not defined
console.log(inner)          // 报错：inner is not defined

function outerFun () {
  const outer = 'outer'
  console.log(global)       // global
  console.log(inner)        // 报错：inner is not defined
  
  function innerFun() {
    const inner = 'inner'
    console.log(outer)      // outer
  }

  innerFun()
}

outerFun()
```

特性二：当自身作用域内存在同名变量，则取自身作用域内的变量值

```tsx
const x = 'global'
const y = 'global'

function fun() {
  const x = 'fun'
  console.log(x)    // fun
  console.log(y)    // global
}

fun()
```

特性三：变量/函数提升只会提升到函数内顶部，不会提升至外部

```tsx
console.log(x)      // 报错：x is not defined
innerFun()          // 报错：innerFun is not defined

function outerFun() {
  console.log(x)    // undefined
  innerFun()        // innerFun is running

  var x = 'outerFun'
  function innerFun() {
    console.log('innerFun is running')
  }

  console.log(x)    // outerFun
}

outerFun()
```



------

### 块级作用域

块级作用域一般以 `{}` 为范围，一般指  `存粹括号域` 、`if语句` 和  `循环语句`（注意函数的括号属于函数作用域）

**特性**

特性一：块级作用域是一个封闭的区域，在里面声明的变量为局部变量，且只能访问上层作用域的变量，不能访问子层作用域的变量

```tsx
console.log(outer)      // 报错：outer is not defined
console.log(inner)      // 报错：inner is not defined

{
  const outer = 'outer'   
  console.log(inner)    // 报错：inner is not defined

  {
    const inner = 'inner'
    console.log(outer)  // outer   
  }
}

// 代码中比较常见的块级作用域写法如下
if(true) {
  const outer = 'outer'   
  console.log(inner)  
  
  if(true) {
    const inner = 'inner'
    console.log(outer)  
  }
}
```

特性二：当自身作用域内存在同名变量，则取自身作用域内的变量值

```tsx
const x = 'global'
const y = 'global'

{
  const x = 'inner'
  console.log(x)    // inner
  console.log(y)    // global
}
```

特性三：变量提升会提升到外部，而函数提升不会

```tsx
console.log(x)      // undefined
innerFun()          // 报错：innerFun is not a function

{
  console.log(x)    // undefined
  innerFun()        // innerFun is running

  var x = 'outerFun'
  function innerFun() {
    console.log('innerFun is running')
  }

  console.log(x)    // outerFun
}
```



-----

### 动态作用域

动态作用域特指关键字 `this`，this 由函数（非箭头函数）产生，它的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定

**函数执行**

this 指向最后调用该函数的对象

```tsx
var x = 'global'

const outerObj = {
  x: 'outer',
  innerObj: {
    x: 'inner',
    fn: function() {
      const x = 'fun'
      console.log(this.x)     // inner
    }
  }
}

outerObj.innerObj.fn()		// 最后是由innerObj来调用的fn，因此该this指向innerObj
```

> 如果直接调用函数，相当于顶层对象在调用，因此如果对函数进行赋值调用，会更改其中 this 指向

```tsx
function fn() {
  console.log(this)
}

fn()       // global/window 相当于global/window.fn()


const obj = {
  x: 'obj',
  fn: function() {
    console.log(this.x)
  }
}

const fn_ = obj.fn
fn_()		// undefined，因为this指向顶层对象
```

> 函数A内部直接调用另外一个函数B时，函数B的 this 指向顶级对象

```tsx
var x = 'window'

function showThis() {
  console.log(this.x)
}

const obj = {
  x: 'obj',
  fn: function() {
    console.log(this.x)     // obj      
    showThis()              // window
    showThis.call(this)     // obj

    const o = {}
    o.x = 'o'
    o.fn = showThis
    o.fn()                  // o
  } 
}

obj.fn()
```

**构造函数**

> 使用 new 声明构造函数实例时，如果构造函数中 return 了引用类型，则直接返回，否则自动生成新的实例对象

构造函数 return 值类型时，this 指向实例

```tsx
function fn() {  
  this.user = 'lucy'
  return 'lucy'
}

const obj = new fn()         
console.log(obj.user)    // lucy
```

构造函数 return 引用类型时，this 指向该引用类型（null 是一个特殊对象，返回 null 时与返回值类型效果同等 ）

```tsx
function fn() {  
  this.user = 'lucy'
  return {user:'jack'}
}

const obj = fn()         // 返回对象时，不使用 new 关键字结果也一样
console.log(obj.user)    // jack
```

**箭头函数**

箭头函数与普通函数的区别：

- 是匿名函数，不能作为构造函数，不能使用new
- 没有原型属性

- 没有 arguments 对象，取而代之用 rest 参数
- 不能当做 Generator 函数,不能使用 yield 关键字
- 不绑定 this，会捕获其所在的上下文的 this 值，作为自己的 this 值，箭头函数的 this 永远指向其上下文的  this ，任何方法都改变不了其指向，如  `call()，bind()，apply()` ，调用时只相当于传入参数

箭头函数不会产生 this，若函数内有 this，则 this 只能由父级函数继承而来，并不是谁调用指向谁，要看父级函数的this指向，追踪到最近的一个父级this，不会再往上寻找

```tsx
var name = 'global'
const A = {
  name: 'A',
  B: {
    x: 'B',
    C: function() {
      const D = {
        x: 'D',
        showThis: () => {
          console.log(this.name)
        }
      }
      D.showThis()
    }
  }
}
A.B.C() 	// 箭头函数this往上找，this从fn()传来，由B调用的C，因此this指向B，所以this.name等同于B.name值为'B'
```

> 在 node 环境中，如果箭头函数没有 this 来源则指向一个空对象，而在浏览器环境中则指向 window，所以下面代码如果在 node 环境下调试结果会为 undefined

```tsx
var name = 'global'
const A = {
  name: 'A',
  B: {
    x: 'B',
    C: () => {
      const D = {
        x: 'D',
        showThis: () => {
          console.log(this.name)
        }
      }
      D.showThis()
    }
  }
}
A.B.C() 	// 箭头函数this往上找，找不到函数传来的this，因此this.name等同于wiondow.name值为'global'
```





