## 委托

使用关键字 `delegate` 实例化一个委托函数类型，该类型由返回值和传入参数的类型去规范一个函数 A 需要传入另外一个函数 B时，控制函数 B 的类型，这样就可以将函数作为变量传入

 常用于需要针对相似功能函数的建立统一管理使用

```tsx
using UnityEngine;

public class Demo : MonoBehaviour {
  private delegate void LanguageDelegate(string message);
  private void ChooseLanguage(string message, LanguageDelegate LanguageList ) {
    LanguageList(message);
  }
  
  private void Chinese(string message) {
    print("打印：" + message);
  }

  private void English(string message) {
    print("print:" + message);
  }

  private void Awake() {
    ChooseLanguage("数据", Chinese);
    ChooseLanguage("data", English);
  }

}
```

```jsx
class A extends Component {
    render() {
        return (
            <B title = '标题'></B>	{/* 向子组件的props传递数据并储存 */} 
            <C text = '内容'></C>		 
        )
    }
}

// 类组件
class B extends Component {
    render() {
        return (
            <p>{this.props.title}</p>
            <p>{this.props.name}</p>
        )
    }
}

B.defaultProps = {		// 设置类组件的默认props属性，函数式组件没有，但是一般不用这个而用state
    name:'默认值'        
}

// 函数式组件
const C = (props) => {
    return (
        <p>{props.text}</p>		{/* 注意没有this */} 
    )
}
```

