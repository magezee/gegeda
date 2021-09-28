## 交互组件

### TouchableHighlight

**[TouchableHighlight](https://www.react-native.cn/docs/touchablehighlight)** 用于封装视图组件，当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮

> 注意 `TouchableHighlight `只支持一个子节点（不能没有子节点也不能多于一个）如果包含多个子组件，可以用 View 组件包装它们

```tsx
// > 报错
<TouchableHighlight>
  <Text>text</Text>
  <Text>text</Text>
</TouchableHighlight>

// > 正常
<TouchableHighlight>
  <View>
    <Text>text</Text>
    <Text>text</Text>
  </View>
</TouchableHighlight>
```

**常用 props 属性：**

- `underlayColor?: color`：有触摸操作时显示出来的底层的颜色
- `activeOpacity?: number`：指定封装的视图在被触摸操作激活时以多少不透明度显示（0 到 1 之间，默认值为 0.85），只有设定了 `underlayColor` 属性才有效

```tsx
import React from 'react'
import { TouchableHighlight, Text } from 'react-native'

export default App = () => {
  const pressEvent = () => {}
  return (
    <>
      <TouchableHighlight underlayColor='red' onPress={pressEvent}>
        <Text>Red</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='blue' activeOpacity={0} onPress={pressEvent}>
        <Text>Blue</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor='green' activeOpacity={1} onPress={pressEvent}>
        <Text>Green</Text>
      </TouchableHighlight>
    </>   
  )
}
```

![](https://img-blog.csdnimg.cn/20210701165202494.gif#pic_center)



----

### TouchableOpacity

**[TouchableOpacity](https://www.react-native.cn/docs/touchableopacity)** 和 `TouchableHighlight` 类似，封装的视图的不透明度会降低，但是不会有额外的颜色效果，泛用性更高

**常用 props 属性：**

- `activeOpacity?: number`：指定封装的视图在被触摸操作激活时以多少不透明度显示（0 到 1 之间，默认值为 0.2）

```tsx
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default App = () => {
  const pressEvent = () => {}
  return (
    <>
      <TouchableOpacity onPress={pressEvent}>
        <Text>activeOpacity: 0.25</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0} onPress={pressEvent}>
        <Text>activeOpacity: 0</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={pressEvent}>
        <Text>activeOpacity: 1</Text>
      </TouchableOpacity>
    </>   
  )
}
```

![](https://img-blog.csdnimg.cn/20210701165845449.gif#pic_center)



-----

### TextInput

**[TextInput](https://www.react-native.cn/docs/textinput)** 允许用户输入文本的基础组件

常用 props 属性：

- `onChangeText?: Function`：接受一个函数，而此函数会在文本变化时被调用，参数为文本框的文本

- `onSubmitEditing?: Function `：接受一个函数，在文本被提交后（回车键）调用

```jsx
import React, { useState } from 'react'
import { TextInput } from 'react-native'

export default App = () => {
  const [valueState, onChangeTextFun] = useState('default text')
  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text) => {    
        onChangeTextFun(text)       // 更改state里存放的文本
        alert(text)                 // 每修改一次文本就弹窗一次
      }}
      value={valueState}            
      onSubmitEditing = {()=>{
        console.log('已提交:' + valueState)
      }} 
    />
  )
}
```

![](https://img-blog.csdnimg.cn/2021070117022661.gif#pic_center)
