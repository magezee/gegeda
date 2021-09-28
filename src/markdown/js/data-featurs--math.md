## 数学

### 数学方法

> 数学方法均不会对原数值产生影响

#### 运算

**Math.abs (num)**

- 功能：取绝对值
- 参数：
  - `num: number`：要转换的数值
- 返回值：`number`，转换结果

```tsx
console.log(Math.abs(-10))    // 10
```

------

**Math.ceil (num)**

- 功能：向上取整，舍弃小数部分，如果是正数则整数部分 +1，负数则不变
- 参数：
  - `num: number`：要转换的数值
- 返回值：`number`，转换结果

```tsx
console.log(Math.ceil(10.12))    // 11
console.log(Math.ceil(-1.12))   // -1
```

------

**Math.floor (num)**

- 功能：向下取整，舍弃小数部分，如果是负数则整数部分 -1，正数则不变
- 参数：
  - `num: number`：要转换的数值
- 返回值：`number`，转换结果

```tsx
console.log(Math.floor(10.12))    // 10
console.log(Math.floor(-1.12))   // -2
```

------

**Math.round (num)**

- 功能：四舍五入取整
- 参数：
  - `num: number`：要转换的数值
- 返回值：`number`，转换结果

```tsx
console.log(Math.round(10.12))    // 10
console.log(Math.round(10.52))    // 11
console.log(Math.round(-1.12))    // -1
console.log(Math.round(-1.52))    // -2
```

------

**Math.random ()**

- 功能：随机生成一个 `[0, 1)` 的数值
- 参数：无
- 返回值：`number`，生成的数值

```tsx
console.log(Math.random())        // 0.9399308305634984
console.log(Math.random())        // 0.4876264459716122
```



------

#### 排序

**Math.max (...values)**

- 功能：获取一组数值的最大项
- 参数：
  - `values: number`：对比数值组
- 返回值：`number`，数值组中的最大项

```tsx
console.log(Math.max(20, -93, 44, 127))     // 127
```

-----

**Math.min (...values)**

- 功能：获取一组数值的最小项
- 参数：
  - `values: number`：对比数值组
- 返回值：`number`，数值组中的最小项

```tsx
console.log(Math.min(20, -93, 44, 127))     // -93
```



-----

### 使用技巧

#### 范围随机整数

利用 `Math.random()` 生成指定 `[min, max]` 的随机数，首先该方法生成的是 `[0, 1)` ，为了使之成为 `0 或 1`，需要额外转换一次

```tsx
const random = Math.random()
const result = Math.floor(random * (1 + 1))   // 这里加1是为了配合floor方法去除小数部分

console.log(result)                           // 此时结果只能为0或1
```

则生成 `[0, max]` 的整数只需要把乘 `(1 + 1)` 改成乘 `(max + 1)` 即可

```tsx
const random = Math.random()
const result = Math.floor(random * (100 + 1))   

console.log(result)             // 此时结果为[0,100]任意整数
```

所以 `[min, max]` 只需想成先生成 `[0, max-min]`，最后总结果再加上 min 即可以达到

```tsx
const random = Math.random()
const result = Math.floor(random * (100 -50 + 1)) + 50  

console.log(result)             // 此时结果为[50,100]任意整数
```

