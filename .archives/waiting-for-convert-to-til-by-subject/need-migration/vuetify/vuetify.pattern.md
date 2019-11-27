### Lowerversion v-checkbox and v-data-table pattern

```html
<!-- if `item-key` is not exist, v-check box work as all props.item is same -->
<v-data-table v-model="selected" :headers="headers" :items="items" item-key="_id">
  <template slot="items" slot-scope="props">
    <td v-if="selectable">
      <v-layout class="justify-center">
        <v-checkbox v-model="props.selected" color="grey" hide-details style="flex: 0 0 auto"></v-checkbox>
        <span>{{props.selected}}</span>
        <span>{{props}}</span>
      </v-layout>
    </td>
    <td v-for="(header, index) of headers.slice(1,headers.length)" :key="index">
      <div class="text-xs-center">
        <span>{{props.item | objectByString(header.value)}}</span>
      </div>
    </td>
  </template>
</v-data-table>
```
