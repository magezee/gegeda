## 类型

### 声明

使用 `:` 声明数据类型

常用类型有：`Number`、`BigInt`、 `Strng`、 `Boolean`、`Symbol`、 `Null`、`Undefined`、`Object`、`Function` 等（全小写也可以

> 值为 `null` 或 `undefined` 时可以匹配任意类型（相当于其他类型的共同子类型）
>
> 但是如果在 `tsconfig.json` 文件里配置 `compilerOptions.strict : true` 时，则不会允许将它们赋值给其他类型

```tsx
const demo: String = 'demo'
```

类型 `any` 可以匹配任意的数类型，也可以修改为任意数据类型，将一个 any 类型传递给任意类型都会变成 any 类型

> 使用 any 就和写 js 没什么区别，相当于少了类型检查，如果不会写 typescript 可以写 anyscript

**基本体操**

类型推论：当声明变量并赋值没有指明类型时，会自动根据第一次赋值给定对应类型规则

```tsx
let a = true
a = 1     // 报错，无法将number赋值给boolean
```

返回类型：在基本用法中 `typeof` 会返回一个该变量的类型标志，但是用在类型中时，表示取该变量的类型

```tsx
const num = 1

type m = typeof num
type T = m | string

const x = '1'
```

类型别名：使用 `type` 声明一个类型变量

```tsx 
type num = number
const n: num = 100
```

联合类型：使用 `|` 将类型规则组合，表示传入类型可为任意一个类型规则

```tsx
interface typeA { name: string }
interface typeB { age: number }
type uniteType = typeA | typeB

const obj: uniteType = {
  age: 12
}
```

交叉类型：使用 `&` 将类型规则组合，表示传入类型必须满足所有类型规则

```tsx
interface typeA { name: string }
interface typeB { age: number }
type uniteType = typeA & typeB

const obj: uniteType = {
  name: 'jack',
  age: 12
}
```

类型断言：使用 `<>` 或 `as` 来告诉编译器此时的变量类型

> `<>` 的断言是针对一行代码段，如果只想对部分内容断言需要加上括号处理

```tsx
const getLength = (target: string | number): number => {
  // 如果不用类型断言，这里会因为存在number.length的情况而报错
  if((<string>target).length) {
    return (<string>target).length
  } else {
    return return (<number>target).toString().length
  }
}
```

> `as` 的写法

```tsx
const getLength = (target: string | number): number => {
  if((target as string).length) {
    return (target as string).length
  } else {
    return (target as number).toString().length
  }
}
```

> 类型断言并非类型转换，它并不会真的影响到变量类型规则

```tsx
const getLength = (target: string | number): number => {
  const obj = target as object    // 报错,target不存在object的情况
}
```



----

### 泛型

#### 功能

泛型的作用在单次使用的时候才去指明具体的类型，这样就可以封装更加灵活的代码

```tsx
function fn<T>(parmas: T): T {
  return parmas
}

fn<number>(1)    
fn<string>('1')
fn<boolean>(1)		 // 类型number无法赋予boolean
```

泛型使用 `<>` 来进行标志，有常用几个字母表示特定意思：

- `T`：代表 Type，用于定义泛型时通用的第一个任意类型变量名称
- `U`：扩展任意类型，用于第二个任意类型变量名称
- `S`：扩展任意类型，用于第三个任意类型变量名称
- `K`：代表 Key，用于表示对象键类型
- `V`：代表 Value，用于表示对象值类型
- `E`：代表 Element，用于表示元素类型

```tsx
function fn<T, U>(x: T, y: U): [T, U] {
  return [x, y]
}

let result = fn<string, number>('1', 2)
result = [1, '2']    // 报错：result为[string,number]类型
```

> 实际上浏览器会根据单次传入的第一次值来确定泛型的类型，而不需要我们显示定义

```tsx
function fn<T, U>(x: T, y: U): [U, T] {
  return [y, x]
}

const result = fn('1', 2)
```

> 当编译器无法根据条件推测出泛型的具体类型时，会指定为 `unknown`，如果不想要这种情况，可以手动地在泛型定义时指定一个默认类型，这样编译器如果无法判断类型时，不会为 `unknow` 而会是指定的默认类型

```tsx
function fn<T = number>(parms?:T):T | undefined {
  return parms
}

function fn_<T>(parms?:T):T | undefined {
  return parms
}


function takeData(parms: number | undefined) { }

const result = fn()
const result_ = fn_()
takeData(result)          
takeData(result_)          // 报错:类型unknown不能赋给类型number|undefined
```

泛型类型可以继承规则

```tsx
type t = Array<any>

function fn<T extends t>(arg: T): void {
  arg.map(item => item)
  
}

function fn_<T>(arg: T): void {
  arg.map(item => item)     // 报错：类型T上不存在map
}
```



-----

#### 技巧

**泛型类**

```tsx
class Queue<T> {
  data: Array<T> = []
  push(item: T) {
    return this.data.push(item)
  }
}

// 在实例化的时候声明类的泛型所指数据类型
const queue1 = new Queue<number>()
const queue2 = new Queue<boolean>()

queue1.push(3)
queue1.push(true)   // 报错
```

----

**泛型接口**

```tsx
interface Idemo<K, V> {
  key: K,
  value: V
}

const demo: Idemo<boolean, number> = {
  key: true,
  value: 123
}
```

-----

**泛型函数**

```tsx
// 普通函数
function fn<T>(parmas: T): T {
  return parmas
}

// 箭头函数
const fn = <T>(parmas: T): T => {
  return parmas
}
```

如果多个函数拥有一套相似的入参和返回结果，可以使用接口去规范多个函数

```tsx
interface IPlus<T> {
    (a: T, b: T): T
}
function plus(a: number, b: number): number {
    return a + b;
}
function connect(a: string, b: string): string {
    return a + b;
}

const funPlus: IPlus<number> = plus;
const funConnect: IPlus<string> = connect;

// 如果不用泛型接口，想要规范的给变量赋予函数时，应该这样写，使用泛型接口可以省了很多代码
const funPlus: (a: string, b: string) => string = plus;
```



-----

