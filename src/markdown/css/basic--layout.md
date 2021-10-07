## 布局样式

### 定位

**Position：**

-  `absolute`：绝对定位，是相对于最近的且不是static定位的父元素来定位（脱离文档流）
-  `fixed`：绝对定位，是相对于浏览器窗口来定位的，是固定的，不会跟屏幕一起滚动（脱离文档流）
-  `relative`：相对定位，是相对于其原本的位置来定位的
-  `sticky`：粘性定位，同时拥有 relative 和 fixed 的特性
-  `static`：默认值，没有定位
-  `inherit`：继承父元素的 position 值

> 元素默认 position为 static，在文档流中是从上往下，从左到右的紧密布局，不可以通过 top、left 等属性直接改变它的偏移

**absolute和relative的区别：**

正常情况的 div 排序：

```html
<body>
  <div id='A'>A号div</div>
  <div id='B_Father'>
    <div id='B'>B号div</div>
  </div>    
</body>
```

```css
#A {
  background-color:mediumpurple;
  height: 100px;
}

#B_Father {
  background-color:#a1afc9;
  height: 100px;
  
  #B {
    background-color:#9ed900;
    height: 50px;
  }
}
```



![](https://img-blog.csdnimg.cn/2020050611284817.png)

-------

使用 `absolute` 定位时，会脱离文档流，若不具体声明宽高，默认宽高为子元素宽高（如这里的文本）

> 特殊技巧：默认情况下（不声明宽高时），div 的高由填充的子元素确定，宽填满全屏幕，要让一个 div 的宽随着子元素的宽度变化，可令该父 div 声明 `absolute` 定位，这样该 div 的宽度就能随着子元素的文档流宽度变化

```css
#B {
  background-color:#9ed900;
  position: absolute;
  top:40px;
  left: 40px;
}
```

由于最近的非 static 为`<html>`，因此 `top` 和 `left` 都是相对于 html 来决定的

![](https://img-blog.csdnimg.cn/20200506113010432.png)

---

若B的父元素声明了非 static 定位，则会根据 `B_Father` 来定位

```css
#B_Father {
  background-color: #a1afc9;
  height: 100px;
  position: relative;
  
  #B {
    background-color: #9ed900;
    position: absolute;
    top: 40px;
    left: 40px;
  }
}
```

![](https://img-blog.csdnimg.cn/20200506113150184.png)

----

relative：

使用 `relative` 定位时，会根据自身原来的定位进行相对定位（偏移），同时进行偏移时文档流依然保留在原来的地方，不会影响其他元素的位置，可以理解为只是显示的位置变了而已

```html
<body>
  <div id='A'>A号div</div>
  <div id='B_Father'>
    <div id='B'>B号div</div>
    B父元素存在的text
  </div>
<body>
```

```css
#A {
  background-color:mediumpurple;
  height: 100px;
}

#B_Father {
  background-color:#a1afc9;
  height: 100px;
  
  #B {
    background-color:#9ed900;
    height: 50px;
    width: 80px;
    position: relative;
    top:60px;
    left: 60px;  
  }
}
```



原来的位置：由于 B 号 div 的存在，因此父元素内的文本被挤到下方显示

![](https://img-blog.csdnimg.cn/20200506115015707.png)

```css
#B_Father {
  background-color:#a1afc9;
  height: 100px;
  
  #B {
    background-color:#9ed900;
    height: 50px;
    width: 80px;
    left: 60px; 
    top:60px;
  }
}
```

相对与之前的位置偏移了距离左和上 60px，且 B 原来占的文档流并没有消失，只是显示的地方更改而已

![](https://img-blog.csdnimg.cn/20200506115137576.png)



-----

**sticky**

当元素在屏幕内，表现为 `relative`，就要滚出显示器屏幕的时候，表现为 `fixed`

生效前提：

- 设置 `position:sticky`
- 必须指定 `top、bottom、left、right` 4个值之一，否则只会处于相对定位（一般用top:0）

- 父元素不能 `overflow:hidden` 或者 `overflow:auto` 属性且不能低于sticky元素的高度（一般设置`overflow:scroll`）

- sticky 元素仅在其父元素内生效

```html
<article>
  <section>
    <h4>标题一</h4>
    <p>
      一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一
    </p>
  </section>
  <section>
    <h4>标题二</h4>
    <p>
      二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二
    </p>
  </section>
  <section>
    <h4>标题三</h4>
    <p>
      三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三
    </p>
  </section>
</article>
```

```css
article {
  margin: 100px;
  height: 250px;
  width: 250px;
  border: 1px #ddd solid;
  overflow: scroll;

  section {
    margin: 0;
    padding-bottom: 40px;

    h4 {
      margin: 0;
      background-color: #ddd;
      position: sticky;
      top: 0;
    }
    
    p {
      margin: 0;
    }
  }
}
```

特性：

- 当滚动条滑到下一个 sticky 定位的元素前，会以 fixed 定位显示，
- 当滑到下一个 sticky 定位元素时，会更改 fixed 显示的元素

![](https://img-blog.csdnimg.cn/20200524145243443.png)



---

**z-index**

z-index 属性设置元素的堆叠顺序，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面，仅可用于定位元素（非 static 表示）

> `z-index` 会影响一些伪类功能的元素起作用，如 `:hover`，如果匹配的元素的上层有物体，则判定不到该元素（即使不被挡住能看到）

| 值       | 描述                                  |
| :------- | :------------------------------------ |
| auto     | 默认，堆叠顺序与父元素相等            |
| *number* | 设置元素的堆叠顺序                    |
| inherit  | 规定应该从父元素继承 z-index 属性的值 |

> 注意：这里的层级是相对而非绝对，如 A B 为兄弟元素，A 的 z-index 设置为1，B 设置为 2，A 的子元素的设置为 99，最终显示在最上层的还是 B，因为 B 已经比 A 层级高了，因此 A 的子元素无论层级设置的多高都不会超过 B



------

### 弹性布局

> [阮一峰flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

任何一个元素都可以指定为 Flex 布局（弹性布局）, 设为 Flex 布局以后，容器子元素的以下样式将会失效：

- `float`
-  `clear `
-  `vertical-align` 

> 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"，它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"

```css
/* 块状弹性盒模型 */
.box{
  display: flex;
}

/* 行内弹性盒模型 */
.box{
  display: inline-flex;
}
```

---

**容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）**

- 主轴的开始位置（与边框的交叉点）叫做 `main start`，结束位置叫做 `main end`

- 交叉轴的开始位置叫做 `cross start`，结束位置叫做 `cross end`

- 项目默认沿主轴排列，单个项目占据的主轴空间叫做 `main size`，占据的交叉轴空间叫做 `cross size`

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

----

#### 容器属性

- **flex-direction**：定义主轴的方向（即项目的排列方向）

  ```css
  row               /* 主轴为水平方向，起点在左端，默认值 */
  row-reverse       /* 主轴为水平方向，起点在右端 */
  column            /* 主轴为垂直方向，起点在上沿 */
  column-reverse    /* 主轴为垂直方向，起点在下沿 */
  ```

- **flex-wrap**：定义项目换行方式

  ```css
  nowrap          /* 不换行，默认值 */
  wrap            /* 换行，第一行在上方 */
  wrap-reverse    /* 换行，第一行在下方 */
  ```

- **flex-flow：** `flex-direction` 和 `flex-wrap` 的简写

  ```css
  element {
    flex-flow: row nowrap
  }
  ```

- **justify-content**：定义项目在主轴上的对齐方式

  ```css
  flex-start       /* 主轴的起点对齐，默认值 */
  flex-end         /* 主轴的末尾对齐齐 */
  center           /* 居中 */
  space-between    /* 两端对齐，项目之间的间隔都相等 */
  space-around     /* 每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  space-evenly     /* 每个项目两侧的间隔相等，包括项目与边框*/
  ```

  ![](https://img-blog.csdnimg.cn/eb9f448797f545afbf7942c77bc4a30f.png)

- **align-items**：定义项目在交叉轴上如何对齐

  ```css
  stretch        /* 如果项目未设置高度或设为auto，将占满整个容器的高度，默认值 */
  flex-start     /* 交叉轴的起点对齐 */
  flex-end       /* 交叉轴的终点对齐 */
  center         /* 交叉轴的中点对齐 */
  baseline       /* 项目的第一行文字的基线对齐 */
  ```

  ![](https://img-blog.csdnimg.cn/d7233f78983c43b887b7233b3d5104f4.png)

- **align-content**：定义了存在换行时，将每一行视作一个项目，在交叉轴上的排列方式（如果不换行，即只有一条主轴时不起作用）[代码测试](https://codepen.io/magezee/pen/mdwvwoV)

  > 这里的 `行` 表示主轴为水平方向，如果为垂直方向则为 `列`

  ```css
  stretch               /* 根据容器交叉轴剩余空间平均分配每行的间隔，默认值 */
  flex-start            /* 各行挤在一起排列在交叉轴开始 */
  flex-end              /* 各行挤在一起排列在交叉轴末尾 */
  center                /* 各行挤在一起排列在交叉轴中间 */
  space-between         /* 两端对齐，各行之间间隔都相等 */
  space-around          /* 各行之间间隔都相等，各行之间的间隔比行与边框的间隔大一倍 */
  space-evenly          /* 各行之间间隔都相等，包括行与边框*/
  ```

  ![](https://img-blog.csdnimg.cn/24f1cd1d20ad4033b067817553033e3f.png)



-----

#### 项目属性

- **order**：定义项目的排列顺序，数值越小排列越靠前

- **flex-grow**：定义项目的放大比例（总项目宽或高＜容器宽或高时适用）

  ```less
  // flex-grow的比例越高代表该元素最终宽高越大
  // 如三个宽度100px的块ABC在宽度为400px的容器中，由于总宽度为300px＜400px，因此会启用flex-grow属性
  .A { flex-grow: 0; }
  .B { flex-grow: 1; }
  .C { flex-grow: 2; }
  // 最终宽度计算公式：容器空余宽度值/felx-grow总比例*对应项目felx-grow比例+对应项目原宽
  // 如C最终宽度为(400-300)/(0+1+2)*2+100 = 166px
  // 如果ABC都没有具体的宽度，则相当于ABC设置宽度为0，那么最终C的宽度为400/(0+1+2)*2+0 = 266px
  ```

- **flex-shrink**：定义了项目的缩小比例（总项目宽或高＞容器宽或高时适用，一般只会设置为0或1)

  ```less
  // flex-grow的比例越高代表该元素最终宽高越小
  // 如三个宽度100px的块ABC在宽度为200px的容器中，由于总宽为300px＞200px，因此会启用flex-shrink属性
  .A { felx-shrink: 0; }
  .B { felx-shrink: 1; }
  .C { felx-shrink: 2; }
  // 最终宽度计算公式：对应项目原宽-超出容器宽度值/felx-grow总比例*对应项目felx-grow比例
  // 如C最终宽度为100-(300-200)/(0+1+2)*2 = 33px
  // 同理：A不会进行压缩，B最终宽度为67px
  ```

- **flex-basis**：分配多余空间之前，项目占据的主轴空间

  > flex-basis：与直接定义宽高 width 或 height 功能一样（定义的是宽还是高取决于主轴方向）
  > 优先级：max-width(min-width) > flex-basis > width 【高同理】

- **flex**： `flex-grow`、`flex-shrink` 和 `flex-basis` 的缩写

- **align-self**：允许单个项目有与其他项目不一样的对齐方式（只作用于交叉轴）

  > 可覆盖容器的 `align-items` 属性，默认值为`auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`

  ```css
  stretch        /* 如果项目未设置高度或设为auto，将占满整个容器的高度，默认值 */
  flex-start     /* 交叉轴的起点对齐 */
  flex-end       /* 交叉轴的终点对齐 */
  center         /* 交叉轴的中点对齐 */
  baseline       /* 项目的第一行文字的基线对齐 */
  ```

  ![](https://img-blog.csdnimg.cn/65c902b88c9d4b88a409be543127c98f.png)



-----

### 栅格

任意元素都可以设置为栅格容器，容器中子元素的以下样式将会失效：

- `float`
- `display: inline-block`
- `display: table-cell`
- `vertical-align`
- `column-xxx`

```css
/* 块状栅格容器 */
.box{
  display: grid;
}

/* 行内栅格容器 */
.box{
  display: inline-grid;
}
```

![](https://img-blog.csdnimg.cn/b711c560025d404397ca1372c50364c9.png)

------

#### 关键字

- **repeat( )**：第一个参数是重复的次数，第二个参数是所要重复的值

  ``` css
  /* 使用repeat() 第一个参数是重复的次数，第二个参数是所要重复的值 */
  .container {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: repeat(3, 33.33%);
  }
  
  /* 重复生成两次3个指定宽度的列，即会生成6个列 */
  .container {
    display: grid;
    grid-template-columns: repeat(2, 100px 20px 80px);
  }
  ```

- **auto-fill**：表示自动填充

  > 在单元格的大小固定，容器的大小不确定情况下，如果希望每一行（或每一列）容纳尽可能多的单元格，可以使用该关键字

  ```css
  /* 每列宽度100px，然后自动填充，直到容器不能放置更多的列 */
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
  }
  ```

- **fr**：表示比例关系

  ``` css
  /* 第二列为第一列的两倍宽 */
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  ```

- **minmax( )**：产生一个长度范围，表示长度就在这个范围之中，在项目总高宽大于或小于容器高宽时会起作用

  ```css
  /* minmax(100px, 1fr)表示列宽不小于100px，不大于1fr */
  .container {
  	grid-template-columns: 1fr 1fr minmax(100px, 1fr);
  }
  ```

- **auto**：表示由浏览器自己决定长度

  ```css
  /* 第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了min-width，且这个值大于最大宽度 */
  .container {
  	grid-template-columns: 100px auto 100px;
  }
  ```

- **[ ]**：使用方括号指定每一根栅格线的名字，方便以后的引用，

  > 栅格布局允许同一根线有多个名字，如 `[fifth-line row-5]`

  ```css
  /* 指定栅格布局为3行 x 3列，因此有4根垂直栅格线和4根水平栅格线。方括号里面依次是这八根线的名字 */
  .container {
    display: grid;
    grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
  }
  ```

- **span**：表示跨越的单元格数

  ```css
  /* span放在start中表示往后跨域，放在end表示往前跨域，因此下面两种声明方式功能完全相同 */
  .item {
    grid-column-start: span 2;
  }
  
  .item {
    grid-column-end: span 2;
  }
  
  /* 一般搭配栅格线确定项目位置和大小 */
  .item {
    grid-row-start: 1;
    grid-row-end: span 1;
    grid-column-start: 1;
    grid-column-end: span 2;
  }
  ```

-------

#### 容器属性

- **grid-template-columns**：定义每一列的列宽

- **grid-template-rows**：定义每一行的行高

  ```css
  /* 指定了一个三行三列的栅格，列宽和行高都是100px */
  .container {
    dispaly: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
  }
  
  /* 使用百分比 */
  .container {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    grid-template-rows: 33.33% 33.33% 33.33%;
  }
  ```

- **grid-template-areas**：栅格布局允许指定"区域"（area），一个区域由单个或多个单元格组成

  > 注意：区域的命名会影响到栅格线，每个区域的起始栅格线，会自动命名为`区域名-start`，终止栅格线自动命名为`区域名-end`
  >
  > 如：区域名为 `header`，则起始位置的水平/垂直栅格线叫做 `header-start`，终止位置的水平/垂直栅格线叫做 `header-end`

  ```css
  /* 划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格 */
  .container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
  }
  ```

  > 多个单元格合并成一个区域

  ```css
  /* 将9个单元格分成a、b、c三个区域 */
  grid-template-areas: 'a a a'
                       'b b b'
                       'c c c';
  
  /* 顶部是页眉区域header，底部是页脚区域footer，中间部分则为main和sidebar */
  grid-template-areas: "header header header"
                       "main main sidebar"
                       "footer footer footer";
  
  /* 如果某些区域不需要利用，则使用.来表示，表示没有用到该单元格，或者该单元格不属于任何区域 */
  grid-template-areas: 'a . c'
                       'd . f'
                       'g . i';
  ```

- **grid-auto-flow**：控制子元素的放置顺序

  > 容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行
  >
  > 如果设定 row，则扩大单元格占领列格数时，只会挤压产生新的行，容器总列数不会发生变化
  >
  > 如果设定 column，则扩大单元格占领行格数时，只会挤压产生新的列，容器总行数不会发生变化

  ```css
  row             /* 先行后列，默认值 */
  column          /* 先列后行 */
  dense           /* 和row、colum 搭配一起使用，使单元格尽可能紧密排列，不出现空单元格 */
  ```

  ![](https://img-blog.csdnimg.cn/5959dcd7ac51469aadc37cf323a9d3c9.png)

- **grid-auto-columns**：当产生新的列时，指定新的列宽，如果不指定则完全按照单元格内容决定

- **grid-auto-rows**：当产生新的行时，指定新的行高，如果不指定则完全按照单元格内容决定

  ```css
  /* 指定新增的行高统一为100px */
  .container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-auto-rows: 100px; 
  }
  ```

-----

- **justify-content**：定义当容器总宽度大于栅格总宽度时，栅格在容器内的水平位置

  > 这里和 flex 的布局不一样，因为栅格没有主轴和交叉轴的说法，所以该属性固定控制水平位置

  ```css
  stretch               /* 栅格总宽度没有具体指定时，占据整个容器，默认值 */
  start                 /* 左对齐 */
  end                   /* 右对齐 */
  center                /* 居中 */
  space-between         /* 两端对齐，每列栅格之间间隔都相等 */
  space-around          /* 每列栅格之间间隔都相等，列栅格之间的间隔比列栅格与容器边框的间隔大一倍 */
  space-evenly          /* 每列栅格之间间隔都相等，包括列栅格与边框*/
  ```

- **align-content**：定义当容器总宽度大于栅格总宽度时，栅格在容器内的垂直位置

  > 这里和 flex 的布局不一样，因为栅格没有主轴和交叉轴的说法，所以该属性固定控制垂直位置

  ```css
  stretch               /* 栅格总高度没有具体指定时，占据整个容器，默认值 */
  start                 /* 上对齐 */
  end                   /* 下对齐 */
  center                /* 居中 */
  space-between         /* 两端对齐，每行栅格之间间隔都相等 */
  space-around          /* 每行栅格之间间隔都相等，行栅格之间的间隔比行栅格与容器边框的间隔大一倍 */
  space-evenly          /* 每行栅格之间间隔都相等，包括行栅格与边框*/
  ```

- **place-content**：`justify-content` 和 `align-content` 的简写，如果省略第二个值，则默认和第一个值相等

  ![](https://img-blog.csdnimg.cn/7ddda5b8bda94d1e9aabf45dededce8c.png)

-----

- **justify-items**：定义当单元格宽度大于单元格内元素时，元素在单元格中的水平位置

  > 这里和 flex 的布局不一样，因为栅格没有主轴和交叉轴的说法，所以该属性固定控制水平位置

  ```css
  stretch        /* 当内容元素没有写定宽度时，则填充满单元格，默认 */
  start          /* 左对齐 */
  end            /* 右对齐 */
  center         /* 居中 */
  ```

- **align-items**：定义当单元格高度大于单元格内元素时，元素在单元格中的垂直位置

  > 这里和 flex 的布局不一样，因为栅格没有主轴和交叉轴的说法，所以该属性固定控制垂直位置

   ```css
  stretch        /* 当内容元素没有写定高度时，则填充满单元格，默认 */
  start          /* 上对齐 */
  end            /* 下对齐 */
  center         /* 居中 */
   ```

- **place-items**：`justify-items` 和 `align-items` 的简写，如果省略第二个值，则默认和第一个值相等

  ![](https://img-blog.csdnimg.cn/e587d5c300e742c896b6f234b917c4c9.png)

  

----

#### 项目属性

- **grid-column-start**：指定一个单元格的起始列栅格线

- **grid-column-end**：指定一个单元格的终止含栅格线

- **grid-row-end**：指定一个单元格行起始含栅格线

- **grid-row-end**：指定一个单元格行终止含栅格线

  > 一个项目由一个或者多个单元格组成，项目在栅格中的具体位置以及所占单元格数可以通过上面四个属性具体确定
  >
  > 栅格线序列从 1 开始

  ```css
  .item {
    grid-column-start: 2;
    grid-column-end: span 2;
    grid-row-start: 2;
    grid-row-end: span 1;
  }
  ```

  ![](https://img-blog.csdnimg.cn/e3368734eb024223a07327b555b7a12b.png)

- **grid-column**：`grid-column-start` 和 `grid-column-end`的简写

- **grid-row**：`grid-row-start `和 `grid-row-end` 的简写

  ```css
  .item {
    grid-column: 1 / 3;	 /* 用/进行隔开而不是空格 */
    grid-row: 1 / 2;
  }
  
  /* 等同于 */
  .item {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  
  /* 等同于 */
  .item {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
  }
  ```

- **grid-area**：指定项目放在哪个区域中

  ```css
  .container {
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
  }
  
  /* 放在中间格子 */
  .item-1 {
    grid-area: e;
  }
  ```

  > 还可用作 `grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end` 的简写形式，直接指定项目的位置

  ```css
  .item {
    grid-area: 1 / 1 / 3 / 3;
  }
  ```

-----

- **justify-self**：设置项目内容的水平位置，跟 `justify-items` 用法完全一致，只作用于单个项目

- **align-self**：设置项目内容的垂直位置，跟 `align-items` 属性的用法完全一致，只作用于单个项目

- **place-self**：`align-self` 和 `justify-self `属性的简写形式，如果省略第二个值，则和第一个值相等

  ```css
  stretch      /* 如果内容未设置宽/高，则填充满项目 */ 
  start        /* 左/上对齐 */
  end          /* 右/下对齐 */
  center       /* 居中 */
  ```



----

### 响应式布局

`@media` 针对不同的媒体类型定义不同的样式，可用于设计响应式的页面

**媒体类型**

| 值     | 描述                               |
| :----- | :--------------------------------- |
| all    | 用于所有设备                       |
| print  | 用于打印机和打印预览               |
| screen | 用于电脑屏幕，平板电脑，智能手机等 |
| speech | 应用于屏幕阅读器等发声设备         |

**媒体功能**

| 值                      | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| aspect-ratio            | 输出设备中的页面可见区域宽度与高度的比率                     |
| color                   | 输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0    |
| color-index             | 在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0 |
| device-aspect-ratio     | 输出设备的屏幕可见宽度与高度的比率                           |
| device-height           | 输出设备的屏幕可见高度                                       |
| device-width            | 输出设备的屏幕可见宽度                                       |
| grid                    | 用来查询输出设备是否使用栅格或点阵                           |
| height                  | 输出设备中的页面可见区域高度                                 |
| max-aspect-ratio        | 输出设备的屏幕可见宽度与高度的最大比率                       |
| max-color               | 输出设备每一组彩色原件的最大个数                             |
| max-color-index         | 在输出设备的彩色查询表中的最大条目数                         |
| max-device-aspect-ratio | 输出设备的屏幕可见宽度与高度的最大比率                       |
| max-device-height       | 输出设备的屏幕可见的最大高度                                 |
| max-device-width        | 输出设备的屏幕最大可见宽度                                   |
| max-height              | 输出设备中的页面最大可见区域高度                             |
| max-monochrome          | 在一个单色框架缓冲区中每像素包含的最大单色原件个数           |
| max-resolution          | 设备的最大分辨率                                             |
| max-width               | 输出设备中的页面最大可见区域宽度                             |
| min-aspect-ratio        | 输出设备中的页面可见区域宽度与高度的最小比率                 |
| min-color               | 输出设备每一组彩色原件的最小个数                             |
| min-color-index         | 在输出设备的彩色查询表中的最小条目数                         |
| min-device-aspect-ratio | 输出设备的屏幕可见宽度与高度的最小比率                       |
| min-device-width        | 输出设备的屏幕最小可见宽度                                   |
| min-device-height       | 输出设备的屏幕的最小可见高度                                 |
| min-height              | 输出设备中的页面最小可见区域高度                             |
| min-monochrome          | 在一个单色框架缓冲区中每像素包含的最小单色原件个数           |
| min-resolution          | 设备的最小分辨率                                             |
| min-width               | 输出设备中的页面最小可见区域宽度                             |
| monochrome              | 在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0 |
| orientation             | 输出设备中的页面可见区域高度是否大于或等于宽度（portrait \| landscape）portrait匹配高度大于或等于宽度 |
| resolution              | 设备的分辨率。如：96dpi, 300dpi, 118dpcm                     |
| scan                    | 电视类设备的扫描工序                                         |
| width                   | 输出设备中的页面可见区域宽度                                 |

**逻辑关系**

- 与：`and`
- 或：`,`（不是用or）

- 非：`not`
- 仅：`only`（和not一样放在总表达式前，自动只能排除低端浏览器）

```css
/* not一般放在表达式的前面 */
/* 宽度不是200px~400px时启用该样式 相当于not( screen and (max-width: 400px) and (min-width:200px) ) */
@media not screen and (max-width: 400px) and (min-width:200px)  {
  main {
    height: 100px;
    width: 100px;
    border: 1px solid;
    background-color: blue;
  }
}
```

```css
/* 如果文档宽度小于 300 像素则启用该样式 */
@media screen and (max-width: 300px) {
  body {
    background-color:lightblue;
  }
}
```

> 这里应用的样式并不是完全覆盖而是添加的关系，相当于在原来的基础上声明了新的属性，如果同名属性则覆盖

```css
/* 当窗口宽度不超过400px时添加背景颜色，注意启用样式后仍有宽高和边框样式，因为只是相当于新添了背景属性 */
@media screen and (max-width: 400px) {
  main {
    background-color: blue;
  }
}

main {    
  width: 100px;
  height: 100px;
  border: 1px solid;
}
```

> 如果需要根据条件完全更改样式，则全部的样式应该声明在条件内部

```css
/* 因为200宽度以下的样式没有设置，因此宽度200px以下无main的样式 */
@media screen and (max-width: 400px) and (min-width:200px)  {
  main {
    margin: 100px;
    width: 100px;
    border: 1px solid;
    background-color: blue;
  }
}

@media screen and (min-width: 400px) {
  main {
    height: 100px;
    width: 100px;
    border: 1px solid;
    background-color: yellow;
  }
}
```

> 由于后声明的优先级更高，如果一个样式的匹配范围A比B大，则A应声明在前
>
> 不过一般指定具体范围值，就不需要费心考虑顺序了

```css
/* >400比>600的范围要广，>600的时候一定也>400，因此如果后声明>400，则永远不会匹配到>600的内容 */
@media screen and (min-width: 400px) {
  main {
    margin: 100px;
    width: 100px;
    border: 1px solid;
    background-color: blue;
  }
}

@media screen and (min-width: 600px) {
  main {
    height: 100px;
    width: 100px;
    border: 1px solid;
    background-color: yellow;
  }
}
```

