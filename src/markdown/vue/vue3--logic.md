## 组合逻辑

Vue3 使用 `setup` 来组合 Vue2 中用 `data`、`methods`、`computed` 等区分逻辑的属性，有两种使用方式

第一种是直接在组件中使用 `setup` 属性

```html
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props, context) {
    const x = ref('x')
    return { x }
  },
  data() {
    
  },
  ....
})
</script>
```

第二种是直接使用 `<script setup>` 标签来定义，在同一个 vue 文件中可以同时存在该标签和 `<script>` 标签

```html
<script setup>
  import { ref } from 'vue' 
  const x = ref('x')
</script>
```

由于第二种写法很舒服，因此下面只介绍第二种的用法



------

### 实例

在 `setup` 函数中没有 this 指向实例，同理 `script setup` 中也无法直接使用 this 来找到实例，如果想使用实例方法可以使用 [getcurrentinstance](https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance) 来拿到实例对象

> 不推荐在 setup 中使用这个方法拿到实例并操作实例

```html
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
  
export default defineComponent({
  setup() {
    const instance = getCurrentInstance()    
    return { instance }
  },
  data() {
    return {
      info: 'info'
    }
  },
  mounted() {
    console.log(this.$data === this.instance.data)    // true
  }
})
</script>
```

或者直接在页面模板中使用实例方法

```html
<template>
  <Test @customFn="customFn"/>
</template>

<script setup lang="ts">
import Test from './src/component/Test.vue'
  
const customFn = () => {
  console.log('自定义方法被执行')
}
</script>

<!-- Test.vue -->
<template>
  <!-- 使用实例方法$emit -->
  <button @click="$emit('customFn')">触发</button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
  
defineEmits(['customFn'])
</script>
```



-----

### components

在单个 vue 文件中，会解析 `<script setup>` 标签为一个组件并且默认导出，因此无需再进行组件定义和导出

```tsx
// App.vue
<template>
  <div class="app"></div>
</template>

<scritp setup></scritp>

// index.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

在标签中引入的组件可以直接在模板中使用，以此代替 `component` 

```html
<template>
  <Demo />
</template>

<script setup>
  import Demo from 'component/Demo.vue'

</script>
```

-----

### props

引入 [defineProps](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops-%E5%92%8C-defineemits) 并使用，使用方法与 `props` 属性完全一致

```html
<template>
  <Test :fatherData="count" />
</template>

<script setup>
import { ref } from 'vue'
import Test from './src/component/Test.vue'

const count =  ref(1)
</script>

<!-- Test.vue -->
<template>
  <div>{{ fatherData }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
  
const { fatherData } = defineProps({
  fatherData: {
    type: Number,
    require: false,
    default: 0
  }
})
</script>
```

> 可接受泛型，用类型来直接说明 props 的类型和是否可选，泛型写法和函数传值写法不可共用

```tsx
import { defineProps } from 'vue'

interface IProps {
  fatherData?: number,
}

const { fatherData } =  defineProps<IProps>()
```

-----

#### withDefaults

使用泛型写法时，如果需要写入默认值，则需要配合 [withDefaults](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BB%85%E9%99%90-typescript-%E7%9A%84%E5%8A%9F%E8%83%BD) 使用

```tsx
import { defineProps, withDefaults } from 'vue'

interface IProps {
  fatherData?: number,
}

const { fatherData } = withDefaults(defineProps<IProps>(), {
  fatherData: 99
})
```

> 如果是引用类型的数据，则需要使用函数返回的形式

```tsx
import { defineProps, withDefaults } from 'vue'

interface IProps {
  fatherData?: {
    num: number
  }
}

const { fatherData } = withDefaults(defineProps<IProps>(), {
  fatherData: () => ({
    num: 1
  })
})
```



-----

### data

声明的变量直接在模板中使用，以此代替 `data` 

```html
<template>
  <p>{{ text }}</p>
</template>

<script setup>
import { ref } from 'vue'
  
const text =  ref('测试文本')
</script>
```

-----

### methods

声明的函数直接在目标中使用，以此代替 `methods`

```html
<template>
  <p>{{ text }}</p>
  <button @click="changeText">更改按钮</button>
</template>

<script setup>
import { ref } from 'vue'
  
const text =  ref('测试文本')
const changeText = () => {
  text.value = '更改文本'
}
</script>
```

------

### computed

引入  [computed](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed) 并使用，该方法返回的是一个响应式 ref 对象

```html
<template>
  <p>{{ renderCount }}</p>
</template>

<script setup>
import { ref, computed } from 'vue'

const count =  ref(1)
const renderCount = computed(() => {
  return count.value * 2
})
</script>
```

------

### watch

引入 [watch](https://v3.cn.vuejs.org/api/computed-watch-api.html#watch) 并使用，在响应式数据发生变动时触发回调方法，无法用于非响应式数据

```html
<template>
  <div class="app">
    <p>{{ count }}</p>
    <button @click="addCount"></button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const count =  ref(1)
const addCount = () => {
  count.value += 1
}

watch(count, (value, preValue) => {
  if(value === 2) alert('监听成功')
})

</script>
```

> 在监听 reactive 和 ref 时具有不同的写法

```tsx
import { reactive, ref, watch }  from 'vue'

const reactiveData = reactive({ x: 'x' })
const refData = ref('x')

watch(() => reactiveData.x, (value, preValue) => {
  ...
})

watch(refData, (value, preValue) => {
  ...
})
```

> 监听多个源时和 watch 属性写法相同

```tsx
const x = ref('x')
const y = ref('y')

watch([x, y], ([xValue, yValue], [xPreValue, yPreValue]) => {
  ...
})
```

--------

#### watchEffect

和 watch 都是可以用来监听响应式数据的变化并且触发回调，不同的是：

- watchEffect 不需要手动传入依赖项，它会在初始化的时候执行一遍回调，并且自动监听回调里所用到的数据
- watchEffect 无法拿到变化前的数据，只能拿到发生变化后的数据

```html
<template>
  <div class="app">
    <button @click="updateData(Datatype.ref)">Ref</button>
    <button @click="updateData(Datatype.reative)">Reative</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect}  from 'vue'

const refData = ref('x')
const reactiveData = reactive({
  y: 'y'
})

watchEffect(() => {
  console.log(refData.value)
  console.log(reactiveData.y)
})

enum Datatype {
  ref = 'ref',
  reative = 'reative'
}

const updateData = (type: Datatype) => {
  if(type === Datatype.ref) {
    refData.value = 'xx'
  }
  if(type === Datatype.reative) {
    reactiveData.y = 'yy'
  }
}
</script>
```

![](https://img-blog.csdnimg.cn/137aca7b8a624df6a602ea8c0b7a1493.gif#pic_center)

------

### emits

Vue3 中增加了实例选项 [emits](https://v3.cn.vuejs.org/guide/migration/emits-option.html#%E6%A6%82%E8%BF%B0) 用于声明组件可触发的自定义事件

```html
<template>
	<Child @fn="fn" />
</template>

<script lang="ts">  
export default defineComponent({
  methods: {
    fn() {...}
  }
})
</script>


<!-- Child -->
<template>
	<button @click="$emit('fn')"></button>
</template>

<script lang="ts">  
export default defineComponent({
  data() {...},
  emits: ['fn']
})
</script>
```

在 `setup` 中使用 [defineEmits](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4) 来替换该选项

```html
<!-- Child -->
<template>
	<button @click="$emit('fn')"></button>
</template>

<script setup lang="ts">  
import { defineEmits } from 'vue'

defineEmits(['fn'])
</script>
```

实际上不声明 `emits` 也没什么关系，直接使用也可以正常使用，只是声明后可读性更佳

此外声明还有两点特性：

- 如果声明了，当自定义事件名和内置事件名冲突时，如都叫 `click`，则只会执行自定义事件，否则会都执行
- 如果声明了，则该自定义事件不会绑在该组件的 `$attrs` 上



-----

### 生命周期

提供了对应的声明周期钩子，和以前的生命周期相互对应：

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeUnmount` -> `onBeforeUnmount`
- `unmounted` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`
- `renderTracked` -> `onRenderTracked`
- `renderTriggered` -> `onRenderTriggered`
- `activated` -> `onActivated`
- `deactivated` -> `onDeactivated`

```tsx
import { onMounted }  from 'vue'

onMounted() {
  console.log('组件挂载完成')
}
```



-----









