## 数组

### 类型

**匿名函数**

即不需要声明函数名的函数，便于提高开发效率，往往用于赋值或者回调函数传值

```tsx
const fn = function(callback) {
  callback()
}

fn(() => {
  console.log('callback is running')    // callback is running
})
```

> 不进行赋值直接使用时，可以称为 `立即执行函数`

```tsx
(function() {
  console.log('callback is running')   // callback is running
})()
```

**箭头函数**

比普通函数简短方便且不绑定 this（箭头函数也是匿名函数的一种）

```tsx
const fn = function() {
  console.log(arguments)
}

const arrowFn = () => {
  console.log(arguments)
}

fn()        // arguments对象
arrowFn()   // 报错：arguments is not defined
```

> 与普通函数对比：
>
> - 不绑定 this
> - 没有 arguments 对象
> - 没有原型属性
> - 不能充当 Generator 函数

