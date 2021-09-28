## 路由

### 路由配置

#### 基础

需要安装依赖包 `vue-router`

```markdown
yarn add vue-router
```

安装后需要配置该插件

```tsx
// router.js
import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('xxx/Home.vue')
const Demo = () => import('xxx/Demo.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',				// 这个name是路由别名，可配可不配
      path: '/',
      component: Home
    },
    {
      name: 'demo',
      path: '/demo',
      component: Demo
    }
  ]
})

export default router
```

```tsx
// main.js
import Vue from 'vue'
import router from 'xxx/router.js'

new Vue({
  // other...
  router
})
```

在 vue 中，配置了路由后是不能直接使用的，还需要用 `<router-view>` 组件告诉 vue 需要在哪里去根据路由渲染指定的组件

> Vue 的根组件是 App 组件，所以访问任意路由都是 App 的子组件，当渲染对应路由组件时，这些组件会代替 `<router-view>`，当路由切换时，当前的路由组件会被销毁

```html
<!-- App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```



-----

#### 嵌套路由

配置路由路径只需要在父路由组件内添加 `children` 即可

```tsx
// router.js
import Vue from 'vue'
import Router from 'vue-router'

const Demo = () => import('xxx/Demo.vue')
const DemoChild = () => import('xxx/DemoChildA.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/demo',
      component: Demo,
      children: [
        {
          path: 'demo-child'			// 注意非一级路由path都不需要再加 /
          component: DemoChild
        }
      ]
    }
  ]
})

export default router
```

然后在指定的父路由组件内添加占位标签 `<router-view>` ，当切换至子路由时，就会将子路由组件替换该标签









**路由跳转**

依赖包提供了路由跳转的组件 `<router-link>`

```tsx
<router-link to="/demo"></router-link>
```









### 数据传递

当一个普通组件被注册成路由组件后，会往实例中添加两个属性

- `$route`：组件实例的路由配置
- `$router`：vue 应用的路由配置，所有组件都可访问到该单例属性

![](https://raw.githubusercontent.com/magezee/images/main/router.png)

#### query

在 `router-link` 中通过 url 传递的 query 参数可以被对应路由组件中的 `$route.query` 拿到

```tsx
// 模板字符串式
<router-link :to="`/demo?info=${123}&message=abc`"></router-link>

// Demo.vue
<template>
  <p>{{ $route.query.info }}</p>
  <p>{{ $route.query.message }}</p>
</template>
```

```tsx
// 对象式
<router-link :to="{
  path: '/demo',
  query: {
    info: 123,
    message: 'abc'
  }
}">
</router-link>

// Demo.vue
<template>
  <p>{{ $route.query.info }}</p>
  <p>{{ $route.query.message }}</p>
</template>
```



------

#### params

在 `router-link` 中通过 url 传递的 params 参数可以被对应路由组件中的 `$route.params` 拿到，需要配置动态路由才可以使用

```tsx
// router.js
const router = new Router({
  routes: [
    {
      path: '/demo/:info/:message',
      component: Demo,
    }
  ]
})
```

```tsx
// 对象式
// 写成对象时要注意只能写路由别名而不能写path，所以此时需要配路由别名
<router-link :to="{
  name: 'demo',
  params: {
    info: 123,
    message: 'abc'
  }
}">
</router-link>

// Demo.vue
<template>
  <p>{{ $route.params.info }}</p>
  <p>{{ $route.params.message }}</p>
</template>
```

```tsx
// 对象式
<router-link :to="`/demo/${123}/abc`"></router-link>

// Demo.vue
<template>
  <p>{{ $route.params.info }}</p>
  <p>{{ $route.params.message }}</p>
</template>
```



----

#### props

功能：让路由组件更方便拿到参数

> 对象形式：将对象中的数据通过 props 传给指定路由组件
>
> 一般不在组件去使用 `$route` 拿数据，避免组件和路由产生强耦合

```tsx
// router.js
const router = new Router({
  routes: [
    {
      path: '/demo',
      component: Demo,
      props: {info: 123, message: 'abc'}
    }
  ]
})

// other
<router-link :to="/demo"></router-link>
  
// Demo.vue
export default {
  // other..
  props: ['info', 'message']
}
```

> 布尔值：当为 true 时，将路由接受到的所有 params 参数通过 props 传给指定路由组件

```tsx
// router.js
const router = new Router({
  routes: [
    {
      path: '/demo/:info/:message',
      component: Demo,
      props: true
    }
  ]
})

// other
<router-link :to="`/demo/${123}/abc`"></router-link>
  
// Demo.vue
export default {
  // other..
  props: ['info', 'message']
}
```

> 函数：将函数返回对象中的数据通过 props 传给指定路由组件，函数会传入一个 `$route` 对象

```tsx
// router.js
const router = new Router({
  routes: [
    {
      path: '/demo',
      component: Demo,
      props(route) {
        return {
          info: route.query.info,
          message: route.query.message
        }
      }
    }
  ]
})

// other
<router-link :to="`/demo?info=${123}&message=abc`"></router-link>
  
// Demo.vue
export default {
  // other..
  props: ['info', 'message']
}
```



