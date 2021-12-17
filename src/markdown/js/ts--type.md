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

返回类型：在基本用法中 `typeof` 会返回一个该变量的数据类型，但是用在类型中时，表示该变量的类型

```tsx

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
  const str = target as string
  const num = target as number
  if(str.length) {
    return str.length
  } else {
    return num.toString().length
  }
}
```

> 类型断言并非类型转换，它并不会真的影响到变量类型规则

```tsx
const getLength = (target: string | number): number => {
  const obj = target as object    // 报错,target不存在object的情况
}
```



 

