## 指令

### 存储

Git 的工作流程中有三个区：

- 工作区：对文件或文件内容进行操作
- 暂存区：暂存已经修改的文件
- 远程仓库：用于保存上传的暂存区的文件

项目中有一个隐藏目录 `.git` 用于充当版本库，版本库中存放了许多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有 Git 自动创建的第一个分支 `master`，以及指向` master` 的一个指针叫 `HEAD`，一个分支里有多个版本（多次commit的结果），更改 HEAD 的指针达到寻找到历史版本

> 用 `git add` 实际上是把文件修改添加到暂存区
>
> 用 `git commit`实际上是把暂存区的所有内容提交到当前分支

![](https://img-blog.csdnimg.cn/20200430110926541.png)



-----

### 上传

**基础的文件操作指令**

```shell
# 在当前目录创建仓库（生成.git隐藏文件）
git init 	     		  	
	
# 查看当前文件在哪个工作区，只会显示工作区和暂存区的文件
git status 		  		  		
	
# 将文件从工作区提交到到暂存区
git add +文件名		   		 
	
# 将当前文件夹内所有文件添加到暂缓区
git add --all 或 git add .
	
# 将文件从暂存区提交到仓库
git commit -m +提交描述		
	
# 将本地仓库提交到远程仓库，若没有成功提交 可以尝试 git pull再提交或强制提交 git push -f
git push

# 推送到远程仓库的指定分支，需保证本地和远程的分支名一致
git push origin +分支名

# 将远程仓库（Github对应的项目）复制到本地
git clone +仓库地址
	
# 将暂存区的文件退回到工作区（注意一定要用HEAD表示当前版本）
git reset HEAD 
	
# 将暂存区的指定文件退回到工作区
git reset HEAD +fileName
	
# 将指定文件回到最近一次git commit 或 git add 状态（回滚文件，撤销修改），但是如果已经push提交的话就要进行版本回滚了
git checkout -- +fileName	（如：git checkout -- readme.txt）
```

-----

**设置远程仓库**

方式一：命令行设置

```shell
git remote add origin + 远程仓库地址
git push -u origin master   # 设置完成后第一次上传需要配置主分支
```

方式二：直接在 `.git` 中的 `config` 文件加上配置项，上面命令行配置完后的 config 文件内容也会变成下面这样

```markdown
[remote "origin"]
  url = 仓库地址
  fetch = +refs/heads/*:refs/remotes/origin/*
	
[branch "master"]
  remote = origin
  merge = refs/heads/master
```



------

### 回滚

在 Git 中用 `HEAD` 表示当前版本，上一个版本是 `HEAD^`，上上个是 `HEAD^^`，再往上时就用`~`表示，如往上100个版本是`HEAD~100`

```shell
# 查最近3次commit的记录，以确定要回退的版本
git log 

# 只看commit省略杂余信息
git log --pretty=oneline
	
# 查看记录的每一次命令，以确定要回到未来的哪个版本
git reflog
	
# 使用相对版本回到到上一个版本，当回滚到之前的版本时，要想重新回到未来的版本，需要使用指定版本号
git reset --hard HEAD^
	
# 使用版本号回到指定版本（版本号可在git log中查看，一般只写前几位就行）
git reset --hard f12c6
```



----

### 分支

每一种版本控制系统都以某种形式支持分支，使用分支意味着可以从开发主线上分离开来，然后在不影响主线的同时继续工作

Git 会用该分支的最后提交的快照替换工作目录的内容， 所以多个分支不需要多个目录

```shell
# 查看所有分支（使用git init时默认创建了一个master分支）
git branch
	
# 创建指定分支
git branch +branchName

# 创建分支并切换到该分支
git branch -b +branchName 
	
# 切换到指定分支
git checkout +branchName 

# 创建分支并切换到该分支
git checkout -b +branchName

# 切换到指定分支（推荐使用这个，因为checkout不仅可切换也可以用来撤消修改文件，会混淆）
git switch +branchName
	
# 将指定分支合并分支到当前分支，指定分支的内容会覆盖当前分支
git merge +barnchName
	
# 删除分支（处于该分支时不可删除该分支）
git branch -d branchName
	
# 从远程仓库克隆指定分支的文件
git clone -b branchName +远程仓库地址
```

**分支管理**

在实际开发中，应该按照几个基本原则进行分支管理：

- `master` 分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活

- 开发都在单个需求新的 `dev` 分支上，也就是说，`dev` 分支是不稳定的，到发布时，再把 `dev` 分支合并到 `master`上，用 `master` 上线

- 每个人都在 `dev` 分支上干活，每个人都有自己的分支，时不时地往 `dev `分支上合并就可以了

**注意**

在新建或切换分支时，只会影响已经暂存区的文件，工作区已经修改的文件则会被一并带过去，因此如果需要一个不受影响的分支，需要把原先分支修改的内容先存起来再新建

```shell
git stash
```



------

### 克隆

克隆下来默认显示 master 分支的最新 commit 项目，若想切换到其他分支的项目，需要在克隆项目中创建与远程项目一样的分支，若分支名字不同，更新上传时会遇到麻烦

```shell
# 查看远程仓库的所有分支
git branch -a 	

# 创建dev分支并切换到该分支，且将远程仓库的dev分支内容复制进来
git checkout -b dev origin/dev
```

![](https://img-blog.csdnimg.cn/20200430153138546.png)



-----

### 更新

```shell
# 获取远程最新代码版本
git fetch 	

# 拉取远程最新版本的代码
git pull 	
```

`git fetch` 主要用于在用户检查了文件变动后决定是否合并到工作机的本分支中

`git pull` 是将远程仓库的最新内容下载下来并直接合并，`git pull = git fetch + git merge`，这样有可能会产生冲突，因此一般都是先使用 `git fetch` 再使用`git pull` 来达到更新本地代码的效果

注意的是，这两个命令拉取的是远程仓库上的所有分支，如果只想单独拉取某个分支，可以这么写

```shell
# 获取远程dev分支，存在本地分支dev（无分支自动创建）
git fetch origin dev:dev	

# 将远程分支dev的内容覆盖到当前分支
git pull --rebase origin dev  

# 合并dev的内容
git merge dev		
```

```shell
# 获取远程dev分支，与本地dev分支内容合并
git pull origin dev:dev		
```



-----

### 标签

如果想记录笔记，让每一次项目的内容互不干扰，可以使用 tag（使用分支也可但是会比较麻烦）

思路是：`原始项目内容 → 项目笔记1 → 提交tag1 → 回退至原始项目 → 项目笔记2 → 提交tag2 `

这样 tag1的项目代码和 tag2 是不会有任何关系的

**过程**

提交初始代码

```shell
git add .
git commit -m '初始化'
git push
```

增加项目一代码并添加tag（可以使用 `git tag` 查看所有tag）

```shell
git add .
git commit -m '项目一'
git tag 项目一
```

回退至初始版本

如果回退过程中出现 `Unstaged changes after reset`，可以执行 `git stash` 然后再回退

```shell
git log（查看初代版本号）		
git reset +初代版本号
```

增加项目二代码并添加tag

```shell
git add .
git commit -m '项目二'
git tag 项目二
```

推送至远程仓库

```shell
git push --tags
```

![](https://img-blog.csdnimg.cn/20201027165855171.png)

之后就可以自由使用命令来切换

```shell
git checkout +tag名字
```

