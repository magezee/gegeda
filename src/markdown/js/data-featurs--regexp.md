## 正则表达式

### 创建

#### 创建方式

方式一：使用构造函数创建，语法为 `new RegExp(正则表达式，匹配模式)` ，该方法的特定是灵活，可以传递变量，但是使用累赘

```tsx
const str = '1234 abcd'
let reg 

reg = new RegExp(/\d/, 'g')
console.log(str.match(reg))     // [ '1', '2', '3', '4' ]

const arg = '123'
reg = new RegExp(arg, 'g')
console.log(str.match(reg))     // [ '123' ]
```

方式二：使用字面量创建，语法为 `/正则表达式/匹配模式` ，该方法的特定是使用简单但是不灵活，无法传递变量

```tsx
const str = '1234 abcd'
const reg = /\d/g

console.log(str.match(reg))     // [ '1', '2', '3', '4' ]
```

> 使用构造函数的方式创建时，正则表达式为一个字符串格式，导致了使用 `\` 符合需要额外转义 `\\`

 ```tsx
 const str = '1234 abcd'
 const reg = new RegExp('\\d','g')
 
 console.log(str.match(reg))       // [ '1', '2', '3', '4' ]
 console.log(str.match(/\d/g))     // [ '1', '2', '3', '4' ]
 ```

------

#### 匹配模式

拥有 3 种匹配模式：

- `i`：忽略大小写
- `g`：全局匹配，默认匹配第一个满足条件项即退出，开启全局匹配则匹配全部
- `m`：多行匹配，默认 `^` 和 `$` 不会将换行符 `\n` 看做一段文本新的开头或结尾，开启多行匹配则看做新的一段文本

```tsx
const str = 'abcd\nABCD'

console.log(str.match(/abcd/g))       // [ 'abcd' ]
console.log(str.match(/abcd/ig))      // [ 'abcd', 'ABCD' ]

console.log(str.match(/^abcd/ig))     // [ 'abcd' ]
console.log(str.match(/^abcd/igm))    // [ 'abcd', 'ABCD' ]
```



------

### 匹配符号

#### 单字符

匹配单个字符的特殊符号：

- `.` ：匹配一个任意字符
- `\.`：匹配一个 `.` 字符
- `\\`：匹配一个 `\` 字符
- `\/`：匹配一个 `/` 字符
- `\(`：匹配一个 `(` 字符
- `\)`：匹配一个 `)` 字符
- `\d`：匹配一个数字字符
- `\D`：匹配一个非数字字符
- `\w`：匹配一个字母、数字、下划线字符
- `\W`：匹配一个字母、数字、下划线以外的字符
- `\s`：匹配空格（空格符、Tab 符等）
- `\S`：匹配非空格符
- `\b`：匹配隐性边界
- `\B`：匹配非隐性边界

```tsx
const str = '123 abc .$\\/_'

console.log(str.match(/./g))    // [ '1', '2', '3',  ' ', 'a', 'b', 'c',  ' ', '.', '$', '\', '/', '_' ]
console.log(str.match(/\./g))   // [ '.' ]
console.log(str.match(/\\/g))   // [ '\' ]
console.log(str.match(/\//g))   // [ '/' ]
console.log(str.match(/\d/g))   // [ '1', '2', '3' ]
console.log(str.match(/\D/g))   // [ ' ', 'a',  'b', 'c', ' ',  '.', '$', '\', '/', '_' ]
console.log(str.match(/\w/g))   // [ '1', '2', '3', 'a', 'b', 'c', '_' ]
console.log(str.match(/\W/g))   // [ ' ', ' ', '.', '$', '\', '/' ]
console.log(str.match(/\s/g))   // [ ' ', ' ' ]
console.log(str.match(/\S/g))   // [ '1',  '2', '3', 'a', 'b',  'c', '.', '$', '\', '/', '_' ]
```

> 单词和符号之间会产生一个隐性边界，单词指英文或数字字符，符号指中文及其他符号字符（如空格和特殊符号）
>
> 纯单词也会在首尾处产生隐性边界，而纯符号则不会

```tsx
let str 

str = '123abc'
console.log(str.match(/\b/g))             // [ '', '' ]

str = '咯咯哒'
console.log(str.match(/\b/g))             // null

str = 'apple origin'
console.log(str.match(/\b/g))             // [ '', '', '', '' ]

// > 多个符号组合的情况
str = '咯咯哒 &*^% \\ + -'
console.log(str.match(/\b/g))             // null，纯符号不会产生边界

str = 'apple咯咯哒 &*^% \\ + -origin'
console.log(str.match(/\b/g))             // [ '', '', '', '' ]，多个符号只影响一次隐性边界

// > 一般使用场景为匹配一个特定单词
str = 'gegeda gegedagegeda'
console.log(str.match(/\bgegeda\b/g))     // [ 'gegeda' ]
```

![](https://img-blog.csdnimg.cn/20210709132353654.png)

-----

#### 位置

- `^`：匹配一行字符的开头
- `$`：匹配一行字符的结尾

```tsx
const str = '1221 1331'

console.log(str.match(/^1.../g))      // [ '1221' ]
console.log(str.match(/...1$/g))      // [ '1331' ]
```

-----

#### 数量

- `*`：匹配任意个字符（包括 0 个）
- `?`：匹配 0 个或 1 个字符
- `+`：匹配至少 1 个字符
- `{n}`：匹配正好出现 n 次的字符
- `{n, m}`：匹配出现 n ~ m 次的字符
- `{n,}`：匹配出现 n 次及以上的字符

```tsx
reg = /a*bc/          // 匹配bc或任意个a后跟bc
reg = /a?bc/          // 匹配bc或abc
reg = /a+bc/          // 匹配abc或一个以上a后跟bc
reg = /a{3}bc/        // 匹配aaabc
reg = /(ab){3}c/      // 匹配abababc
reg = /a{1,3}bc/      // 匹配abc或abbc或abbbc
reg = /a{3,}bc/       // 匹配3个及3个以上a后跟bc
```

-----

#### 或

- `|` ：表示或关系
- `[]`：表示或关系
  - `[n-m]`：匹配 n-m 范围内的任意字符
    - `[a-z]`：匹配任意一个小写字母
    - `[A-Z]`：匹配任意一个大写字母
    - `[A-z]`：匹配任意一个字母
    - `[0-9]`：匹配任意一个数字
  - `[^x]`：匹配任意一个非 x 的字符

> `|` 和 `[]` 用法稍有区别，`|` 可以用来匹配多个字符的或，而 `[]` 用来匹配单个字符的或

```tsx
reg = /a|b/       // 匹配a或b
reg = /[ab]/      // 匹配a或b
reg = /a|bc|d/    // 匹配a或bc或d
reg = /a[bc]d/    // 匹配abd或acd
reg = /^[0-9]/    // 匹配任意一个非数字字符
```

> 在 `[]` 表达式中，所有特殊符号均不需要转义 

```tsx
const str = '.\\/()'

console.log(str.match(/[.\/()]/g))    // [ '.', '/', '(', ')' ]
```

-----

### 特殊用法

#### 贪婪/惰性匹配

- 贪婪匹配：`.*`，匹配到整个字符串的末尾

- 惰性匹配：`.*?`：匹配到最近的一个满足项

```tsx
const str = '"data: aaa" "data: bbb"'
let reg

reg = /"data:.*"/g
console.log(str.match(reg))       // [ '"data: aaa" "data: bbb"' ]，匹配到末尾的"

reg = /"data:.*?"/g
console.log(str.match(reg))       // [ '"data: aaa"', '"data: bbb"' ]，只匹配到下一个"
```

------

#### 先行/后行断言

- 正向先行断言：`(?=str)`：匹配字符串的一个位置，该位置之后紧邻的字符为 str

- 正向后行断言：`(?<=str)`：匹配字符串的一个位置，该位置之前紧邻的字符为 str
- 负向先行断言：`(?!str)`：匹配字符串的一个位置，该位置之后紧邻的字符不能为 str
- 负向后行断言：`(?<!str)`：匹配字符串的一个位置，该位置之前紧邻的字符不能为 str

> 先/后行断言匹配的是一个位置，而非一个字符，如果匹配需要包含 str，则需要另外匹配 str 语法

```tsx
const str = 'a1bc a2bc a3bc a4bc'
let reg

reg = /a(?=1).../g
console.log(str.match(reg))     // [ 'a1bc' ]

reg = /..(?<=2)b./g
console.log(str.match(reg))     // [ 'a2bc' ]

reg = /a(?!1).../g
console.log(str.match(reg))     // [ 'a2bc', 'a3bc', 'a4bc' ]

reg = /..(?<!2)b./g
console.log(str.match(reg))     // [ 'a1bc', 'a3bc', 'a4bc' ]
```



----

### 正则方法

**regexp.exec (str)**

- 功能：获取正则匹配信息
- 参数：
  - `str: string`：被检验字符串
- 返回值：`Array<any> | null`，一个检验信息数组，如果匹配不到则返回 `null`

```tsx
const str = 'abcd 1234'
const reg = /^a../g

console.log(reg.exec(str))        // [ 'abc', index: 0, input: 'abcd 1234', groups: undefined ]
```

----

**regexp.test (str)**

- 功能：检验字符串是否满足正则匹配
- 参数：
  - `str: string`：被检验字符串
- 返回值：`boolean`，检验结果

```tsx
const str = 'abcd 1234'
const reg = /^a../g

console.log(reg.test(str))        // true
```

