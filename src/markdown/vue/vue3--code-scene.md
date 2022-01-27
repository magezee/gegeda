## 代码场景

### 获取dom

通过响应式数据声明便可以直接使用，无需再通过实例的 `$refs` 属性获取

```html
<template>
  <div ref="dom"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
  
const dom = ref(null)
onMounted(() => {
  console.log(dom)
})

</script>
```

