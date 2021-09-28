## 基本样式

### 样式对象

RN 中写样式不使用 `.css` 文件，而是 `.js` 或 `.ts` 并且借助框架中提供的方法 `StyleSheet.create` 来编写样式文件，或者直接写行内样式

```tsx
import React from 'react'

import { 
  StyleSheet,
  View,
  Text,
} from 'react-native'

const App = () => {
  return (
    <View style={styles.view}>
      <Text>123</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  }
})

export default App
```

> 当需要合并多个样式时，写成数组形式即可，数组中靠后的样式优先级高

```tsx
<View style={[styles.shape, styles.color, {margin: 20}]}>
  <Text>123</Text>
</View>
```

> 样式属性采用驼峰命名方式

```tsx
// css 写法
{
	font-weight: bold;
}

// 样式对象写法
{
  fontWeight: 'bold',
}
```



----

### web异同

#### 单位

- 写绝对单位时，默认单位是 `dp` 是手机端对 `px` 的一种换算

```tsx
const styles = StyleSheet.create({
  wrap:{ padding: 40 }
})
```

- 除了绝对单位，写其他 css 值都需要用写成字符串格式

```tsx
const styles = StyleSheet.create({
  wrap: {
    padding: '40%'
    position: 'relative'
  }
})
```

- 不能使用 `vw` 这种相对屏幕的单位，取而代之的相对单位常用的只有 `%` ，如果想要根据屏幕宽高来定位元素，需要手动计算，即先拿到该设备的屏幕大小，然后手动去乘除特定值，来达到 `vw` 的功能

```tsx
import EStyleSheet from 'react-native-extended-stylesheet'
import { Dimensions } from 'react-native';

const { width,height } = Dimensions.get('window');		// 获取到屏幕的宽高

export default EStyleSheet.create({
  wrap: {
    width: width / 2,
    height: 2 * height,
  }
})
```



-----

#### 布局

- `flex` 布局的默认项目方向 `column`，如果需要水平方向则需要手动设置

```tsx
const styles = StyleSheet.create({
  style: {
    display: 'flex',
    flexDirection: 'row'
  }
})
```



----

#### 继承

RN 中的样式没有继承关系，任意组件的样式都需要单独设置

```tsx
<View style={{color: 'red'}}>
  <Text>子元素文字没有变色</Text>
</View>
```



