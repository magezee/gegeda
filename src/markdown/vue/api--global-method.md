## 全局方法

> 全局方法只在新建 vue 应用的文件中使用

### Vue.set

`Vue.set (target, key, value)`：

- 功能：动态设置实例对象的属性，且保证该属性是响应式的

- 参数：
  - `target： Object | Array`：要设置的属性
  - `key: string | number`：要设置的对象属性或者数组下标
  - `value: any`：属性的值

> 如果是先手动设置对象属性再用该方法，则只是修改其内部值，不会有响应式

```html
```



