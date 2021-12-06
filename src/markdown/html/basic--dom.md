## 操作DOM

有以下几种 dom：

- `Document`：文档
- `Element`：元素节点，如 `<html> <head> <body> <p> <h1>` 等
- `Text`：文本节点，如 `<html> <head> <body> <ul>` 等结构元素不会直接包含任何文本节点
- `Attribute`：属性节点 如 `<img src="images/1.gif" title="个人相册" />` 的 title 就是属性节点

> 一般而言，元素节点内部都会默认包含一个文本节点，如 `<ul></ul>` 包含一个元素节点 `ul` 和一个文本节点 `text`，文本内容为 null 
>
> 如果是 `<ul><li></li></ul>` 则会有两个文本节点，分别来自于 `ul` 和 `li`

**Node和Element的区别**

Element 继承于 Node，因此元素一定是节点，而节点不一定是元素

```tsx
console.log(document.body instanceof Element)    // true
console.log(document.body instanceof Node)       // true
```



--------

### 获取元素

**document.getElementById (id)**

- 功能：根据元素 id 获取元素节点
- 参数：
  - `id: string`：元素 id
- 返回：`element`，满足条件元素

----

**document.querySelector (selector)**

- 功能：根据选择器获取第一个满足条件的元素
- 参数：
  - `selector: string`：选择器
- 返回：`element`，满足条件元素

-----

**document.getElementsByClassName (class)**

- 功能：根据 class 获取所有足条件的元素
- 参数：
  - `class: string`：元素类名
- 返回：`HTMLCollection`，满足条件类数组对象

------

**document.getElementsByTagName (tag)**

- 功能：根据元素标签名获取所有足条件的元素
- 参数：
  - `tag: string`：元素标签名
- 返回：`HTMLCollection`，满足条件类数组对象

``` tsx
<div id="container" class="container">
	<div>内容</div>
</div>

// 完全相等
document.getElementById('container')
document.querySelector('.container')
document.getElementsByClassName('container')[0]
document.getElementsByTagName('div')[0]
```



-------

### 元素属性

#### 层级

```html
<ul>
  <li class="a">A</li>
  <li class="b"><p>B</p></li>
  <li class="c"><div>C</div></li>
  <li class="d"></li>
</ul>
```

**elemet.parentNode**

- 功能：获取当前元素的父节点
- 返回：`element`，父节点

```tsx
const element = document.querySelector('p')
console.log(element.parentNode)      // <li></li>
```

-----

**elemet.parentElement**

- 功能：获取当前元素的父元素
- 返回：`element`，父元素

> 一般情况下 `parentElement 和 parentNode` 结果完全相同，但是也有特例，如根节点 `document` 并不是元素，无法用 `parentElement` 拿到

```tsx
const element = document.querySelector('p')
console.log(element.parentElement)         // <li></li>
```

**elemet.children**

- 功能：获取当前元素的所有子元素节点（不包括孙节点）
- 返回：`HTMLCollection`，所有子元素节点的类数组对象

```tsx
const element = document.querySelector('ul')
console.log(Array.from(element.children))         // [li, li, li]
```

-----

**elemet.childNodes**

- 功能：获取当前元素的所有节点，包括文本节点（不包括孙节点）
- 返回：`HTMLCollection`，所有子节点的类数组对象

```tsx
const element = document.querySelector('ul')
console.log(Array.from(element.childNodes))         // [text, li, text, li, text, li, text]
```

-----

**elemet.firstElementChild**

- 功能：获取当前元素的首个子元素
- 返回：`element`，首个子元素

```tsx
const element = document.querySelector('ul')
console.log(element.firstElementChild === element.children[0])    // true
```

-----

**elemet.firstElementChild**

- 功能：获取当前元素的末尾子元素
- 返回：`element`，末尾子元素

```tsx
const element = document.querySelector('ul')
console.log(element.children[element.children.length-1] == element.lastElementChild)    // true
```

-----

**elemet.previousElementSibling**

- 功能：获取当前元素上一个兄弟元素
- 返回：`element`，上一个兄弟元素

```tsx
const element = document.querySelector('.b')
console.log(element.previousElementSibling)   // <li class="a"></li>
```

-----

**elemet.nextElementSibling**

- 功能：获取当前元素下一个兄弟元素
- 返回：`element`，下一个兄弟元素

```tsx
const element = document.querySelector('.b')
console.log(element.nextElementSibling)   // <li class="c"></li>
```

------

**elemet.haschildNodes ()** 

- 功能：判断当前元素是否有子节点
- 参数：无
- 返回：`boolean`，判断结果

```tsx
let element = document.querySelector('.a')
console.log(element.hasChildNodes())          // true

element = document.querySelector('.d')
console.log(element.hasChildNodes())          // false，text节点无内容则算无子节点
```



-----

#### 增删

**document.createElement (nodeName)**

- 功能：创建指定节点元素
- 参数：
  - `nodeName: string`：节点名称
- 返回：`element`，创建的元素

> 创建元素后需要插入一个父元素中才算在 dom 树中存在

```tsx
const element = document.createElement('div')  
document.body.appendChild(element)     // 添加到<body></body>中
```

-----

**element.appendChild (node)**

- 功能：将一个节点插入指定元素的子元素末尾
- 参数：
  - `node: Node`：节点
- 返回：`element`，插入的节点

```tsx
<ul>
  <li class="a">A</li>
</ul>

const element = document.createElement('div')  
document.querySelector('ul').appendChild(element)

/* 
<ul>
  <li class="a">A</li>
  <div></div>
</ul>
*/
```

----

**element.insertBefore (node, targetNode?)**

- 功能：将一个节点插入指定元素的指定子节点之前
- 参数：
  - `node: Node`：插入的节点
  - `targetNode?`：指定元素的子节点，如果不赋值则插入到末尾
- 返回：`element`，插入的节点

```tsx
<ul>
  <li class="a">A</li>
</ul>

const element = document.createElement('div')  
document.querySelector('ul').insertBefore(element, document.querySelector('.a'))

/* 
<ul>
  <div></div>
  <li class="a">A</li>
</ul>
*/
```

**element.removeChild (node)**

- 功能：删除一个元素中的指定子节点
- 参数：
  - `node: Node`：节点
- 返回：`element`，删除的子节点

```tsx
<ul>
  <li class="a">A</li>
</ul>

const element = document.querySelector('ul')
element.removeChild(document.querySelector('.a'))

/* 
<ul></ul>
*/
```

------

**element.replaceChild (node, targetNode)**

- 功能：用指定节点替换元素中的目标子节点
- 参数：
  - `node: Node`：替换的节点
  - `targetNode`：指定元素的子节点
- 返回：`element`，被替换的节点

```tsx
<ul>
  <li class="a">A</li>
</ul>

const element = document.querySelector('ul')
const newElement = document.createElement('div')  
element.replaceChild(newElement, document.querySelector('.a'))

/* 
<ul>
	<div></div>
</ul>
*/
```



-------

#### 属性

**element.nodeName**

- 功能：返回节点名
- 返回：`string`，节点名
  - 元素节点：返回值为标签名称（大写字母）
  - 属性节点：返回值为属性的名称
  - 文本节点：返回值永远是 `#text` 标识符
  - 文档节点：返回值永远是 `#document` 标识符

```tsx
console.log(document.body.nodeName)   // BODY
```

-----

**element.nodeType**

- 功能：返回节点类型
- 返回：`number`，节点类型
  - 1：元素节点
  - 2：属性节点
  - 3：文本节点
  - 8：注释节点
  - 9：文档节点

```tsx
console.log(document.body.nodeName)   // 1
```

-----

**element.getAttribute (props)**

- 功能：获取元素上指定 props 的值
- 参数：
  - `props: string`：指定 props 属性
- 返回：`string`，props 的值

```tsx
<ul>
  <li style="background-color: red;"></li>
</ul>

const element = document.querySelector('li')
console.log(element.getAttribute('style'))      // background-color: red;
```

----

**element.setAttribute (props, value)**

- 功能：设置元素上指定 props 的值（覆盖原值）
- 参数：
  - `props: string`：指定 props 属性
  - `value: string`：
- 返回：无

```tsx
const element = document.querySelector('li')
console.log(element.setAttribute('style', 'background-color: black;'))
```

----

**element.removeAttribute (props)**

- 功能：删除元素上指定 props 的值
- 参数：
  - `props: string`：指定 props 属性
- 返回：无

```tsx
const element = document.querySelector('li')
console.log(element.removeAttribute('style'))
```

-----

**element.className**

- 功能：返回元素 class 属性的值
- 返回：`string`，class 的 value

```tsx
<ul>
  <li class="a b c"></li>
</ul>

const element = document.querySelector('li')
console.log(element.className)      // a b c
```

-----

**element.classList**

- 功能：返回元素所有类名
- 返回：`DOMTokenList`，类数组对象

```tsx
<ul>
  <li class="a b c"></li>
</ul>

const element = document.querySelector('li')
console.log(Array.from(element.classList))      // ['a', 'b', 'c']
```

> DOMTokenList 方法：

- `add(...class)`：为元素添加一个或多个类名，如果指定的类名已存在，则不会添加

  ```tsx
  const element = document.querySelector('li')
  element.classList.add('calss-a', 'calss-b')
  ```

- `contains(class)`：判断是否含有指定类名

  ```tsx
  const element = document.querySelector('li')
  
  if(element.classList.contains('calss-a')) {
    alert('包含此类名')
  }
  ```

- `remove(.class)`：移除元素的一个或多个类名

  ```tsx
  const element = document.querySelector('li')
  element.classList.remove('calss-a', 'calss-b')
  ```

  

---

### 元素范围

#### 滚轮与视口

每个HTML元素都具有 `clientHeight` 、`offsetHeight` 、`scrollHeight` 、`offsetTop` 、`scrollTop` 这5个和元素高度、滚动、位置相关的属性（以高度为例，宽度如 clientWidth 同理）

**clientHeight、offsetHeight**

这两个属性和元素的滚动、属性没有关系，它代表的是元素的高度

- clientHeight：

  - 包括 padding 但不包括 border、水平滚动条、margin 的元素的高度

  - 对于 inline 的元素这个属性一直是 0，单位px，只读元素

- offsetHeight：

  - 包括 padding、border、水平滚动条，但不包括 margin 的元素的高度

  - 对于inline的元素这个属性一直是 0，单位 px，只读元素

-----

**scrollHeight 、offsetTop、scrollTop**

和滚动情况有关，当本元素的子元素比本元素高且 `overflow=scroll` 时，本元素会出现滚动条

- scrollHeight：

  - 代表包括当前不可见部分的元素的高度，单位 px，只读元素
  - 可见部分的高度其实就是 `clientHeight`，也就是 `scrollHeight>=clientHeight` 恒成立
  - 在有滚动条时讨论 `scrollHeight` 才有意义，在没有滚动条时 `scrollHeight==clientHeight` 恒成立

- scrollTop：

  - 代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度，单位px，可读可设置
  - 在没有滚动条时 `scrollTop==0` 恒成立

- offsetTop: 

  - 当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系，单位px，只读元素

---

**如果要获取页面范围**

- 网页可见区域高：`document.documentElement.clientHeight`

- 网页正文全文高：`document.documentElement.scrollHeight`
- 网页可见区域高（包括边线的高）：`document.documentElement.offsetHeight`
- 网页被卷去的高：`document.documentElement.scrollTop`
- 屏幕分辨率高：`window.screen.height`



---

#### 视口元素

> http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

```
常见使用场景：图片懒加载，在未滑动到图片范围的时候不加载图片，判断图片进入视口范围后开始加载
```

有很多种实现方式，目前最简单的是一个已经封装好的 API —— `IntersectionObserver`（交叉观察），一个浏览器原生提供的构造函数

```tsx
// callback是可见性变化时的回调函数，option是配置对象（该参数可选）
var io = new IntersectionObserver(callback, option);
```

构造函数的返回值是一个观察器实例。实例的 `observe` 方法可以指定观察哪个 DOM 节点

```tsx
// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

如果要观察多个节点，就要多次调用这个方法

```tsx
io.observe(elementA);
io.observe(elementB);
```

目标元素的可见性变化时，就会调用观察器的回调函数`callback`，`callback`一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）

```tsx
// entries 是一个数组，每个成员都是一个IntersectionObserverEntry对象
// 如果同时有两个被观察的对象的可见性发生变化，entries 数组就会有两个成员
var io = new IntersectionObserver(
    entries => {
        console.log(entries);
    }
);
```

`IntersectionObserverEntry `对象提供目标元素的信息，一共以下属性

- time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- target：被观察的目标元素，是一个 DOM 节点对象
- rootBounds：根元素的矩形区域的信息，`getBoundingClientRect()` 方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 `null`
- boundingClientRect：目标元素的矩形区域的信息
- intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
- intersectionRatio：目标元素的可见比例，即 `intersectionRect`占 `boundingClientRect` 的比例，完全可见时为 `1`，完全不可见时小于等于 `0`
- isIntersecting：目标是否可见
- isVisible：目标是否隐藏

![](https://img-blog.csdnimg.cn/20201125042753709.png)

![](https://upload-images.jianshu.io/upload_images/4060631-dfe6e9f2e933ae23.png)

```html
<body>
  <div id="a"></div>
  <div id="b"></div>
  <div id="c"></div>
</body>
```

```tsx
var io = new IntersectionObserver(
  entries => {
    entries.forEach(i => {
      console.log(i.time);
      console.log(i.target);
      console.log(i.intersectionRatio);
      console.log(i.rootBounds);
      console.log(i.boundingClientRect);
      console.log(i.intersectionRect);
      })
  },
  {
        /* Using default options. Details below */
  }
)

// 观察的对象有两个，因此上面entries数组的长度为2
io.observe(document.querySelector('#a'));
io.observe(document.querySelector('#b'));
```

`IntersectionObserver`构造函数的第二个参数是一个配置对象。它可以设置以下属性

- threshold：决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（`intersectionRatio`）达到0时触发回调函数

  ```tsx
  // 表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数
  new IntersectionObserver(
    entries => {/* ... */}, 
    {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }
  )
  ```

- root：指定目标元素所在的容器节点（即根元素），容器元素必须是目标元素的祖先节点

- rootMargin：定义根元素的`margin`，用来扩展或缩小 `rootBounds`这个矩形的大小，从而影响 `intersectionRect` 交叉区域的大小

  ```js
  // 很多时候，目标元素不仅会随着窗口滚动，还会在容器里面滚动，容器内滚动也会影响目标元素的可见性，因此有必要进行额外设置
  var opts = { 
    root: document.querySelector('.container'),
    rootMargin: "500px 0px" 
  }
  
  var observer = new IntersectionObserver(
    callback,
    opts
  )
  ```

**实现图片懒加载**

html标签处理，将图片的真实url设置为自定义属性 `data-src` ，而`src`属性为占位图（下面代码中是一个文件很小的loading的动画gif），当元素可见时候用 data-src  的内容替换 src，从而达到懒加载

```js
<div class="img"><img data-src="https://gtd.alicdn.com/sns_logo/i1/TB17LgBNFXXXXaSXVXXSutbFXXX.jpg_240x240xz.jpg" src="https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif">
```

```tsx
// 实例化 默认基于当前视窗
const io = new IntersectionObserver(callback)  

let ings = document.querySelectorAll('[data-src]')

function callback(entries){  
  entries.forEach((item) => { 
    if(item.isIntersecting){                     // 当前元素可见
      item.target.src = item.target.dataset.src  // 替换src
      io.unobserve(item.target)                  // 停止观察当前元素 避免不可见时候再次调用callback函数
    }   
  })
}

// io.observe接受一个DOM元素，添加多个监听 使用forEach
imgs.forEach((item)=>{  
  io.observe(item)
})
```

**实现无限滚动**

无限滚动时，最好在页面底部有一个页尾栏一旦页尾栏可见，就表示用户到达了页面底部，从而加载新的条目放在页尾栏前面，这样做的好处是，不需要再一次调用`observe()`方法，现有的`IntersectionObserver` 可以保持使用

```tsx
var intersectionObserver = new IntersectionObserver(
  function (entries) {
    // entries[0]代表页尾栏元素，如果不可见，就返回，如果可见就继续请求数据
    if (!entries[0].isIntersecting) return
    loadItems(10)	// 这里指的是重新去请求10条数据的方法
    console.log('Loaded new items')
  });

// 开始观察
intersectionObserver.observe(
  document.querySelector('.scrollerFooter')
);
```



-----



