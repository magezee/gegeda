## 字典

### 特性

#### 键值对

Map 和 Object 一样，数据同样是 `key-value` 的对应关系，不过与 object 不同的是，map 的 key 可以不为字符串类型

```tsx
// > object 无法区别数值1和字符串1，后声明的会隐式转换为字符串然后覆盖同名key
const obj = {
  '1': 'string',
  1: 'number'
}

console.log(Object.keys(obj))       // [ '1' ]
console.log(Object.values(obj))     // [ 'number' ]

const map = new Map()
map.set('1', 'string')
map.set(1, 'number')

console.log(map.keys())             // [Map Iterator] { '1', 1 }
console.log(map.values())           // [Map Iterator] { 'string', 'number' }
```

-----

#### 长度

可以通过 `map.size` 获取一个字典的数据数量

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')

console.log(map.size)       // 2
```



------

### 字典方法

**map.set (key, value)**

- 功能：为字典添加数据
- 参数：
  - `key: any`：key 值
  - `value: any`：value 值
- 返回值：`map`，返回新增数据后的 map 实例

```tsx
const map = new Map()
map.set('a', 'A')

console.log(map.set('b', 'B'))      // Map(2) { 'a' => 'A', 'b' => 'A' }
```

-----

**map.has (key)**

- 功能：检查字典中是否含有指定 key 数据
- 参数：
  - `key: any`：key 值
- 返回值：`boolean`，判断结果

```tsx
const map = new Map()
map.set('a', 'A')

console.log(map.has('a'))      // true
console.log(map.has('b'))      // false
```

-----

**map.get (key)**

- 功能：获取字典中指定 key 的 value 值
- 参数：
  - `key: any`：key 值
- 返回值：`any`，对应 value 值

```tsx
const map = new Map()
map.set('a', 'A')

console.log(map.get('a'))      // A
```

------

**map.delete (key)**

- 功能：删除字典中的指定 key 数据
- 参数：
  - `key: any`：key 值
- 返回值：`boolean`，若在字典中可以找到对应数据并且删除返回 true，否则 false

```tsx
const map = new Map()
map.set('a', 'A')

console.log(map.delete('a'))      // true
console.log(map.delete('b'))      // flase
console.log(map.get('a'))         // undefined
```

------

**map.keys ()**

- 功能：返回字典中的所有 key 值
- 参数：无
- 返回值：`Map Iterator`，一个包含所有 key 数据的迭代器

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')
const result = map.keys()

console.log(result)                                      // [Map Iterator] { 'a', 'b' }
console.log(Object.prototype.toString.call(result))      // [object Map Iterator]
```

------

**map.values ()**

- 功能：返回字典中的所有 value 值
- 参数：无
- 返回值：`Map Iterator`，一个包含所有 value 数据的迭代器

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')
const result = map.values()

console.log(result)                                      // [Map Iterator] { 'A', 'B' }
console.log(Object.prototype.toString.call(result))      // [object Map Iterator]
```

------

**map.clear ()**

- 功能：删除字典中所有数据
- 参数：无
- 返回值：无

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')
map.clear()

console.log(map.keys())       // [Map Iterator] {  }
```

-----

**map.forEach(fn)**

- 功能：遍历字典
- 参数：
  - `function(value, key, map) `
    - value：当前 value 值
    - key：当前 key 值
    - map：当前遍历字典
- 返回值：无

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')

map.forEach((value, key, map) => {
  console.log(value)      // A  B
  console.log(key)        // a  b
  console.log(map)        // Map(2) { 'a' => 'A', 'b' => 'B' }  Map(2) { 'a' => 'A', 'b' => 'B' }
})
```



------

### WeakMap

和 `Map` 类似，不过 key 的类型只能为引用类型，对数据的绑定为弱引用方式

> 当 Map 的 key 为引用类型时，垃圾回收机制难以回收其数据，所以出现了 WeakMap
>
> 值类型是一个固定的值，不会对内存地址产生另外的引用，因此 Map 只需将该 key 值存进自身即可，所以即使使用变量来声明值类型的 key，该变量仍能被回收

```tsx
const map = new Map()
let obj = {}
map.set(obj, 'data')

obj = null    		// 尽管将obj设为null，但是map此时仍然保持对obj的引用，因此obj不会被清掉
map.delete(obj)		// 再次去除map的引用，obj才会被回收
```

> 使用 WeakMap 可以比较省事

```tsx
const weakMap = new WeakMap()
let obj = {}
weakMap.set(obj, 'data')

obj = null    		// 尽管此时weakMap还保持对obj的引用，但是由于是弱引用，因此GC会在某个时刻清理obj
```

WeakMap 不可被遍历，因为可能在遍历途中数据就会被回收掉，因此可以使用的方法只有 `weakMap.set()`、`weakMap.get()`、`weakMap.delete()`，使用方式和 Map 完全一样



-----

### 使用技巧

#### 遍历字典

`for-of` 可以遍历字典，拿到的是一个数组，包含字典的 key 和 value

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')

for(let data of map) {
  console.log(data)     // [ 'a', 'A' ]  [ 'b', 'B' ]
}
```

> for -of 方法同样可以用来遍历迭代器对象

```tsx
const map = new Map()
map.set('a', 'A')
map.set('b', 'B')
const result = map.values()

console.log(result)                                      // [Map Iterator] { 'A', 'B' }

for(let key of result) {
  console.log(key)                                       // A B
}
```

