---
layout: post
title: Dialog 분리하기
slug: vuetify-dialo-soc
categories: [dev]
dev-category: "sw"
dev-tags: [vue, vuetify]
---

# 목적

Vuetify 에서 제공하는 예제코드를 살펴보자. [link](https://vuetifyjs.com/en/components/dialogs)

```powershell
- main-component
  └ index.vue
```

```html
<template>
  <v-container>
    <!-- Main Content -->
    <!-- Dialog Btn -->
    <v-btn @click="dialogFlag = !dialogFlag">Show Dialog</v-btn>
    <v-dialog v-model="dialogFlag" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Sandbox Dialog
        </v-card-title>
        <v-btn color="primary" flat @click="onAcceptBtn">
          I accept
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data: function() {
      return {
        dialogFlag: false
      };
    },
    methods: {
      onAcceptBtn: function() {
        this.dialogFlag = false;
        this.doAfterAccept();
      },
      doAfterAccept: function() {
        console.log("I did after accept");
      }
    }
  };
</script>
```

이대로 사용하여도 기능은 문제가 없이 동작한다. 하지만 다이얼로그 하나를 추가하기 위해서 코드는 약 20줄 가량 늘어났다. 여기서 할일은 다이얼로그 컴포넌트를 분리하고 다이얼로그에서 `accept` 버튼을 눌렀을때 우리가 원하는 로직이 실행되게 하는 것이다. 이렇게 작성하면 코드의 길이를 15줄 정도 줄일 수 있고, 다이얼로그를 많이 사용할 수록 그 효과는 더욱 크다.

<br>

다이얼로그가 보여지고 감춰주는 로직은 메인 컴포넌트에서 관심있어하는 부분이 아니다.
마찬가지로 다이얼로그에 표시되는 라벨이나 타이틀도 메인컴포넌트에서 관심있어하는 부분은 아니다.
메인컴포넌트에서는 두가지만 관심이 있는 것이다. 클릭을 했을 때 다이얼로그가 보여지는 것과 accept를 눌렀을 때 어떤 로직(이하 acceptCallback)이 실행 될지.

<br>
코드를 분리하기 위해서 다이얼로그와 관련된 코드를 `local component`로 이동한다. ([local component를 등록하는 방법](https://vuejs.org/v2/guide/components.html))클릭을 했을 때 다이얼로그가 보여지게 하기 위해서는 `local component`에 `refs`로 등록하고 `local component`의 `flag`에 직접 접근하여 값을 변경한다. `accept callback`을 전달하기 위해서는 `local component`에서  `props:Function`으로 main component의 함수를 전달한다.

<br>
목적을 달성한 코드는 아래와 같다.

```powershell
\- main-component
 | \- dialog-factory
 |  └ my-first-dialog.vue
 └ index.vue
```

```html
<template>
  <v-container>
    <!-- Main Content -->
    <!-- Dialog Btn -->
    <v-btn @click="$refs.myFirstDialog.dialogFlag = true">Show Dialog</v-btn>
    <!-- Dialog -->
    <my-first-dialog
      ref="myFirstDialog"
      :acceptCallback="doAfterAccept"
    ></my-first-dialog>
  </v-container>
</template>

<script>
  import MyFirstDialog from "./dialog-factory/my-first-dialog";

  export default {
    components: {
      MyFirstDialog
    },
    methods: {
      doAfterAccept: function() {
        console.log("I did after accept");
      }
    }
  };
</script>
```

```html
<template>
  <v-dialog v-model="dialogFlag" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Sandbox Dialog
      </v-card-title>
      <v-btn color="primary" flat @click="onAcceptBtn">
        I accept
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      acceptCallback: Function
    },
    data: function() {
      return {
        dialogFlag: false
      };
    },
    methods: {
      onAcceptBtn: function() {
        this.dialogFlag = false;
        this.acceptCallback();
      }
    }
  };
</script>
```
