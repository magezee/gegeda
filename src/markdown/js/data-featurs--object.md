## 对象

### 特性

**枚举属性**

对象的属性可以分为 `可枚举` 和 `不可枚举` ，由属性 `enumerable` 决定，不可枚举主要用于避免某些对象属性被方法遍历到

```tsx
const obj = { x: 1 }

Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: false     // y属性被设置为不可枚举
})

for(let key in obj) {
  console.log(key)      // x
}

console.log(obj)        // { x: 1 }，打印无法打印不可枚举属性
console.log(obj.y)      // 2，可以进行调用
```

> 继承原型链上的属性都是 `不可枚举` 的



-----

### 类型

#### 纯对象

传统的 JS 对象都是不纯粹的，直接声明一个对象会进行原型链的继承

```tsx
const obj = {}  
const obj = Object.create(Object.prototype) 	// 相当于该声明语句的语法糖
```

![](https://img-blog.csdnimg.cn/20210612165146113.png)

创建存对象的方式：

```tsx
const obj = Object.create(null)
```

![](https://img-blog.csdnimg.cn/20210612164926667.png)

除了继承 了`Object.prototype` 这点，`Object.create(null)` 和 `{}`之间没有别区别，纯粹的对象适合用于存储键值对数据，而且没有隐式的类型转换，更加直观

```tsx
const obj = {}
const pureObj = Object.create(null)

console.log(obj == '[object Object]')       // ture，借助于原型链上的valueOf和toString方法隐式转换
console.log(pureObj == '[object Object]')   // 报错，无法将对象转换为值类型
```

-----

#### 类数组对象

一个对象中拥有0,1,2……等递增数字属性且含有 length 用于统计数字属性的个数，但是不是数组而是对象

```tsx
const obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
console.log(obj[0])               // 'a' 	
console.log(obj.length)           // 3
console.log(Array.isArray(o))     // false
```

> 可以使用 `Array.from` 方法将类数组对象转换为数组

```tsx
const obj = {
  0: 'x', 
  1: 'y', 
  length: 2
}
const array = Array.from(obj)

console.log(array)                  // [ 'x', 'y' ]
console.log(Array.isArray(array))   // true
```

> 该方法根据对象中的 `length` 来决定数组长度，且从 `0` 开始递增添加具体值进数组

```tsx
const obj = {
  1: 'x', 
  0: 'y', 
  3: 'z',
  length:3
}

console.log(Array.from(obj))                  // [ 'y', 'x', undefined ]
```



----

### 对象方法

#### 创建与设置

**Object.create (obj)**

- 功能：创建一个新对象，同时绑定目标对象原型链 `新对象.__proto___ === 目标对象`
- 参数及返回值：
  - `obj: object`：目标对象
- 返回值：`object`，新对象

```tsx
const obj = {
  fn() {
    console.log('fn is running')
  }
}
const newObj = Object.create(obj)

console.log(newObj.__proto__ === obj)     // true
newObj.fn()                               // fn is running
```

-----

**Object.defineProperty (obj, key, config)**

- 功能：新增或修改目标对象的属性，可进行更多属性配置

- 参数：
  - `obj: object`：传入目标对象
  - `key: string`：新增或修改的属性名
  - `config: object`：配置描述符对象
- 返回值：`object`，修改后的目标对象

```tsx
const obj = {x: 1}

Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: false     // y属性被设置为不可枚举
})
```

> 描述符配置值：
>
> - `value: any`：默认 undefined，表示属性值
>
> - `enumerable: boolean`：默认 false，当为 true 时，表示该属性是可枚举的
>
> - `configurable: boolean`：默认 false，当为 true 时，表示该属性的描述符能够被改变，同时该属性也能被删除
> - `writable: boolean`，默认 false，当为 ture 时，表示该属性可写，可以被赋值更改属性 value 值
> - `get: Function`，默认 undefined，当读取对象该属性时，会触发该监听函数
> - `set: Function`，默认 undefined，当修改对象该属性时，会触发该监听函数

-----

**Object.getOwnPropertyDescriptors (obj)**

- 功能：获取目标对象的所有自身属性的描述符配置
- 参数：
  - `obj: object`：目标对象
- 返回值：`object`：所有属性的描述符配置

```tsx
const obj = { x: 1 }
Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: true
})

console.log(Object.getOwnPropertyDescriptors(obj))
/*
  {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 2, writable: false, enumerable: true, configurable: false }
  }
*/
```

> 如果想获取单个属性的描述配置可以使用 `Object.getOwnPropertyDescriptor()`，使用同理

```tsx
const obj = { x: 1 }
Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: true
})

console.log(Object.getOwnPropertyDescriptor(obj, 'x'))
// { value: 1, writable: true, enumerable: true, configurable: true }
```

**Object.preventExtensions (obj)**

- 功能：将目标对象设置为不可扩展的，即无法为其添加属性
- 参数：
  - `obj: object`：目标对象
- 返回值：`object`：设置后的目标对象

```tsx
const obj = { x: 1 }
const result = Object.preventExtensions(obj)
obj.x = 3
obj.y = 2

console.log(result)   // { x: 3 }
console.log(obj)      // { x: 3 }，可以修改属性值
```

------

**Object.isExtensible (obj)**

- 功能：判断目标对象是否是可扩展的
- 参数：
  - `obj: object`：目标对象
- 返回值：`boolean`：判断结果

```tsx
const obj = {}
const constrastObj = {}
Object.preventExtensions(obj)

console.log(Object.isExtensible(obj))             // false
console.log(Object.isExtensible(constrastObj))    // true
```

------

#### 属性与值

**Object.keys (obj)**

- 功能：遍历对象自身可枚举属性并返回

- 参数：
  - `obj: object`：传入目标对象

- 返回值：`Array<string>`，存储 keys 的数组

```tsx
const obj = { x: 1 }
Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: false 
})
Object.prototype.prop = 'prop'

console.log(Object.keys(obj))    // [ 'x' ]
```

-----

**Object.getOwnPropertyNames (obj)**

- 功能：遍历对象自身属性并返回

- 参数：
  - `obj: object`：传入目标对象

- 返回值：`Array<string>`，存储 keys 的数组

```tsx
const obj = { x: 1 }

Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: false 
})
Object.prototype.prop = 'prop'

console.log(Object.getOwnPropertyNames(obj))    // [ 'x', 'y' ]
```

-----

**Object.vaules (obj)**

- 功能：遍历对象自身可枚举属性的值并返回

- 参数：
  - `obj: object`：传入目标对象

- 返回值：`Array<any>`：存储 values 的数组

```tsx
const obj = { x: 1, y: 2 }

Object.defineProperty(obj, 'z', {
  value: 3,
  enumerable: false 
})
Object.prototype.prop = 'prop'

console.log(Object.values(obj))    // [ 1, 2 ]
```

------

**Object.entries (obj)**

- 功能：遍历对象自身可枚举属性的 `key-value` 数组并返回

- 参数：
  - `obj: object`：传入目标对象

- 返回值：`Array<any[]>`：存储 values 的数组

```tsx
const obj = {
  x: 1,
  y: [],
  z: function() {}
}
Object.prototype.prop = 'prop'

console.log(Object.entries(obj))    // [ [ 'x', 1 ], [ 'y', [] ], [ 'z', [Function: z] ] ]
```

-------

**Object.fromEntries (obj)**

- 功能：是 `Object.entries(obj)` 的逆操作，将一个 `key-value` 数组转换为对象
- 参数：
  - `obj: Array<any[]>`：传入目标数组
- 返回值：`object`，转换后对象

```tsx
const array =  [
  ['x'],                                  // 少传value则认为undefined
  ['y', 2],
  ['z', 3, 4],                            // 多传value则被忽略
]

console.log(Object.fromEntries(array))    // { x: undefined, y: 2, z: 3 }
```

-----

**object.propertyIsEnumerable (key)**

- 功能：判断一个对象实例的某个属性是否可枚举
- 参数：
  - `key: string`：指定属性名
- 返回值：`boolean`：判断结果

```tsx
const obj = { x: 1 }
Object.defineProperty(obj, 'y', {
  value: 2,
  enumerable: false     
})

console.log(obj.propertyIsEnumerable('x'))    // true
console.log(obj.propertyIsEnumerable('y'))    // false
```

-----

**Oject.is (valueA, valueB)**

- 功能：和 `===` 功能一致，但是补足了 `NaN === NaN` 为 ture 和 `-0 === +0` 为 false 的缺陷
- 参数：
  - `valueA、valueB: any`：要比较的值
- 返回值：`boolean`，比较结果

```tsx
console.log(NaN === NaN)            // false
console.log(Object.is(NaN, NaN))    // true

console.log(-0 === +0)              // true
console.log(Object.is(-0, +0))      // false
```

-----

**Object.assign (obj, ...source)**

- 功能：用于对象合并，将源对象的所有可枚举属性浅拷贝到目标对象，如果源对象有目标对象同名属性，则进行覆盖
- 参数：
  - `obj: object`：目标对象
  - `source: object`：源对象
- 返回值：合并后的目标对象（直接在目标对象上操作）

```tsx
const obj = {x: 1}
const result = Object.assign(obj, {y: 2, z: 3} , {x: 4})
console.log(result)     // { x: 4, y: 2, z: 3 }
console.log(obj)     // { x: 4, y: 2, z: 3 }
```

> 该方法相当于扩展运算符 `...` 语法糖，但是一般使用该方式会生成一个新的对象，对目标对象不作修改

```tsx
const obj = {x: 1}
result = {...obj, ...{y: 2, z: 3} , ...{x: 4}}

console.log(result)     // { x: 4, y: 2, z: 3 }
console.log(obj)     // { x: 1 }
```

-----

#### 对象原型链

**Object.setPrototypeOf (obj, prototype)**

- 功能：将目标对象的原型设置为指定原型，ES6 推荐该方法替代 `obj.__proto__ = prototype` 建立原型链
- 参数：
  - `obj: object`：目标对象
  - `prototype`：原型对象
- 返回值：`object`：设置后的目标对象

```tsx
const obj = {x: 1}
const prototype = {y: 2}
const result = Object.setPrototypeOf(obj, prototype)
console.log(result)                             // { x: 1 }
console.log(obj.__proto__ === prototype)     // true
```

-------

**Object.getPrototypeOf (obj)**

- 功能：获取目标对象的原型，ES6 推荐该方法替代 `obj.__proto__ ` 获取原型
- 参数：
  - `obj: object`：目标对象
- 返回值：`object`：原型对象

```tsx
const obj = {x: 1}
const prototype = {y: 2}
Object.setPrototypeOf(obj, prototype)
console.log(Object.getPrototypeOf(obj))    // { y: 2 }
```

------

**object.hasOwnProperty (key)**

- 功能：判断一个对象实例的某个属性是否是自身存在而非原型链上继承
- 参数：
  - `key: string`：指定属性名
- 返回值：`boolean`：判断结果

```tsx
const obj = { x: 1 }
Object.prototype.y = 2

console.log(obj.hasOwnProperty('x'))    // true
console.log(obj.hasOwnProperty('y'))    // false
```



-----

### 使用技巧

#### 对象属性简写

当不声明属性直接传入一个变量时，会用自动用变量名为属性，变量值为属性值

```tsx
const x = 'x'
function fn() {}

const obj = {
  x,            // 相当于 x: x
  fn,           // 相当于 fn: fn
  objFn() {}    // 相当于 function objFn(){}
}
```

-----

#### 动态属性

当对象调用属性的值为变量时，不能使用 `obj.xxx` 的方式，而是应该使用 `obj[xxx]`，且该变量的值要为 string 类型，如果传入的不是该类型，会进行隐式转换

```tsx
function fn(key) {
  const obj = {
    x: 'x',
    y: 'y'
  }
  console.log(obj[key])
}

fn('x')   // x
```

同理，当要动态设置对象属性时，也可以使用 `[xxx].value` 的方式

```tsx
function fn(key, value) {
  const obj = {
    [key]: value
  }
  console.log(obj)
}

fn('x', 'x')   // {x: 'x'}
```

-----

#### 遍历对象

可以使用 `for in` 函数遍历对象的可枚举属性，但是这个方法存在一个隐患，即会遍历到原型链上原型的属性

```tsx
const obj = {
	a: 1,
	b: 2,
	c: 3
}

Object.prototype.d = 4

for(let key in obj) {
	console.log(key)          // a b c d
	console.log(obj[key])     // 1 2 3 4
}
```

> 因此一般配合 `obj.hasOwnProperty` 来只遍历自身属性

```tsx
for(let key in obj) {
  if(obj.hasOwnProperty(key)) {
    console.log(key)          // a b c 
	  console.log(obj[key])   // 1 2 3 
  }
}
```

#### 监听取值

除了使用 `Object.defineProperty()` 方法设置属性的监听函数外，也可以直接便捷使用 `get、set` 关键字监听属性

```tsx
const obj = {
  get getX() {
    console.log('读取x值')
    return this.x
  },
  set setX(value) {
    console.log('写入x值')
    this.x = value 
  }
}

obj.setX = 1        // 写入x值
obj.getX            // 读取x值
console.log(obj)    // { getX: [Getter], setX: [Setter], x: 1 }
```

> 需要注意的是 get 和 set 方法的名字不能和设置的属性名字相同，否则会造成栈溢出

```tsx
const obj = {
  get x() {
    console.log('读取x值')
    return this.x
  },
  set x(value) {
    console.log('写入x值')
    this.x = value 
  }
}

obj.x = 1        // 栈溢出
obj.x            // 栈溢出
```

