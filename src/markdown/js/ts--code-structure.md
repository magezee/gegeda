## 代码结构

### 类

和 js 代码里的类声明方式基本相同

```tsx
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }

  say() {
    console.log(`I am ${this.name}`)
  }
}

const lulu = new Animal('lulu')
lulu.say()      // I am lulu
```

------

#### 抽象

使用 `abstract class` 关键字定义一个抽象类，其作用是规范子类内容

抽象成员只能声明而不能实现，需要在子类中去实现

> 只能在抽象类中声明抽象成员

```tsx
abstract class Animal {
  age: number = 10
  abstract name: string
  abstract say(): void
}

class Cat extends Animal {
  name = 'lulu'
  say = () => {
    console.log(`my name is ${this.name}`)        
    console.log(`my age is ${this.age}`)      // 如果不是抽象属性，则继承时不需要实现
  }
}
```

-----

#### 继承

**extends**

继承一个类，从父类那继承所有的属性和方法，不可以重写属性，但是可以重写方法

> 最多只能继承一个类

```tsx
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }

  say() {
    console.log(`I am ${this.name}`)
  }
}

class Cat extends Animal {
  say() {
    console.log(`cat's name is ${this.name}`)
  }
}

const lulu = new Cat('lulu')
lulu.say()      // cat's name is lulu
```

**implements**

实现任意个接口，需要实现接口的所有属性和方法

```tsx
abstract class Animal {
  abstract name: string
}

interface IcatAction {
  eat(food: string): void
} 

interface IcatInfo {
  owner: string
}

class Cat extends Animal implements IcatAction,IcatInfo {
  name = 'lulu'
  owner = 'jack'
  eat(food: string) {
    console.log(`I eat ${food}`)
  }
}

const lulu = new Cat()
lulu.eat('fish')      // I eat fish
```

------

#### 权限

- `public`：类成员可以被父子实例和子类访问到
- `private`：类成员不能被父子实例与子类访问到
- `protected`：类成员可以被子类访问到但是不能被父和子实例访问到

```tsx
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  public say() {
    console.log(`my name is ${this.name}`)
  }
  private run() {
    console.log('I am runing')
  }
}

const cat = new Animal('cat')
cat.say()
cat.run()   // 报错,私有属性只能在Animal中访问
```



----

#### 静态

使用 `static` 声明静态成员，静态方法内部只能使用静态成员

```tsx
class Cat {
  age: number = 12
  static food: string = 'fish'

  static useProperty() {
    console.log(this.age)   // 报错，不能使用实例成员,因为不存在
    console.log(this.food)  // fish
  }
}
```



-----

### 接口

接口使用场景：

- 规范类的实现
- 规定类型

> 规范类上面已有概念，这里只说明第二种情况

由于接口实例需要实现接口全部内容，因此可以用于定义对象类型

```tsx
interface Iperson {
  sex: string
  age: number
}

const jcak: Iperson = {
  sex: 'man',
  age: 12
}
```

#### 继承

```tsx
interface Iperson {
  sex: string
  age: number
}

interface IpersonAction extends Iperson {
  eat(food: string): void
}

const jcak: IpersonAction = {
  sex: 'man',
  age: 12,
  eat(food: string) {
    console.log(`eat ${food}`)
  }
}
```



-----

### 函数

```tsx
// 普通函数
function fn(x: number): number {
  return x
}

// 箭头函数
const fn_ = (x: number): number => {
  return x
}
```

#### 重载

函数重载的目的是为了让一个同名函数可以适配多个规则，写法是多个函数规则，和最终匹配一个函数实现

> 写函数重载的目的是未了可以方便看出这个函数拥有多套规则

```tsx
function fn(x: number, y: string): void
function fn(x: number): number
function fn(x: number, y?: string): void | number {
  if(y) {
    console.log('fn1 is running')
  } else {
    console.log('fn2 is running')
    return x
  }
} 

fn(1, '2')    // fn1 is running
fn(1)         // fn2 is running
```



------

### 枚举

枚举本质上是用一串有顺序的 int 数值去依次表示枚举里的内容

```tsx
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up)       // 0
console.log(Direction.Down)     // 1
console.log(Direction.Left)     // 2
console.log(Direction.Right)    // 3

console.log(Direction[0])    // Up
console.log(Direction[1])    // Down
console.log(Direction[2])    // Left
console.log(Direction[3])    // Right
```

当给具体某个属性赋值时，后面的属性会依据这个赋值数字往下递增赋值

```tsx
enum Direction {
  Up,
  Down = 6,
  Left,
  Right
}
console.log(Direction.Up)       // 0
console.log(Direction.Down)     // 6
console.log(Direction.Left)     // 7
console.log(Direction.Right)    // 8
```

**常量枚举**

常量枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用，可以提升枚举性能

```ts
enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

const value = 'Up'
console.log(value === Direction.Up)   // true
```

**实现**

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// 等同于下面的js代码
var Direction;
(function (Direction) {
  // 将Direction对象新增一个属性up，并赋值0，然后再新增一个属性0 并赋值up
  Direction[Direction["Up"] = 0] = "Up";		
  Direction[Direction["Down"] = 1] = "Down";
  Direction[Direction["Left"] = 2] = "Left";
  Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));

/* 
最终Direction对象的结果:
  { 
    '0': 'Up',
    '1': 'Down',
    '2': 'Left',
    '3': 'Right',
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3 
  }
*/
```



----

### 变量

#### !和?

**! 的规则**

- 用在变量前，表示取反
- 用在变量后，使 `null` 和 `undefined` 类型可以赋值给其他类型并通过编译，表示告诉编译器这里有值

```tsx
let x:number

x = null         // 无法通过编译
x = undefined    // 无法通过编译

x = null!
x = undefined!
```

一般用于可选数据中

```tsx
function fn(params?: number) {
  const x: number = params     // 报错:因为params可选，因此类型实际为number|undefined,不能直接传给number
  const y: number = params!
}
```

> 如果存在空情况的判断并赋具体值时，可以不用 `!`

```tsx
function fn(params?: number) {
  const x: number = params || 1     
}
```

-----

**? 的规则**

- 表示可选值

```tsx
interface Iobj{
  x: number,
  y?: string      // 表示y为非必须值
}

const obj: Iobj = {
  x: 1
}
```

- 非空判断，表示当去深层访问对象时，表示有值的时候才继续往下访问

```tsx
function fn(params?: { x: number }) {
  let m = params.x              // 报错:由于paramas可选,因此可能为undefined,undefined.x会导致报错
  let n = params?.x

  let x: number = params?.x     // 报错:不能将类型number|undefined赋值number
  let y: number = params?.x!
}
```

>但是该用法只能用于读操作，因为无法为一个可能为空的属性进行赋值，如果需要写入，则需要类型断言

```tsx
function fn(params?: { x: number }) {
  params?.x = 1;    // 报错:无法对可选属性赋值
  (params as { x: number}).x = 1
}
```

