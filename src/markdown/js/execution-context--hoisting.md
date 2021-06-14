## 提升

JS代码中，存在变量提升和函数提升

### 变量提升

变量提升特指用 `var` 声明的变量，会将该变量提升至代码顶端进行声明，然后在赋值代码行进行赋值

```tsx
console.log(x)  // undefined
var x = 'x'
console.log(x)  // 'x'
```

> 实际代码执行顺序：

```tsx
var x 
console.log(x)
x = 'x'
console.log(x)
```

**let和const**

使用 `let` 和 `const` 声明的变量不存在变量提升（ES6后几乎已经不再使用 var 进行变量声明）

> const 在声明时必须赋值且声明后的变量值不可更改（如果是引用类型可以更改里面内容）

特点：

- 不能在同一作用域下重复声明同名变量

- 拥有块级作用域，不会影响外部

```tsx
// var不存在块级作用域，会直接提升到外部，等同于声明了一个x变量，然后进行两次赋值，let在不同作用域内声明了两个不同y变量
var x = 'x'
let y = 'y'
{
  var x = 'xx'
  let y = 'yy'
}

console.log(x)    // xx
console.log(y)    // y
```

- 不进行变量提升，不会声明在 window 顶级对象中

```tsx
console.log(x)          // undefined
console.log(y)          // 报错，暂时性死区（变量在声明前使用）
var x = 'x'
let y = 'y'
console.log(window.x)   // 'x'
console.log(window.y)   // undefined
```

**变量提升带来的影响**

块级作用域内声明的变量影响外部（如循环代码块）

```tsx
for(var i = 0; i< 5; i++){}
console.log(i)		// 5

/// 上面代码等同于：
var i
for(i=0; i<5; i++){}
console.log(i)		// 5
```

> 比较经典的例子是循环执行异步

```tsx
/// 存在变量提升的异步打印
for(var i=0; i<5; i++){
	setTimeout(() => {
		console.log(i)					// 5 5 5 5 5
	})
}

/// 不存在变量提升的异步打印
for(let i=0; i<5; i++){
	setTimeout(() => {
		console.log(i)		      // 0 1 2 3 4
	})
}
```

> 这是因为异步比同步后执行，因此先进行了赋值操作才进行打印，而 var 声明的变量在不同的块级作用域下是同一个变量，因此先进行了所有变量的赋值在进行打印，所有打印的是最后赋值的 i，let 声明的变量在不同的块级作用域下是不同的变量，赋值不会产生影响

```tsx
var i
{
  i = 0
  setTimeout(() => {console.log(i)})		// 1
}
{
  i = 1	
  setTimeout(() => {console.log(i)})		// 1
}
```

```tsx
{
  let i = 0
  setTimeout(() => {console.log(i)})		// 0
}
{
  let i = 1	
  setTimeout(() => {console.log(i)})		// 1
}
```



-----

### 函数提升

函数提升特指用 `函数声明式` 声明的函数，会将该函数提升至代码顶端进行声明，然后在赋值代码行进行赋值

```tsx
fn()              // fn is running

function fn() {
  console.log('fn is running')
}
```

> 如果使用的是 `函数表达式` 方式声明，则不会有函数提升

```tsx
fn()							// 报错，暂时性死区
console.log(fn)		// undefined，变量提升了

var fn = function() {
  console.log('fn is running')
}
```

> 变量提升和函数提升综合例子：

```tsx
// > 因为函数提升，第二次声明覆盖同名函数内容，然后再调用两次fn
function fn() {
  console.log('first fn is running')
}
fn()      // second fn is running


function fn() {
  console.log('second fn is running')
}
fn()      // second fn is running
```

```tsx
// > 变量提升，相当于只声明一个fn，第一次赋值后调用，然后进行第二次赋值再调用
var fn = function() {
  console.log('first fn is running')
}
fn()      // first fn is running


var fn = function() {
  console.log('second fn is running')
}
fn()      // second fn is running
```



