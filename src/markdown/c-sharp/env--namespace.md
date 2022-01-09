## 命名空间

**作用域**

C# 同项目内的所有代码文件可以看做在一个相同的作用域内，不需要像前端模块化代码那样需引入才可使用

代码文件可使用命名空间来隔绝代码作用域，在代码头部使用 `using` 关键字声明使用的命名空间，这样就可以直接使用另外一个文件里的代码

**项目入口**

每一个 C# 代码文件都需包含一个命名空间，代码逻辑的基本单位是类，即任意代码逻辑都需要写成一个类的成员

最终运行项目时是查找项目中所有代码文件的某命名空间某类下的唯一静态方法 `main` 来当做入口启动

> 一个项目中只允许存在一个以 `main` 命名的静态方法

**依赖**

当使用语言自带依赖包时，引入命名空间可以省略命名空间名，直接使用方法

> 如下面的 `Console.WriteLine()` 如果不引入 `System` 则需要写为 `System.Console.WriteLine()`

```ts
// app1.cs
using System;
using App2;

namespace App1 {
    class Program {
        static void Main(string[] args) {
            Demo demo = new Demo();
            demo.fn();
         }
    }
}
```

```ts
// app2.cs
using System;

namespace App2 {
    class Demo {
        public void fn() {
            Console.WriteLine("this is fn running");
        }
    }
}
```







