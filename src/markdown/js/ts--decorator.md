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

一般使用装饰器为类修改已有的成员，如果新增成员，ts 会不认识而导致类型会报错，因此需先转对应类型才可访问

```tsx
@decoratorFn
class Demo {
  static props = 'class'

  fn() {
    console.log('class')
  }
}

function decoratorFn(target: any) {
  target.props = 'fn'
  target.prototype.fn = () => {
    console.log('fn')
  }

  target.props_ = 'fn_'
  target.prototype.fn_ = () => {
    console.log('fn_')
  }
}

// 这里不加分号不知道为什么编译器可能报错
const demo = new Demo();

Demo.props;              // fn
demo.fn();               // fn
(Demo as any).props_;    // fn_
(demo as any).fn_();     // fn_
```

类构造器解析的过程相当于如下过程

```tsx
class Demo {
  static props = 'class'

  fn() {
    console.log('class')
  }
}

function decoratorFn(target: any) {
  return class extends target {
    static props = 'fn'
    static props_ = 'fn_'

    fn() {
      console.log('fn')
    }
    fn_() {
      console.log('fn_')
    }
  }
}

const Demo_ = decoratorFn(Demo)
const demo_ = new Demo_()
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

function decoratorFn(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log(target)                           // {}
  console.log(target === Demo.prototype)        // true
  console.log(methodName)                       // fn
  console.log(descriptor)     
  /* {
    value: [Function: fn],
    writable: true,
    enumerable: false,
    configurable: true
  } */                
}
```

----

#### 装饰参数

当装饰器装饰类方法的参数时，会自动传入三个值：类的原型、方法、该参数在方法中的参数索引值

```tsx
class Demo {
  fn(parmas1: any, @decoratorFn parmas2: any) {}
}

function decoratorFn(target: any, methodName: string, paramIndex: number) {
  console.log(target)                         // {}
  console.log(target === Demo.prototype)      // true
  console.log(methodName)                     // fn
  console.log(paramIndex)                     // 1
} 

const demo = new Demo()
demo.fn(1, 2)
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

#### 执行顺序

装饰器在使用时便已初始化，而非 new 的时候执行

```tsx
@decoratorFn
class Demo {}

function decoratorFn(target: any) {
  console.log('running')      // running
}
```

存在多个类装饰器时，由后往前执行

```tsx
@fn_1
@fn_2
class Demo {}

function fn_1(target: any) {
  console.log('1 is running')     
} 

function fn_2(target: any) {
  console.log('2 is running')      
} 

// 2 is running      
// 1 is running
```

会先执行类内部装饰器最终才执行类装饰器：`其他装饰器 → 类装饰器`，其他装饰器的执行顺序由声明顺序决定

> 同一个方法中多个参数装饰器，执行顺序又右向左

```tsx
function _class(target: any) {
  console.log('class')
}

function _function(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log('fn')               
}

function _parmas(target: any, methodName: string, paramIndex: number) {
  console.log('parmas')
} 

function _props(target: any, propertyKey: string) {
  console.log('props')           
}

@_class
class Demo {
  @_function
  fn(@_parmas parmas: any) {}

  @_props
  props = 'props'
}

// parmas fn props class
```



----

### 场景

装饰器的主要功能其实并不是用于修改类内部的成员属性，而是用来为了让一个类添加一个处理逻辑，这样就可以减少一个类的功能臃肿

#### 日志

为执行的方法添加日志打印

```tsx
class Demo {
  @decoratorFn
  fn(...rest: number[]) {
    const result = rest.reduce((pre, cur) => pre + cur)
    console.log(result)
  }  
}

function decoratorFn(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value
  descriptor.value = (...rest: any[]) => {
    console.log(`Calling ${methodName} with`, rest)
    return origin.call(null, ...rest)
  }
}

const demo = new Demo()
demo.fn(1,2,3)

// Calling fn with [ 1, 2, 3 ]
// 6
```









