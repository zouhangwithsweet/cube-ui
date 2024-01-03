## 从Vue2升级

> 升级cube-ui前，请您确保您Vue项目以升级至Vue3版本

1. 修改组件库入口

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

2. `v-model`:`value`改为`modelValue`

由于Vue3把`v-model`的属性名从`value`改为`modelValue`，所以如果您使用了`value`属性，请改为`modelValue`

```diff
- <cube-component :value="value"  @input="doSomeThing"/>
+ <cube-component :modelValue="value" @update:modelValue="doSomeThing"/>
```

3. `slot`:`slot/slot-scope`改为`v-slot`

由于Vue2.6.0为具名插槽和作用域插槽引入了统一语法`v-slot`，取代了`slot`和`slot-scope`

```diff
- <template slot="slotName" slot-scope="slotProps">···</template>
+ <template v-slot:slotName="slotProps">···</template>
```
