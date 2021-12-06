## 元素事件

### 内置事件

| 内置方法    | 触发时机               | 支持元素                                     |
| :---------- | :--------------------- | :------------------------------------------- |
| onabort     | 图像加载时被中断       | img、object                                  |
| onblur      | 元素失去焦点           | button、input、label、select、textarea、body |
| onchange    | 用户改变域的内容       | input、select、textarea                      |
| onclick     | 鼠标点击某个对象       | 大部分                                       |
| ondblclick  | 鼠标双击某个对象       | 大部分                                       |
| onerror     | 加载图像时发生某个错误 | image、object                                |
| onfocus     | 元素获得焦点           | button、input、label、select、textarea、body |
| onkeydown   | 某键盘键被按下         | 所有表单元素、body                           |
| onkeypress  | 某键盘键按下后释放     | 所有表单元素、body                           |
| onkeyup     | 某键盘键被松开         | 所有表单元素、body                           |
| onload      | 文档或图像加载完毕     | body、frameset、iframe、img、object          |
| onmousedown | 某个鼠标按键被按下     | 大部分                                       |
| onmousemove | 鼠标被移动             | 大部分                                       |
| onmouseout  | 鼠标从某元素移开       | 大部分                                       |
| onmouseover | 鼠标被移动到某元素上   | 大部分                                       |
| onkeyup     | 某个鼠标按键被松开     | 大部分                                       |
| onreset     | 表单被重置             | form                                         |
| onresize    | 窗口或框架被调整尺寸   | body、frameset、iframe                       |
| onselect    | 文本被选定             | input、textarea                              |
| onsubmit    | 表单被提交             | form                                         |
| onunload    | 卸载文档或框架集       | body、frameset、iframe                       |



-----

### 添加事件

**绑定事件**

静态绑定事件（把脚本直接作为属性值直接赋给事件属性）

```html
<button onclick="alert('你单击了一次');">按钮</button>
```

动态绑定事件（直接为页面元素附加事件 不破坏HTML结构 灵活）

```html
<body>
  <button id="btn">按钮</button>
    
  <script>
    var button = docunment.getElementById("btn");
    button.onclick = function(){
      alert("你单击了一次");
    }
  </script>
</body>    
```

**注册事件（优先使用）**

注册：`addEventListener(type, listener, useCapture)`

- `type: string`：注册事件的类型名，与事件属性不同，事件类型名没有事件属性名 on 的前缀，如事件属性 onclick 的事件类型为 click
- `listenner: Function`：监听函数，事件处理函数，在指定类型的事件发生时调用该函数，调用该函数时，默认传递给它的唯一参数是Event对象
- `useCapture: boolean`：如果为ture，则指定的事件处理函数将在事件传播的捕获阶段触发，如果为 false 则事件处理函数将在冒泡阶段触发

> 可以为多个对象注册相同的事件处理函数，也可以为同一个对象注册多个事件处理函数（要求事件类型不一样）

注销：`removeEventListener(type, listener, useCapture)`

> 销毁条件：
>
> - 只能注销 `addEventListener()` 注册的事件，直接写在元素属性上的事件无法删除
> - 注销事件的 `listener` 必须和注册时的函数完全一样，因此如果使用匿名函数则无法生效

``` js
function fn () {
  console.log('ok')
}

document.querySelector('body').addEventListener('click', fn)
document.querySelector('body').removeEventListener('click', fn)
```



------

### 事件机制

默认事件执行顺序：捕获 → 冒泡 → 默认事件

```tsx
<ul>
  <li>
    <a href="https://www.bilibili.com">哔哩哔哩</a>
  </li>
</ul>

const ul = document.querySelector('ul')
const li = document.querySelector('li')
const a = document.querySelector('a')
```

触发事件时，捕获阶段父元素开始传递给子元素，冒泡阶段由子元素传递给父元素，而事件默认在冒泡阶段执行，因此正常的执行顺序是子元素事件 → 父元素事件

```tsx
// >事件执行：点击超链接 → 弹窗a → 弹窗li → 弹窗ul → 超链接跳转
a.onclick = (event) => {
  alert('a的事件')
}

li.onclick = (event) => {
  alert('li的事件')
}

ul.onclick = (event) => {
  alert('ul的事件')
}
```

如果使用 `addEventListener()` 添加事件，则可以控制事件再捕获阶段就执行

```tsx
// >事件执行：点击超链接 → 弹窗ul → 弹窗li → 弹窗a → 超链接跳转
a.addEventListener('click', (event) => {
  alert('a的事件')
}, true)

li.addEventListener('click', (event) => {
  alert('li的事件')
}, true)

ul.addEventListener('click', (event) => {
  alert('ul的事件')
}, true)
```

-----

**阻止行为**

有三种方式可以阻止其冒泡或默认事件的行为

> 现在用 `event.preventDefault()` 代替 `return false`

| 方式                      | 事件冒泡 | 默认事件 |
| :------------------------ | :------- | :------- |
| `event.stopPropogation()` | 不冒泡   | 执行     |
| `event.preventDefault()`  | 冒泡     | 不执行   |
| `return false`            | 冒泡     | 不执行   |

```tsx
// >事件执行：点击超链接 → 弹窗a → 超链接跳转
a.onclick = (event) => {
  alert('a的事件')
  event.stopPropagation()
}
```

```tsx
// >事件执行：点击超链接 → 弹窗a → 弹窗li → 弹窗ul
a.onclick = (event) => {
  alert('a的事件')
  event.preventDefault()
}
```

```tsx
// >事件执行：点击超链接 → 弹窗a → 弹窗li → 弹窗ul
a.onclick = (event) => {
  alert('a的事件')
  return false
}
```

-------

**事件委托**

事件委托主要利用的就是事件捕获冒泡的机制

```tsx
window.onload = function() {
  document.getElementById("div").addEventListener("click", function() {
    let eTarget = event.target
    switch(eTarget.id) {
      case "div1":
        console.log("点击的div1")
        break
      case "div2":
        console.log("点击的div2")
        break
      case "div3":
        console.log("点击的div3")
        break
    }
    event.stopPropagation()
  })
}
```

