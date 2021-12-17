## 声明文件

### 介绍

声明文件的功能是给代码补充类型标注，其文件名后缀为 `.d.ts`，可以放在项目中的任意位置

使用 `declare` 来声明变量类型，这个作用影响到项目全局，可以在任意文件中直接使用该值

```tsx
// index.d.ts
declare var num: number
declare const str: string 
declare interface Itype {
  num: number
  str: string
}
```

```tsx
// index.ts
num = 'x'     // 报错 无法将string赋值给number类型 
str = 'x'     // 报错 str是一个常数

const obj: Itype = {
  num: 2,
  str: 'x'
}
```

可以在文件内部声明同名变量替换声明文件内部的声明

> 但是使用 `const、let` 关键字声明的变量无法覆盖，因为其特性导致无法多次声明

```tsx
// index.ts
interface Itype {
  num: string
  str: string
}

const obj: Itype = {
  num: 2,    // 报错 无法将number赋值给string类型 
  str: 'x'
}
```

如果不想污染到全局变量名，可以尝试在命名空间下声明，使用 `namespace` 下声明

```tsx
// index.d.ts
declare namespace A {
  var demo: number
}

declare namespace B {
  var demo: string
}
```

```tsx
// index.ts
A.demo = 'x'     // 报错，无法将string赋值给number类型
B.demo = 'x'
```

> 命名空间更多的时候是为了服务声明文件内部使用的

定义种类：

```tsx
declare var                         // 声明全局变量
declare function                    // 声明全局方法
declare class                       // 声明全局类
declare enum                        // 声明全局枚举类型
declare namespace                   // 声明全局对象（含有子属性）
declare interface                   // 声明全局类型
declare type                        // 声明全局类型
```



----

### 注意

声明类型 `declare` 也可放在 `.ts` 文件中，且功能和 `d.ts` 文件下完全相同，其根本原因是 `declare` 是用于给 js 额外提供的类型声明标志符，编译后的代码为 js 代码，为了保留其类型声明，需要拥有对应的类型声明文件，如果是开发过程中，直接使用 ts 自己的类型就行，没有必要额外编写声明文件

> 可以抽象理解为一份 `.ts` 文件在项目编译后，会生成代码 `.js` ，抽离类型代码 `.d.ts` 两份文件
>
> 然后使用 `namespace` 去区分具体附加的 js 模块

声明文件的功能：

在使用第三方库时，虽然通过直接引用可以调用库的类和方法，但是却无法使用 ts 诸如类型检查等特性功能，为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 js 库和模块信息的声明文件，通过引用这个声明文件，就可以借用 ts 各种特性来使用库文件了

 

