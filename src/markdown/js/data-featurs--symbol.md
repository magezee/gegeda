## 标志

### 特性
#### 唯一性

Symbol 本质上是一种唯一标识符，即使是用同一个变量生成的值也不相等

```tsx
const keyName = 'gegeda'
const symbolA = Symbol(keyName)
const symbolB = Symbol(keyName)

console.log(symbolA == symbolB)     // false
```

> 在创建时传入的字符串相当于给这个标志添加了一个描述

--------

#### 不可枚举

Symbol 一般用于标志一个对象的唯一属性，确保该属性的值无法被覆盖或改写，同时使用该方式声明的对象属性无法被枚举

```tsx
const key = Symbol('gegeda')

const obj = {
  key: 'obj',
  [key]: 'gegeda'
}

console.log(Object.keys(obj))         // [ 'key' ]
console.log(Object.values(obj))       // [ 'obj' ]

for(let key in obj) {   
  console.log(key)                    // key
  console.log(obj[key])               // obj
} 
```

> 如果要访问，需要使用 `Object.getOwnPropertySymbols()` 方法

```tsx
const key = Symbol('gegeda')

const obj = {
  key: 'obj',
  [key]: 'gegeda'
}

console.log(Object.getOwnPropertySymbols(obj))      // [ Symbol(gegeda) ]
```



----

### 标志方法

**Symbol.for (str)**

- 功能：与直接创建不同，此方法根据描述符创建一个单例 symbol 实例
- 参数：
  - `str: string`：描述符
- 返回值：`symbol`，如果已经存在相同描述符的 symbol 实例，则返回该实例，如果不存在则创建

```tsx
const symbolA = Symbol.for('gegeda')
const symbolB = Symbol.for('gegeda')

console.log(symbolA === symbolB)      // true
```

------

**Symbol.keyFor (symbol)**

- 功能：获取使用 `Symbol.key()` 方法创建 symbol 实例的描述符
- 参数：
  - `symbol: symbol`：symbol 实例
- 返回值：`string | undefined`：描述符

```tsx
const resultA = Symbol.keyFor(Symbol('A'))
const resultB = Symbol.keyFor(Symbol.for('B'))

console.log(resultA)      // undefined
console.log(resultB)      // B
```

