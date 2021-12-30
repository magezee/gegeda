## 操作图片

### 绘制

使用 canvas 可以很方便地将一张图片绘制到指定区域

**context.drawImage(img, sx?, sy?, sWidth?, sHeight?, dx?, dy?, dWidth?, dHeight?)**

- 功能：用于在画布的指定位置绘制图像
- 参数：
  - img：使用的图像
  - sx：从画布的指定 x 坐标开始绘制
  - sy：从画布的指定 y 坐标开始绘制
  - sWidth：图像在画布上所占宽度
  - sHeight：图像在画布上所占高度
  - dx：令图像位置在画布的指定 x 坐标（默认图像左上角为位置点
  - dy：令图像位置在画布的指定 y 坐标（默认图像左上角为位置点
  - dWidth：绘制的图像高度
  - dHeight：绘制的图像宽度

> 一般只用前五个参数即可决定图像的位置即宽高ß

```tsx
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = 1980 
canvas.height = 1080
context.rect(0, 0, canvas.width, canvas.height)
context.fillStyle = '#fff'
context.fill()

const img = new Image()
img.src = './demo.png'
// 需要注意要等onlaod才去绘制,否则在chrom上会不正常
img.onload = () => {
  context.drawImage(img, 0, 0, 1920, 1080)
}
```

### 跨域处理

Canvas 在加载图片时，会存在跨域问题，通常只需设置图片允许跨域即可

```tsx
img.src = './demo.png'
img.crossOrigin = 'anonymous'
```

但是此方式仅适用于网络图片，对于本地图片无效，如果想利用本地图片，还是得要开启一个本地服务器，然后把图片当做服务器静态文件

```tsx
// /app.js
const express = require('express')

const app = new express()


app.use(express.static('./imgs', {
  index: false
}))

app.listen(8080)
```

然后把本地图片存在 `/imgs` 文件夹中，即可正常访问

```tsx
const img = new Image()
// 注意这里不是 http://localhost:8080/imgs/demo.png
img.src = 'http://localhost:8080/demo.png' 
img.onload = () => {
  context.drawImage(img, 0, 0, 1920, 1080)
}
```

