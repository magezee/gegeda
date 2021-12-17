## 装饰器

### 使用

装饰器是和类相关的语法，主要用于修改类和类成员，其本质上是一种函数，语法为 `@decoratorFnName` ，放在类或类成员定义上方

#### 装饰类

当装饰器方法装饰类时，会自动传入当前类

```tsx
@decoratorFn
class Demo {
  static fn () {
    console.log('this is Demo fn')
  }
}

function decoratorFn(target: any) {
  console.log(target)     // [class Demo]
  target.fn()             // this is Demo fn
}
```

类装饰器仅会作用于类的构造函数，即无法在装饰器中为类新增成员

```tsx
@decoratorFn
class Demo {
  static props = 'class'

  fn() {
    console.log('class fn')
  }
}

function decoratorFn(target: any) {
  target.props = 'decorator'
  target.props_ = 'decorator_'

  target.prototype.fn = () => {
    console.log('decorator fn')
  }
  target.prototype.fn_ = () => {
    console.log('decorator fn_')
  }

}

const demo = new Demo()

console.log(Demo.props)       // decorator
console.log(Demo.props_)      // 报错,不存在props_
demo.fn()                     // decorator fn
demo.fn_()                    // 报错,不存在fn_
```

如果需要给装饰器传参，可以写成闭包的形式，会自动将当前类传入最终返回的函数

```tsx
@decoratorFn('decorator')
class Demo {
  static props = 'class'
}

function decoratorFn(props: string) {
  return function(target: any) {
    target.props = props
  }
}

console.log(Demo.props)       // decorator
```



----

#### 装饰方法

当装饰器装饰类方法时，会自动传入 3 个值：类的原型、方法名、描述符

```tsx
class Demo {
  @decoratorFn
  fn() {}  
}

function decoratorFn(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target)                           // {}
  console.log(target === Demo.prototype)        // true
  console.log(propertyKey)                      // fn
  console.log(descriptor)     
  /* {
    value: [Function: fn],
    writable: true,
    enumerable: false,
    configurable: true
  } */                
}
```



-----

#### 装饰属性

当装饰器装饰类属性时，会自动传入 2 个值：类的方法、属性名

```tsx
class Demo {
  @decoratorFn
  props = 'props'
}

function decoratorFn(target: any, propertyKey: string) {
  console.log(target)                         // {}
  console.log(target === Demo.prototype)      // true
  console.log(propertyKey)                    // props
}
```



----

### 场景

装饰器的主要功能其实并不是用于修改类内部的成员属性，而是用来为了让一个类添加一个处理逻辑，这样就可以减少一个类的功能臃肿





