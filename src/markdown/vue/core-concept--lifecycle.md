## 生命周期

### 阶段

**图示生命周期**

和 React 一样拥有挂载、更新、销毁三个阶段

![](https://raw.githubusercontent.com/magezee/images/main/life2.png)

**生命周期函数特点**

- `beforeCreate`：由于此时数据代理和数据监听尚未开始，因此此时无法访问到 data 和 methods 中的数据
- `created`：此时可以访问 data 和 methods 中的数据
- `beforeMount`：由于此时虚拟 dom 尚未替换真实 dom，因此页面显示的是原始数据，且在该方法内部对 dom 的操作最终会全部失效（因为后面会用虚拟 dom 全部替换现在的 dom）
- `mounted`：此时显示的是经过 vue 编译的页面，一般在该方法进行开启计时器、发送网络请求、订阅消息、绑定自定义事件等操作
- `beforeUpdate`：此时数据已经更新，但是页面使用的还是旧数据，即数据与页面尚未完成同步
- `updated`：数据与页面完成同步
- `beforeDestroy`：此时 vue 的 data、methods、指令等仍处于可用状态，但是即使操作了数据也不会进行页面更新了，一般在该方法进行关闭定时器、取消订阅消息、解绑自定义事件等操作
- `destroy`：完成销毁

```html
<script>
export default {
  name: 'Demo',
  data() {
    return {
      x: 'x'
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
}
</script>
```

