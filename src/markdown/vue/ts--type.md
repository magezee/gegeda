## 类型引入

> 此部分内容主要针对 vue3 的script setup 写法

### Vuex

**初始化**

使用 `createStore` 的时候可以指定泛型类型 `rootState` 来控制全局的 state 树类型

> store 的类型可以不加，因为 createStore 会根据泛型返回对应类型的 `Store<S>`，只加 createStore 即可有相关智能提示

```tsx
// store.ts
import { createStore, type Store } from 'vuex'
import state, { type RootState } from './state'
import actions from './actions'
import mutations from './mutations'

const store: Store<RootState> = createStore<RootState>({
  actions,
  mutations,
  state,
})

export default store
```

-----

#### 非模块 

**state**

直接声明具体 state 类型即可

```tsx
// state.ts
interface RootState {
  count: number
}

const state = ():RootState => ({
  count: 0
})

```

------

**actions**

每个 action 的相关方法都会传入 `context`，因此需要引入相关类型 `ActionContext<S, R>`，其中两个泛型分别代表 `state` 和 `rootState` 的类型，如果部分模块则这两个应该相同

```tsx
// actions.ts
import { type ActionContext, type ActionTree } from 'vuex'
import { type RootState } from './state'
import { Mutations } from './mutations'

// 类型体操
type ActionsFunction<V> = (context: ActionContext<RootState, RootState>, value: V) => void
type Actions = ActionsKey & ActionTree<RootState, RootState>       // 如果需要规定actions内方法的属性，须另外指定类型，同时该类型需要符合ActionsTree类型，因此使用交集
type ActionsType = { [key in keyof ActionsKey]: string }

interface ActionsKey {
  add: ActionsFunction<number>,
}

// 导出供外部dispatch使用
export const actionsType: ActionsType = {
  add: 'add'
}

const actions: Actions = {
  add(context, value) {
    context.commit(Mutations.add, value)
  },
}

export default actions
```

------

**mutations**

和 actions 的体操同理，不同的是 `mutation` 方法不提供获取 `rootState` 的方式，因此只需要传入当前模块的 `state` 类型就行，如果不用模块就是根 `state`

```tsx
// mutations.ts
import { type MutationTree } from 'vuex'
import { type RootState } from './state'

// 类型体操
type MutationsFunction<V> = (state: RootState, value: V) => void
type Mutations = MutationsKey & MutationTree<RootState>       // 如果需要规定actions内方法的属性，须另外指定类型，同时该类型需要符合ActionsTree类型，因此使用交集
type MutationsType = { [key in keyof MutationsKey]: string }

interface MutationsKey {
  add: MutationsFunction<number>,
}

// 导出供外部commit使用
export const mutationsType: MutationsType = {
  add: 'add'
}

const mutations: Mutations = {
  add(state, value) {
    state.count += value
  },
}

export default mutations
```

-----

**使用**

在 `setup` 的写法中没必要使用 `map...` 去映射使用，直接使用即可

> 需要注意的是，在 actions 和 mutations 中对函数传入 value 的类型约束不会在外部使用时产生作用，如果想要对  value 值进行约束只能手动封装函数时控制外部函数的传入 value 类型

```html
<template>
  <p>{{ count }}</p>
  <button @click="add(1)"></button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import store from './src/vuex'
import { actionsType } from './src/vuex/actions'

const count = computed(() => store.state.count)
// 手动控制传入值为number
const add = (value: number) => {
  store.dispatch(actionsType.add, value)
}
</script>
```

> 如果要映射则会比较麻烦

```html
<template>
  <p>{{ count }}</p>
  <button @click="add(1)"></button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mapActions, mapState, } from 'vuex'
import store from './src/vuex'
import { actionsType } from './src/vuex/actions'

const count = computed(mapState(['count']).count.bind({ $store: store }))
const add = mapActions([actionsType.add]).add.bind({ $store: store })
</script>
```

-----

#### 模块

模块化开启命名空间时，要考虑的地方便会变多，比如 `demo` 模块中一个 mutations 中的 `add` 函数，在 actions 函数中以 `context.commit('add', value)` 的方式调用，而在外部直接调用时，却是 `store.commit('demo/add')`，如此一来，要以变量的方式去调用就会产生问题，得适配两套方案

因此总的设计思路就是：

- 使用文件夹的方式区分不同模块，在模块文件夹下分别建立 `actions`、`mutations`、`state` 来管理模块的 vuex 逻辑，建立 `index` 用于统一导出模块
- 因为还要考虑外部使用要用如 `demo/add` 格式，因此需要对外再提供一套使用数据，因此在外部文件也建立  `actions`、`mutations`、来管理全局的调用数据，顺便建立 `state` 来管理全局 state，最后建立 `index` 来统一导出外部使用所需的数据

因此文件目录结构设计如下：

![](https://img-blog.csdnimg.cn/b3c8d9b4894941638b7c9823698d781d.png)

**模块**

模块的类型为 `Module<S, R>`，同理需分别传入单模块和根的 `state` 类型

主文件所做的功能是暴露模块和提供 actions 和 mutations 中的函数名类型

```tsx
// vuex/module-demo/index.ts
import { type Module } from 'vuex'
import type RootState from '../state'
import actions, { type ActionsKey as DemoActions } from './actions'
import mutations, { type MutationsKey as DemoMutations } from './mutations'
import state, { type DemoState } from './state'

const demoModule: Module<DemoState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}

export default demoModule
export { 
  DemoActions,
  DemoMutations
}
```

state 文件用于暴露模块的 state 和相关类型

```tsx
// vuex/module-demo/state.ts
export interface DemoState {
  count: number
}

const state = (): DemoState => ({
  count: 0
})

export default state
```

actions 文件用于暴露模块内部 `context.dispatch()` 调用所需数据和暴露 action 函数名类型

```tsx
// vuex/module-demo/actions.ts
import { type ActionContext, type ActionTree } from 'vuex'
import type RootState from '../state'
import { type DemoState } from './state'
import { mutationsType } from './mutations'

type Context = ActionContext<DemoState, RootState>
type ActionFunction<V> = (context: Context, value: V) => void
type Actions = ActionsKey & ActionTree<DemoState, RootState> 
type ActionsType = { [key in keyof ActionsKey]: string }

export interface ActionsKey {
  add: ActionFunction<number>,
}

// 用于给该模块内部的action中的dispatch使用
export const actionsType: ActionsType = {
  add: 'add',
}

const actions: Actions = {
  add(context, value) {
    context.commit(mutationsType.add, value)
  },
}

export default actions
```

actions 文件用于暴露模块内部调用 `context.commit()` 所需数据和暴露 action 函数名类型

```tsx
// vuex/module-demo/mutations.ts
import { type MutationTree } from 'vuex'
import { type DemoState } from './state'

// 类型体操
type MutationsFunction<V> = (state: DemoState, value: V) => void
type Mutations = MutationsKey & MutationTree<DemoState>       
type MutationsType = { [key in keyof MutationsKey]: string }

export interface MutationsKey {
  add: MutationsFunction<number>,
}

// 用于给该模块内部的action中的commit使用
export const mutationsType: MutationsType = {
  add: 'add'
}

const mutations: Mutations = {
  add(state, value) {
    state.count += value
  },
}

export default mutations
```

**全局**

主文件用于生成 store 和暴露外部调用所需的数据，如 `store`、`store.dispatch()` 所需数据 `actionsType`、`store.commit()` 所需数据 `mutationsType`

```tsx
// vuex/index.ts
import { createStore } from 'vuex'

import type RootState from './state'
import actionsType from './actions'
import mutationsType from './mutations'

import demoModule from './module-demo'

const store = createStore<RootState>({
  modules: {
    demoModule
  }
})

export {  
  store,
  actionsType,
  mutationsType
} 
```

state 文件用于暴露全局 state

```tsx
// vuex/state.ts
import { DemoState } from './module-demo/state'
interface RootState {
  demoModule: DemoState
}

export default RootState
```

actions 文件用于给主文件暴露 `store.dispatch()` 所需数据 

```tsx
// vuex/actions.ts
import type RootState from './state'
import { type DemoActions } from './module-demo'

type ActionsType = { 
  [key in keyof RootState]: {
    [key in keyof DemoActions]: string 
  }
} 

const actionsType: ActionsType = {
  demoModule: {
    add: 'demoModule/add'
  }
}

export default actionsType
```

mutations 文件用于给主文件暴露 `store.commit()` 所需数据

```tsx
// vuex/mutations.ts
import type RootState from './state'
import { type DemoMutations } from './module-demo'

type MutationsType = { 
  [key in keyof RootState]: {
    [key in keyof DemoMutations]: string 
  }
} 

const actionsType: MutationsType = {
  demoModule: {
    add: 'demoModule/add'
  }
}

export default actionsType
```

**外部使用**

```html
<template>
  <div class="app">
    <p>{{ count }}</p>
    <button @click="add(1)"></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import{ store, actionsType } from './src/vuex'

const count = computed(() => store.state.demoModule.count)
const add = (value: number) => {
  store.dispatch(actionsType.demoModule.add, value) 
}
</script>
```

**结论**

如果没必要，就不要使用模块，徒增很多代码量，看着很烦

