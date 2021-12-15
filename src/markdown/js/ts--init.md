## 初始化

### 配置文件

Typescript 项目需要拥有 `tsconfig.json` 配置文件，可使用命令行工具进行自动构建，当一个目录中存在该文件，则认为其是项目的根目录

该文件主要包含两个部分：

- 指定待编译文件
- 定义编译选项

为了使用命令行工具来初始化项目，需要全局安装 `typescript`

```shell
npm install -g typescript
```

> 命令：`tsc`，可通过 `tsc + fileName.ts` 将其 ts 文件编译成 js 文件输出

初始化项目

```shell
tsc --init
```

-----

**配置项**

> [了不起的 tsconfig 指南](https://segmentfault.com/a/1190000022809326/)

**compileOnSave**

用于设置编译器在保存文件的时候是否自动编译，如 IDE 在保存文件的时候根据 `tsconfig.json` 重新生成文件

> 如需要在 vs code 上使用需要安装 [atom-typescript ](https://github.com/TypeStrong/atom-typescript#compile-on-save)插件

```json
{
  "compileOnSave": true
}
```

**compilerOptions**

用于配置编译选项 [compilerOptions 选项参考](https://www.tslang.cn/docs/handbook/compiler-options.html)

```json
{
  "compilerOptions": {
    "target": "es5", 
    "module": "commonjs",
  }
}
```

> 如果项目中 webpack 开启 sourceMap，需要在这里同样置 `sourceMap: true`

**exclude**

用于表示编译器需要排除的文件或者文件夹，默认排除 `node_modules` 文件夹

```json
{
  "exclude": [
    "src/lib"
  ]
}
```

**extends**

用于引入其他配置文件信息，继承其配置

```json
{
  "extends": "./tsconfig.base.json"
}
```

**files**

用于表示需要编译单个文件列表

```json
{
  "files": [
    "src/demo.ts"
  ]
}
```

**include**

用于表示需要编译的文件或目录

> `src`：编译目录下所有文件
>
> `src/*`：只编译一级目录下文件
>
> `src/*/*`：只编译二级目录下文件

```json
{
  "include": [
    "src"
  ]
}
```

**references**

用于指定依赖工程

> 如果前后端在同一个目录，依赖同一个配置文件，可以指定该配置进行分别打包

```json
{
  "references": [
    { "path": "./common" }
  ]
}
```

**typeAcquisition**

用于设置自动引入第三方包的类型声明文件（一般通过安装 `@types/xxx` 获得

- `enable`：是否开启该功能，默认 false
- `include`：手动添加第三方包的声明文件
- `exculde`：手动排除包的声明文件

```json
{
  "typeAcquisition": {
    "enable": true,
    "include": ["jest"],
    "exclude": ["jquery"]
  }
}
```



----

### 注意事项

#### 运行

要在 vscode的 `run code` 中直接运行 ts 文件，需要全局安装 `ts-node`

```shell
npm install -g ts-node
```

> 如果使用 ts 来写 webpack 的配置文件，需要在项目中安装该包



-----

#### 引用

一般使用 `@types/moduleName` 来下载对应包的类型声明文件

```shell
npm install webpack @types/webpack
```

引用时使用 `import` 而非 `require`，原因是 `import` 引入的包会带上 `@types/xxx` 的声明文件，而 `require` 则不会

或者使用 `import - require` 的语法引用

```tsx
import webpack = require('webpack')
```

----

