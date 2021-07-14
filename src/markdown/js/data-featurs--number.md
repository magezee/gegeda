## 数值

### 特性

#### 精度

js 计算浮点数时，会产生精度丢失的情况

```tsx
console.log(0.1 + 0.2)      // 0.30000000000000004
console.log(1.0 - 0.9)      // 0.09999999999999998
console.log(3 * 0.3)        // 0.8999999999999999
console.log(1.21 / 1.1)     // 1.0999999999999999
```

----

#### 安全整数

js 的最大安全整数并不是传统的 `2^64 -1`，而是 `2^53 - 1`，所以能保证安全的整数则为该数字减去一位，则 15 位数为 js 最大安全整数位数

```tsx
console.log(Math.pow(2, 53) -1)         // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER)    // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER)    // -9007199254740991
```



------

### 数值方法

**Number.isNaN (target)**

- 功能：判断一个目标是否为 `NaN`
- 参数：
  - `targer: any`：判断目标
- 返回值：`boolean`，判断结果

> 该方法直接传目标隐式转换会有问题，建议先用 `Number()` 进行显示转换后再传入

```tsx
console.log(Number.isNaN(123))              // false
console.log(Number.isNaN('123'))            // false
console.log(Number.isNaN(NaN))              // true

console.log(Number.isNaN('123a'))           // false
console.log(Number('123a'))                 // NaN
console.log(Number.isNaN(Number('123a')))   // true
```

----

**number.toFixed (n?)**

- 功能：将数值四舍五入保留至 n 位小数
- 参数：
  - `n?: number`：保留小数位数
- 返回值：`number`，返回新的数值，不影响原数值

```tsx
const num = 123.456
num.toFixed(2)

console.log(result)     // 123.46
```

-----

**parseInt (str)**

- 功能：将字符串转换为整数，如果存在非数值字符，则忽略非数值字符之后的内容
- 参数：
  - `str: string`：转换字符串
- 返回值：`number`，转换后的数值

```tsx
console.log(parseInt('123.456'))      // 123
console.log(parseInt('12a3.456'))     // 12
```

-----

**parseFloat (str)**

- 功能：将字符串转换为整数，如果存在非数值字符，则忽略非数值字符之后的内容
- 参数：
  - `str: string`：转换字符串
- 返回值：`number`，转换后的数值

```tsx
console.log(parseFloat('123.456'))      // 123.456
console.log(parseFloat('12a3.456'))     // 12
```

