---
layout: post
title: Reliable Component 1편
subtitle: 준비편
category: [dev, sw]
tags: [testing]
dev-category: sw
dev-tags: [storybook, vue]
updatedAt:
assetUrl: /assets/posts/2020-03-01-reliable-component-1-settings
---

# Project Scaffolding

# 커맨드라인 준비

커맨드라인에서 `vue`가 깔려 있는지 확인한다.

```bash
$ vue --version
```

이미 설치되어 있다면 아래와 같이 출력되고

```bash
@vue/cli 4.2.3
```

없다면 아래와 같이 출력 될 것이다.

```bash
command not found: vue
```

없다면 아래와 같이 글로벌하게 설치한다. 있다면 넘어간다.

```bash
$ npm install -g @vue/cli @vue/cli-service-global
```

잘 설치 되었으면 명령어가 아래와 같이 나올 것이다.

```bash
$ vue --version

# expected output
@vue/cli 4.2.3
```

# Create Project

위에서 설치한 커맨드라인으로 프로젝트를 구조를 자동으로 만들 것이다.

프로젝트의 루트가 되는 곳에서 아래와 같이 입력한다.

```bash
$ vue create .
```

사용자와 상호작용하게 되는데 묻는 말에 아래와 같이 답하자. (y와 default를 선택했다.)

```bash
Vue CLI v4.2.3
? Generate project in current directory? (Y/n) y
? Please pick a preset: (Use arrow keys)
❯ default (babel, eslint)
  Manually select features
```

참고 : Manual을 선택하면 Router나 Vuex 등 Vue 생태계에 지원되고 지원하는 다양한 툴을 사용할 수 있는데, 여기서는 컴포넌트를 하나만 만드는 것이므로 최소한 필요한 babel과 eslint만 사용하도록 한다.

프로젝트가 정상적으로 설치되면 아래와 같이 파일들이 생성된다.

![Image]({{page.assetUrl}}/1.png)

vue cli 최신 버전에서는 node_module까지 모두 설치해주므로, 따로 `npm install` 을 할 필요는 없다.

# Storybook 적용하기

테스팅을 도와줄 도구이다.

스토리북을 매뉴얼 하게 설치하려면 조금 번거로우니, 쉽게 설치하자 여기서 우리의 관심사는 Component Testing이지, Storybook 설치하는 법이 아니다.

```bash
$ npx -p @storybook/cli sb init --type vue
```

package.json을 보면 명령어가 더 늘어난 걸 알 수 있다.

```json
// 스토리북 설치 전
...
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...



// 스토리북 설치 후
...
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test": "echo \"Error: no test specified\" && exit 1",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
...
```

보통은 `npm run serve` 를 실행하고 어플리케이션 개발에 바로 들어갔지만,

이제는!!! 다르다.. (응 뭐가??)

아래와 같이 커맨드를 실행하면 아래와 같이 스토리북 기반에서 브라우저가 실행된다.

```bash
$ npm run storybook
```

![Image]({{page.assetUrl}}/2.png)

다음 2편에서는 애니메이션 컴포넌트를 스토리북 기반에서 만들어볼 것이고
3편에서는 이벤트까지 바인딩 해 볼 것이다.

참고로 스토리북에서는 새 스토리를 추가하더라도 자동으로 추가 되지 않기 때문에 실행할때 이미 스토리가 있어야 된다.
따라서 stories 폴더 안에 `2-AsyncButton.stories` 파일을 만들을 만들었다면
아래와 같이 작성한뒤 스토리북을 재기동하면 (`npm run storybook`)

```js
export default {
  title: 'Async Button',
};
```

아래와 같이 스토리가 더 하나 더 생겼음을 알 수 있다.

![Image]({{page.assetUrl}}/3.png)
