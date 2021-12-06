## 位置范围

每个元素都具有以下属性以此获取元素位置、范围相关信息

位置：

- `offsetTop`、`offsetLeft`
- `scrollTop`、`scrollToptLeft`

范围：

- `clientWidth` 、`clientHeight`

- `offsetWidth `、`offsetHeight`
- `scrollWidth`、`scrollHeight`、



-------

### 位置

**offsetTop、offsetLeft**

特点：

- 获取到的是元素和父元素的偏移量
- 变形不会改变数值，但是绝对/相对定位的移动会改变
- 范围： `子元素margin` →  `父元素padding`

![](https://img-blog.csdnimg.cn/626f299850824a04b2ac251f219980a4.png)

-----

**scrollTop、scrollToptLeft**

特点：

- 获取到的是滚动条滚动的偏移量，即只有在存在滚动条的元素上才使用这个属性（即子内容大于父容器）
- 变形、绝对/相对定位移动都会改变其数值
- 范围： `父元素content` → `子元素margin`

> 下图为父容器的值

![](https://img-blog.csdnimg.cn/10bbfa9aaae54e918364c673c3269adc.png)



-----

### 范围

**clientWidth 、clientHeight**

特点：

- 不会因变形产生的放大缩小而改变数值
- 范围：`元素content - 滚动条高/宽` → `元素padding`

![](https://img-blog.csdnimg.cn/695f69e3f3fb441ba6a571a2122eae48.png)

-------

**offsetWidth、offsetHeight**

特点：

- 不会因变形产生的放大缩小而改变数值
- 范围：`元素content` → `元素border`

![](https://img-blog.csdnimg.cn/f74bdbb5cf924e31aed8d1486f767722.png)

-----

**scrollWidth、scrollHeight**

- 当子元素高/宽小于父元素时：
  - 父元素范围：和 `clientWidth` 、`clientHeight` 完全一样

- 当子元素高/宽大于父元素时：
  - 父元素范围：`子元素content` → `子元素margin`
  - 会因为子元素变形和改变数值

> 下图为父容器的值

![](https://img-blog.csdnimg.cn/1c27f1402d4c4a38b9dfb252b2b118c8.png)

-----





