## 声明文件

### 介绍

声明文件的功能是给代码补充类型标注，其文件名后缀为 `.d.ts`，可以放在项目中的任意位置

使用 `declare` 来声明变量类型，这个作用影响到项目全局，可以在任意文件中直接使用该值

> 在 `.ts` 文件下也可以使用 `declare` 去定义类型，使用 `.d.ts` 文件的原因是项目打包发布后最终呈现的是 js，会失去类型数据，需要一个文件来标记一个 js 库里的类型

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



----







