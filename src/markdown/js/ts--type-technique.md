## 类型体操

### 关键字

#### [ ]

和非类型操作中的 `[]` 用法类似，可以充当对象或接口中的 key 值变量声明式，也可以充当 `obj[x]` 的方式取出对应接口或对象的 `x` 类型

> 键值只能为 `string` 、`number`、`symbol` 和具体字符串值类型

```tsx
interface IType {
  [key: string]: boolean
}

type ObjType  = {
  [key: number]: boolean
}

const obj1: IType = {
  x: false,
  y: true
}

// 报错，key值不为number
const obj2: ObjType = {
  x: false,
  y: true
}
```

**使用场景**

为一个对象规定具体的键值

> 如果使用具体的字符串值作为类型，需用关键字 `in` 来表示 key 为该类型

```tsx
type Type = 'x' | 'y'
type Obj = {
  [key in Type]: number
}

// 规定obj的键值只能为x和y
const obj: Obj = {
  x: 1,
  y: 2
}
```

获取一个接口类型的具体键值的类型

```tsx
interface IType {
  n: null
  m: undefined
}

type Obj = {
  x: number,
  y: string
}

type Res2 = IType['n']      // null
type Res1 = Obj['x']        // number
```



------

#### keyof

用于获取一个接口的 key 值，返回的结果是一个键值字符串联合类型

```ts
interface Type {
  str: string,
  num: number
}

type Res = keyof Type       // 'str' | 'num'
const data: Res = 'num'
```

**使用场景**

用某个接口的键值去规范另外一个对象类型的键值

```tsx
interface Type {
  x: string,
  y: number
}

type Obj = {
  [key in keyof Type]: boolean
}

// obj的键值被限定只能为x和y
const obj: Obj = {
  x: true,
  y: false        // 报错，只能为boolean类型
}
```

获取接口或对象内的全部类型的联合类型

```tsx
interface Type {
  x: number,
  y: boolean
}

type Res = Type[keyof Type]   // number | boolean
```

### 类型映射

#### Record

