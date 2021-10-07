## 概念性

### BFC

块级格式化上下文（BFC）属于普通流定位方案，在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素绝对不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性

**只要元素满足下面任一条件即可触发 BFC 特性：**

- `body `根元素
- `浮动元素`：float 除 none 以外的值
- `绝对定位元素`：position (absolute、fixed)
- `display` ：为 inline-block、table-cells、flex
- `overflow` ：除了 visible 以外的值 (hidden、auto、scroll)

**特性**

- 同一个BFC下的元素，margin 会发生重叠（上下的margin会发生重叠，左右一般不会）
- BFC 可以包含浮动的元素（清除浮动）
- BFC 可以阻止元素被浮动元素覆盖

```jsx
// margin会发生重叠，间隔只有100px而非200px
<body>
  <div></div>
  <div></div>
</body>

div{
  margin: 100px;
}
```

> 可以放在不同的BFC容器中达到上下 margin 不重叠的情况

```jsx
// 两个div设置了overflow: hidden，因此分别是两个BFC容器
<div class="container">
  <p></p>
</div>
<div class="container">
  <p></p>
</div>

.container {
  overflow: hidden;    
  p {
    margin: 100px;
    }
}
```



----

### 布局种类

- 静态布局：即传统Web设计，网页上的所有元素的尺寸一律使用px作为单位。不管浏览器尺寸具体是多少，网页布局始终按照最初写代码时的布局来显示

- 流式布局：页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。这就导致如果屏幕太大或者太小都会导致元素无法正常显示

- 自适应布局：分别为不同的屏幕分辨率定义布局，即创建多个静态布局，每个静态布局对应一个屏幕分辨率范围

- 响应式布局：分别为不同的屏幕分辨率定义布局，同时，在每个布局中，应用流式布局的理念，即页面元素宽度随着窗口调整而自动适配



----

### 盒子模型

一个 div 盒子分为四大块范围，由内向外：

- content（内容框）
- padding（内边框、内边距）
- border（边框）
- margin（外边距）

height 和 width 的范围：

- 标准盒子模型：不包含 margin、border、padding
- IE盒子模型：包含 padding 和border，不包含 margin

```less
box-sizing: border-box;		// 标准模型
box-sizing: content-box;	// IE模型
```

margin 的范围：

- 块元素上下排列时，margin的范围是公用的，取两个magin中最大的那个
- 块元素左右排列时，margin范围为两者叠加



----

### 行内/块状元素

**inline（行内元素）:**

- 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行
- 默认情况下，行内元素只能包含文本和其他行内元素
- 不能更改元素的 height，width 的值，大小由内容撑开 
- 可以使用 padding，上下左右都有效，而 margin只有left和right产生边距效果，top 和 bottom 不行

**block（块级元素）:**

  - 使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度
  - 能够改变元素的 height，width 的值
  - 可以设置 padding，margin 的各个属性值，top，left，bottom，right 都能够产生边距效果

**inline-block（行内块元素）:**

- 如果没有设置宽高，则由自身内容撑开
- 两个兄弟块元素如果想设置在同一行，则应该两个元素都应该设置 `display:inline-block`
- padding 和 margin 都可以生效

> 块状元素的定位是以左上角为准的 
> 块状元素居中是左上角的在中间 
> 所以此时要响应地去减掉自度宽高度，实现整体在中间



------

### 基本单位

| 值   | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| px   | 像素，绝对单位，不会因为其他元素的尺寸变化而变化，页面按照精确像素展示 |
| em   | 值并不是固定的，会继承父级元素的字体大小                     |
| rem  | 相对单位，相对根节点 html 的字体大小来计算                   |
| vw   | 视窗宽度（1vw 表示 1% 的视窗宽度                             |
| vh   | 视窗高度                                                     |
| vmin | vw 和 vh 中较小的那个                                        |
| vmax | vw 和 vh 中较大的那个                                        |
| pt   | 磅，绝对单位，是物理长度单位                                 |
| in   | 英寸，绝对单位，是物理长度单位                               |
| ch   | 数字0的宽度, 1ch 就是数字 0 的宽度                           |

------

### 简写标准

四个方向都设置，简写顺序为：上、右、下、左

```less
// 上下相等，左右不等 : 不可简写
margin: 1px 2px 3px 4px;
margin: 1px;              // 四个方向都相等
margin: 1px 2px;          // 上下相等，左右相等，简写顺序为：上下、左右
margin: 1px 2px 3px;      // 上下不等，左右相等，简写顺序为：上、下、左右
```



----

### 基线

在各种内联相关模型中，凡是涉及到垂直方向的排版或者对齐的，都离不开最最基本的基线(baseline)。其他中线顶线一类的定义也离不开基线

 **作为父元素的块级元素基线（baseline）**

块级元素如果只有一行的内容,那么就以字母x的底部作为基线
当有多行内容时，每行都有一个基线，两个相邻基线间的距离就是行高
![](https://img-blog.csdnimg.cn/201811301917074.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTM1MDIyNQ==,size_16,color_FFFFFF,t_70)

----

### 兼容性

为了让不同浏览器都能进行渲染需要加上前缀，如`-moz-border-top-colors`

| 浏览器分类      | 浏览器            | 私有属性前缀 |
| --------------- | ----------------- | ------------ |
| Gecko引擎内核   | Mozilla           | -moz-        |
| Presto引擎内核  | Opera             | -o-          |
| KHTML引擎内核   | Konqueror         | -khtml-      |
| Trident引擎内核 | Internet Explorer | -ms-         |

