## 基本类型

数据类型分为两大类：

- 原始类型（值类型）：`Number`、`String`、`Boolean`、`Symbol`、`Null`、`Undefined`
- 引用类型：`Object`、`Array`、`Function` 等（都是由Object派生出来的）

原始类型的值无法个别修改，只能重新赋值

```tsx
var srt = 'abc'
str[1] = 'd'	// str = 'abc'
```

引用类型可以直接修改个别值，但是栈中变量的指向不会更改，是直接修改了堆里的数据，所以引用类型的比较是比较引用地址而非堆里的值

```tsx
let obj1 = {x: 1}
let obj2 = {x: 1}

obj1 === obj2     
console.log(obj1 === obj2)    // false，虽然数据一样，但是obj1和obj2在堆里是两块地方

obj1 = obj2  
obj2.x = 2
console.log(obj1.x)           // 2，此时obj1指向的堆与obj2相同
```



-----

### 包装类

js 提供了三个包装类，用于将值类型隐式转换为对象，从而能调用特定数据类型的属性或方法：

- `String()`：将 string 类型转换为 String 对象
- `Number()`：将 number 类型转换为 Number 对象
- `Boolean()`：将 boolean 类型转换为 Boolean 对象

```tsx
var str = '123'
str.replace()                   // 值类型是不会具有replace方法的

// 上面的操作实际上是js内部自动做了隐式转换，等同于：
var str = '123'
var strObj = new String(str)    
str = strObj.replace()          // 调用String原型上的方法
strObj = null                   // 最后会将中间产生的实例清除，不占用内存
```

> 实际开发中不会使用包装类，因为会出现很多与预期不符的事情

```tsx
const bool1 = false
const bool2 = new Boolean(false)
console.log(typeof bool1)       // boolean
console.log(typeof bool2)       // object 

if(obj){    
	console.log('程序运行')     // 因为传的是一个对象 因此无论里面是什么都会执行
}
```

> 注意包装类和显示转换的区别

```tsx
const num = 123
const str1 = String(num)
const str2 = new String(num)

console.log(typeof str1)    // string
console.log(typeof str2)    // object
```



----

### 数据转换

在进行不同数据类型的操作时，js 会自动进行隐式转换

```tsx
// object与string
const obj = {}
const str = '[object Object]'
console.log(obj == str)       // true

// string与boolean
console.log(!!'abc')          // true
console.log(!!'')             // false

// string与number
console.log( 4 + 'px')        // 4px
console.log( 4 - 'px')        // NaN(运算符号中只有'+'发生字符串拼接)

// boolean与number
console.log(0 == false)       // true
console.log(1 == true)        // true
console.log(2 == true)        // false
console.log(2 == false)       // false(比较时隐式转换booelan转number时只会转为0或1)
```

**转换规则**

|            值            |   转字符串   |  转数值  | 转布尔 |        转对象         |
| :----------------------: | :----------: | :------: | :----: | :-------------------: |
|        undefined         | 'undefined'  |   NaN    | false  |       TypeError       |
|           null           |    'null'    |    0     | false  |       TypeError       |
|           ' '            |      /       |    0     | false  |    new String(' ')    |
|     '1.2'(数字类型)      |      /       |   1.2    |  true  |   new String('1.2')   |
|    'abc'(非数字类型)     |      /       |   NaN    |  true  |   new String('abc')   |
|            0             |     '0'      |    /     | false  |     new Number(0)     |
|           - 0            |     '0'      |    /     | false  |    new Number(-0)     |
|           NaN            |    'NaN'     |    /     | false  |    new Number(NaN)    |
|         Infinity         |  'Infinity'  |    /     |  true  | new Number(Infinity)  |
|        - Infinity        | '- Infinity' |    /     |  true  | new Number(-Infinity) |
|           true           |    'true'    |    1     |   /    |   new Boolean(true)   |
|          false           |   'false'    |    0     |   /    |  new Boolean(false)   |
|       {}(任意对象)       |   下面介绍   | 下面介绍 |  true  |           /           |
|       \[](空数组)        |     ' '      |    0     |  true  |           /           |
| \[1](仅一个数字元素数组) |     '1'      |    1     |  true  |           /           |
|     \[1,2](其他数组)     |   下面介绍   |   NaN    |  true  |           /           |
|    function(任意函数)    |   下面介绍   |   NaA    |  true  |           /           |

**引用类型转换**

当一个引用类型要去和一个值类型去做比较时，引用类型会尝试将自己转换为值类型，其中涉及到两个方法：

- `Object.valueOf( )`
- `Object.toString( )`

首先会进行调用 `value.of` 方法，如果返回值仍不为值类型，则会调用 `toString` 方法

```tsx
const arr = [1,2,3]
const fun = function() { console.log('this is a function') }
const obj = { value: 1 }

// 引用类型使用valueOf()返回的是本身
console.log(arr.valueOf())		// [1,2,3]
console.log(fun.valueOf())		// ƒ () { console.log('this is a function') }
console.log(obj.valueOf())		// { value: 1 }

// 引用类型执行toString()后结果
console.log(arr.toString())		// '1,2,3'
console.log(fun.toString())		// 'function() { console.log('this is a function') }'
console.log(obj.toString())		// '[object Object]'

// 验证为string类型
console.log(arr.toString() === '1,2,3')             // true
console.log(fun.toString() === 'function() { console.log(\'this is a function\') }')      // true
console.log(obj.toString() === '[object Object]' )  // true		
```

**转换方法**

显示转换：

```tsx
Number()
String()
Boolean()
Object()
```

对象和字符串相互转换：

```tsx
const obj = {x: 1}
const result1 = obj.toString()
const result2 = JSON.stringify(obj)
const result3 = JSON.parse(result2)
console.log(result1)    // '[object Object]'  
console.log(result2)    // '{\"x\":1}'
console.log(result3)    // {x: 1}
```



-----

### 数据比较

> [数据类型比较时隐式转换规则](https://www.cnblogs.com/chenmeng0818/p/5954215.html)

数据类型比较出现在 `==` 与 `===` 运算符中，其中 `==` 如果出现在不同数据类型之间会产生隐式转换

> 值类型比较是值的比较：值相等就相等（`==`），值和类型都相等就恒等（`===`）

```tsx
const str = '1'
const number = 1
console.log(str == number)    // true
console.log(str === number)   // flase
```

> 引用类型比较是引用内存地址的比较：即使两个引用类型包含同样的属性及相同的值，它们也是不相等的

```tsx
const obj1 = {}
const obj2 = {}
const obj3 = obj1

console.log(obj1 == obj2)     // false
console.log(obj1 == obj3)     // true
console.log(obj1 === obj3)    // true
```

比较规则：如果不是同数据类型，则只能隐式向下转换为相同数据类型为止再进行比较



![avatar](https://img-blog.csdnimg.cn/20210607153341744.png)

如 object 要和 boolean 进行比较：

1. object 转换为 string，然后再转换为 number
2. boolean 转换为 number
3. number 与 number 同类型数据，可以直接进行比较

```tsx
const obj = {}
const arr = []

console.log(Number(obj))    // NaN
console.log(Number(arr))    // 0(这里是因为数组转字符串的结果为数组内的元素，当空数组时则等于空字符，空字符转boolean为0)

console.log(obj == true)    // false
console.log(obj == false)   // false(obj转换number为NaN,boolean转number为0或1，所以都不相等)
console.log(arr == true)    // false
console.log(arr == false)   // true
```

> 注意只是类型比较时适用，不适用于类型转换，这是因为类型比较只能由上图中关系向下转换导致的，而类型转换没有上下关系

```tsx
const num = 2
console.log(Boolean(num))     // true(类型转换，非0数字转boolean为true)
console.log(str == true)      // false(类型比较，boolean只能向下转换为0或1，永远不可能为2) 

// > ![]是类型转换，[]转boolean为true，取反为false，然后boolean与boolean直接比较
console.log([] == false)      // true
console.log(![] == false)     // true
```

> 特殊值比较，和 boolean 相比时其实就是看转换为 number 类型后值是否为0或1

```tsx
console.log(NaN == NaN)           // false
console.log(null == undefined)    // true
console.log([] == false)          // true
console.log({} == true)           // false
console.log({} == false)          // false
console.log(null == true)         // false
console.log(null == false)        // false
```

> 数据类型比较只出现在 `==` 运算符，其他操作皆是数据类型转换

```tsx
// 这里不是类型比较，而是相当于Boolean(obj)，结果为true，和类型比较有所区别
const obj = {}
if(obj) {
  console.log('程序运行')   // 程序运行
}
```



----

### 类型检测

**检测数据类型**

一般使用 `typeof` 来进行简单的数据类型检测

```tsx
console.log(typeof 123)               // number
console.log(typeof '123')             // string
console.log(typeof true)              // boolean
console.log(typeof undefined)         // undefined
console.log(typeof null)              // object
console.log(typeof Symbol('123'))     // symbol

console.log(typeof {})                // object
console.log(typeof [])                // object
console.log(typeof function(){})      // function
console.log(typeof new Date())        // object
console.log(typeof new RegExp())      // object
console.log(typeof new Error())       // object
console.log(typeof new Map())         // object
console.log(typeof new Set())         // object
```

> js 在底层存储变量的时候会在变量的机器码的低位1-3位存储其类型信息（000：对象，010：浮点数，100：字符串，110：布尔，1：整数），但是null所有机器码均为0，直接被当做了对象来看待

可以看到，`typeof` 在判断引用类型 和 null 时，其结果都是 object，容易造成混淆，因此判断上述类型可以使用下面方法

```tsx
console.log(Object.prototype.toString.call(123))              // '[object Number]'
console.log(Object.prototype.toString.call('123'))            // '[object String]'
console.log(Object.prototype.toString.call(true))             // '[object Boolean]'
console.log(Object.prototype.toString.call(undefined))        // '[object Undefined]'
console.log(Object.prototype.toString.call(null))             // '[object Null]'
console.log(Object.prototype.toString.call(Symbol('123')))    // '[object Symbol]'

console.log(Object.prototype.toString.call({}))               // '[object Object]'
console.log(Object.prototype.toString.call([]))               // '[object Array]'
console.log(Object.prototype.toString.call(function(){}))     // '[object Function]'
console.log(Object.prototype.toString.call(new Date()))       // '[object Date]'
console.log(Object.prototype.toString.call(new RegExp()))     // '[object RegExp]'
console.log(Object.prototype.toString.call(new Error()))      // '[object Error]'
console.log(Object.prototype.toString.call(new Map()))        // '[object Map]'
console.log(Object.prototype.toString.call(new Set()))        // '[object Set]'
```

**自定义实例检测**

上述方法无法进行自定义构造函数的类型检测，可以使用原型链上的方法来检测实例， 也可以直接用 `instanceof`  判断实例是否属于指定构造函数

```tsx
function Person(name) {
  this.name = name
}
const jack = new Person('jack')

console.log(typeof jack)                              // object
console.log(Object.prototype.toString.call(jack))     // '[object Object]' 
console.log(jack instanceof Person)                   // true
console.log(jack.constructor === Person)              // true
```

由于引用类型都是源于 `Object` 构造函数，因此可以使用此方法判断一个数据是值类型还是引用类型

```tsx
console.log(123 instanceof Object)                // false
console.log('123' instanceof Object)              // false
console.log(true instanceof Object)               // false
console.log(undefined instanceof Object)          // false
console.log(null instanceof Object)               // false
console.log(Symbol('123') instanceof Object)      // false

console.log({} instanceof Object)                 // true
console.log([] instanceof Object)                 // true
console.log(function(){} instanceof Object)       // true
console.log(new Date() instanceof Object)         // true
console.log(new RegExp() instanceof Object)       // true
console.log(new Error() instanceof Object)        // true
console.log(new Map() instanceof Object)          // true
console.log(new Set() instanceof Object)          // true
```

