## Fs

在原生的 node 中使用 [fs](http://nodejs.cn/api/fs.html) 开操作文件及目录

```tsx
const fs = require('fs')             // 直接引入fs处理异步时只能使用回调函数的方式
const fs = require('fs/promises')    // 可以使用promise的方式处理异步，如使用async函数
```

两者写法也会有不同

```tsx
// 原生
fs.mkdir('index.js', (err) => {
  if(err) {
    console.log('创建失败')
    return false
  }
  console.log('创建成功')
})

// promise
fs.mkdir('index.js')
  .then((err) => {
    if(err) {
      console.log('创建失败')
      return false
    }
    console.log('创建成功')
})

// async
const fn = async() => {
  const err = fs.mkdir('index.js')
  if(err) {
    console.log('创建失败')
    return false
  }
  console.log('创建成功')
}
```



----

### 文件系统标志

通过文件系统标志控制文件的读写标准：

- `a`：打开文件进行追加， 如果文件不存在，则创建该文件
- `ax`：打开文件进行追加，但如果路径存在则失败
- `a+`：打开文件进行读取和追加， 如果文件不存在，则创建该文件

- `ax+`：打开文件进行读取和追加， 但如果路径存在则失败
- `as`：以同步模式打开文件进行追加， 如果文件不存在，则创建该文件
- `as+`：以同步模式打开文件进行读取和追加， 如果文件不存在，则创建该文件
- `r`：打开文件进行读取，如果文件不存在，则会发生异常
- `r+`：打开文件进行读写，如果文件不存在，则会发生异常
- `rs+`：以同步模式打开文件进行读写，指示操作系统绕过本地文件系统缓存
- `w`：打开文件进行写入，创建（如果它不存在）或截断（如果它存在）该文件
- `wx`：打开文件进行写入，创建（如果它不存在）或截断（如果它存在）该文件，但如果路径存在则失败
- `w+`：打开文件进行读写，创建（如果它不存在）或截断（如果它存在）该文件
- `wx+`：打开文件进行读写，创建（如果它不存在）或截断（如果它存在）该文件，但如果路径存在则失败



------

### 常用方法

> 如果引的是 `fs/promises` 则下面方法的 callback 可以不写，且下面方法的返回值也是针对使用该方式引入的情况

#### 查询检验

**fs.stat (path, options?, callback)**

- 功能：读取文件或目录状态
- 参数：
  - `path: string | Buffer`：路径
  - `options: object`：配置
    - `bigint: boolean`：对象中的数值是否为长整型数字，默认 false
  - `callback: function(err, stats)`：回调函数
- 返回值：`stats: Stats`：[Stats类的信息](http://nodejs.cn/api/fs.html#fs_class_fs_stats) 

```tsx
fs.stat('./index.js')
  .then((stats) => {
    if(stats.isFile()) {
      console.log('这是一个文件')
    }
    if(stats.isDirectory()) {
      console.log('这是一个目录')
    }
  })
```



-----

#### 操作文件

**fs.mkdir (path, options?, callback)**

- 功能：创建目录
- 参数：
  - `path: string| Buffer`：路径
  - `options: object`：配置
    - `recursive: boolean`：是否允许重复创建重名文件夹（保留子文件），默认 false
  - `callback: function(err)`：回调函数
- 返回值：无

```tsx
fs.mkdir('index.js')
```

-----

**fs.writeFile (file, data, options?, callback)**

- 功能：创建文件并以覆盖的方式写入内容
- 参数：
  - `file: string | Buffer`：文件名
  - `data: string | Buffer | Object`
  - `options: object`：配置
    - `encoding: string`：编码格式，默认值 `utf8`
  - `callback: function(err)`：回调函数
- 返回值：无

```tsx
fs.writeFile('./text.txt',  '写入信息')
```

----

**fs.appendFile (file, data, options?, callback)**

- 功能：创建文件并以追加的方式写入内容
- 参数：
  - `file: string | Buffer`：文件名
  - `data: string | Buffer | Object`
  - `options: object`：配置
    - `encoding: string`：编码格式，默认值 `utf8`
  - `callback: function(err)`：回调函数
- 返回值：无

```tsx
fs.appendFile('./text.txt',  '写入信息')
```

-----

**fs.readFile (file, options? callback)**

- 功能：读取指定文件的全部内容
- 参数：
  - `file: string | Buffer`：文件名
  - `data: string | Buffer | Object`
  - `options: object`：配置
    - `encoding: string`：编码格式，默认值 null
  - `callback: function(err, data)`：回调函数
- 返回值：`data: string | Buffer`，读取的文件内容

```tsx
fs.readFile('./text.txt')
  .then((data) => {
    console.log(data.toString())   // 打印的可能为Buffer信息，手动转string
})
```

-----

**fs.readdir (path, options? callback)**

- 功能：读取目录，只读取指定文件夹下所有子文件/目录，不会再往下读取子目录的内容
- 参数：
  - `path: string | Buffer`：目录路径
  - `options: object`：配置
    - `encoding: string`：编码格式，默认值 `utf8`
  - `callback: function(err, files)`：回调函数
- 返回值：`files: Array<string> | Array<Buffer>`

```tsx
fs.readdir('./dir')
  .then((files) => {
    console.log(files)
})
```

----

**fs.rename (oldPath, newPath, callback)**

- 功能：移动或重命名文件或目录
- 参数：
  - `oldPath: string | Buffer`：旧文件或目录路径
  - `newPath: string | Buffer`：新文件或目录路径
  - `callback: function(err)`：回调函数
- 返回值：无

```tsx
fs.rename('./text.txt', './newText.txt')
```

------

**fs.rm (path, options?, callback)**

- 功能：删除文件和目录
- 参数：
  - `path: string | Buffer`：目录路径
  - `options: object`：配置
    - `recursive: boolean`：当删除的是目录时，如果目录非空则无法正常删除，令该配置为 true 表示递归删除目录
    - `maxRetries: number`：如果删除失败最大重新尝试次数，默认 0
    - `retryDelay: number`：如果删除失败重试之间的等待毫秒，默认 100
  - `callback: function(err)`：回调函数
- 返回值：无

```tsx
fs.rm('./dir', {recursive: true})
```

------

**fs.createWriteStream (path, options?)**

- 功能：创建写入流，用于写入大量数据，不会卡死
- 参数：
  - `path: string | Buffer`：目录路径
  - `options: object`：配置
    - `flags: string`：文件系统标志，默认 `'w'`
    - `encoding: string`：编码格式，默认 `utf8`
  - 返回值：`fs.WriteStream`，[类的信息](http://nodejs.cn/api/stream.html#stream_class_stream_writable)

> 不能通过 `fs/promise` 引入

```tsx
const writeStream = fs.createWriteStream('./text.txt')

const data = '写入数据\n'

for(let i=0; i<100000; i++) {
  writeStream.write(data)
}

writeStream.end()                     // 需要手动关闭管道才能触发finish,且需声明在writeStream.write() 后

writeStream.on('finish', () => {      // 写入完成时执行，固定finish名称
  console.log('写入完成')
})

writeStream.on('error', (err) => {       // 写入失败时执行，固定finish
  console.log(err)
})
```

-----

**fs.createWriteStream (path, options?)**

- 功能：创建读取流，用于读取大量数据，不会卡死
- 参数：
  - `path: string | Buffer`：目录路径
  - `options: object`：配置
    - `flags: string`：文件系统标志，默认 `'r'`
    - `encoding: string`：编码格式，默认 null
  - 返回值：`fs.ReadStream`，[类的信息](http://nodejs.cn/api/stream.html#stream_class_stream_readable)

> 不能通过 `fs/promise` 引入

```tsx
const readStream = fs.createReadStream('./text.txt')

let data = ''

readStream.on('data', (chunk) => {    // 读取时执行，data为固定名称
  data += chunk 
})

readStream.on('end', () => {          // 读取完成时执行，end为固定名称
  console.log(data)
})

readStream.on('err', (err) => {       // 读取失败时执行，error为固定名称
  console.log(err)
})
```

> 读写流管道，读取一个文件的内容并把该内容写入到另外一个文件

```tsx
const readStream = fs.createReadStream('./input.txt')
const writeStream = fs.createWriteStream('./output.txt')
readStream.pipe(writeStream)
console.log('程序执行完毕')
```

