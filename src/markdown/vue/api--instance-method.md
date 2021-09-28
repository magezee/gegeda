## 实例方法

### vm.$set

`vm.$set (target, key, value)`：

- 功能：动态设置实例对象的属性，且保证该属性是响应式的

- 参数：
  - `target： Object | Array`：要设置的属性，不能为实例对象
  - `key: string | number`：要设置的对象属性或者数组下标
  - `value: any`：属性的值

> 如果是先手动设置对象属性再用该方法，则只是修改其内部值，不会有响应式

```html
<template>
  <div>
    <p>{{info.message}}</p>
    <button @click="fn1">直接添加</button>
    <button @click="fn2">vm.$set添加</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      info: {}
    }
  },
  methods: {
    fn1 () {
      this.info.message = 'A'
    },
    fn2 () {
      this.$set(this.info, 'message', 'B')
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/set.gif)



----

### vm.$delete

`vm.$set (target, key)`：

- 功能：动态删除实例属性，如果属性是响应式的，确保删除能触发更新视图

- 参数：
  - `target： Object | Array`：要删除的属性
  - `key: string | number`：要删除的对象属性或者数组下标

```html
<template>
  <div>
    <p>{{info.message}}</p>
    <button @click="fn">删除</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      info: {
        message: 'x'
      }
    }
  },
  methods: {
    fn () {
      this.$delete(this.info, 'message')
      console.log(this)
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/delete.gif)
