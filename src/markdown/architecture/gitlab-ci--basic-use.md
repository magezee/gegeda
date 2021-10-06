## 基本使用

> [GitLab CI 专栏](https://juejin.cn/column/7001336650957586445)

### 使用

GitLab CI 用于配合 GitLab 代码仓库使用，一般做的功能即代码提交到远程仓库后，自动进行测试打包发布等工作

> CI：持续集成，即在代码构建过程中持续地进行代码的集成、构建、以及自动化测试等，利于代码提交时通过自动执行测试发现 Bug
>
> CD：在代码构建完毕后，方便地将新版本部署上线，利于快速迭代并交付产品

要使用其功能需要满足三个条件：

- 代码部署在 GitLab 仓库（GitLab 默认为仓库配置了 CI/CD 功能）
- 配置流程文件，即 `.gitlab-ci.yml`
- 配置运行应用



-------

### Runner

GitLab Runner 的功能相当于在一台服务器上开辟一块虚拟内存充当一个应用，与 GitLab 建立联系，执行流程配置命令，然后将结果反馈给 GitLab

GitLab Runner 可以安装在任意服务器中，例如用自己电脑充当服务器，[下载地址](https://docs.gitlab.com/runner/install/)

安装好需要进行[注册](https://docs.gitlab.com/runner/register/index.html)，注册需要填入的相关信息可以从下图所示的代码仓库配置中获取

![](https://img-blog.csdnimg.cn/6a10bb9beb0542a59b34d9df93bf77de.png)

注册好后需要开启服务

```markdown
cd ~
gitlab-runner install
gitlab-runner start
```

> mac 电脑到这步有问题，注册好后 gitlab 一直显示没连接上，可能是设置的权限原因，原因待查找



-----

### 工作流程

> [GitLab CI 构建集成环境](https://juejin.cn/post/6844903637320368135)

默认当代码 commit 或者 push 到远程仓库后，会触发 CI/CD 的流程，通过 `.gitlab-ci.yml` 配置启动相应 Runner 服务器执行配置任务

**Pipeline**

Pipeline 表示一次构建任务，即触发 CI/CD 流程后做的一次完整操作

**Stages**

Stages 表示构建阶段，一个 Pipeline 由一个或多个 Stages 组成，拥有如下特点：

- 所有 Stages 会按照指定顺序运行，完成上一个后才会开始执行下一个
- 默认只有当所有 Stages 成功执行后 Pipeline 才会成功，任意一个失败后面的 Stages 不会执行，Pipeline 失败

**Job**

Job 表示构建工作，一个 Stage 由一个或多个 Job 组成，拥有如下特点：

- 相同 Stage 中的 Jobs 会并行执行
- 每个 Job 相互独立，互不干扰
- 默认只有当所有的 Jobs 成功执行后一个 Stage 才会成功，任意一个 Job 失败都会造成该 Stage 失败

> 默认节省内存只开启一个线程去执行任务，所以不会有并行执行多个任务的效果，如果需要并行执行需要额外进行配置