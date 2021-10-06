## YAML

> [YAML 语法](http://www.ruanyifeng.com/blog/2016/07/yaml.html)
>
> [YAML 语法](https://www.runoob.com/w3cnote/yaml-intro.html)

YAML 是一种专门用于写配置文件的语言，与 JSON 类似，其文件后缀名为 `.yml`

### 基本规则 

- 大小写敏感

- 使用缩进表示层级关系

- 缩进时不允许使用Tab键，只允许使用空格

- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

  

-----

### 字典

使用 `:` 表示一个字典里的 key-value

> 因为 key 可以为任意类型，因此相当于 JS 中的 Map 类型

```yaml
name: jack

# { name: 'jack' }
```

```yaml
person:
  name: jack
  sex: boy
  
# person: {
#   name: jack, 
#   sex: boy
# } 
```



------

### 数组

使用 `-` 表示父层级为一个数组，该元素为数组中的一个子元素

```yaml
friends:
  - jack
  - marry
  - ben
  
# friends: ['jack', 'marry', 'ben']
# 注意：这里的意思是 key为friends，value为一个数组
```

```yaml
friends:
  - name: jack
    sex: boy
  - name: marry
    sex: girl
    
# friends: [
#   {
#     name: jack,
#     sex: boy
#   },
#   {
#     name: marry,
#     sex: girl
#   }
# ]
```

> 上面的写法与下面写法功能一致

```yaml
friends:
  - 
    name: jack
    sex: boy
  - 
    name: marry
    sex: girl
```

多维数组

```yaml
person:
  - 
    - jack
    - marry
  -
    - ben
    - jim
    
# person: [['jack', 'marry'], ['ben', 'jim']]
```



------

### 纯量

纯量是最基本的不可再分的值，包括：

- 字符串
- 布尔值
- 整数
- 浮点数
- Null
- 时间
- 日期

```yaml
boolean: 
  - TRUE                          # true,True都可以
  - FALSE                         # false，False都可以
float:
  - 3.14
  - 6.8523015e+5                  # 可以使用科学计数法
int:
  - 123
  - 0b1010_0111_0100_1010_1110    # 二进制表示
null:
  nodeName: 'node'
  parent: ~                       # 使用~表示null
string:
  - 哈哈
  - 'Hello world'                 # 可以使用双引号或者单引号包裹特殊字符
  - newline                       # 字符串可以拆成多行，每一行会被转化成一个空格
    newline2                      
date:
  - 2018-02-17                    # 日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
  - 2018-02-17T15:02:31+08:00     # 时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```



-----

### 引用

引用使用两个个符号进行配合

- `&` ：锚点，相当于给一个配置起对应变量名
- `*`：引用，相当于使用变量名对应的值

引用有两种方式：

- 令一个 key 的值为对应的引用值

```yaml
jack:
  name: &personName jack
  sex: &personSex boy
  
person:
  name: *personName
  sex:  *personSex

# 等同于：
person:
  name: jack
  sex: boy
```

- 使用 `<<` 符号表示将引入的数据合并添加到当前数据

```yaml
jack: &jackData
  name: jack
  sex: boy
  
person:
  <<: *jackData
  
# 等同于：
person:
  name: jack
  sex: boy
```

可以在任意地方设置锚点和引用（锚点必须要声明在引用前）

```yaml
- &leader jack
- marry
- ben
- *leader

# 等同于
- jack
- marry
- ben
- jack
```

