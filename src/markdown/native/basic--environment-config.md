## 环境配置

### 环境搭建

#### Android

安装环境依赖：

- node：版本 >= 12
- java ：版本 = 1.8
- Android Studio

> python：不少文档上说需要 python2 环境依赖，但是实际使用下来不配置也可以正常使用
>
> Adnroid Studio：主要需要其工具下载 sdk 版本以及使用模拟器
>
> java：需要 jre 文件夹的环境，因此需要下载 sdk 包，不下载 jre 包，[下载地址](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)

Java 环境变量配置（配置好后控制台输入 `java` 和 `javac` 有响应）：

- `~/java/bin`
- `~/java/jre`

Sdk 环境变量配置（配置好后控制台输入 `adb` 有响应）：

- `~/Sdk/platform-tools`
- `~/Sdk/emulator`
- `~/Sdk/tools`
- `~/Sdk/tools/bin`

------

#### IOS

> window 系统的电脑不能开发 ios 的系统（除非在虚拟机上进行开发）

[安装环境依赖：](https://www.jianshu.com/p/93c4cd8390d3)

- node
- Watchman

- CocoaPods
- Xcode

> Watchman：安装此工具可以提高开发时的性能
>
> CocoaPods：简称 `pod` —— ios 项目上负责管理依赖的工具，即对第三方库的依赖，开发 ios 项目不可避免地要使用第三方开源库，它可以节省设置和更新第三方开源库的时间
>
> Xcode：构建 ios 项目环境以及使用模拟器

安装 CocoaPods 流程：

> 要装 pod 需要装 `Homebrew` 简称 `brew` ——Mac OSX上的软件包管理工具，能在Mac中方便的安装软件或者卸载软件，相当于 Linux 的 `apt-get、yum`，安装完后可以在终端输入 `brew` 检查是否安装成功

```shell
安装brew

官方给的命令：
	/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	
下载太慢可以换国内源：
	/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

> 安装 ruby：安装完后可以在终端输入 `ruby -v` 来检查是否安装成功

```shell
使用 RVM 安装的方式
rvm install +指定版本        # 安装指定版本
rvm install ruby --head      # 安装最新版本
```

```shell
使用 brew 安装的方式
brew install ruby
```

> 如果报没有指定目录的错误，则在访达查找终端并复制一个终端重命名 `Rosetta终端` 并且右键 `显示简介` 勾上 `使用Rosetta` 打开，然后使用此终端去输入命令下载即可

>  安装 pod：安装完后可以在终端输入 `pod` 来检查是否安装成功

```shell
sudo gem install cocoapods
```



----

### 调试

#### 模拟器

**Android**

下载模拟器：使用 `Android Studio` 打开项目下的 `android` 目录，然后可以使用`AVD Manager` 来查看可用的虚拟设备，在软件右上角右往左数第四个小图标（第一个是账户头像图标），如果刚安装Android Studio则需要创建一个（需要下载）

打开模拟器：直接在项目中 `yarn android` 如果存在模拟器，则会自动打开

> 打开调试终端的快捷键 `ctrl + m`

**IOS**

直接打开 `xcode` 打开项目 `ios` 目录运行项目便会自动打开模拟器

> 打开调试终端的快捷键 `command + d`



----

#### 真机

开启手机配置：`手机开发者模式` → `允许usb调试` → `允许usb安装文件`，等待电脑配置手机成功，然后输入 `adb devices`，若有内容，则说明配置成功

```markdown
C:\Users\MI\Desktop>adb devices
* daemon not running; starting now at tcp:5037
* daemon started successfully

List of devices attached
**di8t9ljzydvgnjts        unauthorized**
```

启动项目：项目输入 `yarn android` （最好不要使用 `yarn start`）启动时会新弹出另一个窗口，用于在 `8081端口` 启动一个服务，这个窗口在开发时是需要保持运行着的，在弹出cmd窗口中选择`To open developer menu press "d"`，此时会在手机上安装应用 `app-native`，等待安装完成即可

> 如果不行可以配置端口再启动

```shell
adb reverse tcp:8081 tcp:8081
```

> 打开调试终端的方式：摇晃手机



-----

#### 注意事项

默认的项目 `debug` 时会启动在 `http://localhost:8081/debugger-ui/` 中进行调试（注意此地址的网页只能打开一个，否则会有错误）



-----

### 创建项目

**脚手架构建初始项目**

```markdown
JS版本
	npx react-native init native_test
TS版本
	npx react-native init native_test --template react-native-template-typescript
```

项目中生成两个文件夹 `android` 和 `ios` 

<img src="https://img-blog.csdnimg.cn/20210119131318415.png" style="margin:0;width:300px">

```markdown
启动android
	yarn android
启动ios
	yarn ios
都是在项目根目录的位置去启动
```

启动项目会弹出一个新的终端显示项目相关情况，如果想重新执行启动项目需要把该终端关掉才能正常启动

