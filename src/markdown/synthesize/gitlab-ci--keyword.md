## 关键字

> [GitLab CI 关键字](https://blog.csdn.net/github_35631540/article/details/111029151)
>
> [GitLab CI 入门教程](https://blog.csdn.net/Xc_xdd/article/details/109463025?utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.essearch_pc_relevant&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.essearch_pc_relevant)
>
> [GitLab CI 语法](https://blog.csdn.net/weixin_40046357/article/details/106089042)

### 需知

在一个 `.gitlab-ci.yml` 文件中，主要编写的是每个任务的功能，每个任务名可以任意

```yaml
job-1:
  script: echo 'this is job-1'
  
job-2:
  script: echo 'this is job-2'
```

关键字有全局关键字及任务关键字两种，分别写在全局配置及任务配置中，全局关键字一般的作用是为任务配置默认值，即当任务没有声明指定关键字功能时，会从全局关键字配置中获取

```yaml
image: node:latest

job-1:
  script: npm run start
  
job-2:
  script: npm run start

# 相当于
job-1:
  image: node:latest
  script: npm run start
  
job-2:
  image: node:latest
  script: npm run start
```

为了避免任务名和全局关键字冲突，因此任务名不可为以下字段：

- `image`
- `services`
- `stages`
- `types`
- `before_script`
- `after_script`
- `variables`
- `cache`
- `include`

一个任务的执行生命周期如下所示

![](https://img-blog.csdnimg.cn/20201103100840936.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hjX3hkZA==,size_16,color_FFFFFF,t_70#pic_center)

在 `.gitlab-ci.yml` 中的时间单位采用如下写法：

```yaml
job:
  artifacts:
    expire_in: 1 week

    # 其他可以指定的值的类型
    # expire_in: '42'
    # expire_in: 42 seconds
    # expire_in: 3 mins 4 sec
    # expire_in: 2 hrs 20 min
    # expire_in: 2h20min
    # expire_in: 6 mos 1 day
    # expire_in: 47 yrs 6 mos and 4d
    # expire_in: 3 weeks and 2 days
    # expire_in: never
```

 

------

### default

功能：设置任务的默认配置，为了增强可读性，一般可以用的全局配置都写在这里

范围：全局

配置：

- `after_script`
- `artifacts`
- `before_script`
- `cache`
- `image`
- `interruptible`
- `retry`
- `services`
- `tags`
- `timeout`

```yaml
default:
  image: node:3.0
  
job-1:
  script: npm -v          # 3.0版本
  
job-2:
  image: node: latest
  script: npm -v          # 最新版本
```



-----

### stages

功能：用于自定义 stage 的执行顺序

范围：全局

> 如果不指定该关键字属性，则默认的执行 stages 顺序为 `.pre → build → test → deploy → .post` 

```yaml
# 整个构建执行的阶段顺序为 stage-1 → stage-2
stages:
  - stage-1
  - stage-2
```



-------

### stage

功能：用于指定任务运行在哪个阶段

使用范围：任务

> 如果在任务中未指定 stage，则默认在 `test` 阶段上执行

```yaml
stages:
  - stage-1
  - stage-2

job-1:
  # other...
  stage: stage-1
  
job-2:
  # other...
  stage: stage-2
```



------

### variables

功能：在 `.gitlab-ci.yml` 文件中定义变量，使用 `$变量名` 或者 `${变量名}` 来直接引用，变量名一般全大写

> 变量可以定义在 `.gitlab-ci.yml` 和 GitLab 的设置中定义，如果想让变量隐藏，则定义在 GitLab 上，给项目添加的变量只有项目能访问，给群组添加的变量群组中的实例都可以访问，给 GitLab 实例添加的变量整个 GitLab 中的项目都可以访问
>
> GitLab 中定义的变量可以是 variable 类型或者 file 类型，但 `.gitlab-ci.yml` 中定义的变量只能是 variable 类型

范围：全局、任务

优先级：

- `GitLab CI` 中手动点击运行任务且在 UI 上手动设置的变量
- `.gitlab-ci.yml` 任务中设置的变量
- `.gitlab-ci.yml` 中的全局变量
- `GitLab CI` 上设置的变量

> 一般都会给项目内部声明一个 `.env` 文件，然后通过 API 自动读取该文件信息自动在第一种方式上去设置文件中的变量，这样就能根据不同的项目中的配置读取到不同的变量了

```yaml
variables:
  TEST_VAR: "All jobs can use this variable's value"

job-1:
  variables:
    TEST_VAR_JOB: "Only job1 can use this variable's value"
  script:
    - echo "$TEST_VAR" and "$TEST_VAR_JOB"
```

GitLab CI 默认配置了预设的变量，它们以 `CI` 开头，用于便捷获取当前项目的信息

- `CI_COMMIT_REF_NAME`：当前构建项目的分支或 tag 名称
- 



------

### tags

功能：指定用哪台 Runner 服务器来运行任务程序

范围：全局、任务

> 可以为 Runner 服务器指定自定义 tag，在 GitLab 中就可以看到

```yaml
job:
  # other...
  tags:
    # tags可以声明多个，声明多个时使用数组形式，但是执行任务是从gitlab中找到最先瞒住条件的runner，然后用该runner去执行，并不会使用多个runner去执行同一个任务
    - runner-1
    - runner-2
```



-----

### image

功能：指定一个基础的 Docker 镜像作为 Runner 服务器的运行环境，常用的有：node、docker、nginx

范围：全局、任务

```yaml
job:
  # 表示使用最新的node版本环境去运行script命令，如果没有引入对应环境，则会报错找不到npm命令
  image: node:latest
  script: npm run start
```



-----

### script

功能：任务要执行的 shell 脚本内容，会被指定 Runner 在指定 Image 环境下执行

> 如果需要为打印信息添加颜色增强可读性可以看[这里](https://misc.flogisoft.com/bash/tip_colors_and_formatting)

范围：任务

> 在服务器中不需要使用 `git clone ...` 来先把项目弄到服务器上，在 Pipeline 中，每一个 Job 的执行都会将项目下载并缓存，因此往往需要做的只需要额外安装 `npm install`，默认脚本的执行所在目录为项目的根目录

```yaml
stages:
  - install
  - start

install-project:
  # other...
  stage: install
  script: npm install
  
start-project:
  # other...
  stage: start
  script: npm run start
```



-----

### before_script

功能：在 script 命令执行前去执行的命令，一般用于安装依赖、预设环境变量等

> 和 script 执行时用的是同一个 shell

范围：全局、任务

```yaml
job:
  before_script:
    - echo 'job start'
  script:
    - echo 'running job'
```



-----

### after_script

功能：在任务完成后执行，即使任务失败也会被执行，但如果任务被取消或者超时就不会执行了

> 和 before_script、script 用的不是同一个 shell

```yaml
job:
  script:
    - echo 'running job'
  after_script:
    - echo 'job finish'
```



-----

### cache

功能：将当前任务中的一些文件或文件夹缓存起来放在服务器的某个地方，然后再各个任务开始执行时获取这些文件，这样就能将项目的变动让其他任务继承下来，让某个任务可以依赖之前步骤产生的结果，常用于缓存项目依赖包

范围：全局、任务

特点：

- 一个任务中定义的所有 cache 会被归档到一个 `cache.zip` 文件中，存储于 Runner 服务器上，所以可以让不同的 pipeline 也共享一个缓存

- 缓存方式是以键值方式进行存储的，以任务中的 cache.key 为键，cache.zip 为值

- 任务是可以并行运行的，如果并行的任务用到同一个缓存，那缓存会被最后一个完成执行的任务覆盖
- 如果一个任务用到缓存，默认情况下会在开始执行前从 Runner 服务器中获取到 cache.zip，然后在工作目录进行解压覆盖原文件，在任务结束后会将缓存指定的文件重新打包成 cache.zip
- 不同的项目不能共享缓存

配置：

- `paths`：指定需要缓存的文件或目录的路径

- `key`：由于缓存可以被不同的任务共享，当不同任务使用不同的 `path` 设置时，下一个任务会把上一个的缓存覆盖，因此使用 key 来为缓存提供唯一标志符，使用相同 key 的任务都会使用相同的缓存来处理，包括使用缓存和录入缓存
- `key.files`：指定的文件发生变动后会用新的 hash 值建立缓存 key 前缀，最多指定两个文件
  - `key.prefix`：与 `key.files` 配合，使用指定的文件制作 hash 值当成 key 的前缀，如果文件发生变动则重建缓存并放在新的 key 值

- `untracked`：是否根据项目中的 `.gitignore` 配置，不缓存对应的文件，默认 false

- `when`：定义在哪种任务状态下保存缓存，值有三个：
  - `on_success`：默认值，仅在任务成功时缓存
  - `on_failure`：仅在任务失败时缓存
  - `always`：始终缓存
  
- `policy`：默认情况下，任务存在 cache 配置时，则该任务会在开始执行前将对应的文件或目录下载，并在任务结束时重新上传，如果一个任务对其文件无更改是没必要重新上传的，因此出现了该字段用于配置缓存上传策略，值有三个：

  - `pull`：仅在任务开始时下载缓存，完成时不上传更改
  - `push`：仅在任务完成时上传缓存，开始时不下载
  - `pull-push`：默认，在任务开始时下载缓存，完成时上传更改

```yaml
# 如上面的script部分的代码其实正常运行时会报错，因为缺少了缓存的存在，导致start流程的任务中是没有下npm包的，所以需要将将node_modules目录缓存起来，避免后续任务重复下载
stages:
  - install
  - start

install-project:
  # other...
  stage: install
  script: npm install
  cache:
    path:
      - node_modules
  
start-project:
  # other...
  stage: start
  script: npm run start
```



------

### artifacts

功能：用来传递同一 pipeline 中不同 stage 构建的中间结果

范围：全局、任务

特点：

- 在任务完成时会将指定的文件或目录封装成 `artifacts.zip` 发送并存储到 GitLab，如果总大小超过最大 artifacts 大小，则可以在 GitLab UI 中进行下载，[UI 界面下载操作](https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html)
- 默认情况下，开始执行任务前会自动下载之前任务创建的所有 artifacts，可以直接使用
- 可通过 `dependencies` 关键字来控制 artifacts 的下载行为，通过 `needs` 关键字控制只下载指定任务的 artifacts

配置：

- `paths`：指定需要封装的文件或目录的路径
- `name`：指定 artifacts 的名称，该名称会在下载 `artifacts.zip` 时变为该名称，默认名称为 `artifacts`
- `expose_as`：指定在 GitLab UI 上显示的 artifacts 名称

- `exclude`：和 paths 配合，将指定目录下的某些文件排除
- `expire_in`：指定 artifacts 的到期时间
- `untracked`：是否根据 `.gitignore` 将所有 git 忽略的文件也添加到 artifacts
- `when`：定义任务可以上传 artifacts 的条件，值有三个：
  - `on_success`：默认，当任务执行成功才上传 artifacts
  - `on_failure`：当任务失败时才上传 artifacts
  - `always`：始终上传 artifacts

```yaml

```



-----

### dependencies

功能：默认情况下，开始执行任务前会自动下载之前任务创建的所有 artifacts，`dependencies` 指定当前任务需要下载哪些之前任务的 artifacts（按需下载，不要全部下载）

```yaml
build-osx:
  stage: build
  script: make build:osx
  artifacts:
    paths:
      - binaries/

build-linux:
  stage: build
  script: make build:linux
  artifacts:
    paths:
      - binaries/

test-osx:
  stage: test
  script: make test:osx
  dependencies: # 指定只下载 build-osx 生成的 artifacts
    - build-osx

test-linux:
  stage: test
  script: make test:linux
  dependencies: # 指定只下载 build-linux 生成的 artifacts
    - build-linux

# deploy job没有制定具体的，因此按照默认的，回去下载前面所有的 job 生成的 artifacts
deploy:
  stage: deploy
  script: make deploy
```



-----

### needs

功能：调整任务的执行顺序

范围：任务

```yaml
# 这里job1 和 job2 是可以并行的。
# job1之后将会启动job3 (立即执行, 不会等待job2完成作业)
# job2之后将会启动job4 (立即执行, 不会等待job1完成作业)
stages:
    - stage-1
    - stage-2

job-1:
    stage: stage-1
    needs: []
    script: 
      - echo "job-1 started"
      - sleep 5
      - echo "job-1 done"

job-2:
    stage: stage-1
    needs: []
    script: 
      - echo "job-2 started"
      - sleep 60
      - echo "job-2 done"

job-3:
    stage: stage-2
    needs: [job-1]
    script: 
      - echo "job-3 started"
      - sleep 5
      - echo "job-3 done"

job-4:
    stage: stage-2
    needs: [job-2]
    script: 
      - echo "job-4 started"
      - sleep 5
      - echo "job-4 done"

```

![](https://img-blog.csdnimg.cn/20210526214549484.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Npcm9kZW5n,size_16,color_FFFFFF,t_70)





----

### when

功能：定义当前任务能开始运行的条件

范围：任务

值：

- `on_success`，默认，只有当之前的所有任务都成功或者失败的任务具有 `allow_failure:true` 时运行任务
- `manual`：仅在 GitLab UI 手动运行时运行任务，
- `always`：无论之前的任务状态如何，当前任务始终会运行
- `on_failure`：只有之前的任务至少失败一个时才会运行任务
- `dalayed`：延迟指定时间才运行任务
- `never`：始终不运行任务

```yaml
# cleanup_build_job仅在build_job失败时执行。
# cleanup_job无论成功或失败，始终作为管道的最后一步执行。
# deploy_job在 GitLab UI 中手动运行时执行
stages:
  - build
  - cleanup_build
  - test
  - deploy
  - cleanup

build_job:
  stage: build
  script:
    - make build

cleanup_build_job:
  stage: cleanup_build
  script:
    - cleanup build when failed
  when: on_failure

test_job:
  stage: test
  script:
    - make test

deploy_job:
  stage: deploy
  script:
    - make deploy
  when: manual

cleanup_job:
  stage: cleanup
  script:
    - cleanup after jobs
  when: always
```



-------

### only/except

作用：一个项目有多个分支及 tag，为了控制对不同的分支及 tag 在 pipeline 中执行不同的任务，需要用到该功能来控制一个任务是否会被添加进 pipeline

- `only`：满足指定条件后会将任务添加至 pipeline
- `except`：满足指定条件后会将任务排除到 pipeline 外

范围：任务

配置（only 和 except 的配置完全相同）：

- `refs`：根据项目分支名或 pipeline 类型，值可以为以下类型：

  - 分支名称，可以为字符串或正则表达式
  - 关键字：
    - `api`：通过 pipeline 的 [API](https://docs.gitlab.com/ee/api/pipelines.html#create-a-new-pipeline) 触发的 pipeline 
    - `branches`：当 pipeline 的 git 引用是分支时，即操作任意分支都会触发
    - `chat`：由 [GitLab ChatOps](https://docs.gitlab.com/ee/ci/chatops/index.html) 创建的 pipeline
    - `external`：当使用 GitLab 以外的 CI 服务时
    - `external_pull_requests`：在 GitHub 上创建或更新[外部拉取请求时](https://docs.gitlab.com/ee/ci/ci_cd_for_external_repos/index.html#pipelines-for-external-pull-requests)
    - `merge_requests`：对于在创建或更新合并请求时创建的管道，启用[合并请求管道](https://docs.gitlab.com/ce/ci/pipelines/merge_request_pipelines.html)、[合并结果管道](https://docs.gitlab.com/ce/ci/pipelines/pipelines_for_merged_results.html)和[合并训练](https://docs.gitlab.com/ce/ci/pipelines/merge_trains.html)
    - `pipelines`：对于[使用带有](https://docs.gitlab.com/ce/ci/pipelines/multi_project_pipelines.html#create-multi-project-pipelines-by-using-the-api), 或关键字的 [API ](https://docs.gitlab.com/ce/ci/pipelines/multi_project_pipelines.html#create-multi-project-pipelines-by-using-the-api)创建的[多项目管道](https://docs.gitlab.com/ce/ci/pipelines/multi_project_pipelines.html)， [`CI_JOB_TOKEN`](https://docs.gitlab.com/ce/ci/pipelines/multi_project_pipelines.html#create-multi-project-pipelines-by-using-the-api)[`trigger`](https://docs.gitlab.com/ce/ci/yaml/#trigger)
    - `pushes`：对于由 `git push` 事件触发的管道，包括分支和标签
    - `schedules`：对于[预定管道](https://docs.gitlab.com/ce/ci/pipelines/schedules.html)
    - `tags`：当管道的 Git 引用是标签时，即操作任意 tag 都会触发
    - `triggers`：对于使用[触发器令牌](https://docs.gitlab.com/ce/ci/triggers/index.html#trigger-token)创建的管道
    - `web`：对于使用GitLab UI 中的**运行管道**按钮创建的**管道**，来自项目的**CI/CD > 管道**部分

  > 当 only 或 except 中只含 refs 配置时，可以省略 refs 直接写 refs 的值，当一个任务没有指定 only、except、rules 配置时，默认给任务配 only 且值为 brances 和 tags
  >

- `variables`：根据表达式的真假

```yaml
job-1:
  # other...
  only:
    - master
    - /^issue-.$/                            # 仅issue-开头的分支会运行该任务
    
job-2:
  # other...
  only:
    refs:
      - master
      - /^issue-.$/
    variables:
      - $PUSH_ENV && $APP_NAME == 'gegeda'  # 满足指定分支名且该表达式为真才运行该任务
```




-----

### extends

作用：继承一个任务的配置

范围：任务

```yaml
template-job:
  stage: test
  script: echo 'template-job'
  cache:
    when: on_success
    
job:
  extends: template-job
  script: echo 'job'
  cache:
    path: node_modules
    
# job最后的配置
job:
  stage: test
  script: echo 'job'
  cache:
    path: node_modules
    when: on_success
```



-----

### includes

