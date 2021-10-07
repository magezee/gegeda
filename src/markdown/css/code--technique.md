## 技巧

### 实现表格

| 值                 | 属性                                                         |
| ------------------ | ------------------------------------------------------------ |
| table              | 此元素会作为块级表格来显示（类似 ` <table>`），表格前后带有换行符 |
| inline-table       | 此元素会作为内联表格来显示（类似 ` <table>`），表格前后没有换行符 |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 `<tbody>`）       |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 `<thead>`）       |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）       |
| table-row          | 此元素会作为一个表格行显示（类似 `<tr>`）                    |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）    |
| table-column       | 此元素会作为一个单元格列显示（类似 `<col>`）                 |
| table-cell         | 此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）      |
| table-caption      | 此元素会作为一个表格标题显示（类似 `<caption>`）             |

```html
<div className='talble'> 
  <section>
    <ui>
      <li>编号</li>
      <li>标题</li>
    </ui>    
  </section>     
  <section>
    <ui>
      <li>1</li>
      <li>标题1</li>
    </ui>    
  </section>
  <section>
    <ui>
      <li>2</li>
      <li>标题2</li>
    </ui>    
  </section>             
</div>
```

![](https://img-blog.csdnimg.cn/20200523120027573.png)

```css
.table {
  display: table;
    
  section {
    &:nth-of-type(1) {  
      display: table-header-group;
    }

    &:nth-of-type(2) {
      display: table-row-group;
    } 

    &:nth-of-type(3) {
      display: table-footer-group;
    }

    ul {
      display: table-row;

      li {
        display: table-cell;
      }
    }
  }
}
```

![](https://img-blog.csdnimg.cn/20200523122316569.png)

> 可以加点样式

```css
.table {
  margin: 50px;
  display: table;
    
  section {
    &:nth-of-type(1) {  
      display: table-header-group;
      font-weight:bold;
      background-color: rgba(189, 134, 134, 0.2);
    }

    &:nth-of-type(2) {
      display: table-row-group;
    } 

    &:nth-of-type(3) {
      display: table-footer-group;
    }

    ul {
      display: table-row;

      li {
        display: table-cell;
        border: 1px #ddd solid;
        padding: 10px;
      }
    }
  }
}
```

![](https://img-blog.csdnimg.cn/20200523122915829.png)

```css
.table {
  display: table;
    
  section {
    &:nth-of-type(1) {  
      display: table-header-group;
      font-weight:bold;
    }

    &:nth-of-type(n+1) {
      display: table-row-group;
    } 

    ul {
      display: table-row;
      border: none;
            
      li {
        border-top: solid 1px #ccc;
        display: table-cell;               
        padding: 10px 30px;
      }
    }
  }
}
```

![](https://img-blog.csdnimg.cn/20200523142051846.png)



---------

### 点击控制显示

使用 label 与check表单绑定，点击 label 元素可以控制 check 的 `true/false`

通过伪类选择表单 check 的选中状态以此控制选中和未选中的样式，然后控制显示表单

```html
<main>
  <label className='btn' for="control">按钮</label>
  <input type="checkbox" id="control" />
  <div className='element'>控制显示的元素</div>
</main>
```

```css
main {
  .btn {
    background-color: #ddd;
    text-align: center;
    width: 100px;
    border: solid 1px;
    border-radius: 6%;
  }
    
  input:checked  { 
    /* 选中状态下选择紧邻自己的element元素（不这样写选择不了） */
    & + .element {      
      display: block;
    }
  }

  .element {
    display: none;		/* 默认不显示 */
  }
	
  input {
    display: none;		/* 不显示check，如果显示就会跟配图一样 */
  }
}
```

![](https://img-blog.csdnimg.cn/20200529153134365.png)



-------

### 栅格系统

实现一个全局可复用的的响应栅格样式

```html
<main className='row '>
  <div className='col-lg-3'>1</div>
  <div className='col-lg-1'>2</div>
  <div className='col-lg-4'>3</div>
</main>
```

```css
/* 将要使用栅格的元素分成24列 */
.row {
  display: grid;
  grid-template-columns:repeat(24,1fr);   
}

/* 循环生成指定栅格列宽的样式属性 如 .col-lg-4{grid-column: span 4;} */
.loop(@index) when (@index > 0) {
  .loop(@index - 1);
  .col-lg-@{index} {
    grid-column: span @index;
  }
}

.loop(24);

main div {
  border: 1px solid;
  text-align: center;
}
```

![](https://img-blog.csdnimg.cn/20200530114156818.png)

通过窗口大小实现不同的响应布局

```css
/* large.less */
.row {
  display: grid;
  grid-template-columns:repeat(24,1fr);
}

.loop(@index) when (@index > 0) {
  .loop(@index - 1);
  .col-small-@{index} {
    grid-column: span @index;
  }
}

.loop(24);

main div {
  border: 1px solid;
  text-align: center;
}
```

```css
/* small.less */
.row {
  display: grid;
  grid-template-columns:repeat(24,1fr);
}

.loop(@index) when (@index > 0) {
  .loop(@index - 1);
  .col-small-@{index} {
    grid-column: span @index;
  }
}

.loop(24);

main div {
  border: 1px solid;
  text-align: center;
}
```

通过按条件引入不同的less样式实现响应式布局

```css
/* index.less */
@import url(large.less) only screen and (min-width:768px);
@import url(small.less) only screen and (max-width:768px);
```

将各条件下的样式统一添加到元素中，指定条件下引入不同的样式less文件从而实现条件更改样式

```jsx
/* 宽度更多时可以显示更多元素，因此应该在宽度大的时候把元素所占的栅格变小（无论宽度如何变化总栅格都为24） */
import 'index.less'

<main className='row '>
  <div className='col-large-8 col-small-12'>1</div>
  <div className='col-large-8 col-small-12'>2</div>
  <div className='col-large-8 col-small-12'>3</div>
</main>
```

![](https://img-blog.csdnimg.cn/20200530150533864.png)

