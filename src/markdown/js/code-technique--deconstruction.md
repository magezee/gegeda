## 解构

使用扩展运算符 `...` 进行结构

### 数组结构

数组的解构是按顺序的

```tsx
// > 相当于声明了x，y变量并赋值
const [x,y] = [1,2]

console.log(x)      // 1
console.log(y)      // 2
```

> 通过留空来跳过数组中的某些元素

```tsx
const [,,x,y] = [1,2,3,4]

console.log(x)      // 3
console.log(y)      // 4
```

> 通过扩展运算符 `...` 来获取剩余元素

```tsx
const [x,...y] = [1,2,3,4]

console.log(x)      // 1
console.log(y)      // [ 2, 3, 4 ]
```

> 给解构变量赋予初始值防止解构值为 undefined

```tsx
const [x, y = 1] = []

console.log(x)      // undefined
console.log(y)      // 1
```



------

### 对象结构

对象的结构需要对应属性名，和顺序无关

```tsx
const obj = {
  name: 'jack',
  age: 19
}

const {name, age} = obj

console.log(name)     // jack 
console.log(age)      // 19
```

> 声明不同的属性名变量去解构

```tsx
const obj = {
  name: 'jack',
  age: 19
}

const {
  name: newName,
  age: newAge
} = obj

console.log(newName)        // jack
console.log(newAge)         // 19
```

> 给解构变量赋予初始值防止解构值为 undefined

```tsx
const {name, age = 19} = {}

console.log(name)     // undefined
console.log(age)      // 19
```



------

### 参数解构

要想在函数参数中使用解构，形参必须为一个对象形式

```tsx
const fn = ({a, b, c}) => {
  console.log(`a:${a}  b:${b}  c:${c}`)
}

const a = 1
const b = 2
const c = 3

fn({c, b, a})   // a:1  b:2 c:3
```



