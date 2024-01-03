## Upgrade From Vue2

> Before upgrading cube-ui, please make sure your Vue project is upgraded to Vue3 version

1. Modify component library entrance

```diff
// 1.全量引入
- import Vue from 'vue'
import Cube from 'cube-ui'
- Vue.use(Cube)
+ createApp().use(Cube)

// 2.按需引入
- import Vue from 'vue'
import {
  Style,
  Button,
  ActionSheet
} from 'cube-ui'
- Vue.use(Button)
- Vue.use(ActionSheet)
+ createApp().use(Button).use(ActionSheet)
```

2. `v-model`:`value` to `modelValue`

Since Vue3 changed the property name of `v-model` from `value` to `modelValue`, if you are using the `value` property, please change it to `modelValue`

```diff
- <cube-component :value="value"  @input="doSomeThing"/>
+ <cube-component :modelValue="value" @update:modelValue="doSomeThing"/>
```

3. `slot`:`slot/slot-scope` to `v-slot`

Since Vue 2.6.0 introduced the unified syntax `v-slot` for named and scoped slots, replacing `slot` and `slot-scope`

```diff
- <template slot="slotName" slot-scope="slotProps">···</template>
+ <template v-slot:slotName="slotProps">···</template>
```
