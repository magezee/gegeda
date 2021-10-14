## 基本概念

### 包管理工具

**npm**

一款 JavaScript 包管理工具

```shell
创建项目依赖package.json	存在package.json时执该命令可更新项目依赖
	npm init --yse（不用yes时会需要手动配置）
下载包
    npm nuinstall module_name
    本地安装(将安装包放在 ./node_modules 下)
    
    -S  在下载包时自动写入dependencies依赖
    npm install module_name -S 等同于 npm install module_name --save

    -D	在下载包时自动写入devDependencies依赖
    npm install module_name -D 等同于 npm install module_name --save-dev

    -g	全局安装（方便cmd命令行使用）
    npm install module_name -g
    
指定版本安装
	npm install  module_name@版本号
卸载包
	npm nuinstall module_name
查看npm包
	npm list                -- 查看当前目录下已安装的node包
	npm info module_name    -- 查看npm包版本
```

**yarn**

一款新的 JavaScript 包管理工具，它的目的是解决这些团队使用 npm 面临的少数问题

- 安装的时候无法保证速度/一致性
- 安全问题，因为 npm 安装时允许运行代码

```shell
初始化
	yarn init	
添加依赖（下载并且自动添加到依赖）
	yarn add module_name
添加指定版本的包
	yarn add module_name@版本号
将包更新到指定版本
	yarn upgrade module_name@版本号
将包更新到最新版本
	yarn upgrade --latest module_name
删除包
	yarn remove module_name
```



----

### 运行项目

**热更新运行**

使用 `nodemon` 运行项目

```shell
npm install -g nodemon
nodemon +路径		-- 注意nodemon应在项目根目录下启动（nodemon ./src/index.js）	
```

**服务端运行**

使用 `server` 运行项目

```shell
npm install -g serve
serve -s +指定目录/文件	-- 启动服务器，将指定文件或目录下所有资源作为姿态资源暴漏出去
```



-----

