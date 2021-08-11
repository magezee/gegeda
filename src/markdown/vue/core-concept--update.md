## 更新机制

### data

#### 数据代理

对实例进行 `data` 的配置时，vue 将 data 中的数据使用 _data 代理，这样即可在操作 data 时进行额外操作

```tsx
// 这里只是简单例子，真实vue会考虑深层对象并递归设置，而且更改data也会同步更改_data
function Observer(obj) {
  // 获取data属性的所有key
  const keys = Object.keys(obj)     
  // 批量设置key的代理
  keys.forEach((key) => {
    Object.defineProperty(this, key, {
      get() {
        return obj[key]
      },
      set(value) {
        obj[key] = value
        // 更改值之后在这里重新解析模板，生成虚拟dom，然后更新页面
      }
    })
  })
}

// 将data的设置传给实例的_data属性
const obs = new Observer(data)
let vm = new Vue(...)
vm._data = obs
```



----

#### 引用类型

直接更改引用类型的内部数据会可能导致 vue 不更新页面

```html
<template>
  <div>
    <p>{{arr[1]}}</p>
    <button @click="fnA">直接更改</button>
    <button @click="fnB">数组方法</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      arr: ['x', 'y', 'z']
    }
  },
  methods: {
    fnA () {
      this.arr[1] = 'yy'
    },
    fnB () {
      this.arr.splice(1, 0, 'yy')
    }
  }
}
```

![](https://raw.githubusercontent.com/magezee/images/main/arr.gif)

出现上述原因，是因为 vue 内部将可以对原数组产生直接影响的数组方法进行了重写，重写后不仅有原方法的功能，而且也能在数组变动后同步更新页面

> 重写的数组方法有：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`
>
> 如果不使用这些方法仍想实现更改数组同步更新功能，则只能将新数组完全替换旧数组

```tsx
methods: {
  fn () {
    console.log(this.arr.splice === Array.prototype.splice)     // false
  }
}
```

