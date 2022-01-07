## 视图更新

### 响应式数据

在 Vue2 中，数据是通过放在特定的实例属性，以此为数据增加数据代理，这样页面在使用这些数据的时候就可以直接触发页面更新，而在 Vue3 的 `script setup` 中，则是在页面中使用响应式数据的方式使数据更改时页面发生更新

Vue3 提供了可以为数据添加响应式的 API

```html
<template>
  <p>{{ text }}</p>
  <p>{{ message }}</p>
  <button @click="updateText">Text</button>
  <button @click="updateMessage">Message</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let text = 'text'
let message = ref('message')

const updateText = () => {
  text = 'updateText'
}

const updateMessage = () => {
  message.value = 'updateMessage'
}
</script>
```

![](https://img-blog.csdnimg.cn/b406617f065743b5b2e5e3973ef96511.gif#pic_center)

即若想页面发生更新，本质的逻辑是响应式数据监控到变化，从而触发了 `setter` 方法来使页面

> Vue3 的数据代理使用的是 Proxy 的方式

```tsx
const data = {
  x: 0
}

const proxyData = new Proxy(data, {
  get: (target, key) => {},
  set: (target, key, value) => {
    target[key] = value
    // 后续执行页面更新相关操作
  }
})

proxyData.x = 1     // 重新赋值时执行set方法
```



-------

#### ref

用于将一个数据定义为响应数据，通过 ref 创建的是一个对象，使用其 `value` 属性获取和更改对应数值

> ref 对象用在页面模板上时，会自动将其 `data.value` 解析出来，因此直接写成 `data` 就行

```html
<template>
  <div class="app">
    <p>{{ data }}</p>
    <button @click="changeData">更改</button>
  </div>
</template>

<script setup lang="ts">
import { ref }  from 'vue'

let data = ref(1) 
const changeData = () => {
  data.value = 2
}
</script>
```

> 使用 ref 创建引用数据也可以

```html
<template>
  <div class="app">
    <p>{{ data.x }}</p>
    <button @click="changeData">更改</button>
  </div>
</template>

<script setup lang="ts">
import { ref }  from 'vue'

let data = ref({
  x: 1
}) 

const changeData = () => {
  data.value.x = 2
}
</script>
```



-----

#### reactive

用于将多个数据定义为响应式数据，即对这些数据封装并返回一个拥有响应式的 `reactive` 对象，通过对这个对象的数据操作可以触发页面更新

```html
<template>
  <div class="app">
    <p>{{ reactiveData.x }}</p>
    <p>{{ reactiveData.obj.y }}</p>
    <button @click="changeData"></button>
  </div>
</template>

<script setup lang="ts">
import { reactive }  from 'vue'

const reactiveData = reactive({
  x: 'x',
  obj: {
    y: 'y'
  }
})

const changeData = () => {
  reactiveData.x = 'xx'
  reactiveData.obj.y = 'yy'
}

</script>
```

> 注意：和 ref 不同的是，reactive 内部存的是源数据本身，透过 reactive 对象对其修改是可以拥有响应式的，即响应式的封装在 reactive 对象上，如果直接将其内部数据重新赋值，对赋值后的变量修改则不会具有响应式，因为这个特性，reactive 对象无法直接进行结构

```html
<template>
  <div class="app">
    <p>{{ reactiveData.x }}</p>
    <p>{{ newX }}</p>
    <button @click="changeData"></button>
  </div>
</template>

<script setup lang="ts">
import { reactive }  from 'vue'

const reactiveData = reactive({ x: 'x' })
let newX = reactiveData.x

const changeData = () => {
  reactiveData.x = 'xx'
  newX = 'newX'
}

</script>
```

![](https://img-blog.csdnimg.cn/4d5a0839e93c44e79e6c41a132892a31.gif#pic_center)

可以把 ref 数据直接塞进 reactive 中，reactive 会自动将其解析，而对普通数据则不会解析

```tsx
let data = 'x'
const refData = ref('y')
const reactiveData = reactive({ data, refData })

data = 'xx'
refData.value = 'yy'

console.log(reactiveData.data)        // x
console.log(reactiveData.refData)     // yy
```

```tsx
let data = 'x'
const refData = ref('y')
const reactiveData = reactive<any>({})

reactiveData.data = data
reactiveData.refData = refData
data = 'xx'
refData.value = 'yy'

console.log(reactiveData.data)        // x
console.log(reactiveData.refData)     // yy
```



-----

#### toRefs

使用于 `reactive` 对象并返回一个普通对象，该对象每一个属性都是对应的 `ref` 数据

使用该方法的好处是可以对 `reactive` 的数据结构后仍具有响应性，因为解构出来的是 `ref` 响应式对象，这样就可以在视图模板中使用更舒服

```html
<template>
  <div class="app">
    <p>{{ newX }}</p>
    <p>{{ toRefsX }}</p>
    <button @click="changeData">更改</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs }  from 'vue'

const reactiveData = reactive({ x: 'x' })
let { x: newX } = reactiveData
const { x: toRefsX } = toRefs(reactiveData)

console.log(newX)         // x
console.log(toRefsX)      // ref对象

const changeData = () => {
  newX = 'newX'
  toRefsX.value = 'toRefsX'
}
</script>
```

![](https://img-blog.csdnimg.cn/ed9f7b8b6b354343a094d385337a3e0b.gif#pic_center)

> 即：reactive 对象存储的并不是 ref 数据，经过 toRefs 返回了一个存储 ref 数据的对象，因此不能直接结构，但是可以经过 toRefs 后解构使用

```tsx
import { isRef, reactive, toRefs }  from 'vue'
const reactiveData = reactive({ x: 'x' })
const toRefsData = toRefs(reactiveData)

console.log(isRef(reactiveData.x))        // false
console.log(isRef(toRefsData.x))          // true
```



----

#### toRef

为 `reactive` 的某个属性创建一个 ref 对象，令其相互映射

```tsx
import { reactive, toRef }  from 'vue'

const reactiveData = reactive({ x: 'x' })
const RefData = toRef(reactiveData, 'x')

reactiveData.x = 'xx'
console.log(RefData.value)    // xx
```



-----

#### unref

用于快捷返回一个数据的具体值，如果为 ref 的数据则返回其内部的 value 值，如果为一个普通数据则直接返回该数据

```tsx
import { ref, unref }  from 'vue'

let data = 'data'
let refData = ref('refData')

console.log(unref(data))      // data
console.log(unref(refData))   // refData
```



-----

### 场景

#### 更新自身

一个组件想要在内部触发页面更新仅需要在组件内更改响应式数据即可

```html
<template>
  <p>{{ count }}</p>
  <button @click="add"></button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const add = () => {
  count.value ++
}
</script>
```

-------

#### 更新子组件

更新子组件的方式通常都是更新传入的 props，为此需要做到传入的 props 为响应式数据

```html
<!-- App.vue -->
<template>
  <div class="app">
    <Test :count="count" />
    <button @click="add"></button>
  </div>
</template>

<script setup lang="ts">
import Test from './src/component/Test.vue'
import { ref } from 'vue'

const count = ref(0)
const add = () => {
  count.value ++
}
</script>

<!-- Test.vue -->
<template>
  <p>{{ count }}</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const { count } = defineProps<{
  count: number
}>()
</script>
```



-----

#### 更新父组件

同理，将更改自身响应式数据的方法传给子组件，在子组件中调用即可

```html
<!-- App.vue -->
<template>
  <div class="app">
    <p>{{ count }}</p>
    <Test :add="add" />
  </div>
</template>

<script setup lang="ts">
import Test from './src/component/Test.vue'
import { ref, reactive, toRefs } from 'vue'

const count = ref(0)

const add = () => {
  count.value ++
}
</script>

<!-- Test.vue -->
<template>
  <button @click="add"></button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

interface IProps  {
  add: () => void
}

const { add } = defineProps<IProps>()
</script>
```

------

#### 数据传递

注意：`组件A` 封装响应式数据 `data` 传给 `组件B` 展示 ，在 `组件B` 中拿到的 `data` 是不具备响应式的，即在 `组件B` 中对 `data` 的更改不会触发页面更新

要想页面刷新需要更改响应式数据，本质为 `组件A` 更改了响应式数据 `data` → `组件B` 拿到了最新的数据 → 因为更改了响应式数据所以页面发生更新 → `组件B` 展示最新数据

所以并不是因为 `组件B` 拿到了响应式数据，而是 `组件A` 更改响应式数据导致页面更新，`组件B` 才会更新

因此总的设计思想就是：如果一个组件在想在自身内对一个数据操作产生页面更新，必须在该组件内对该数据封装为响应式数据，想通过操作外部传递来的数据更新页面同样需要再次封装一次外部数据为响应式数据

> 如上面子组件更新父组件例子拿的是父传进来的更改响应式数据的方法，并不是完全自身内部的



----

#### 更新state















