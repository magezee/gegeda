## 类型引入

> 此部分内容主要针对 vue3 的script setup 写法

### Vuex

**初始化**

使用 `createStore` 的时候可以指定泛型类型 `rootState` 来控制全局的 state 树类型

> store 的类型可以不加，因为 createStore 会根据泛型返回对应类型的 `Store<S>`，只加 createStore 即可有相关智能提示

```tsx
// store.ts
import { createStore, type Store } from 'vuex'
import state, { type TypeRootState } from './state'
import actions from './actions'
import mutations from './mutations'

const store: Store<TypeRootState> = createStore<TypeRootState>({
  actions,
  mutations,
  state,
})

export default store
```

-----

**state**

直接声明具体 state 类型即可

```tsx
// state.ts
interface TypeRootState {
  count: number
}

const state = ():TypeRootState => ({
  count: 0
})

```

------

**actions**

每个 action 的相关方法都会传入 `context`，因此需要引入相关类型 `ActionContext<S, R>`，其中两个泛型分别代表 `state` 和 `rootState` 的类型，如果部分模块则这两个应该相同

```tsx
import { type ActionContext, type ActionTree } from 'vuex'
import { type TypeRootState } from './state'
import { Mutations } from './mutations'

// 类型体操
type ActionsFunction<V> = (context: ActionContext<TypeRootState, TypeRootState>, value: V) => void
type Actions = ActionsKey & ActionTree<TypeRootState, TypeRootState>       // 如果需要规定actions内方法的属性，须另外指定类型，同时该类型需要符合ActionsTree类型，因此使用交集

// 遗留问题: 怎么将ActionsKey和Actions联系起来
interface ActionsKey {
  add: ActionsFunction<number>,
}

// 用于给外界dispatch使用
export enum ActionsType {
  add = 'add',
}

const actions: Actions = {
  add(context, value) {
    context.commit(Mutations.add, value)
  }
}

export default actions
```

------

**mutations**

和 actions 的体操同理

```tsx
```



