## Path

在原生的 node 中使用 [path](http://nodejs.cn/api/path.html) 包来处理文件路径

```tsx
const path = require('path')
```

### 常用方法

**path.join (...paths)**

- 功能：根据不同的系统将路径组合
- 参数：
  - `paths: string`：路径片段
- 返回值：`string`：最终路径结果

> window 下的路径分隔符为 `\`，而 linux 下的为 `/`

```tsx
const outputPath = path.join(_dirname,'node','node.js')    // _dirname指当前文件所在目录的绝对路径
// window系统下：C:\project\node\node.js           （假设该文件在 C:\project下）
// linux系统下：/User/gegeda/project/node/node.js  （假设该文件在 /User/gegeda下）
```

------

**path.resolve (...paths)**

- 功能：根据不同的系统将路径解析为绝对路径
- 参数：
  - `paths: string`：路径片段
- 返回值：`string`：最终路径结果

```tsx
const outputPath1 = path.join(_dirname,'node','node.js')
const outputPath2 = path.join(_dirname,'node','node.js','../index.js')
console.log(outputPath1)      // /User/gegeda/project/node.js
console.log(outputPath2)      // /User/gegeda/project/index.js
```

------

**path.parse(path)**

- 功能：将路径解析为一个路径对象
- 参数：
  - `path: string`：路径
- 返回值：`object`：路径对象

> node 中一个文件对象有五个字段：
>
> - root：根目录（一般对应磁盘名）
> - dir：完整目录
> - base：路径最后一部分（可能是文件名或目录名）
> - ext：扩展名
> - name：文件名（不带扩展名）

```tsx
const str = '/User/gegeda/project/node/node.js'
console.log(path.parse(str))

/*
{
  root: '/',
  dir: '/User/gegeda/project/node',
  base: 'node.js',
  ext: '.js',
  name: 'node'
}
/*
```

-----

**path.format (pathObj)**

- 功能：将路径对象解析为一个路径
- 参数：
  - `pathObj: object`：路径对象
- 返回值：`string`：路径

```tsx
const obj = {
  root: '/',
  dir: '/User/gegeda/project/node',
  base: 'node.js',
  ext: '.js',
  name: 'node'
}
console.log(path.format(obj))     // /User/gegeda/project/node/node.js
```

------

**path.extname (path)**

- 功能：返回路径参数的扩展名
- 参数：
  - `path: string`：路径
- 返回值：`string`：返回路径文件的扩展名，无扩展名时返回空字符串

```tsx
const str = '/User/gegeda/project/node/node.js'
console.log(path.extname(str))    // .js
```

-----

