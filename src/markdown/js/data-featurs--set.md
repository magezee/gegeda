## 集合

### 特性

#### 数据唯一

Set 集合存储任意类型的数据，类似数组，不过这些数据唯一

```tsx
const set = new Set([1,2,3,1])

console.log(set)      // Set(3) { 1, 2, 3 }
```

-----

#### 长度

可以通过 `set.size` 获取一个集合的数据数量

```tsx
const set = new Set([1,2,3,1])

console.log(set.size)      // 3
```



----

### 集合方法

**set.add (value)**

- 功能：为集合添加数据
- 参数：
  - `value: any`：value 值
- 返回值：`set`，返回新增数据后的 set 实例

```tsx
const set = new Set([1,2,3])

console.log(set.add(4))      // Set(4) { 1, 2, 3, 4 }
```

------

**set.has (value)**

- 功能：检查集合中是否含有指定数据
- 参数：
  - `value: any`：value 值
- 返回值：`boolean`，判断结果

```tsx
const set = new Set([1,2,3])

console.log(set.has(1))      // true
console.log(set.has(4))      // false
```

-----

**set.delete (value)**

- 功能：删除集合中的指定数据
- 参数：
  - `value: any`：value值
- 返回值：`boolean`，若在集合中可以找到对应数据并且删除返回 true，否则 false

```tsx
const set = new Set([1,2,3])

console.log(set.delete(1))      // true
console.log(set.delete(4))      // false
```

-------

**set.clear ()**

- 功能：删除集合中所有数据
- 参数：无
- 返回值：无

```tsx
const set = new Set([1,2,3])
set.clear()      

console.log(set)              // Set(0) {}
```

-----

**set.forEach(fn)**

- 功能：遍历字典
- 参数：
  - `function(value, value_, set)`
    - value：当前 value 值
    - value_：当前 value 值
    - map：当前遍历字典
- 返回值：无

```tsx
const set = new Set([1,2])

set.forEach((value, value_, set) => {
  console.log(value)      // 1 2
  console.log(value_)     // 1 2
  console.log(set)        // Set(2) { 1, 2 }  Set(2) { 1, 2 }
})
```



-----

### WeakSet

和 [WeakMap](/js/data-featurs/map#heading-5) 特性和功能类似，存储的数据必须为引用类型，且不可被遍历

```tsx
const weakSet = new WeakSet()
const obj = {}

weakSet.add(obj)
```



------

### 使用技巧

#### 遍历集合

`for-of` 可以遍历集合，拿到的是当前 value

```tsx
const set = new Set([1,2,3])

for(let data of set) {
  console.log(data)     // 1 2 3
}
```

------

#### 数组去重

利用集合的唯一性可以做到快捷方便的数组去重

```tsx
const arr = [1,2,3,1]
const newArr = [...new Set(arr)]

console.log(newArr)     // [ 1, 2, 3 ]
```

