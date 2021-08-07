## Vue指令

> [vue的修饰符](https://juejin.cn/post/6844903703376297992)

> 注意：Vue 指令统一将 js 代码写在 `" "` 中
>
> 一些指令可以搭配修饰符产生特定效果，语法是 `Vue指令.修饰符="xxx"`

### v-text

类型：`string`

功能：用于设置标签元素的 `textContent` 属性，会覆盖直接写在标签中间的文本

```html
<template>
  <div>
    <p v-text="obj.x"></p>              <!-- x -->
    <p v-text="`${obj.x} + y`"></p>     <!-- x + y -->
    <p v-text="1 + 1"></p>              <!-- 2 -->
    <p v-text="1">2</p>                 <!-- 1 -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      obj: {
        x: 'x'
      }
    }
  }
}
</script>
```



-----

### v-html

类型：`string`

功能：用于设置标签元素的 `textContent` 属性，会覆盖直接写在标签中间的内容

```html
<template>
  <div v-html="ele" />
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      ele: '<span>123</span>'
    }
  }
}
</script>
```



-----

### v-show

类型：`any`

功能：根据表达式判断是否为真，如果为真则正常显示元素，如果为假则添加样式 `display: none` 隐藏

```html
<template>
  <div>
    <p v-show="isShow">active</p>
    <p v-show="!isShow">inactive</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      isShow: true
    }
  }
}
</script>
```



-----

### v-if

类型：`any`

功能：根据表达式判断是否为真，如果为真则正常显示元素，如果为假则在 DOM 树上删除该元素

```html
<template>
  <div>
    <p v-if="isShow">active</p>
    <p v-if="!isShow">inactive</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      isShow: true
    }
  }
}
</script>
```

**v-else**

类型：无

功能：前一兄弟元素必须有 `v-if` 或 `v-else-if`，为它们添加 else 条件

```html
<template>
  <div>
    <p v-if="isShow">active</p>
    <p v-else>inactive</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      isShow: Math.random() > 0.5
    }
  }
}
</script>
```

**v-else-if**

类型：`any`

功能：前一兄弟元素必须有 `v-if` 或 `v-else-if`，为它们添加 else if 条件

```html
<template>
  <div>
    <p v-if="isShow">active</p>
    <p v-else-if="isShow < 0.7">semiactive</p>
    <p v-else>inactive</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      isShow: Math.random() > 0.5
    }
  }
}
</script>
```



----

### v-for

类型：`Array | Object | number | string | Iterable`

功能：基于源数据多次渲染元素或模板块，需要配合 `key` 值使用，它的语法是 `item in items `，其取值效果和 `for(let item of items)` 类似

> v-for 和数据进行同步绑定，一旦更改数据，则渲染的标签也会同步更新

```html
<template>
  <ul>
    <li v-for="item in arr" :key="item.id">{{ item.value }}</li>
  </ul>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      arr: [
        {id: 'A', value: 'A'},
        {id: 'B', value: 'B'},
        {id: 'C', value: 'C'}
      ]
    }
  }
}
</script>
```

> 如果遍历的是数组，则可以通过 `(item, index) in items` 的方式拿到下标
>
> 如果遍历的是对象，则可以通过 `(item, key, index)` 的方式拿到属性名和下标

```html
<template>
  <ul>
    <li v-for="(item, index) in arr" :key="item.id">{{ `${index}：${item.value}` }}</li>
    <li v-for="(item, key, index) in obj" :key="item.id">{{ `${index}:${key}-${item}` }}</li>
  </ul>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      arr: [
        {id: 'A', value: 'a'},
        {id: 'B', value: 'b'},
        {id: 'C', value: 'c'}
      ],
      obj: {
        X: 'x',
        Y: 'y',
        Z: 'z'
      }
    }
  }
}
</script>
```

![](https://img-blog.csdnimg.cn/a84b19253e344c6ca8623d786015f245.png)



----

### v-on

类型：`Function | Inline Statement | Object`

简写：`@`

功能：为元素绑定事件

修饰符：

- `.stop`：阻止事件冒泡

- `.prevent`：阻止事件默认行为

- `.self`：仅点击元素本身触发

- `.once`：事件仅可触发一次

- `capture`：事件触发从包含该元素的顶层开始往下触发，与冒泡相反

- `.passive`：滚动事件延迟，防止频繁触发 onscroll 事件

- `.native`：将 vue 组件转化为普通 html 元素，使其可以在组件上绑定事件

- `.left`：左键点击触发
- `.right`：右键点击触发
- `.middle`：中键点击触发

> 如果需要传参，写成 `@事件="函数名()"` 的方式，如果不需要则直接写成 `@事件="函数名"` 即可

```html
<template>
  <div>
    <button v-on:click="eve('A')">按钮A</button>
    <button @click="eve('B')">按钮B</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      info: '点击信息'
    }
  },
  methods: {
    eve (type) {
      alert(type + this.info)
    }
  }
}
</script>
```

![](https://img-blog.csdnimg.cn/ba44510922a84a7db883b6bbabaaa9be.png)





-----

### v-bind

类型：`any (with argument) | Object (without argument)`

功能：设置标签属性

简写：`:`

修饰符：

- `.prop`：禁止暴露自定义属性，防止开发者模式查看
- `.sync`：

> v-bind 是单向数据绑定，即只能 data 决定属性，更改属性不能更新 data

```html
<template>
  <img v-bind:src="imgUrl" />
  <img :src="imgUrl" />
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      imgUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
    }
  }
}
</script>
```



----

### v-model

类型：根据表单控件类型决定

功能：在表单控件或者组件上创建双向绑定，只能在 `<input>` 、`<select>`、`<textarea>` 标签中使用，因为如果不存在输入则无法反向影响 data

> 双向绑定指更改表单属性及 data 对象属性中的任意一个，都会同步更新另外一个
>
> 设置 v-model 会忽略表单元素的 `value` 、`checked` 、`selected` 属性
>
> v-model 可以写成 `v-model:value(或其他属性)="xxx"` 形式，也可以简写为 `v-model="xxx"` 让引擎自动判断

修饰符：

- `.lazy`：默认在 input 事件触发后数据同步，添加该修饰符可以在 change 事件后才同步
- `.number`：将输入的值自动转为数值类型
- `.trim`：自动过滤输入的首尾空白符

```html
<template>
  <div>
    <input type="text" v-model="info"/>
    <p>{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      info: '表单文字'
    }
  }
}
</script>
```

![](https://img-blog.csdnimg.cn/f383244331cd449e8e260f9b318a1646.gif#pic_center)

