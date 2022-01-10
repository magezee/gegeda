## 类组件
> 使用 script setup 时可以直接使用 ts 拥有更好的体验，不需要使用类组件写法

### 使用

主要依赖包：

- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)：用于将类包装成 vue 组件
- [vuex-class](https://github.com/ktsn/vuex-class/)：用于处理 vuex

> `vue-property-decorator` 是 [vue-class-component](https://class-component.vuejs.org/guide/props-definition.html) 基础上进行扩展的

```markdown
yarn add vue-property-decorator vuex-class
```

**转换**

使用装饰器 `@Component` 将类转换为 vue 组件

```tsx
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {...}
```

**data**

直接声明为类属性

```html
<template>
	<div>{{ info }}</div>
</template>

<script>
@Component
export default class Demo extends Vue {
  info = 'info'
}
</script>
```

**methods**

直接声明为类原型方法

```html
<template>
	<button @click="handleClick">Click</button>
</template>

<script>
@Component
export default class Demo extends Vue {
  handleClick() {
    console.log('click event')
  }
}
</script>
```

**computed**

声明为类属性的 getter/setter 

```html
<template>
  <input v-model="name">
</template>

<script>
@Component
export default class Demo extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  get name() {
    return this.firstName + ' ' + this.lastName
  }

  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
}
</script>
```

**hook**

钩子函数，如生命周期钩子函数直接在类中使用即可

```tsx
@Component
export default class Demo extends Vue {
  mounted() {
    console.log('mounted')
  }
}
```

**其他选项**

其他选项使用装饰器来配合声明





------

### 代码规范

组件选项编写顺序

```tsx
@Component({
  components,
  minxins,
  filters,
})
export default class Demo extends Vue {
  data
  @Props
  @State
  @Getter
  @Action
  @Mutation
  @Watch
  生命周期钩子
  路由钩子
  computed
  methods
  
  
  
}
```

