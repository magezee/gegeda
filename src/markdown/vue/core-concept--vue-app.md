## Vue应用

### 应用实例

**CDN 引用**

直接通过 cdn 引入 vue 的代码文件，使用 vue 声明一个应用实例并插入到指定的标签中即可

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

**脚手架安装**

安装：

```markdown
npm install -g @vue/cli
```

可以使用 ui 界面便捷创建项目

```markdown
vue ui
```

**实例内容**

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

> 带 `$` 标志的属性是 vue 提供快捷获取特定实例数据的接口
>
> 带 `_` 标志的属性是 vue 实例的自身私有属性

![](https://img-blog.csdnimg.cn/3a6b7adb7b2f4b54917b646b1d469314.png)



-----

### 组件实例

**创建**

一个应用实例通过 `new Vue()` 来创建，简称 `vm`，而一个组件实例通过 `new VueComponent` 来创建

> 创建组件实例的方法是 vue 在代码中使用组件标 的时候自动调用并创建实例的，如使用 `<App />` ，vue 会自动使用 `new VueComponent` 方法创建组件实例
>
> 应用实例和组件实例的内容几乎完全一样，但是两者的功能是有差别的，组件实例不可使用 el 选项且 data 选项要写函数式
>
> 原型链关系：`VueComponent.prototype.__proto__` == `Vue.prototype`，所以 vc 可以访问 Vue 原型上的属性和方法，如 `$data` 

一般使用 `Vue.extend()` 来生成一个组件构造函数，然后在父容器中的 `components` 属性注册该构造函数才可以在该容器中使用，然后生成对应的组件实例

```html
<body>
  <div id="app">
    <Demo />        <!-- 使用组件 -->
  </div>
  
  <script>
    // 定义组件的构造函数
  	const Demo = Vue.extend({
      template: `
        <div>
          {{ info }}
        </div>
      `,
      data() {
        return {
          info: '组件数据'
        }
      }
    })
    
    new Vue({
      el: '#app',
      components: {
        Demo        // 注册组件，使用组件时的具体组件名以这里为准
      }
    })
  </script>
</body>
```

> 可以不写 `Vue.extend`，直接声明一个对象然后在注册时 vue 会自动识别

```tsx
const Demo = {
  template: `
    <div>
      {{ info }}
    </div>
  `,
  data() {
    return {
      info: '组件数据'
    }
  }
}
```

**vue文件**

`.vue` 文件代表的是一个单组件，因此不可写复数组件，且也不可使用 `new Vue()` 来声明应用

文件一般由三种标签构成，规定代码书写顺序一定是遵从 template → script → style

template：

用于编写 html 代码，template 中的 hmtl 可以直接使用 `{{ }}` 的表达式来编写 js 代码，在该表达式中可以直接读取到当前 vue 实例及原型链上的任意属性，一旦实例 `_data` 属性的数据发生改变，页面会立即更新

> `<template>` 相当于一个空标签，在映射到 dom 上时不会添加对应的元素
>
> `<template>` 内部可以继续使用该标签作为空标签使用
>
> `{{undefined}}` 在页面上显示的是空白，不会展示

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

script：

用于编写 js 代码，创建 vue 实例或者编写 vue 组件，可以通过内置配置选项来控制组件的状态，在实例代码中声明的函数一般都不写成箭头函数形式，因为一般 this 都指向实例，使用箭头函数会指向顶层对象

> 配置属性的函数需要写成普通函数，但这些函数内部的回调函数不由 vue 管理，应该写成箭头函数，目的都是为了确保 this 指向实例

```html
<script>
export default {
  name: 'Demo',
  data () {
    return {
      demo: 'demo'
    }
  },
  watch: {
    demo() {
      setTimeout(() => {})      // 这里如果不写成箭头函数反而会因为回调函数丢失this
    }
  }
}
</script>
```

style：

用于编写 css 代码，如果需要动态变化样式可以配合 `v-bind`

> vue 组件中如果直接使用该标签会导致不同组件的样式冗杂在一起，如果需要指定该样式只针对该组件可以添加 `scoped` 属性
>
> 如果需要预编译器，可以添加 `lang` 属性指定

```html
<template>
  <div :class="styles" />
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      styles: {
        styleA: true,
        styleB: false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .styleA {
    width: 100px;
    height: 200px;
  }
  .styleB {
    border: 1px solid #fff;
    background-color: rgb(206, 141, 141);
  }
</style>
```







------

### 选项

通过选项来配置实例的功能

#### el

类型：`string | Element`，string 代表标签选择器的写法，Element 则代表真实 dom 元素

功能：只有 `new Vue` 时生效，将选择的元素作为 vue 解析的根模板

> 使用 el 时包括模板包括被解析的元素，如下面代码 `#app` 上的指令也可以被 vue 解析
>
> 如果不想配置该项，也可以直接使用实例方法去配 —— `vm.$mount('#app')`，但是如果两种方式都不配的话，那 vue 就无法正常工作，只运行到 `created` 生命周期方法，无法继续往下进行

```html
<body>
  <div id="app" :info="123">
    <p>内容1</p>
    <p>内容2</p>
  </div>

  <script>
    var vm = new Vue({
      el: '#app'
    })
  </script>
</body>
```

![](https://raw.githubusercontent.com/magezee/images/main/el.png)



-----

#### template

类型：`string`

功能：当存在该选项时，会将选项中的内容物完全替换 el 模板

> 值可以为 html 原生标签也可以为组件，如 `template: '<App />'`

```html
<body>
  <div id="app" :info="123">
    <p>内容1</p>
    <p>内容2</p>
  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      template: `
        <div>
          <p>内容A</p>
          <p>内容B</p>
        </div>
      `
    })
  </script>
</body>
```

![](https://raw.githubusercontent.com/magezee/images/main/template1.png)



-----

#### date

类型：`Object | Function`，规定只有 new Vue 可以写成对象类型，如果是组件，则只能写成函数类型，以此确保每个组件实例内部都保存一套自己的数据，不会互相混用

功能：用于在实例对象上添加用于页面展示的数据

> 在 data 中声明的属性，vue 会数据代理到 `vm._data` 中

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

#### name

类型：`string`

功能：用作组件的别名，显示在网页开发者工具 `vue-devtools` 上辅助开发，否则在上面会统一显示 `<AnonymousComponent>`

> 注意：在代码中使用组件的名字根据注册时的名字决定，这里只是决定了 `vue-devtools` 上如何显示

```html
<script>
  export default {
    // other...
    name: 'Demo'
  }
</script>
```



-----

#### components

类型：`Object`

功能：将指定组件注册为该实例的子组件

```html
<template>
  <Child />		
</template>

<script>
  import Child from '.../Child'
  export default {
    // other...
    components: {
      Child
    }
  }
</script>
```



-----

#### props

类型：`Array<string> | Object `

功能：用于接收父组件传递过来的数据，传入的数据会直接写进子组件实例的属性内

数组类型：便捷，但是无法限制传入的数据类型

```html
<!-- Father -->
<template>
  <Child :info="xxx" :fn="xxx" />		<!-- 直接写属性传只能string类型，因此一般配合v-bind使用 -->
</template>

<!-- Child -->
<script>
  export default {
    // other...
    props: ['info', 'fn']
  }
</script>
```

对象类型：可以对传入的数据进行更多配置

```tsx
props: {
  info: String,
  fn: Function
}
```

> 可以继续写成对象形式添加更多配置项：
>
> - type：类型
>
> - default：默认值
>
> - require：该属性是否必须

```tsx
props: {
  info: {
    type: String,
    default: '',
    require: true
  }
}
```



-----

#### methods

类型：`{ [key: string]: Function }`

功能：用于在实例对象上添加功能函数

> 函数不在 data 中定义的原因是函数不需要变动，如果定义到 data 上会导致 vue 额外处理，消耗性能

```html
<template>
	<button v-on:click="handleClick">按钮A</button>
</template>

<script>
export default {
  // other...
  methods: {
    handleClick (event) {
      console.log(event.target.textContent)     // 按钮
    }
  }
}
</script>
```



-----

#### computed

类型：`{ [key: string]: Function | { get: Function, set: Function } }`

功能：用于在实例对象上添加用已有属性计算得来的数据，vue 会自动执行 computed 中配置字段的 get 方法，并将返回值设为实例上对应 key 的 value

> 一般不在 data 和 methods 中声明需要复杂处理的展示类数据
>
> - 不在 data 中处理是因为一般 data 只做存储展示数据作用
>
> - 不在 methods 中处理数据并返回的原因是，如果多次使用该数据，则就会多次调用该方法，浪费性能，而在 computed 属性上声明的数据会有缓存机制，多次使用时， vue 读取的是同一个值，不会多次读取（即多次执行 get 方法），只有初次读取数据及所依赖数据发生变动时才会重新读取并重新缓存
>
> 由于 vue 只根据 data 变化而更新页面，因此直接修改 computed 不会导致页面数据更新，需要设置 set 方法并在里面对依赖数据手动进行更新，一般 computed 的数据都不会进行更改，因此可以简写

```html
<template>
  <div>
    <p>{{resultA}}</p>
    <p>{{resultB}}</p>
  </div>
</template>

<script>
export default {
  // other...
  data () {
    return {
      x: 1,
      y: 2
    }
  },
  computed: {
    // 详细
    resultA: {
      get() {
        return this.x + this.y
      }
    },
    // 简写
    resultB () {
      return this.x + this.y
    }
  }
}
</script>
```

> 当需要给计算属性传参需要使用闭包写法

```html
<template>
  <div>
    <p>{{result(3)}}</p>
  </div>
</template>

<script>
export default {
  // other...
  data () {
    return {
      x: 1,
      y: 2
    }
  },
  computed: {
    result () {
      return (num) => {
        return this.x + this.y + num
      }
    }
  }
}
</script>
```



-----

#### watch

类型：`{ [key: string]: string | Function | Object | Array }`

功能：用于监听实例上的属性变化

> watch 可以完成 computed 的任意功能，但是 computed 不能在函数中有异步任务，因此异步数据只能交给 watch 处理
>
> watch 关注的是单一数据的变动，而 computed 关注的是将如何多个数据计算为一个数据

配置项：

- `handler: function(newValue, oldValue)`：监听到变化时触发的函数，默认传进变化数据的新旧值
- `immediate: boolean`：是否需要在初始化的时候就执行一次 handler 函数
- `deep: boolean`：是否开启深度数据监听，watch 默认不监听深度数据，开启后引用类型中的任意一个数据都会触发监听

```html
<template>
  <div>
    <p>{{count}}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  // other...
  data () {
    return {
      count: 0
    }
  },
  methods: {
    add () {
      this.count += 1
    }
  },
  watch: {
    count: {
      handler (newValue, oldValue) {
        alert(`实例count属性发生变化，旧址:${oldValue},新值:${newValue}`)
      }
    }
  }
}
</script>
```

> 如果配置项只有 handler 则可以简写为 `count(newValue, oldValue){...}` 形式

![](https://img-blog.csdnimg.cn/097fafc829224c748601056098dd222a.gif#pic_center)



> 如果是监听多层数据直接写成字符串即可

```tsx
data () {
  return {
    obj: {
      x: 'x',
      y: 'y'
    }
  }
},
watch: {
  'obj.x': {...}
}
```



-----

#### directives

类型：`{ Function | Object }`

功能：自定义指令方法

> directives 内函数的 this 指向顶层对象而非实例

命名方式：

- 单个单词时直接命名，如 `add`，使用指令是 `v-add`
- 多个单词时用字符串包裹，短横符连接，如 `'control-add'`，使用指令是 `v-control-add`

**函数式**

触发时机 —— 当指令与元素初始化绑定及该元素更新时

> 注意这里是指令和元素绑定时触发方法，指令在内存中就已经完成绑定触发，而非真正的 dom 在页面上渲染才触发，即在页面上要渲染一个元素需要先创建元素，然后将元素放入一个指定节点内才可以真正显示，而触发该方法发生在创建元素后，添加进节点前
>
> 因此使用一些特定的 dom 方法会由于时机错误产生非预期效果，如 `element.focus()` 方法需要 dom 完全渲染后才生效

指令方法默认会传进两个值：

- `element`：绑定指令的标签的信息
- `binding`：指令的信息，具体内容如下

![](https://raw.githubusercontent.com/magezee/images/main/binging.png)

```html
<template>
  <div>
    <p>{{count}}</p>
    <p v-square="count"></p>
    <p v-square="count + 1"></p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  // other...
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add () {
      this.count += 1
    }
  },
  directives: {
    square (element, binding) {
      element.innerText = binding.value * binding.value
      console.log(binding)
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/directives.gif)

**对象式**

触发时机 —— 根据规定的属性决定触发方式：

- `bind`：指令与元素成功绑定时触发
- `inserted`：指令所在元素被插入页面时触发
- `update`：指令所在元素被重新渲染时触发

> 所以函数式相当于简写整合了 bind 和 update 的功能

```html
<template>
  <div>
    <input type="text" v-square="count">
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add () {
      this.count += 1
    }
  },
  directives: {
    square: {
      bind (element, binding) {
        element.value = binding.value
      },
      inserted (element, binding) {
        element.focus()
      },
      update (element, binding) {
        element.value = binding.value
      }
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/square.gif)



------

#### mixins

类型：`Array<Object>`

功能：可以便捷为多个组件添加相同的选项配置

> 当 mixins 和组件内部有相同的选项时
>
> - 生命周期钩子选项：mixins 和组件自身定义的功能叠加
> - 其他选项：按组件自身定义的功能

```tsx
// mixins.js
export default {
  mounted() {
    console.log('mixins')
  }
}

// ComponentA.vue
// > 打印 mixins ComponentA
import mixin from './mixins'
export default {
  name: 'ComponentA',
  mixins: [mixin],
  mounted() {
    console.log('ComponentA')
  }
}

// Component.vue
// > 打印 mixins ComponentB
import mixin from './mixins'
export default {
  name: 'ComponentB',
  mounted () {
    console.log('ComponentB')
  },
  mixins: [mixin]
}
```







