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

> 注意：字符串中的所有方法，均不会对原字符串产生影响

#### 转换类型



**string.split (separator?, length?)**

- 功能：将字符串按照分隔符拆分为数组形式
- 参数：
  - `separator?: string`：分隔符
  - `length: number`：指定返回数组的最大长度，默认全部返回
- 返回值：`Array<string>`：返回拆分后的结果

```tsx
const str = '123,456,789'

console.log(str.split())         // [ '123,456,789' ]
console.log(str.split(','))      // [ '123', '456', '789' ]
console.log(str.split('', 5))    // [ '1', '2', '3', ',', '4' ]
```

----

#### 更改内容

**string.concat (...str)**

- 功能：拼接字符串，和 `+` 功能一致
- 参数：
  - `str: string`：要拼接的字符串
- 返回值：`string`：拼接后的字符串

```tsx
const str = 'gegeda'

const result = str.concat('a', 'bcd')
console.log(result)   // gegedaabcd
```

-----

**string.replace (target, str)**

- 功能：将满足条件的内容替换为指定字符串
- 参数：
  - `target: RegExp | string`：要拼接的字符串
  - `str: string`：替换字符串
- 返回值：`string`：更改后字符串

```tsx
const str = 'gegeda'

console.log(str.replace(/ge/g,'da'))   // dadada
console.log(str.replace(/ge/,'da'))    // dageda
console.log(str.replace('ge','da'))    // dageda
```

------

**string.toUpperCase ()**

- 功能：将字符串中的字母全部转换为大写
- 参数：无
- 返回值：`string`：转换结果

```tsx
const str = 'aBcD'

console.log(str.toUpperCase())    // ABCD
```

-----

**string.toLowerCase ()**

- 功能：将字符串中的字母全部转换为小写
- 参数：无
- 返回值：`string`：转换结果

```tsx
const str = 'aBcD'

console.log(str.toLocaleLowerCase())    // abcd
```

-----

**string.trim ()**

- 功能：去除字符串首尾的空白符
- 参数：无
- 返回值：`string`：转换结果

```tsx
const str = '  ge geda      '

console.log(str.trim())               // 'ge geda'
```

> `string.trimStart()` 、`string.trimLeft()`：只去除首部空格
>
> `string.trimEnd()` 、`string.trimRight()`：只去除尾部空格

----

**string.padStart (length, str)**

- 功能：字符串没有达到指定长度，则在开头补充指定内容直到满足长度
- 参数：
  - `length: number`：规定字符串长度
  - `str: string`：添加字符串
- 返回值：`string`：更改后字符串

```tsx
const str = 'gegeda'

console.log(str.padStart(10,'1'))               // 1111gegeda
console.log(str.padStart(10,'123456'))          // 1234gegeda
```

-----

**string.padEnd (length, str)**

- 功能：字符串没有达到指定长度，则在开头补充指定内容直到满足长度
- 参数：
  - `length: number`：规定字符串长度
  - `str: string`：添加字符串
- 返回值：`string`：更改后字符串

```tsx
const str = 'gegeda'

console.log(str.padEnd(10,'1'))               // gegeda1111
console.log(str.padEnd(10,'123456'))          // gegeda1234
```

-----

**String.raw (callSite, ...substitutions?)**

- 功能：
  - 将插入字符串按个数插入在目标字符串中
  - 忽略模板字符串的转义符（普通字符串不行）
- 参数：
  - `callSite?: object`：格式字符串对象
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

#### 截取内容

**string.slice (start?, end?)**

- 功能：截取字符串的 `[start, end)` 部分内容，可接受负值
- 参数：
  - `start?: number`：截取起始索引，默认值为 `0`
  - `end?: number`：截取终止索引，默认值为 `string.length`
- 返回值：`string`：截取的字符串

```tsx
const str = 'gegeda'

console.log(str.slice())      // gegeda
console.log(str.slice(2))     // geda
console.log(str.slice(2,4))   // ge
console.log(str.slice(-2))    // da
```

------

**string.substring (start?, end?)**

- 功能：截取字符串的 `[start, end)` 部分内容，不接受负值
- 参数：
  - `start?: number`：截取起始索引，默认值为 `0`
  - `end?: number`：截取终止索引，默认值为 `string.length`
- 返回值：`string`：截取的字符串

```tsx
const str = 'gegeda'

console.log(str.substring())      // gegeda
console.log(str.substring(2))     // geda
console.log(str.substring(2,4))   // ge
console.log(str.substring(-2))    // gegeda
```

-----

**string.substr (start?, n?)**

- 功能：截取字符串的 `[start, start+n)` 部分内容
- 参数：
  - `start?: number`：截取起始索引，默认值为 `0`
  - `n?: number`：向后截取的字符个数，默认截取到字符串末尾
- 返回值：`string`：截取的字符串

```tsx
const str = 'gegeda'

console.log(str.substr())      // gegeda
console.log(str.substr(2))     // geda
console.log(str.substr(2,3))   // ged
console.log(str.substr(-2))    // da
```



----

#### 查找内容

**string.charAt (n)**

- 功能：获取字符串的第 `n` 位字符
- 参数：
  - `n: number` ：指定位数，从 `0` 开始
- 返回值：`string`：指定字符

```tsx
const str = 'Hello World'

console.log(str.charAt(1))    // e 
console.log(str[1])           // e 功能和上面一样 
```

------

**string.includes (str, start?)**

- 功能：查找字符串中是否含有指定内容
- 参数：
  - `str: string` ：指定查找内容
  - `start?: number`：开始查找索引，默认为 `0` ，可理解成只在 `string.slice(start)` 的结果中进行查找
- 返回值：`boolean`：判断结果

```tsx
const str = 'gegeda'

console.log(str.includes('ge'))          // true
console.log(str.includes('ge', 4))       // false
console.log(str.includes(''))            // true，空字符是任意字符串的子字符

console.log(str.slice(4))                // da
```

------

**string.match (target)**

- 功能：获取满足条件的字符串数组
- 参数：
  - `target: RegExp | string` ：指定条件正则表达式或者字符串
- 返回值：`Array<any> | null`：如果为正则全局匹配，则返回满足条件字符串数组，否则返回信息数组，如果找不到返回 `null`

```tsx
const str = 'gegeda'

console.log(str.match(/e/g))  // [ 'e', 'e' ]
console.log(str.match(/e/))   // [ 'e', index: 1, input: 'gegeda', groups: undefined ]
console.log(str.match('e'))   // [ 'e', index: 1, input: 'gegeda', groups: undefined ]
```

------

**string.search (target)**

- 功能：获取字符串中指定内容的起始索引
- 参数：
  - `target: RegExp | string` ：指定条件正则表达式或者字符串
- 返回值：`number`：满足内容条件则返回该内容第一个字符索引，否则返回 `-1`

```tsx
const str = 'gegeda'

console.log(str.search('ge'))       // 0  
console.log(str.search(/ge..$/))    // 2
```

----

**string.indexOf (str, start?)**

- 功能：从前往后遍历，获取字符串中指定内容的起始索引
- 参数：
  - `str: string` ：指定查找内容
  - `start?: number`：开始查找索引，默认为 `0` ，可理解成只在 `string.slice(start)` 的结果中进行查找
- 返回值：`number`：满足内容条件则返回该内容第一个字符索引，否则返回 `-1`

```tsx
const str = 'gegeda'

console.log(str.indexOf('ge'))      // 0  
console.log(str.indexOf('ge', 1))   // 2

console.log(str.slice(1))           // egeda
```

-----

**string.lastIndexOf (str, start?)**

- 功能：从后往前遍历，获取字符串中指定内容的起始索引
- 参数：
  - `str: string` ：指定查找内容
  - `start?: number`：开始查找索引，默认为 `0` ，可理解成只在 `string.slice(start)` 的结果中进行查找
- 返回值：`number`：满足内容条件则返回该内容第一个字符索引，否则返回 `-1`

```tsx
const str = 'gegeda'

console.log(str.lastIndexOf('ge'))      // 2  
console.log(str.lastIndexOf('ge', 1))   // 2

console.log(str.slice(1))               // egeda
```

----

**string.startsWith (str, start?)**

- 功能：检查字符串是否以指定内容开头
- 参数：
  - `str: string` ：指定查找内容
  - `start?: number`：开始查找索引，默认为 `0` ，可理解成只在 `string.slice(start)` 的结果中进行查找
- 返回值：`boolean`：判断结果

```tsx
const str = 'gegeda'

console.log(str.startsWith('g'))         // true
console.log(str.startsWith('g',1))       // false
console.log(str.startsWith('e',1))       // true

console.log(str.slice(1))                // egeda
```

-----

**string.endsWith (str, end?)**

- 功能：检查字符串是否以指定内容结尾
- 参数：
  - `str: string` ：指定查找内容
  - `end?: number`：结束索引，默认为 `0` ，可理解成只在 `string.slice(0,end)` 的结果中进行查找
- 返回值：`boolean`：判断结果

```tsx
const str = 'gegeda'

console.log(str.endsWith('a'))      // true
console.log(str.endsWith('g',3))    // true

console.log(str.slice(0, 3))        // geg
```

