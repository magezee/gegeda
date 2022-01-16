## 基本概念

>[官方中文文档](https://docs.unity3d.com/cn/current/ScriptReference/index.html)、[官方英文文档](https://docs.unity3d.com/ScriptReference/index.html)

### 脚本文件

Unity 的脚本遵从以下规则：

- 文件名需与类名完全一致
- 脚本需要手动挂载在指定物体上才会执行
- 游戏的所有脚本都需继承 Unity 的脚本基类 [UnityEngine.MonoBehaviour](https://docs.unity3d.com/cn/current/ScriptReference/MonoBehaviour.html)

> 只有挂载到游戏物体中的脚本才需要继承该类，如果只是写工具函数类，则不需要

```ts
// 一般引入命名空间然后直接使用
using UnityEngine;

class Script : MonoBehaviour {
  
}
```







----

### 生命周期

Unity 的每个游戏脚本都具有相同的生命周期

**阶段**

初始化阶段：

- Awake：在创建游戏对象时立即执行（即使脚本被禁用也会执行）
- Start：在游戏对象执行脚本时立即执行（脚本被禁用时不执行）

更新阶段：

- FixedUpdate：每隔固定时间都会执行一遍（默认 0.02s，可在项目设置的时间项中进行更改，一般不改）
- Update：每渲染帧执行一遍，执行的具体时间由使用机器性能决定
- LateUpdate：在 Update 执行完毕后立即执行
- OnGuI：在渲染和处理 GUI 事件时被调用，每渲染帧执行一遍

销毁阶段：

- OnDisable：当游戏对象被禁用时执行
- onDestroy：当游戏对象被销毁时调用

```ts
public class Demo : UnityEngine.MonoBehaviour {
  private void Awake() {}
  private void Start() {}

  private void FixedUpdate() {}
  private void Update() {}
  private void LateUpdate() {}
  private void OnGUI() {}

  private void OnDestroy() {}
  private void OnDisable() {}
}
```

**使用场景**

- Awake：主要用于游戏开始前初始化变量和游戏状态
- Start：
- FixedUpdate：主要用于对一些物理引擎的计算（防止不同电脑上计算有误
- Update：主要用于监听玩家操作
- LateUpdate：主要用于玩家操作反馈后紧跟着的副作用







------

### 数据控制

默认情况下，在脚本类中通过 `public` 暴露的数据会显示在 unity 的检查器上，方便调试

- 可以通过在数据上方声明 `[SerializeField]` 将私有数据在 unity 中暴露
- 可以通过在数据上方声明 `[HideInInspector]` 将公有数据在 unity 中隐藏
- 可以通过在数据上方声明 `[Range(m,n)]` 将一个公有数据在 unity 中以滚动条的形式控制从 `m` 到 `n`

```ts
using UnityEngine;

public class Demo : MonoBehaviour {
  private int privateNumber = 100;
  public int publicNumber = 100;

  [SerializeField]
  private int showPrivateNumber = 100;

  [HideInInspector]
  public int hidePublicNumber = 100;

  [Range(0, 100)]
  public int rangeNumber;
}
```

![](https://img-blog.csdnimg.cn/d69dfe3de86b489d8f28e89d3f271f14.png)

