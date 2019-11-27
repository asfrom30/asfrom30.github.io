# grid

```html
<v-layout justify-space-between style="height:100px">
  <v-flex xs6 style="border: 1px solid red">
    <v-flex xs6 style="border: 1px solid green">hhh</v-flex>
  </v-flex>
  <v-flex xs3 style="border: 1px solid blue"> </v-flex>
</v-layout>
```

### v-container must be pa-0 ma-0

```html
<v-container style="border: 1px solid cyan;" fluid fill-height class="ma-0 pa-0">
  <v-layout style="border: 1px solid red;" fill-height row wrap>
    <v-flex style="border: 1px solid black; height:100px" fill-height xs3></v-flex>
    <v-flex style="border: 1px solid black;" fill-height xs3></v-flex>
    <v-flex style="border: 1px solid black;" fill-height xs3></v-flex>
    <v-flex style="border: 1px solid black;" fill-height xs3></v-flex>
    <v-flex style="border: 1px solid black;" fill-height xs3></v-flex>
  </v-layout>
</v-container>
```

### slot

```html
<v-checkbox class="border-w" color="red darken-3" v-model="switchFlag.gazeX" :append-icon-cb="toggleGazeX()">
  <v-flex slot="append">append</v-flex>
  <v-flex slot="default">deafult</v-flex>
  <v-flex slot="prepend">prepend</v-flex>
</v-checkbox>
```

# Customizing

### `v-check-box`

```css
i {
  font-size: 10px;
}
```

# Tricky Part

### v-dialog

- official but it won't work

```html
<template v-slot:activator="{ on }">
  <v-btn color="red lighten-2" dark v-on="on">
    Click Me
  </v-btn>
</template>
```

because you should check your vue version support v-slot

```html
<v-dialog v-model="dialog" width="500">
  <template slot="activator">
    <v-icon>bug_report</v-icon>
  </template>

  <v-card>
    <v-card-title class="headline grey" primary-title>For Dev</v-card-title>

    <v-card-text>
      <div></div>
    </v-card-text>
  </v-card>
</v-dialog>
```

# Trouble Shooting

### V-Slider
