## 更新机制

### 更新条件

React 的更新条件是自身的 state 与 props 发生赋值时即令父组件及其所有子组件发现更新，而 Vue 的更新的更新操作只取决于本组件页面展示数据是否发生改动

以下情况不会触发更新：

- 数据赋值，但是页面没有使用该数据
- 数据赋值，页面使用该数据，但是赋值前后结果一致

> 适用于所有情况，如父组件给子组件传递了 props，只有子组件页面上的数据有依附于 props 数据，且 props 发生变动，子组件才会更新，否则不会更新

```html
<template>
  <div>
    <p>{{ countA }}</p>
    <button @click="changeCountA">更改countA</button>
    <button @click="changeCountB">更改countB</button>
    <button @click="notChangeA">countA相同赋值</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      countA: 0,
      countB: 0
    }
  },
  methods: {
    changeCountA() {
      this.countA += 1
    },
    changeCountB() {
      this.countB += 1
    },
    notChangeA() {
      this.countA = this.countA
    }
  },
  updated() {
    console.log('页面发生更新!!!')
  }
}
</script>
```



![](https://img-blog.csdnimg.cn/004c5d1a8b2e4df58ba047d8e0068336.gif#pic_center)



-------

### 数据更新

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
</script>
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



----

#### 异步更新

Vue 的更新取决于页面数据的更新，而数据的更新是一个异步的过程，就像 React 的 `setState` 一样，多次更改数据并不会立刻触发多次更新，而是收集同步数据变动的代码，在异步时整合在一起最终完成一次更新

```html
<!-- 
  只会发生一次打印操作 
-->
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    this.message = 'messageA'
    this.message = 'messageB'
    this.message = 'messageC'
  },
  updated() {
    console.log('页面发生更新!!!')
  }
}
</script>
```

如果想每次变动都产生一次更新，可以套在不同的异步里

> 但是这里和 react 不一致，即使写在异步里，也是先执行同步代码块再进行数据更新，并不会像 `setState` 写在异步代码块有同步的特性

```tsx
mounted() {
  setTimeout(() => {
    this.message = 'messageA'
    console.log(1)
  })
  setTimeout(() => {
    this.message = 'messageB'
    console.log(2)
  })
  setTimeout(() => {
    this.message = 'messageC'
    console.log(3)
  })
}
```

![](https://img-blog.csdnimg.cn/2a373604c45b41c1b8dde0513d43b535.png)



由于 Vue 的这个特性，会导致获取 dom 的问题

```html
<!--
	由于数据更新发生在获取元素数据后，所以点击显示时拿到的是 display:none 的数据
-->
<template>
  <div>
    <div :class="elementStyle" ref="ele"></div>
    <button @click="controlShowElement" >控制显示元素</button>
  </div>
  
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      opened: false
    }
  },
  computed: {
    elementStyle() {
      return {
        ele: true,
        opened: this.opened
      }
    }
  },
  methods: {
    controlShowElement() {
      this.opened = !this.opened
      console.log(this.$refs.ele.getBoundingClientRect())
    }
  }
}
</script>

<style scoped>
  .ele {
    display: none;
    width: 90px;
    height: 90px;
    border: solid 1px #000;
    margin-bottom: 10px;
  }
  .opened {
    display: block;
  }
</style>
```

![](https://img-blog.csdnimg.cn/88635341940147a8baf8422287c62883.gif#pic_center)

此时可以借助 Vue 提供的 `Vue.nextTick` 或者 `vm.$nextTick` 来及时获取到更新后的 dom

```tsx
controlShowElement() {
  this.opened = !this.opened
  this.$nextTick(() => 
    console.log(this.$refs.ele.getBoundingClientRect())
  })
}
```

![](https://img-blog.csdnimg.cn/9e0b4fa546c84d328e19767b69e5dab0.gif#pic_center)

