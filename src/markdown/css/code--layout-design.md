## 布局设计

### 自适应布局

一般使用 flex 布局实现自适应布局：如实现左侧布局固定 300px，右侧自适应

```html
<div class="container">
  <div class="left"/>
  <div class="main"/>
</div>
```

```css
.container {
  display: flex;
  
  .left {
    flex-basis: 300px;
    flex-shrink: 0;		/* 为了防止main过大挤压left，需要禁止挤 */
  }
  
  .main {
    flex-grow: 1;
  }
}
```



----

### 居中方式

**水平居中**

```html
<div className='father'>
  <div className='child' />
</div>
```

> 对于行内元素或行内块级元素：直接设置 `text-align` 即可

```css
.father {
  text-align: center;		
  
  .child {
    display: inline;
  }
}
```

> 对于确定自身宽度的块级元素：可以利用 margin 的特性实现水平居中，但是这种方式子元素的宽度实际上是占满父元素的，因为有 margin 值

```css
.father {  
  .child {
    witth:50px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

> 对于未知宽度的块级元素：可以利用 table 特性实现水平居中（上下为 auto 时不会垂直居中）

```css
.father {
  .child {
    display: table;
    margin: auto;
  }
}
```

---------
 **垂直居中**

> 使用 ` vertical-algin: middle`：将父类设置为 `table`，子类设置成 `table-cell`，就可以使用表格的 `vertical-align` 属性实现垂直居中

```css
.father {
  display: table;
   
  .child {
    display: table-cell;
    vertical-align: middle;
  }
}
```

---

**水平垂直居中**

> 对于确定自身宽高的元素：使用坐标移动的方法，使用 left 将自身移动到距父元素宽度一半的位置，因此此时元素最左边在父元素中点，只要再向左移动自身宽度一般则自身中心在父元素中点，实现左右居中，上下同理，图为移动前的位置

```css
.father {
  position: relative;
    
  .child {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    /* 在屏幕坐标系x、y轴移动自身长度的-50%，即向左和向上移动（屏幕坐标系左上角为原点） */
    transform: translate(-50%, -50%);   
    border: solid 1px red;
  }
}
```

![](https://img-blog.csdnimg.cn/20200522095947825.png)

> 对于确定自身宽高的元素：使用 margin 特性，当设置 `left: 0`，`right: 0` 时，`margin:auto` 就会撑满左右两边以此达到距父元素左右 0 的情况，达到水平居中，上下同理
>
> 自身有宽高度时，使用 `margin:auto` 可以水平居中，但是要垂直居中必须要设置 `top:0` 和 `bottom:0` 才可以

```css
.father {
  position: relative;
    
  .child {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
```

> 对于未知自身宽高的元素：使用 flex 布局及 flex 属性

```css
.father {
  display: flex;
  justify-content: center;	 /* 实现水平居中 */
	
  .child {
    align-self: center; 	   /* 实现垂直居中  或者父元素内定义align-items:center也可以 */
  }
}
```

> 对于未知自身宽高的元素：使用 flex 布局及 auto 特性

```css
.father {
  display: flex;	
   
  .child {
    margin: auto;      
  }
}
```



---

### 元素隐藏

控制元素隐藏有以下几种方法：

- `display: none`：元素文档流消失

- `visibility: hidden`：元素隐藏，文档流保持不动
- `opacity: 0`：元素隐藏透明度为 0，文档流保持不动
- `transform: scale(0)`：元素缩放至0，文档流保持不动，即使元素缩放，其文档流所占大小和位置是不变的

结构：

- `display: none`：会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击
- `visibility: hidden`：不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
- `opacity: 0`：不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：

- `display: none`：非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示
- `opacity: 0`：非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示

- `visibility: hidden`：属性，子孙节点消失由于继承了hidden，通过设置 `visibility: visible` 可以让子孙节点显示

性能：

- `displaynone`：修改元素会造成文档回流，性能消耗较大
- `visibility:hidden`：修改元素只会造成本元素的重绘，性能消耗较少
- `opacity: 0`： 修改元素会造成重绘，性能消耗较少



-----

### 块状并排

默认情况下块状元素会独占一行，有以下方式可以让多个块状元素并排：

- 切换为行内元素或者行内块状元素（注意：A、B若想并排，需要同时设置A、B，只设置任意一个都不行）
- 使用 flex 布局
- 两个都设置为 `float:left`



-----

### 文字自动换行

块状元素在确定宽度的情况下，如果内容文本超过该宽度，默认有有两种情况：

- 如果是汉字：超过文字部分另起新行
- 如果是数字或者字母：超过宽度部分先看字符串中是否有空格，空格后的另起一行

> 这是因为默认情况下，一个单词不会进行换行处理，而每一个汉字在浏览器中都相当于一个单词，因此每个汉字可以另外分行

```html
<head>
  <style>
    div {
      width: 100px;
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <div class="containerA">
    111111111111111111111111111
  </div>
  <div class="containerB">
    呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵
  </div>
  <div class="containerC">
    111111 22222 33333 44444444 5555555555555555
  </div>
</body>
```



----

### 内容撑宽

如果想要实现一个容器的宽度随着内容宽度变化，有以下方式：

- 给父元素设置行内块元素显示：`display:inline-block`（只给子元素设置无法实现功能）
- 父元素设置对定位：`position:absolute`
- 父元素设置浮动：`float:left`
- 父元素设置 fle x布局：`display:flex`（待确认，目前只确认高度撑开）



-----

### 固定宽高比

实现一个元素在未知自身宽高的情况下实现自身宽高比

> 利用 `padding` 在设定 % 值时，无论高宽都是选择父元素的宽度来做相对值的特性

```css
/* 子和父宽度一样，子高度由padding-top或padding-bottom撑开，是父元素的40%，因此可以实现宽高比为5:2 */
.child {
  padding-bottom: 40%;
}
```



---

### 
