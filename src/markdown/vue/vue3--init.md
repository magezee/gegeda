## 初始化

### 应用

在 vue3 中，使用 `createApp` 来创建应用

```tsx
import { createApp } from 'vue'

const app = createApp({})
```

如果要创建指定组件的应用实例，可以传入组件

```tsx
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

该方法会返回应用本身，因此可以链式调用 [应用 API](https://v3.cn.vuejs.org/api/application-api.html)

**挂载**

使用 `mount` 将应用挂载到 dom 中，该方法不返回应用本身，而是返回根组件实例（与大多应用方法不同ß

```tsx
<body>
	<div id="app"></div>
</body>

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

**卸载**

使用 ` unmount` 卸载应用

```tsx
app.unmount()
```



-----

### 组件

创建组件有两种方式 [defineComponent](https://v3.cn.vuejs.org/api/global-api.html#definecomponent) 和 [defineAsyncComponent](https://v3.cn.vuejs.org/api/global-api.html#defineasynccomponent) 两种方式，分别为创建同步组件和创建异步组件

```html
<template>
  <div>{{ info }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      info: 'info'
    }
  }
})
</script>
```

Vue3 推出了 `script setup` 语法，会自动创建组件并默认导出

```html
<template>
  <div>{{ info }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const info = ref('info')

</script>
```

如果想加载异步组件，在其内部直接使用 `defineAsyncComponent` 定义即可

```html
<template>
  <div class="app">
    <Demo />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
  
let Demo = null
if(true) {
  Test = defineAsyncComponent(() => import('./src/component/Test.vue'))
}
</script>
```



---

### Vuex

Vue3 需要配合 `4` 版本以上的 Vuex 使用，否则不兼容

```tsx
// store.ts
import { createStore } from 'vuex'

const store = createStore({
  actions: { ... },
  mutations: { ... },
  state: { ... },
})

export default store
```

```tsx
// index.ts
import { createApp } from 'vue'
import App from './App.vue'
import store from './store.ts'

const app = createApp(App)

app.use(store)
app.mount('#app')

export default {}
```



-----

