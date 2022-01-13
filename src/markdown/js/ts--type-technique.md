## 类型体操

### 关键字

#### [ ]

和非类型操作中的 `[]` 用法类似，可以充当对象或接口中的 key 值变量声明式，也可以充当 `obj[x]` 的方式取出对应接口或对象的 `x` 类型

> 键值只能为 `string` 、`number`、`symbol` 和具体字符串值类型

```tsx
interface Obj {
  [P: string]: any
}

type ArrLike  = {
  [P: number]: any
}

const obj: Obj = {
  key: 'value'
}

const arrLike: ArrLike = {
  0: 'value'
}
```

**使用场景**

为一个对象规定具体的键值

> 如果使用具体的字符串值作为类型，需用关键字 `in` 来表示 key 为该类型

```tsx
type PersonInfo = 'name' | 'nationality'
type Person = {
  [P in PersonInfo]: string
}

const jack: Person = {
  name: 'jack',
  nationality: 'US'
}
```

获取一个接口类型的具体键值的类型

```tsx
interface Person {
  name: string
  age: number
}

type Pet = {
  species: string,
  meatEating: boolean
}

type Name = Person['name']                 // string
type MeatEating = Pet['meatEating']        // boolean
```

使用这个性质，可以新建一个类型，对另外一个接口或对象类型进行遍历更改

> 很多内置的方法都是使用这个思路实现，如 `Pick` 、`Omit` 、`Partial`、`Required` 等等

```tsx
interface Person {
  name: string,
  age: number
}

type Partial<T> = {
  [P in keyof T]?: T[P]    // T[P]赋予原来键值相同的类型
}

// 把Person类型中的所有键值都变成可选类型
type NewPerson = Partial<Person>
```



------

#### keyof

用于获取一个接口的 key 值，返回的结果是一个键值字符串联合类型

```ts
interface Person {
  name: string,
  age: number
}

type PersonInfo = keyof Person       // 'name' | 'age'

const age: PersonInfo = 'age'
```

**使用场景**

用某个接口的键值去规范另外一个对象类型的键值

> 如有一个接口类型，需要对象的键值和接口键值一致，但是对应值不同类型的情况

```tsx
interface PersonInfo {
  name: any,
  nationality: any
}

type Person = {
  [P in keyof PersonInfo]: string
}

// 对象的键值被限制为PersonInfo的键值，且类型被限制为string
const person: Person = {
  name: 'Li',
  nationality: 'China'
}
```

获取接口或对象内的全部类型的联合类型

```tsx
interface PersonInfo {
  name: string,
  age: number
}

type InfoType = PersonInfo[keyof PersonInfo]      // string | number
```



------

### 类型映射

#### Record<K, T>

构造一个对象类型，键值类型为 K，值类型为 T

```tsx
type PersonName = 'Li' | 'Lucy' | 'Jim'

interface PersonInfo {
  age: number
  nationality: string
}

const person: Record<PersonName, PersonInfo> = {
  Li: { age: 14, nationality: 'China' },
  Lucy: { age: 12, nationality: 'US' },
  Jim: { age: 18, nationality: 'UK' },
}
```



-----

#### Pick<T, K>

从类型 T 中选出键值为 K 的类型用于构造一个新对象类型

```ts
interface Person {
  name: string
  age: number
  nationality: string
}

type Key = 'name' | 'age'
type PickInfo = Pick<Person, Key>
/*  
  type PickInfo = {
    name: string,
    age: number
  }
*/
```



----

#### Omit<T, K>

从类型 T 中剔除键值为 K 的类型用于构造一个新对象类型

```tsx
interface Person {
  name: string
  age: number
  nationality: string
}

type Key = 'nationality' 
type OmitInfo = Omit<Person, Key>
/*  
  type OmitInfo = {
    name: string,
    age: number
  }
*/
```



-----

#### Partial<T>

复制 T 类型构造一个新对象类型，该类型的所有键值为可选类型

```tsx
interface Person {
  name: string
  age: number
}
type NewPerson = Partial<Person>
/*  
  type NewPerson = {
    name?: string,
    age?: number
  }
*/
```



----

#### Required<T>

复制 T 类型构造一个新对象类型，该类型的所有键值为必要类型

```tsx
interface Person {
  name?: string
  age?: number
}
type NewPerson = Required<Person>
/*  
  type NewPerson = {
    name: string,
    age: number
  }
*/
```



-----

### 类型运算

#### Exclude<T, U>

在两个联合类型 T、U 中，去除 T 中含有 U 相同类型的类型，以此构造一个新的联合类型

```tsx
type T = 'A' | 'B' | 1
type U = 1 | 2 | 3

type Res = Exclude<T, U>    // 'A' | 'B'
```



----

#### Extract<T, U> 

在两个联合类型 T、U 中，取 T、U 中类型交集，以此构造一个新的联合类型

```tsx
type T = 'A' | 'B' | 1
type U = 1 | 2 | 3

type Res = Extract<T, U>    // 1
```



----

#### NonNullable<T>

去除联合类型 T 中的 `undefined` 和 `null` 类型，以此构造一个新的联合类型

```tsx
type T = 'A' | 'B' | 1 | undefined | null

type Res = NonNullable<T>    // 'A' | 'B' | 1
```



----

### 类型获取

#### ReturnType<T>

获取函数类型 T 的返回类型，以此构造一个新的类型

```tsx
const fn = (): number => {
  return 1
}

// 通过typeof拿到函数的类型
type Res = ReturnType<typeof fn>    // number
```



-----

#### InstanceType<T>

获取构造函数类型 T 的实例类型，以此构造一个新的类型

> 具体有什么用暂未知道

```tsx
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

type Res = InstanceType<typeof Person>  // Person

```

