## 选择器

### 基本选择器

| 选择器              | 类型       | 功能                                     |
| ------------------- | ---------- | ---------------------------------------- |
| *                   | 通配选择器 | 选择所有元素                             |
| E                   | 元素选择器 | 选择指定元素                             |
| #id                 | ID选择器   | 选择指定ID元素                           |
| .class              | 类选择器   | 选择指定类名元素                         |
| selector1,selectorN | 群组选择器 | 使用逗号分隔，将各选择器选择的元素集合并 |

```markdown
内联样式权值：1000
ID选择器权值：100
类选择器权值：10
元素选择器权值：1
通用选择器（*）和其他选择器（如子选择器 > ）权值都为0
```

> 当多个选择器不用空格而直接连着写时，表示且的意思，同时满足所有条件生效

```tsx
// 如要选用一个元素中含有的一个类时 用a.choose表示满足a元素且类名为choose，不要空格（a .choose）否则就是选择a的子类 
<a className='choose'></a>
```



-----

### 层次选择器

| 选择器 | 类型                  | 功能                                             |
| ------ | --------------------- | ------------------------------------------------ |
| E    F | 后代选择器/包含选择器 | 选择E元素的子元素F（包括F满足条件的所有F子元素） |
| E > F  | 子选择器              | 选择E元素的子元素F元素（不包括F子元素）          |
| E + F  | 相邻兄弟选择器        | 选择紧位于E元素后的F元素（不包括F子元素）        |
| E ~ F  | 通用选择器            | 选择位于E元素后的所有F元素（不包括F子元素）      |

> 后代选择器和子选择器的区别：

```html
<ul>
  <li>
    <a herf='#'>一级菜单</a>
      <a>一级菜单</a>
      <div>
        <a>二级菜单</a>
        <a>二级菜单</a>
      </div>
  </li>
</ul>
```

```css
/* li内的所有a标签都变为红色了 */
ul li a {
  color:red;
}

/* 只有一级菜单的a标签变为蓝色，二级的不受影响 */
ul li > a {
  color:blue;
}
```



-----

### 属性选择器

| 选择器        | 功能                                                         |
| ------------- | ------------------------------------------------------------ |
| E[attr]       | 选择匹配具有属性attr的E元素（E可省略，表示匹配任意具有attr属性的元素） |
| E[atrr=val]   | 选择具有属性attr且值为val的E元素（E可省略）必须完全匹配（a[class="links"]匹配不到<a class="links inem"></a>，必须a[class="links item"]） |
| E[attr\|=val] | 选择具有属性attr且值为val或以val-开头的元素E（常用与lang属性，如lang="en-us"，p[lang=en]将匹配定义为英语的任何段落，无论是英式还是美式） |
| E[attr~=val]  | 选择具有属性attr且拥有多个用空格分隔的值，其中一个值为val（如.info[title~=more]将匹配 <a class="info" tilte="click here for more"></a>） |
| E[attr*=val]  | 选择具有属性attr且属性值任意位置有val字符串的元素（如.info[title*=more]将匹配 <a class="info" tilte="abcdmoreddddd"></a>） |
| E[attr^=val]  | 选择具有属性attr且属性值以val字符串开头的元素                |
| E[attr$=val]  | 选择具有属性attr且属性值以val字符串结尾的元素                |

| 通配符 | 功能         | 示例                                                         |
| ------ | ------------ | ------------------------------------------------------------ |
| ^      | 匹配通配符   | span[class^=span]表示选择以类名以"span"开头的所有span元素    |
| $      | 匹配终止符   | a[href$=pdf]表示选择以"pdf"结尾的href属性的所有a元素         |
| *      | 匹配任意字符 | a[title*=site]匹配a元素，而且a元素的title属性值中任意位置有"site"字符的任何字符串 |

```html
<ul>
  <li><a href="http://www.w3cplus.com">w3cplus.com</a></li>
  <li><a href="home">home</a></li>
  <li><a href="a.doc">Word文档</a></li>
</ul>
```

```css
/* 匹配所有外部链接 */
a[href^=http://] {}

/* 匹配首页 */
a[href="home"] {}

/* 匹配.doc文档 */
a[href$="doc"] {}
```



-----

### 伪元素选择器

伪元素可用于定位文档中包含的文本，但无法再文档树中定位

伪元素和伪类选择器的区别：

- 伪类使用单冒号，而伪元素使用双冒号
- 伪类：用于向某些选择器添加特殊的效果
- 伪元素：用于将特殊的效果添加到某些元素
- 根本区别在于有没有创建了新的元素

| 伪元素         | 功能                                      |
| -------------- | ----------------------------------------- |
| ::first-letter | 匹配文本块的第一个字母                    |
| ::first-line   | 匹配元素的第一行文本                      |
| ::before       | 用于在css渲染中向元素逻辑上的头部添加内容 |
| ::after        | 用于在css渲染中向元素逻辑上的尾部添加内容 |
| ::selection    | 匹配突出显示的文本                        |

**::first-letter**

```css
/* 制作首字下沉 */
p:first-child::first-letter {
  float: left;
  color: #903;
  padding: 4px 8px 0 3px;
  font: 75px/60px Georgia;
}
```

**::first-line**

```css
/* 最后一个段落的第一行文字显示为红色斜体 */
p:last-child::first-line {
  font: italic 16px/18px Georgia;
  color: #903;
}
```

**::before和::after**

一般不用 `::before` 或 `::after` 展示有实际意义的内容，尽量使用它们显示修饰性内容，例如图标等元素，它们必须配合 `content  `属性来使用

一般包含两种内容：content，css样式，

- content：定义插入的内容，它必须有值（可以为空字符）
- css：css样式直接写即可，会直接作用在 content 的内容上，默认情况下伪元素为行内元素

content取值：

- 使用引号包含一段字符串，将会向元素内容中添加字符串

```css
/* 元素：<p>平凡的世界</p> */
/* 结果：《平凡的世界》 */
p::before {
  content: “《”;
  color: blue;
}

p::after {
  content: "》";
  color: blue;
}
```

如果只是想做文字前面的一个图标样式时，可以为空然后直接设置css样式即可

```less
p::before {
  content: '';
  display:inline-block;
  background-color:blue;
   height:.25em;
  margin-right:0;
}
```

- 通过attr( )调用当前元素的属性，比如将图片alt提示文字或者链接的href地址显示出来

```css
/* 元素：<a href="http://www.gegeda.online">咯咯哒</a> */
/* 结果：咯咯哒(http://www.gegeda.online) */
a::after {
  content: "("  attr(href) ")"	/* 这里搭配了字符串使用 */
}
```

- 通过url( )或uri( )引用媒体文件

```css
/* 元素：<a href="http://www,baidu.com">百度</a> */
/* 结果：[引用的图片]百度(http://ww.baidu.com) */
a::before {
  content: url("https://www.baidu.com/img/baidu.gif")
}
a::after {
  content: "("attr(href)")"
}
```

`::selection`

匹配突出显示的文本（浏览器默认情况下，框选网页文本是深蓝背景白色字体）

仅接受两个属性：background、color

```css
::selection {
  background: red;
  color: #fff;
}
```



-----

### 伪类选择器

伪类选择器都以 `:` 开头

#### 动态

并不存在于HTML中，只有用户和网站交互的时候才能体现出来

| 选择器     | 类型               | 功能                                                  |
| ---------- | ------------------ | ----------------------------------------------------- |
| E：link    | 链接伪类选择器     | 选择被定义了超链接且未被访问过的E元素（常用链接锚点） |
| E：visited | 链接伪类选择器     | 选择被定义了超链接且已被访问过的E元素（常用链接锚点） |
| E：active  | 用户行为伪类选择器 | 选择被激活的E元素（常用于链接和锚点）                 |
| E：hover   | 用户行为伪类选择器 | 选择被用户鼠标停留的E元素                             |
| E：focus   | 用户行为伪类选择器 | 选择获得焦点的E元素                                   |

-----

#### 目标

URL中包含锚点（#），如 `#contact`，则该选择器则匹配id为contact的元素

一般应用场景：

- 高亮显示区块
- 从相互层叠的盒容器或图片中突出显示其中一项
- tabs效果
- 幻灯片效果
- 灯箱效果
- 相册效果

| 选择器    | 类型           | 功能                     |
| --------- | -------------- | ------------------------ |
| E：target | 目标伪类选择器 | 选择被URL锚点指向的E元素 |

----

#### 语言

根据不同语言版本设置页面的不同字体风格

根据元素的语言编码匹配元素，这种语言信息必须包含在文档中，或者与文档关联，不能从css指定

| 选择器  | 类型           | 功能                                      |
| ------- | -------------- | ----------------------------------------- |
| E：lang | 语言伪类选择器 | 选择指定了lang属性且其值为language的元素E |

> 指定文档语言的两种方式：

```html
<!-- HTML5直接设置文档语言，当网站转译时，lang属性会动态更改为对应语言 -->
<html lang="en-US">
  
<!-- 在文档中指定lang属性 -->
<body lang="fr">
```

```css
:lang(en-US) {
  /* 设置对应css */
}

:lang(fr) {
  /* 设置对应css */
}
```

----

#### 结构

可以根据元素在文档树种的某些特性（如相对位置）定位到它们，通过文档树结构的相互关系来匹配特定元素，从而减少HTML文档对ID或类名的定义

| 选择器                  | 功能                                                         |
| ----------------------- | ------------------------------------------------------------ |
| E ：first-child         | 匹配父元素的首个子元素E（与 E：nth-child(1)作用一样）        |
| E ：last-child          | 匹配父元素的最后一个元素E（与 E：nth-last-child(1)作用一样） |
| E：root                 | 匹配元素E所在文档的根元素，在HTML文档中，根元素始终是html，此时该选择器与html元素选择器匹配内容相同 |
| E  F：nth-child(n)      | 选择父元素E的第n个子元素F，n可以为整数，关键字（even、odd），公式(2n+1、-n+5)等（n的起始值为1而不是0） |
| E  F：nth-last-child(n) | 选择父元素E的倒数第n个子元素F，与上面计算顺序相反            |
| E ：nth-of-type(n)      | 选择父元素内具有指定类型的第n个E元素                         |
| E ：nth-last-of-type(n) | 选择父元素内具有指定类型的倒数第n个E元素                     |
| E ：first-of-type       | 选择父元素内具有指定类型的第一个E元素                        |
| E ：last-of-type        | 选择父元素内具有指定类型的倒数第一个E元素                    |
| E ：only-child          | 选择E元素，该元素在父元素中是仅有的子元素                    |
| E ：only-of-type        | 选择E元素，该元素在父元素中是仅有的同类型子元素              |
| E：empty                | 选择没有子元素的元素，且该元素不包含任何文本节点             |

```html
<div>
  <ul>                <!-- div ul:only-of-type -->
    <li>one</li>      <!-- ul li:nth:child(2n+1) -->  <!-- ul li:first-child -->
    <li>two</li>      <!-- ul li:nth-child(2) -->
    <li>three</li>    <!-- ul li:nth:child(2n+1) -->  <!-- ul li:last-child -->
  </ul>
  <div>abc</div>      <!-- div div:first-of-type --> 
  <p>para</p>
  <div>def</div>      <!-- div div:last-of-type -->
  <p>para</p>         <!-- div p:nth-of-type(2) -->
  <b>ghi</b>
</div>
```

> 可以与任意选择器搭配使用，如 `.container .title:first-child` 就代表选择选择 `.container` 元素下的第一个 `.title` 元素

```markdown
n：
当n直接被指定为具体的值时，表示只选择具体值的元素（单个）

但当n保留用作与表达式时（如2n），此时会自动对n从1开始进行枚举直至元素耗尽无法选择为止（多个）
如：2n
n=0，选择第二个
n=1，选择第四个
……
因此匹配到的元素会有多个

当参数为关键字
odd：匹配所有奇数
even：匹配所有偶数
```

----

#### UI

主要用于 form 表单元素

UI 的状态一般包括：启用、禁用、选中、未选中、获得焦点、失去焦点、锁定和待机

| 选择器    | 示例           | 说明                        |
| --------- | -------------- | --------------------------- |
| :enabled  | input:enabled  | 选择每个启用的 input 元素   |
| :disabled | input:disabled | 选择每个禁用的 input 元素   |
| :checked  | input:checked  | 选择每个被选中的 input 元素 |
| :required | input:required | 包含`required`属性的元素    |
| :optional | input:optional | 不包含`required`属性的元素  |
| :valid    | input:valid    | 验证通过的表单元素          |
| :invalid  | input:invalid  | 验证不通过的表单            |

> 使用UI伪类选择器时，需要在HTML中存在这种状态，如禁用输入框，需要在HTML的对应元素上添加禁用属性

```tsx
<input id="disabliedInput" type="text" disabled="" >
```

#### 
