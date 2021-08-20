## 数据通信

### props

用于父子组件间的通信

```html
<!-- App.vue -->
<template>
  <div id="app">
    <Child :info="info" :fn="fn" />
  </div>
</template>

<script>
import Child from './components/Child.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      info: 'App传递过来的数据'
    }
  },
  methods: {
    fn() {
      this.info = '使用App传递过来的方法'
    }
  }
}
</script>
```

```html
<template>
  <div>
    <p>{{ info }}</p>
    <button @click="fn">更改数据</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    info: String,
    fn: Function
  }
}
</script>
```



------

### 自定义事件

自定义事件可以用于子向父组件传递数据，具体工作原理：

1. 父组件在使用子组件的时候绑定一个自定义事件 `customFn`，当触发该自定义事件时，会触发父组件的 `fatherFn` 方法
2. 在子组件内部声明一个可以触发的监听事件（如点击事件）并绑定指定事件函数 `childFn`，并且在该方法内部使用 `$emit` 去绑定传进来的自定义事件，代表当子组件触发监听事件调用 `childFn` 时，同时会触发监听事件 `customFn`，并调用对应监听函数 `fatherFn`，这样就能将子组件数据传递到父组件

```html
<!-- App.vue -->
<template>
  <div id="app">
    <p>{{ fatherData }}</p>
    <Child @customFn="fatherFn" />
  </div>
</template>

<script>
import Child from './components/Child.vue'

export default {
  name: 'App',
  components: {
    Child,
  },
  data() {
    return {
      fatherData: ''
    }
  },
  methods: {
    fatherFn(childData) {
      this.fatherData = childData
    }
  }
}
</script>
```

```html
<!-- Child.vue -->
<template>
  <button @click="childFn(childData)">触发事件</button>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      childData: '子组件数据'
    }
  },
  methods: {
    childFn(childData) {
      this.$emit('customFn', childData)
    }
  }
}
</script>
```



-----

### 全局事件总线

用于非父子关系组件间的通信，实现基于 vue 的自定义事件，具体原理：

- 自定义事件是在子组件上绑定自定义事件传递给子组件，然后子组件才可以通过 `$emit` 去绑定对应的事件，即关键的点是子组件能访问到该自定义事件
- 如果要求两个没有联系的 A B 组件都可以访问到一个自定义事件，那么就需要有一个中间的组件，让 A B 同时都可访问到其内部属性，然后在这个组件上绑定自定义事件，让 A B 组件直接拿来用即可
- 所有组件都可以向上访问到 Vue 的原型，如果在 Vue 原型上设定一个属性，这个属性的内容为一个 vue 组件实例， 那么在这个实例上绑定的自定义方法，可以被任意组件使用 `$emit` 触发

> vue 规定，在原型中绑定的自定义事件统一都放在 `$bus` 属性中
>
> 更改 vm 的属性时需要在应用启动前完成，因此需要放在 `beforeCreate` 函数中

```tsx
// main.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this     // 在原型上用$bus属性充当中间组件
  }
}).$mount('#app')
```

```html
<!-- CompomentA.vue -->
<template>
  <p>{{ infoA }}</p>
</template>

<script>
export default {
  name: 'ComponentA',
  data() {
    return {
      infoA: ''
    }
  },
  mounted() {
    // 使用$on为中间组件绑定自定义事件
    this.$bus.$on('customFn', (data) => {
      this.infoA = data
    })
  },
  beforeDestroy() {
    // 组件销毁前都会默认销毁自定义事件，但是如果绑定在Vue原型上则需要手动去解绑
    this.$bus.$off('customFn')
  }
}
</script>
```

```html
<template>
  <button @click="handleClick(infoB)">触发事件</button>
</template>

<script>
export default {
  name: 'ComponentB',
  data() {
    return {
      infoB: 'B组件传递来的数据'
    }
  },
  methods: {
    // 使用组件事件去触发这个自定义事件
    handleClick(data) {
      this.$bus.$emit('customFn', data)
    }
  }
}
</script>
```



------

### Vuex

用于管理组件共享的全局数据，与 redux 类似

Vuex 的状态存储是响应式的 —— 当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会同步更新

![](https://raw.githubusercontent.com/magezee/images/main/vuex.jpg)

#### 项目配置

安装 vuex

```markdown
yarn add vuex
```

该包是一个插件，所以需要用 `Vue.use()` 来引入插件，引入后在 `new Vue()` 时可以配上 `store` 属性将 vuex 的功能挂到组件实例身上

```tsx
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {...}
const mutations = {...}
const state = {...}
                      
export default new Vuex.Store({
  actions,
  mutations,
  state       
})
```

```tsx
// main.js
import Vue from 'vue'
import store from 'xxx/store'

new Vue({
  // other...
  store
})
```

此时任意组件都可以通过 `$store` 属性来使用 vuex 的功能

![](https://raw.githubusercontent.com/magezee/images/main/store.jpg)

**Actions**

类型： `{ string: function(context, parmas...) }`

- context：包含 stroe 大多数功能的一个对象
- parmas：从 dispatch 方法中传过来的参数

功能：

- 从后端获取数据、处理数据
- 在函数中 `context.dispatch` 去触发下一个 action 编排任务，但为了 vuex 的后续流程正常进行，需要在最后流程的 action 中需要触发 `commit` 方法

```tsx
const actions = {
  add(context, value) {
    context.commit('ADD', value)
  }
}
```

**Mutations**

类型： `{ string: function(state, parmas...) }`，为了和 Actions 区分，属性名需全都大写

- state：当前的 state 对象
- parmas：从 commit 方法中传过来的参数

功能：

- mutation 函数只负责更改 state，不负责对数据的处理，因此需要处理都需要在 action 函数中完成

- 当组件可以用现成的数据直接更改 state 时，可以绕过 Actions，直接使用 `commit` 方法触发 Mutations 更改 state 即可

```tsx
const mutations = {
  ADD(state, value) {
    state.count += value
  }
}
```

**State**

类型：`Object`

功能：存储数据及数据的初始值

```tsx
const state = {
  count: 0
}
```

**Getters**

类型： `{ string: function(state) }`

- state：当前的 state 对象

功能：一般不怎么用，用于存放经过计算后的 state 属性，且很多组件都需要用到该计算后值

```tsx
const getters = {
  square(state) {
    return state.count * state.count
  }
}
```



-----

#### 映射方式

有四种映射方式用于便捷开发

- mapState
- mapGetters
- mapActions
- mapMutations

**mapState (target) 和 mapGetters (target)**

类型：

- `target: Object | Array<string>`，对象类型可以自定义映射后变量名，数组类型只能和真实变量名相同

功能：将 state/getters 上的属性快捷映射到实例的计算属性，方便读取

```html
<!-- 映射前 -->
<template>
  <p>{{ $store.state.count }}</p>
  <p>{{ $store.getters.square }}</p>
</template>

<!-- 映射后 -->
<template>
  <p>{{ count }}</p>
  <p>{{ square }}</p>
</template>
```

```html
<script>
  import { mapState, mapGetters } from 'vuex'
  
	export default {
    // other...
    computed: {
      ...mapState(['count']),
      ...mapGetters(['square'])
    }
  }
</script>
```

**mapActions () 和 mapMutations ()**

类型：

- `target: Object | Array<string>`，对象类型可以自定义映射后变量名，数组类型只能和真实变量名相同 

功能：映射生成 dispatch 和 commit 方法，方便调用

```html
<!-- 映射前 -->
<template>
  <button @click="addDispatch">dispatch流程</button>
  <button @click="addCommit">commit流程</button>
</template>

<script>
	export default {
    // other...
    data() {
      return {
        value: 9
      }
    },
    methods: {
      addDispatch() {
        this.$store.dispatch('add', this.value)
      },
      addCommit() {
        this.$store.commit('ADD', this.value)
      }
    }
  }
</script>
```

```html
<!-- 映射后 -->
<template>
  <!-- 映射后在绑定事件时传入参数 -->
  <button @click="addDispatch(value)">dispatch流程</button>
  <button @click="addCommit(value)">commit流程</button>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  
	export default {
    // other...
    data() {
      return {
        value: 9
      }
    },
    methods: {
      ...mapActions({addDispatch: 'add'}),
      ...mapMutations({addCommit: 'ADD'})
    }
  }
</script>
```



------

#### 模块管理

为了避免将所有 vuex 的配置都写在一块，可以对不同功能进行模块划分

```tsx
const moduleA = {
  // 如果要用mapXXX映射函数，则这里必须要设置该属性为true才能让其识别
  namespace: true,	
  actions: {...},
  mutations: {...},
  state: {...}
}

const moduleB = {
  namespace: true,           
  actions: {...},
  mutations: {...},
  state: {...}
}
                      
export default new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  }     
})
```

> 以之前的数据全放在 moduleA 中为例

```html
<!-- 映射前 -->
<template>
  <p>{{ $store.state.moduleA.count }}</p>
  <p>{{ $store.getters.moduleA.square }}</p>
</template>

<!-- 映射后 -->
<template>
  <p>{{ count }}</p>
  <p>{{ square }}</p>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  
	export default {
    // other...
    computed: {
      // 需要在映射方法的第一个参数中填入模块名
      ...mapState('moduleA', ['count']),
      ...mapGetters('moduleA', ['square'])
    }
  }
</script>
```

另外两个映射方式同理



