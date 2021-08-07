## Vue模板

### Vue实例

如果直接写在一个 html 文件中，生成一个 vue 的应用，只需要直接引入 vue 并且声明一个实例，插入到指定的标签中即可

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <p>{{ time }}</p>
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        time: Date()
      }
    })
  </script>
</body>
</html>
```

> 但是在实际开发中并不会写多个 html 文件，而是写一个 html 模板和一个 vue 实例，将多个 `.vue` 组件插入到该模板中

```js
// main.js
import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <p>{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      time: new Date()
    }
  }
}
</script>
```

一个 vue 实例包含以下内容，在 data 中声明的属性会被直接添加到实例属性中，因此可以访问到该数据，带 `$` 标志的属性是 vue 提供快捷获取特定实例数据的接口

```html
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      var: 'var',
      fn () {}
    }
  })
  console.log(vm)
</script>
```



![](https://img-blog.csdnimg.cn/3a6b7adb7b2f4b54917b646b1d469314.png)



------

### Vue文件

在一个 `.vue` 文件中，一般由三种标签构成

- `<template>`：用于编写 html 代码
- `<script>`：用于编写 js 代码
- `<style>`：用于编写 css 代码

> 规定代码书写顺序一定是遵从 template → script → style
>
> 需要注意的是，在 `.vue` 文件中，不需要额外引入 vue 包也可以直接使用 vue 的功能，因此引入 vue 包并且声明新实例都是在 `.js` 中

---

#### template

template 中的 hmtl 可以直接使用 `{{ }}` 的表达式来编写 js 代码，在该表达式中可以直接读取到当前 vue 实例及原型链上的任意属性，所以可以直接使用 data 上的属性，一旦 data 的数据发生改变，页面会立即更新

```html
<template>
  <div>
    <p>{{ 1 + 1 }}</p>
    <p>{{ str }}</p>
    <p>{{ arr[0] }}</p>
    <p>{{ obj.x }}</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      str: '.....',
      arr: [1, 2, 3],
      obj: {
        x: 'x'
      }
    }
  }
}
</script>
```

> 一个实例中，data 赋值实际上是设置实例的 `_data` 属性，为了减少代码累赘，vue 根据该数据在自身实例中新建了对应的属性，且使用数据代理的方式关联两个数据

```html
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      info: 'info'
    }
  })
  console.log(vm.info)            // info
  console.log(vm._data.info)      // info
</script>
```

相当于使用 `Object.defineProperty` 进行属性代理，当读取和更改 `vm.info` 时，实际上读和改的都是 `vm._data.info`，所以页面是否更新其实取决的根原因是 `vm._data`

> vm._data 还做了一些额外操作，导致页面可以根据数据变化动态更新页面

```tsx
vm.info = vm._data.info
Object.defineProperty(vm, 'info', {
  get() {
    return vm._data.info
  },
  set(value) {
    vm._data.info = value
  }
})
```



------

#### script

script 主要用于创建 vue 实例或者编写 vue 组件，可以通过内置配置选项来控制组件的状态

**el**

类型：`string | Element`，string 代表标签选择器的写法，Element 则代表真实 dom 元素

功能：只有 `new Vue` 时生效

-----

**date**

类型：`Object | Function`，规定只有 new Vue 可以写成对象类型，如果是组件，则只能写成函数类型，以此确保每个组件实例内部都保存一套自己的数据，不会互相混用

功能：将 dom 中所使用的数据，通过 vue 处理后再挂载到 dom 上

> data 函数的 this 指向当前 vue 实例，如果写成箭头函数则会丢失 this 指向顶层对象

```html
<template>
  <div>
    {{ info }}
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    console.log(this)       // vue 实例
    return {
      info: 'data中的数据'
    }
  }
}
</script>
```











-----

#### style