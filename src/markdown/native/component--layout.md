## 布局组件

### View

**[View](https://reactnative.cn/docs/view)** 是 native 中最基本的元素布局组件，相当于 `div` 标签，一般用于划分一块区域

> 在 native 中，不可以像 react 那样使用原生 html 标签，如 `<div/>` 是没有办法通过编译的



-----

### ScrollView

**[ScrollView](https://www.react-native.cn/docs/scrollview)** 必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）

要给 ScrollView 一个确定的高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都有确定的高度

一般来说会给 ScrollView 设置 `flex: 1` 以使其自动填充父容器的空余空间，但前提条件是所有的父容器本身也设置了 flex 或者指定了高度，否则就会导致无法正常滚动



-----

