## 构造函数

任何函数（箭头函数除外）只要通过 `new` 来生成实例化对象就可以作为构造函数，否则普通函数并无区别，为了与普通函数的功能区分，一般用作构造函数的函数名都会首字母大写

> 构造函数生成实例化对象本质上是建立原型链之间的关联



---

### new

**执行机制**

使用new操作符创建对象实例时发生的事情：

1. 在构造函数中自动创建一个空对象充当实例对象
2. 建立原型链，空对象指向构造函数的原型对象
3. 将构造函数的作用域赋给新对象（this指向该对象）并执行构造函数的代码（因此构造函数中使用this声明的属性和方法会复制给新对象）
4. 如果返回值为值类型，则返回实例，如果为引用类型，返回该引用数据

```tsx
function Person(name) {
  this.name = name
}

// const jack = new Person()相当于：
const jack = {}
jack.name = 'name'    // 因为有this的存在，new的时候this指向jack，执行构造函数等同于该行代码
jack.__proto = Person.prototype
jack.constructor = Person
```

> 构造函数公开的属性和方法需要使用 this 表示，否则不会在实例化对象的时候在该对象中创建对应值

```tsx
function Person() {
  this.name = 'jack'
  const age = 12
}

const jack = new Person()
console.log(jack)     // Person { name: 'jack' }
```

> new 将 this 绑定给实例对象的优先级高于更改 this 函数

```tsx
const obj = {}

function Person() {
  this.name = 'Person'
}

const _Person = Person.bind(obj)
const jack = new _Person()

console.log(jack)     // Person { name: 'Person' }，this仍是指向jack，在内部创建了name属性
```

> 一般充当构造函数的函数不进行直接调用，否则会产生意料情况

```tsx
function Person() {
  this.name = 'Person'
}

Person()
console.log(name)		// Person，直接执行Person()则this指向顶层对象，等同于在全局作用域中生成了一个变量name
```

**内部实现**

```tsx
function _new(Fn, ...rest) {
  const instance = Object.create(Fn.prototype)          // 创建空对象{},并连接实例对象到原型的链路
  const result = Fn.apply(instance, rest)               // 将this指向实例，传入构造参数执行构造函数，并接收构造函数返回值 
  return result instanceof Object ? result : instance   // 如果构造函数返回值为引用类型则直接返回，否则返回实例对象
}
```

> 测试原型链连接

```tsx
function Person(name) {
  this.name = name
  this.say = () => {
    console.log(`my name is ${this.name}`)
  }
}

Person.prototype.x = 'x'
const jack = _new(Person, 'jack')

jack.say()                                // my name is jack
console.log(jack.x)                       // x
console.log(jack.constructor === Person)  // true
```

> 测试构造函数有返回值情况

```tsx
function Person() { 
  return new Map()
}
function Animal() {
  return 'animal'
}

const jack = _new(Person)
const lulu = _new(Animal)

console.log(jack)   // Map(0) {}
console.log(lulu)   // Animal {}
```

**箭头函数**

箭头函数使用 `new` 关键字会报错，因此箭头函数无法作为构造函数使用，其本质原因：

- 箭头函数拥有 `__proto__` 属性，其自身存在原型链，但是没有 `prototype` 属性，导致无法连接原型链
- 箭头函数没有 this 所以无法将构造函数的公开属性传递给实例对象

```tsx
const fn = () => {}
Function.prototype.x = 'x'

const instance = new fn()     // 报错：fn is not a constructor

console.log(fn.__proto__.x)   // x，说明箭头函数与Funtion原型链有所关联
console.log(fn.prototype)     // undefined，箭头函数没有原型属性
```



-----

### 构造函数继承

两个构造函数之间可以实现继承关系，如所有构造函数都继承于 `Object` 构造函数

```tsx
console.log(Number.prototype.__proto__   === Object.prototype)    // true
console.log(Boolean.prototype.__proto__  === Object.prototype)    // true
console.log(String.prototype.__proto__   === Object.prototype)    // true
console.log(Function.prototype.__proto__ === Object.prototype)    // true
console.log(Array.prototype.__proto__    === Object.prototype)    // true
console.log(Map.prototype.__proto__      === Object.prototype)    // true
console.log(Set.prototype.__proto__      === Object.prototype)    // true
console.log(Date.prototype.__proto__     === Object.prototype)    // true
console.log(RegExp.prototype.__proto__   === Object.prototype)    // true
console.log(Error.prototype.__proto__    === Object.prototype)    // true
```

> 值类型也能访问到 `Object` 原型链路是因为在使用值类型属性时，js 会隐式转换使用包装类去访问

```tsx
const num = 123
console.log(num.__proto__.__proto__ === Object.prototype)    // true，相当于包装类Number去访问
```

继承特点（Child 构造函数继承 Father 构造函数，Child 实例化对象 child）：

- child 实例内部拥有 Child、Father 构造函数内的公开属性
- child 实例可以访问 Child、Father 原型链路

```tsx
class Father {
  constructor() {
    this.father = 'father'
  }
}


class Child extends Father {
  constructor() {
    super()
    this.child = 'child'
  }
}

Father.prototype.x = 'x'
const child = new Child()

console.log(child)      // Child { father: 'father', child: 'child' }
console.log(child.x)    // x
```

**功能实现**

由继承的两个特点可知：

- 为了让子实例内部同时拥有子、父构造函数内公开的属性，则需要在 new 实例的时候执行一遍父构造函数与子构造函数，由于 new 默认执行子构造函数，则需要在子构造函数中去调用一次父构造函数（需要将 this 绑定至实例）
- 为了让子实例能访问到父构造函数原型链，则需要建立原型链连接，参考 Object 与其他子类的原型链连接可知，令 `子原型 = 父实例` 即可

![](https://img-blog.csdnimg.cn/20210611141414179.png)

```tsx
function Father() {
  this.father = 'father'
}

function Child() {
  if(Child.extendsFn) {
    Child.extendsFn.call(this)
  }
  this.child = 'child'
}

const _extends = (Father, Child) => {
  Child.prototype = new Father()      // 绑定原型链
  Child.extendsFn = Father            // 让子构造函数内部得以执行父构造函数
}

_extends(Father, Child)

Father.prototype.x = 'x'

const child = new Child()
console.log(child)                    // Father { father: 'father', child: 'child' }，注意这里的标志是Father
console.log(child.x)                  // x
```

> 此时原型链关系：

```tsx
// 实例与子父构造函数原型链连接
console.log(child instanceof Child)                             // true
console.log(child instanceof Father)                            // true

// 缺失一些原型链造成的原型链路混乱，js认为child的构造函数为Father
console.log(child.constructor === Father)                       // true
console.log(child.__proto__.constructor === Father)             // true

// 父构造函数自身的原型链路正常
console.log(child.__proto__.__proto__ === Father.prototype)     // true
console.log(child.__proto__.__proto__.constructor === Father)   // true
```

![](https://img-blog.csdnimg.cn/2021061114492392.png)

上面的实现思路存在两个问题：

- 在实例化子对象的时候，没有必要去实例化父对象
- 由于没有绑定 `子原型.constructor = 子构造函数` 原型链路，导致子原型链错误

为了解决这个问题，需要把父级构造函数从继承原型链中去除，直接方法是不使用父构造函数去 new 实例，同时绑定 `子原型.constructor = 子构造函数` 即可

```tsx
const _extends = (Father, Child) => {
  Child.prototype = Object.create(Father.prototype)   // 去除父级构造函数的关联，直接建立子原型=父实例
  Child.prototype.constructor = Child                 // 建立子原型-→子构造函数的关系
  Child.extendsFn = Father                            // 让子构造函数内部得以执行父构造函数
}
```

> 此时原型链关系：

```tsx
console.log(child)                                              // Child { father: 'father', child: 'child' } 

// 实例与子父构造函数原型链连接
console.log(child instanceof Child)                             // true
console.log(child instanceof Father)                            // true

// 子构造函数自身的原型链路正常
console.log(child.constructor === Child)                        // true
console.log(child.__proto__.constructor === Child)              // true

// 父构造函数自身的原型链路正常
console.log(child.__proto__.__proto__ === Father.prototype)     // true
console.log(child.__proto__.__proto__.constructor === Father)   // true
```

![](https://img-blog.csdnimg.cn/2021061115030396.png)