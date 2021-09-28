## 插件

### 功能

插件通常用来为 Vue 添加全局功能：

- 添加全局方法或实例
- 添加全局资源，如指令、过滤器、过渡
- 通过全局混入来添加一些组件选项
- 通过 `Vue.prototy` 添加 Vue 实例方法
- 直接添加一个库，同时提供上面的多个功能



------

### 使用

通过 `Vue.use` 来使用插件，需要在 `new Vue()` 启动应用前完成

被应用的插件本质是一个对象，其中包含一个 `install` 方法，在启用插件时会向其传入 Vue 对象，因此可以使用全局方法

```tsx
// plugins.js
export default {
  install(Vue) {
    Vue.directive()                 // 定义全局指令
    Vue.mixin()                     // 定义混入
    Vue.prototype.xxx = () => {}    // 定义实例方法
  }
}
```

```tsx
// main.js
import Vue from 'vue'
import plugins from 'xxx/plugins'

Vue.use(plugins)

new Vue(...)
```























