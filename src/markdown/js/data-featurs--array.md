## 数组

### 特性

直接使用 `[]` 声明数组是 `new Array()` 的语法糖

```tsx
const arrA = [1, 2, 3]
const arrB = new Array(1, 2, 3)

console.log(arrA)     // [ 1, 2, 3 ]
console.log(arrB)     // [ 1, 2, 3 ]
```

> 如果只传一个参数，则表示的是数组长度，而非元素

```tsx
const arr = new Array(3)
console.log(arr)      		// [ <3 empty items> ]
```

**数组length属性**

数组的 length 属性在创建数组时被初始化，会随着数组内容动态变化，直接设置 length 属性可改变数组的大小

```tsx
const arr = [1, 2, 3, 4]

arr.length = 2
console.log(arr)      // [ 1, 2 ]

arr.length = 4
console.log(arr)      // [ 1, 2, <2 empty items> ]，表示有两个空元素
```

**数组索引**

需要注意数组索引是 `string` 而非 `number` 类型

> 下面的代码不会打印东西，因为 `===` 不会进行隐式类型转换，也容易疏忽索引是字符串类型

```tsx
const arr = ['a', 'b', 'c', 'd']

for(let item in arr) {
  if(item === 2) {
    console.log('打印成功')
  }
}
```



-------

### 数组方法

#### 数组创建

**Array.isArray (target)**

- 功能：判断一个目标是否为数组类型
- 参数：
  - `target: any`：判断目标
- 返回值：`boolean`：判断结果

```tsx
const array = [0, 1, 2]

const arrayLike = {
  0: 0,
  1: 1,
  2: 2,
  length: 3
}

console.log(Array.isArray(array))       // true
console.log(Array.isArray(arrayLike))   // false
```

--------

**Array.of (...params)**

- 功能：将传入参数组成一个新数组
- 参数：
  - `params: any`：数组元素
- 返回值：`object`：由数组元素组成的数组，如果不传参数则返回空数组

```tsx
const result = Array.of(1, '2', [], [[]], {}, undefined)
console.log(result)       // [ 1, '2', [], [[]], {}, undefined ]
```



----

#### 数组转换

**Array.from (arrayLike, mapFn?, thisArg?)**

- 功能：将类数组对象转换为数组
- 参数：
  - `arrayLike: object`：类数组对象
  - `mapFn?: function(item, index, arr) `：指定 map 回调函数，每个元素都会执行该函数（需要进行 return）
  - `thisArg?: any`：执行回调函数时 this 指定对象（需要注意如果想绑定 this 则回调函数不能写成箭头函数）
- 返回值：`Array<any>`：不影响原对象，返回一个全新数组

```tsx
const arrayLike = {
  0: 0,
  1: 1,
  2: 2,
  length: 3
}

const obj = {
  x: 5
}

const result = Array.from(arrayLike, function(item) {
  return item += this.x
}, obj)

console.log(result)       // [ 5, 6, 7 ]
console.log(arrayLike)    // { '0': 0, '1': 1, '2': 2, length: 3 }
```

------

**array.join (separator?)**

- 功能：将目标数组转为字符串
- 参数：
  - `separator?: string`：生成字符串后的元素分隔符，默认为 `,` 字符
- 返回值：`string`，不影响原数组，返回转换后字符串

```tsx
const arr = [1, 2, 3]

console.log(arr)            // [ 1, 2, 3 ]
console.log(arr.join())     // 1,2,3
console.log(arr.join(''))   // 123
```

------

**array.flat (n?)**

- 功能：将目标数组扁平化
- 参数：
  - `n?: number`：扁平化深度，默认 1
- 返回值：`Array<any>`，不影响原数组，返回转换后新数组

```tsx
const arr = [1, [2,[3,[4,5]]], 6];

console.log(arr.flat())             // [ 1, 2, [ 3, [ 4, 5 ] ], 6 ]
console.log(arr.flat(2))            // [ 1, 2, 3, [ 4, 5 ], 6 ]
console.log(arr.flat(3))            // [ 1, 2, 3, 4, 5, 6 ]

// 一般直接用Infinity进行通用的扁平化，无论深度多深都能扁平化完毕
console.log(arr.flat(Infinity))     // [ 1, 2, 3, 4, 5, 6 ]
console.log(arr)                    // [1, [ 2, [ 3, [ 4, 5 ] ] ], 6]
```



------

#### 数组遍历

**array.map (mapFn, thisArg?)**

- 功能：遍历数组，每一个元素都执行 `mapFn` 回调函数
- 参数：
  - `mapFn: function(item, index, arr)`：元素执行的回调函数
    - item：当前元素
    - index：当前元素在数组中的索引
    - arr：当前遍历数组
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）
- 返回值：`Array<any>`，不影响原数组，用所有回调函数的返回值组成一个新数组并返回

```tsx
const arr = [1, 2, 3, 4, 5]

const result = arr.map((item) => {
  return item * item
}) 

console.log(result)   // [ 1, 4, 9, 16, 25 ]
```

------

**array.forEach (mapFn, thisArg?)**

- 功能：遍历数组，每一个元素都执行 `mapFn` 回调函数

- 参数：
  - `mapFn: function(item, index, arr)`：元素执行的回调函数
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）

返回值：`undefined`，可使用 `return` 退出当前元素执行的回调函数，无论 return 为何值，函数返回值都为 `undefined`

```tsx
let result
const arr = [1, 2, 3, 4, 5]

result = arr.forEach((item) => {
  return item * item
}) 

console.log(result)   // undefined


result = arr.forEach((item, index, arr) => {
  arr[index] = item * item
})

console.log(arr)      // [ 1, 4, 9, 16, 25 ]
console.log(result)   // undefined
```

-------

**array.reduce (callback, initValue?)**

- 功能：遍历数组，每个元素都执行一遍 `callback`
- 参数：
  - `callback: function(pre, cur, index, arr)`：元素执行的回调函数
    - pre：上一个元素执行回调方法的返回值，如果是第一个元素则该值为 `initValue`
    - cur：当前元素
    - index：当前元素在数组中的索引
    - arr：当前遍历数组
  - `initValue?: any`：初始返回值
- 返回值：`any`：不影响原对象，返回值为最后一个元素执行回调函数的返回值

```tsx
let result
const arr = ['a', 'b', 'c', 'd', 'e']

result = arr.reduce((pre, cur, index) => {
  pre[cur] = index
  return pre
}, {})

console.log(result)     // { a: 0, b: 1, c: 2, d: 3, e: 4 }

// > 如果不给定initValue，则遍历数组会从arr[1]开始，且第一次的pre为arr[0]
result = arr.reduce((pre, cur, index) => {
  if(typeof pre !== 'object') {
    console.log(pre)    // a
    pre = {}
  }
  pre[cur] = index
  return pre
})

console.log(result)     // { b: 1, c: 2, d: 3, e: 4 }
```

------

**array.reduce (callback, initValue?)**

- 功能：从后向前遍历数组，每个元素都执行一遍 `callback`
- 参数：
  - `callback: function(pre, cur, index, arr)`：元素执行的回调函数
  - `initValue?: any`：初始返回值
- 返回值：`any`：不影响原对象，返回值为最后一个元素执行回调函数的返回值

```tsx
let result
const arr = ['a', 'b', 'c', 'd', 'e']

result = arr.reduceRight((pre, cur, index) => {
  pre[cur] = index
  return pre
}, {})

console.log(result)     // { e: 4, d: 3, c: 2, b: 1, a: 0 }

result = arr.reduceRight((pre, cur, index) => {
  if(typeof pre !== 'object') {
    console.log(pre)    // e
    pre = {}
  }
  pre[cur] = index
  return pre
})

console.log(result)     // { d: 3, c: 2, b: 1, a: 0 }
```



---

#### 数组排序

**array.sort (sortBy?)**

- 功能：对数组元素进行排序
- 参数：
  - `sortBy?: function(a, b)`：比较规则函数
- 返回值：`Array<any>`：影响原数组，返回修改后数组

```tsx
let arr
let result 

arr = [3, 1, 2]
result = arr.sort()
console.log(arr)        // [ 1, 2, 3 ]
console.log(result)     // [ 1, 2, 3 ]

// 无法正常比较字符串，因此需要引入比较函数
arr = ['2000','30', '100', ]
result = arr.sort()
console.log(arr)        // [ '100', '2000', '30' ]

result = arr.sort((a, b) => {
  // 这里使用了字符串进行数字计算时隐式转换为number，如100-2000<0,因此100排在2000前
  return a - b          
})
console.log(arr)        // [ '30', '100', '2000' ]
```

> a, b 是要比较的两个值：
>
> - 若比较函数返回值 <0，那么 a 将排到 b 的前面
> - 若比较函数返回值 =0，那么 a 和 b 相对位置不变
> - 若比较函数返回值 >0，那么 b 排在 a 将的前面

------

**array.reverse ()**

- 功能：用于颠倒当前数组的元素排序
- 参数：无
- 返回值：`Array<any>`：影响原数组，返回修改后数组

```tsx
const arr = [null, undefined, {}]

console.log(arr.reverse())      // [ {}, undefined, null ]
```



-----

#### 操作元素

**array.splice (index, count?, ...items?)**

- 功能：用于删除并添加数组元素
- 参数：
  - `index: number`：删除的索引位置，如果是负数，则从末往前数
  - `count?: number`：从索引位置往后数（包括索引位置）要删除元素数量，默认删除索引后的所有元素
  - `items?: any`：删除元素后在对应索引前添加元素
- 返回值：`Array<any>`，影响原数组，返回删除元素组成的新数组

```tsx
let arr
let result
const items = [4, 5, 6]

// 删除元素
arr = [1, 2, 3]
result = arr.splice(1)
console.log(arr)                      // [ 1 ]
console.log(result)                   // [ 2, 3 ]

// 添加元素（只添加元素时参数count为0）
arr = [1, 2, 3]
result = arr.splice(0, 0, ...items)
console.log(arr)                      // [ 4, 5, 6, 1, 2, 3 ]
console.log(result)                   // []

// 删除并添加元素
arr = [1, 2, 3]
result = arr.splice(1, 2, ...items)
console.log(arr)                      // [ 1, 4, 5, 6 ]
console.log(result)                   // [ 2, 3 ]
```

-----

**array.push (...items)**

- 功能：在数组末尾添加新元素
- 参数：
  - `items: any`：添加的元素
- 返回值：`number`，影响原数组，返回新的数组长度

```tsx
const arr = [1, 2, 3] 
const result = arr.push(4,5,6)

console.log(arr)        // [ 1, 2, 3, 4, 5, 6 ]
console.log(result)     // 6
```

-------

**array.concat (...items)**

- 功能：在数组末尾添加新元素
- 参数：
  - `items: any`：添加的元素，如果是数组，则会进行一层扁平化
- 返回值：`Array<any>`，不影响原数组，返回转换后新数组

```tsx
let arr
let result

arr = [1, 2, 3] 
result = arr.concat(4,5,6)
console.log(arr)                // [ 1, 2, 3 ]
console.log(result)             // [ 1, 2, 3, 4, 5, 6 ]

arr = [1, 2, 3]
result = arr.concat([4,[5,6]])
console.log(result)             // [ 1, 2, 3, 4, [ 5, 6 ] ]
```

------

**array.pop ()**

- 功能：删除数组最末的元素
- 参数：无
- 返回值：`any`，影响原数组，返回删除元素

```tsx
const arr = [1, 2, 3] 
const result = arr.pop()

console.log(arr)        // [ 1, 2 ]
console.log(result)     // 3
```

------

**array.unshift (...items)**

- 功能：在数组头部添加新元素
- 参数：
  - `items: any`：添加的元素
- 返回值：`number`，影响原数组，返回新的数组长度

```tsx
const arr = [1, 2, 3] 
const result = arr.unshift(4,5,6)

console.log(arr)        // [ 4, 5, 6, 1, 2, 3 ]
console.log(result)     // 6
```

-----

**array.shift ()**

- 功能：删除数组头部的元素
- 参数：无
- 返回值：`any`，影响原数组，返回删除元素

```tsx
const arr = [1, 2, 3] 
const result = arr.shift()

console.log(arr)        // [ 2, 3 ]
console.log(result)     // 1
```

------

**array.fill (value, start?, end?)**

- 功能：将 `value` 填充覆盖进数组索引的 `[start, end)` 元素，只能在规定长度内填充，无法改变数组长度
- 参数：
  - `value: any`：填充值，如果索引处有值，则覆盖
  - `start?: number`：填充的数组起始索引，默认值为 0，接受负值
  - `end?: number`：填充数组的终止索引，默认值为数组长度，接收负值
- 返回值：`Array<any>`，影响原数组，返回修改后的数组

```tsx
const arr = new Array(3).fill(1)
console.log(arr)      // [ 1, 1, 1 ]

arr.fill(7, 1, 5)
console.log(arr)      // [ 5, 7, 7 ]
```

------

**array.copyWithin (index, start?, end?)**

- 功能：复制数组中索引 `[start, end)` 的元素并粘贴到索引 `index`，会覆盖 index 及之后的元素
- 参数：
  - `index: number`：指定粘贴的起点索引，接受负值
  - `start: number`：指定复制的起点索引，默认为 0，接受负值
  - `end: number`：指定复制的终点索引，默认为数组长度，接受负值
- 返回值：`Array<any>`：影响原数组，返回修改后数组

```tsx
// > // 将 3,4,5 元素粘贴覆盖到 2 元素位置，因为长度超了，所以往后进行覆盖 2,3,4
const arr = [1, 2, 3, 4, 5, 6] 
const result = arr.copyWithin(1, 2, 5)

console.log(arr)        // [ 1, 3, 4, 5, 5, 6 ]
console.log(result)     // [ 1, 3, 4, 5, 5, 6 ]
```

-----

**array.slice (start?, end?)**

- 功能：数组索引 `[start, end)` 的元素浅拷贝到新的数组上
- 参数：
  - `start?: number`：开始索引，默认值为 0，接受负值
  - `end?: number`：终止索引，默认值为数组长度，接受负值
- 返回值：`Array<any>`，不影响原数组，返回拷贝后的新数组

```tsx
let arr 
let result

arr = [1, 2, 3]
result = arr.slice(1,2)
console.log(arr)        // [ 1, 2, 3 ]
console.log(result)     // [ 2 ]

arr = [{x: 1}]
result = arr.slice()
result[0].x = 2
console.log(arr)        // [ { x: 2 } ]，浅拷贝影响引用值
```



-----

#### 查找元素

**array.includes (target, start?)**

- 功能：判断数组索引 `[start, length]` 的元素内是否包含指定元素 `target`
- 参数：
  - `target: any`：指定搜索元素
  - `start?: number`：搜索起始索引，默认值为 0，接受负值
- 返回值：`boolean`，不影响原数组，返回判断结果

```tsx
const arr = [NaN, undefined, null]

console.log(arr.includes(NaN))      // true
console.log(arr.includes(NaN, 1))   // false，[undefined, null] 不包含'a'
```

-----

**array.indexOf (target, start?)**

- 功能：获得指定元素 `target` 在数组 `[start, length]` 元素内的索引，由前往后找，找到第一个满足值立即返回，一般用于查找第一个指定元素出现索引
- 参数：
  - `target: any`：指定搜索元素
  - `start?: number`：搜索起始索引，默认值为 0，接收负值
- 返回值：`number`，不影响原数组，返回指定元素所在索引，不存在则返回 `-1`

```tsx
const arr = [NaN, undefined, undefined, null]

console.log(arr.indexOf(NaN))            // -1，indexOf无法判断NaN的相等
console.log(arr.indexOf(undefined))      // 1
console.log(arr.indexOf(undefined, 3))   // -1
console.log(arr.indexOf(undefined, 2))   // 2
```

-----

**array.lastIndexOf (target, start?)**

- 功能：获得指定元素 `target` 在数组 `[0, start]` 元素内的索引，由后往前找，找到第一个满足值立即返回，一般用于查找最后一个指定元素出现索引
- 参数：
  - `target: any`：指定搜索元素
  - `start?: number`：搜索起始索引，默认值为 `数组长度-1`，接受负值
- 返回值：`number`，不影响原数组，返回指定元素所在索引，不存在则返回 `-1`

```tsx
const arr = [NaN, undefined, undefined, null]

console.log(arr.lastIndexOf(NaN))            // -1，lastIndexOf无法判断NaN的相等
console.log(arr.lastIndexOf(undefined))      // 2
console.log(arr.lastIndexOf(undefined, 0))   // -1
console.log(arr.lastIndexOf(undefined, 1))   // 1
```

------

**array.find (mapFn, thisArg?)**

- 功能：获取第一个满足条件的数组元素
- 参数：
  - `mapFn: function(item, index, arr)`：map 条件回调函数，需要有 return 值
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）
- 返回值：`any`，不影响原数组，返回满足条件的元素，无满足项则返回 `undefined`

```tsx
const arr = ['1', 2, [3], 4]

const result = arr.find((item) => {
  return typeof item === 'number'
})

console.log(result)     // 2
```

------

**array.findIndex (mapFn, thisArg?)**

- 功能：获取第一个满足条件的数组元素的下标
- 参数：
  - `mapFn: function(item, index, arr)`：map 条件回调函数，需要有 return 值
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）
- 返回值：`number`，不影响原数组，返回满足条件的元素索引，无满足项则返回 `-1`

```tsx
const arr = ['1', 2, [3], 4]

const result = arr.findIndex((item) => {
  return typeof item === 'number'
})

console.log(result)     // 1
```

------

**array.filter (mapFn, thisArg?)** 

- 功能：过滤原始数组，获取所有满足条件元素的数组
- 参数：
  - `mapFn: function(item, index, arr)`：map 条件回调函数，需要有 return 值
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）
- 返回值：`Array<any>`，不影响原数组，将满足条件的元素填充进新数组并返回

```tsx
const arr = ['1', 2, [3], 4]

const result = arr.filter((item) => {
  return typeof item === 'number'
})

console.log(result)     // [ 2, 4 ]
```

------

**array.every (mapFn, thisArg?)** 

- 功能：判断数组内所有的元素是否都符合条件
- 参数：
  - `mapFn: function(item, index, arr)`：map 条件回调函数，需要有 return 值
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）
- 返回值：`boolean`，不影响原数组，只有所有元素都满足条件才返回 `true`

```tsx
let arr
const callback = (item) => {
  return typeof item === 'number'
}

arr = ['1', 2, [3], 4]
console.log(arr.every(callback))      // false

arr = [1, 2, 3, 4]
console.log(arr.every(callback))      // true
```

------

**array.some (mapFn, thisArg?)** 

- 功能：判断数组内是否有元素符合条件
- 参数：
  - `mapFn: function(item, index, arr)`：map 条件回调函数，需要有 return 值
  - `thisArg?: any`：更改回调函数绑定的 this（使用该参数时回调函数不能写成箭头函数形式）
- 返回值：`boolean`，不影响原数组，只要任意元素满足就返回 `true`

```tsx
let arr
const callback = (item) => {
  return typeof item === 'number'
}

arr = ['1', 2, [3], 4]
console.log(arr.some(callback))      // true

arr = [1, 2, 3, 4]
console.log(arr.some(callback))      // true
```



-------

### 使用技巧

#### 遍历数组

> 上面的函数方法都是不能在遍历途中退出遍历的（除非抛出错误），如果想达成该目的，可以使用下面方式遍历数组

**for-in**

使用 `for-in` 遍历数组，拿到的数据是数组的索引值，使用 `continue` 跳出单次循环，使用 `break` 或 `return` 跳出遍历

```tsx
const arr = ['a', 'b', 'c', 'd']

for(let index in arr) {
  console.log(index)         // 0 1 2 3
  if(index === '2') continue
  console.log(arr[index])    // a b d
}


for(let index in arr) {
  console.log(index)         // 0 1 2
  if(index === '2') break
  console.log(arr[index])    // a b
}
```

-----

**for-of**

使用 `for-of` 遍历数组，拿到的是对应的数组元素，使用 `continue` 跳出单次循环，使用 `break` 或 `return` 跳出遍历

```tsx
const arr = ['a', 'b', 'c', 'd']

for(let item of arr) {
  console.log(item)         // a b c d
  if(item === 'b') continue
}

for(let item of arr) {
  console.log(item)         // a b
  if(item === 'b') break
}
```

