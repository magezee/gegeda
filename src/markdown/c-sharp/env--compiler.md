## 编译器

### VSCode

VSCode 是可以支持 Unity 的脚本编写的，因此没有必要在 `Unity Hub` 中下载 Unity 的时候下载 VS，[具体配置官网地址](https://code.visualstudio.com/docs/other/unity)

**NET 环境**

> 下面仅针对 window，mac 会有额外处理，具体看官网

首先需要下载 [.NET Core SDK](https://dotnet.microsoft.com/en-us/download) 和 [.NET Framework](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net471) 

安装成功后可以通过在终端输入 `dotnet` 来看是否自动帮配了环境变量

**插件**

为了适配 Unity，VSCode 需要安装部分插件

- Debugger for Unity
- Unity Tools

**Uinty 设置**

为了让 Unity 使用 VSCode 打开项目脚本，需要更改启动配置项：`编辑 → 首选项`

![](https://img-blog.csdnimg.cn/7a6feb8475f2499db5a954b606156661.png)



-----

### Unity

**脚本模板**

为了更改默认新建脚本模板，可以在 Unity 目录的 `~Editor\Data\Resources\ScriptTemplates` 更改代码模板

```tsx
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

#ROOTNAMESPACEBEGIN#
public class #SCRIPTNAME# : MonoBehaviour {
  void Start() {
    #NOTRIM#
  }

	void Update() {
		#NOTRIM#
	}
}
#ROOTNAMESPACEEND#
```

