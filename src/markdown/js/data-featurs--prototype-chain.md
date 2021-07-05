## 原型链

每一个函数拥有原型（prototype）属性，如果该函数充当构造函数去 new 实例，则会构成一条原型链，每个实例成员都可以使用原型上的属性和方法

```tsx
function Person() {}

Person.prototype.say = function() {
  console.log('hello')
}

const jack = new Person()
const marry = new Person()

jack.say()    // hello
marry.say()   // hello
```

一个构造函数与它的原型及实例的关系图如下：

![](https://img-blog.csdnimg.cn/20210609000939826.png)

```tsx
function Person() {}
const jack = new Person()

console.log(jack.__proto__ === Person.prototype)        // true，实例对象-→原型     
console.log(jack.constructor === Person)                // true，实例对象-→构造函数
console.log(Person.prototype.constructor === Person)    // true，构造函数←→原型
```

> 任何原型链的最顶层都指向 `Object` 的原型，只需要记住原型、构造函数、实例对象三者的关系即可，把其他原型当成 Object 原型的实例对象

![](https://img-blog.csdnimg.cn/20210609091638610.png)

```tsx
function Person() {}
const jack = new Person()

console.log(jack.__proto__.__proto__ === Object.prototype)    // true
console.log(Object.prototype.__proto__ === null)              // true
```



---

### 特性

**原型**

原型本质是一个对象，其内部包含默认属性值 `constructor` 和 `__proto__`，在原型中添加的属性会被添加到该对象中，且原型会作为实例对象的父层作用域对象，当实例对象找不到指定属性时，会往上从自身原型中查找

> 构造函数的静态属性与原型及实例对象没有作用域的关联，因此静态属性不会影响原型及实例对象

```tsx
function Person() {}
const jack = new Person()

Person.prototype.x = 'x'
Person.y = 'y' 

console.log(jack.x)     // x
console.log(jack.y)     // undefined
console.log(Person.x)   // undefined
console.log(Person.y)   // y
```

> 上述代码执行后的原型内部属性：

![](https://img-blog.csdnimg.cn/20210610180514565.png)

> 注意，父级作用域的概念不只存在于 `实例对象 -- 原型` 之间，也存在于 `原型 -- 原型` 之间

```tsx
function Person() {}
const jack = new Person()

Object.prototype.x = 'x'

console.log(jack.x)             // x
console.log(jack.__proto__.x)   // x，Person原型中没有x属性，会从上级原型中进行查找
```



-----

### 风险

**实例对象更改原型属性**

当实例对象想要读取属性数据时，发生如下操作：

1. 判断实例中有无该指定属性，如果找到，则直接读取
2. 如果没有，则往原型中寻找，直至找到顶层作用域，没有返回 undefined

当实例对象想要写入数据属性时，发生如下操作：

1. 判断实例中有无该指定属性，如果找到，则直接修改
2. 默认无法对原型数据进行修改，因此在实例对象中创建该属性再进行写入数据

```tsx
function Person() {}
const jack = new Person()

Person.prototype.x = 'x'
Object.prototype.y = 'y'

console.log(jack.x)             // x，从自身原型中读取
console.log(jack.y)             // y，自身原型找不到，继续往上级Object原型中读取
console.log(jack.z)             // undefined，都找不到则返回undefined

jack.x = 'jack_x'

console.log(jack.__proto__.x)   // x，实例对象无法修改原型属性
console.log(jack.x)             // jack_x
console.log(jack)               // Person {x: "jack_x"}，在自身内部添加了x属性
```

不过写操作的限制只是一层浅保护，它的判断是值类型和引用类型的引用地址是否前后相等，如果实例对象直接更改原型引用类型属性中的内部属性，是可以进行修改的（和 const 允许修改引用类型内部属性一样）

```tsx
function Person() {}
const jack = new Person()
const lucy = new Person()

Person.prototype.obj = {
  x: 'x'
}

jack.obj.x = 'jack_x'

console.log(jack.__proto__.obj.x)   // jack_x，原型内部属性被实例对象修改了
console.log(jack)                   // Person {}，实例对象内部并不会增加属性
console.log(lucy.obj.x)             // jack_x，由于原型属性被修改，所以所有的实例对象都会被影响
```

为了不让实例对象有机会更改原型属性，可以在实例内部增加同名属性，由于优先寻找自身作用域，就可以避免上述情况

> 由于这个特性，实例对象需要写操作的属性，一般都是自身拥有而非存储在原型上，所以原型一般存储值类型和函数

```tsx
function Person() {}
const jack = new Person()
const lucy = new Person()

Person.prototype.obj = {
  x: 'x'
}

jack.obj = {x: 'jack_x'}

console.log(jack.__proto__.obj.x)   // x
console.log(jack)                   // Person { obj: { x: 'jack_x' } }
console.log(lucy.obj.x)             // x
```

**原型方法丢失this**

在原型中绑定函数属性时，如果声明函数使用的是箭头函数的方式，则会丢失 this 值，因为箭头函数不绑定 this

```tsx
function Person() {}
const jack = new Person()


Person.prototype.say = () => {
  console.log(`my name is ${this.name}`)
}

Person.prototype.doing = function() {
  console.log(`i am doing ${this.thing}`)
}

jack.name = 'jack'
jack.thing = 'cooking'

jack.say()        // my name is undefined
jack.doing()      // i am doing cooking
```

