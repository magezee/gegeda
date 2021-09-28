## 展示组件

### Image

[**Image**](https://www.react-native.cn/docs/image) 用于显示图片的组件

```tsx
import React from 'react'
import { Image } from 'react-native'

export default App = () => {
  return (
    <>
      {/* 读取本地图片的方式 */}
      <Image 
        source={require('./assets/goose.jpg')} 
      />

      {/* 读取网络图片的方式 */}
      <Image 
        source={{uri: 'https://img-blog.csdnimg.cn/20210701230944178.jpg#pic_center'}} 
        style={{width:100, height: 100}} 
      />
    </>
  )
}
```

> 读取网络图片时必须给定高度，否则无法正常显示图片

**常用 props 属性：**

- `resizeMode: enum `：决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小，默认值为 `cover`

  - `cover`：在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有 padding 内衬的话，则相应减去），`这样图片完全覆盖甚至超出容器，容器中不留任何空白`

  - `contain`：在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有 padding 内衬的话，则相应减去），`这样图片完全被包裹在容器中，容器中可能留有空白`
  - `stretch`：拉伸图片且不维持宽高比，直到宽高都刚好填满容器
  - `repeat`：重复平铺图片直到填满容器，`图片会维持原始尺寸，但是当尺寸超过容器时会在保持宽高比的前提下缩放到能被容器包裹`
  - `center`: 居中不拉伸

```tsx
import React from 'react'
import { Image, View } from 'react-native'

export default App = () => {
  return (
    <>
      <Image 
        source={{uri: 'https://img-blog.csdnimg.cn/20210701230944178.jpg#pic_center'}} 
        resizeMode='cover'
        style={{height: 100, marginTop: 10, marginBottom: 10}} 
      />
      <Image 
        source={{uri: 'https://img-blog.csdnimg.cn/20210701230944178.jpg#pic_center'}} 
        resizeMode='contain'
        style={{height:100, marginBottom: 10}} 
      />
      <Image 
        source={{uri: 'https://img-blog.csdnimg.cn/20210701230944178.jpg#pic_center'}} 
        resizeMode='stretch'
        style={{height:100, marginBottom: 10}} 
      />
      <Image 
        source={{uri: 'https://img-blog.csdnimg.cn/20210701230944178.jpg#pic_center'}} 
        resizeMode='repeat'
        style={{height:100, marginBottom: 10}} 
      />
      <Image 
        source={{uri: 'https://img-blog.csdnimg.cn/20210701230944178.jpg#pic_center'}} 
        resizeMode='center'
        style={{height:100, marginBottom: 10}} 
      />
    </>
  )
}
```

![](https://img-blog.csdnimg.cn/20210701235524461.png)



-----

### ImageBackground

[**ImageBackground**](https://www.react-native.cn/docs/imagebackground) 用于设定背景图，起导入图片方式和 `Image` 组件一致

```tsx
import React from 'react'
import { ImageBackground, View } from 'react-native'

export default App = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <ImageBackground 
          source={{uri: 'https://img-blog.csdnimg.cn/20210702001842275.jpeg'}}
          style={{flex: 1}}
        ></ImageBackground>
      </View>
    </>
  )
}
```

> 导入的图片必须指定高度（无论本地还是网络），一般使用 `flex` 属性来填充满父容器