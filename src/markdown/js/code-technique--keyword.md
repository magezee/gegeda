## 关键字

### in

用于检查一个引用类型自身和原型链上是否包含指定属性

使用语法：`prop in object`

```tsx
const obj = {x: 'x'}
const arr = ['x']

console.log('x' in obj)         // true
console.log('x' in arr)         // false，数组内的值不是数组属性
console.log('0' in arr)         // true
console.log('PI' in Math)       // true
```



-----

### 模板字符

用于快捷添加变量进字符串中

```tsx
const parmas = '变量'
const str = `这是一个${parmas}!`

console.log(str)      // 这是一个变量!
```

> 使用模板字符串换行时可以自动添加换行符

```tsx
const strA = 'aa\nbb'

const strB = `aa
bb`

console.log(strA === strB)    // true
```

