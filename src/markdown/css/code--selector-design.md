## 选择器设计

### 动态样式

**属性选择器**

写入匹配不同模式的 css，为标签添加指定属性时，则可更改样式

```css
[custom="large" ] {
  ...
}

[custom="middle"]

/* 更改类名更改样式同理 */
[class="lager"]
```

```html
<div custom='lager' />
<div custom='middle' />
```

> 如实现一个通过属性自由更改栅格长度的功能

```less
/* 设置栅格元素宽度 */
.col-1 {
  grid-column: span 1;
}

.col-2 {
  grid-column: span 2;
}

.col-3 {
  grid-column: span 3;
}

[class^="col-"] {
  /* 设置栅格元素同一样式 */
}

/* 通过写上类名自动匹配：<div class="col-3" /> */
```

