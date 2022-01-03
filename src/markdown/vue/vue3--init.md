## 初始化

### 创建实例

在 vue3 中，使用 `createApp` 来创建实例

```tsx
import { createApp } from 'vue'

const app = createApp({})
```

如果要创建指定组件的实例，可以传入组件

```tsx
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

该方法会返回实例本身，因此可以链式调用 [应用 API](https://v3.cn.vuejs.org/api/application-api.html)

**挂载**

使用 `mount` 将组件挂载到 dom 中

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

使用 ` unmount` 卸载组件

```tsx
app.unmount()
```







-----

