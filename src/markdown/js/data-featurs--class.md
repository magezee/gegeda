## 类

> [为什么要写 super()?](https://juejin.cn/post/6844903729980768269)

类是构造函数的语法糖，本质上也是原型链，但是和构造函数有些许不同



----

### 特性

**暴露属性的方式**

类中不允许使用关键字声明变量或函数，但可以直接声明，如果直接声明变量，在实例化对象的时候将该变量赋值进实例，如果使用函数式声明函数，则会将该函数放置于类的原型中，以便实例调用

```tsx
class Person {
  constructor(name){
    this.name = name
  }
	
  x = 'x'
  const y = 'y'                   // 报错

  // 函数表达式，这里实际上也相当于声明了个属性say
  say = () => {
    console.log(`my name is ${this.name}`)
  }
  // 函数声明式，不会复制进实例，而是放在了类的原型中
  say_() {
    console.log(`my name is ${this.name}`)
  }
}

const jack = new Person('jack')

console.log(jack)                 // Person { x: 'x', say: [Function: say], name: 'jack' }
jack.say()                        // my name is jack
jack.say_()                       // my name is jack

console.log(jack.__proto__.say)   // undefined
console.log(jack.__proto__.say_)  // [Function: say_]
```

> 由此可以知道，类的构造方法 `constructor()` 实际上也是绑定在类的原型上的，然后可以看出 constructor 与原型链上的 constructor 属性同名，因此类中的构造方法实际上就是原型链上的构造函数

```tsx
class Person {}
console.log(Person.prototype.constructor)   // [Function: Person]
```

**构造函数**

构造方法`constructor()` 方法机制，通过 new 生成实例时，自动调用该方法，其内部隐性地收集类中声明的变量和函数，然后按照上面的特点整理属性的去向，如上面类等价于下面的构造函数写法：

> 一个类必须有`constructor()`方法，如果没有显式定义，一个空的 `constructor() `方法会被默认添加

```tsx
function Person(name) {
  this.name = name
  this.x = 'x'
  this.say = () => {
    console.log(`my name is ${this.name}`)
  }
  Person.prototype.say_ = function() {
    console.log(`my name is ${this.name}`)
  }
}
```

> `constructor()` 默认返回实例对象，如果有返回值，则与构造函数返回值情况相同

```tsx
class Person {
  constructor() {
    return {x: 'x'}
  }
}

const jack = new Person()
console.log(jack)   // { x: 'x' }
```

**静态属性**

可以在类内部通过关键字 `static` 声明静态属性

```tsx
class Person {
  static x = 'x'
}
Person.y = 'y'

console.log(Person.x)   // x
console.log(Person.y)   // y
```



----

### 类的继承

类使用关键字 `extends` 实现继承，与构造函数继承的效果一致

```tsx
class Father {
  father = 'father'
  say() {
    console.log('father is saying')
  }
}

class Child extends Father {
  child = 'child'
}

const child = new Child()
console.log(child)    // Child { father: 'father', child: 'child' }
child.say()           // father is saying
```

> 类的继承使用父类的静态属性

```tsx
class Father {
  static x = 'x'
}
Father.y = 'y'

class Child extends Father {}

console.log(Child.x)      // x
console.log(Child.y)      // y
```

**super()**

当发生类的继承时，必须要在子类的构造方法中执行 `super()`，它表示将 this 绑定到子类且执行父类构造函数，相当于在子构造函数中执行 `Father.prototype.constructor.call(this)`，`super()` 只能用于构造函数中

> 如果不显示定义 constructor 则 js 内部会自动做这件事情

```tsx
class Father {}

class Child extends Father {
  constructor() {}
}

const child = new Child()   // 显示定义constructor却没有执行super()，所以这里会报错
```

这是因为 js 做了限制：有继承关系的类，如果不在子构造函数中调用父构造函数，则无法在构造函数中使用 `this`

> 如果不做限制，有可能发生以下情况，造成代码混乱

```tsx
// > 实例对象jack的属性name由父构造函数生成，为了生成需要调用父类构造函数super(name)
// > say方法在调用父类构造函数前辈调用，此时子实例对象内无name属性，造成混乱
class Father {
  constructor(name) {
    this.name = name
  }
}

class Child extends Father {
  constructor(name) {
    function say() {
      console.log(`my name is ${this.name}`)
    }
    say()
    super(name)
  }
}

const jack = new Child('jack')
```

**super**

当 `super` 作为一个对象时，在非静态方法中，它指向的是父类构造函数的原型，可以在任意位置使用

```tsx
class Father {
  say() {
    console.log('say is running')
  }

  say_ = () => {
    console.log('say_ is running')
  }
}

class Child extends Father {
  printf = () => {
    console.log(super.say)    // [Function: say]
    console.log(super.say_)   // undefined，不绑定在原型上
  }
}

const child = new Child()
child.printf()
```

> 在子类普通方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类实例，相当于在子类中调用 `super.xxx.call(this)`，同时由于这个特性，当对 super 进行属性赋值时，实际上是对子类赋值

```tsx
class Father {
  name = 'father'
  say() {
    console.log(`name is ${this.name}`)
  }
}

class Child extends Father{
  constructor() {
    super()
    this.name = 'child'
    super.say()   				    // name is child
    super.name = 'newChild'
    console.log(this.name)    // newChild
  }
}

const child = new Child()
```

当 super 对象用于类的静态方法中时，它指向的是父类

```tsx
class Father {
  static name = 'static name'
}
Father.prototype.name = 'name'


class Child extends Father{
  fn = () => {
    console.log(super.name)
  }
  static staticFn = () => {
    console.log(super.name)
  }
}

const child = new Child()

child.fn()          // name
Child.staticFn()    // static name
```

> 在子类的静态方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类，而不是子类的实例···

```tsx
class Father {
  static say () {
    console.log(this.name)
  }
}

class Child extends Father{
  name = 'name'
  static name = 'static name'
  static fn () {
    super.say()
  }
}

Child.fn()    // static name
```

**风险**

当使用 `super` 对象去调用父类的方法时，有可能出现 this 指向问题：

非静态方法下使用，一般没有问题，因为类中的函数写成箭头函数，不会存储在原型中，super 自然调用不到，除非手动编写

```tsx
// > 此时this在浏览器中指向window，在node中指向空对象{}
class Father {
  say() {
    console.log(this.name)
  }
}
Father.prototype.say_ = () => {
  console.log(this.name)
}

class Child extends Father{
  constructor() {
    super()
    this.name = 'child'
    super.say()     // child
    super.say_()    // undefined
  }
}

const child = new Child()
```

而当在静态方法下使用时，当父类的方法中使用箭头函数写法，则会丢失 this，且不容易察觉

```tsx
// > 此时this指向Father
class Father {
  static name = 'father'
  static say = () => {
    console.log(this.name)
  }
}

class Child extends Father{
  static name = 'child'
  static fn () {
    super.say()
  }
}

Child.fn()    // father
```



----

### 类的原型链

当类没有发生继承关系时，原型链的关系与构造函数一致

```tsx
class Person {}
const jack = new Person()

console.log(jack.constructor === Person)                    // true
console.log(jack.__proto__ === Person.prototype)            // true
console.log(Person.prototype.constructor === Person)        // true
console.log(jack.__proto__.__proto__ === Object.prototype)  // true
```

而发生继承关系时，原型链会发生改变：

在构造函数的概念中，任何函数都属于构造函数 `Function` 的实例，因此所有构造函数（含继承关系）的 `__proto__` 指向 Function 原型

```tsx
function Person() {}
console.log(Person.__proto__ === Function.prototype)    // true
```

但是在类的继承中，子类 `__proto__` 指向是父类，而父类 `__proto__` 仍指向 Funtion 原型，其他不变

```tsx
class Father {}
class Child extends Father{}

console.log(Child.__proto__ === Father)                 // true
console.log(Father.__proto__ === Function.prototype)    // true
```

![](https://img-blog.csdnimg.cn/20200515155438139.png)



----

### 单例设计

一个类可以生成多个实例，每次`new`的实例都是互不干扰的，单例就是让类生成一个固定的实例

```tsx
class Person {
  money = 100
  
  static getInstance() {
    if(!Person.instance){             // 如果尚未创建实例，则进行创建，如果存在，则一直返回该实例
      Person.instance = new Person()
    }
    return Person.instance
  }
}

const jack = Person.getInstance()		

console.log(jack.money)	            // 100
jack.money = 200                  

const lucy = Person.getInstance()
console.log(lucy.money)             // 200，证明用该方法生成的实例，会返回同一个实例
```

