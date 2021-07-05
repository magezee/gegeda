## 字符串

### 特性

字符串和数组有类似的长度特性

```tsx
const str = 'Hello World'

console.log(str[0])             // H
console.log(str.length)         // 11

str.length = 2
console.log(str)                // Hello World
```



------

### 字符串方法

#### 转换

**String.raw (callSite, ...substitutions?)**

- 功能：
  - 将插入字符串按个数插入在目标字符串中
  - 忽略模板字符串的转义符（普通字符串不行）
- 参数：
  - `callSite?: object`：目标字符串
  - `substitution: string`：插入字符串
- 返回值：`string`：返回修改字符串

```tsx
let result 

result = String.raw({raw: 'abcd'}, '12345')
console.log(result)                 // a12345bcd

result = String.raw({raw: 'abcd'}, '1', '2', '3', '4', '5')
console.log(result)                 // a1b2c3d

result = String.raw`Hi\n${1+1}!`    
console.log(result)                 // Hi\n2!,不会触发\n的换行打印

result = String.raw`Hi\\n${1+1}!`  
console.log(result)                 // Hi\\n2!
```

------













