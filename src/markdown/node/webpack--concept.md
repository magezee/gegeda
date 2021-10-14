## 概念

webpack 是一个现代 JavaScript 应用程序的静态模块打包器，打包是为了大幅度降低项目文件的大小，方便请求传输，每当代码更新时，需要再次打包

### 打包流程

**webpack打包过程：module→chunk→bundle**

- **module**

项目里写的代码文件都可以称为module

- **chunk**

module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk文件

> 假如有4个文件：`index.js`、`index.css`、`tool.js` 和 `other.js`，其中 `index.js` 中引入了 `index.css `和 `tool.js` 

```tsx
// webpack.config.js
{
  entry: {
    index: "../src/index.js",
      other: '../src/other.js',
  },
    output: {
      filename: "[name].bundle.js", // 输出 index.js 和 other.js
    }
}
```

由于`index.css`和`tool.js`被`index.js`引入，被一起打包到了最终生成合并文件`index.bundle.js`中，因此这三个属于同一个chunk（chunk0）

而`other.js`是独立打包的，因此生成的`other.bundle.js`是另一个chunk（chunk1）

- **bundle**

webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行

一般一个chunk对应生成一个bundle，但是如果使用了分割代码时或提取文件时，会将从一个bundle中抽离文件

> 如：用 `MiniCssExtractPlugin` 分离 css 文件会生成 `index.bundle.js` 和 `index.bundle.css` 文件

[**Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：**](https://juejin.cn/post/6844904094281236487)

- `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- `确定入口`：根据配置中的 entry 找出所有的入口文件
- `编译模块`：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- `完成模块编译`：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

简单说

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中



----

### 主要配置项

一般在命令配置文件中需要声明以下几个属性并配置

（webpack原本就存在默认配置，这里配置的是将默认配置改成自己设置的，若部分配置不声明 则继续使用默认配置）

- **mode**

  声明处理模式，自带两种模式：开发、生产（生产环境打包要求会更高，且会压缩代码，打包结果磁盘容量占用小）

- **entry**

  指定默认入口文件，webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块，存在多个入口文件时，会输出多个出口文件，否则会将所有js代码合并到一个js文件中

  > entry配置是必填的，若不填则将导致 webpack 报错退出

```tsx
// 可以存在多个入口
entry: {
	home : './src/home.js',
	about: './src/about.js'
}

// 使用多入口时，出口配置不能写死，如filename: 'test.js'需要更改为filename: '[name].js'否则运行会报错
```

- **output**

  指定打包输出文件

  > 默认项目根路径下dist目录，文件名为入口属性名.js（entry: {Home : './src/home.js'} 则输出为Home.js）

```tsx
output: {
	path: path.resolve(__dirname,"../dist"),	// 指定路径
  filename: 'js/main.[Hash:8].js'				// 指定生成文件具体要求
    // 前面可加入路径，可更好管理，最终将入口指定的文件打包，在项目路径/dist/js下生成main.421384ac.js输出文件（哈希数随机生成）
}
```

- **module**

  loader的包在config里的module属性里的rules里配置规则，loader处理的是一种特定文件格式（如.css和.jpg），webpack会根据不同的文件类型使用不同的loader来处理

- **Loader**

  让webpack能够去处理那些非JS文件（webpack自身只理解JS和json），一个文件只能同时被一个loader处理，如果要用到多个loader，必须写正确loader处理顺序（本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果）

- **plugins**

  plugins一般都需要引入到config里才能使用

  plugin的包在config里的plugins属性里通过new一个实例对象来使用，plugin 处理的是大量的资源，插件的范围包括从打包优化和压缩，一直到重新定义环境变量等（插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果）

