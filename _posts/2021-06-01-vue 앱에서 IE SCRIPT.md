---
category: [posts, sw]

title: Vue 앱에서 IE SCRIPT 에러 해결하기
description: Vue CLI에서 번들 디펜던시(node_modules)가 Babel로 트랜스파일링 되지 않는 이유와 해결 방법에 대해서 알아보도록 합니다.

assetUrl:
---

# 서론

얼마전에 아주 끔찍한 경험을 했습니다. 서비스의 URL 쿼리 파라메터의 스펙을 변경해달라는 요구 사항을 받았습니다. 코드는 두세줄 내외로 아주 간단한 코드였습니다. 테스트 환경에서의 QA는 물론 배포 완료 후 라이브 QA까지 완료 되었기 때문에, 별다른 문제가 없을거라고 판단하고 퇴근 준비를 하고 있었습니다.

하지만 왜 슬픈 예감은 틀린적이 없을까요.

퇴근 한두시간 전쯤 IE에서 서비스가 동작하지 않는 것 같다는 제보를 받았습니다. 곧바로 IE 환경에서 접속해보니 `SCRIPT 1002` 에러와 함께 애플리케이션이 동작하지 않는 것을 볼 수 있었습니다.

{: .image}
![img](/assets/posts/2021/2021-06-01-0.png)

{: .image--label}
IE에서 발생한 구문오류

이전 애플리케이션 버전에서는 쿼리 파라메터를 직접 빌드했지만, 이후 버전에서 `query-string` 이라는 디펜던시를 추가하고 사용했던 것이 문제의 원인이였습니다. 곧바로 `query-string` 의 디펜던시를 제거하고 해당 함수를 직접 구현하여 서비스를 배포하였습니다.

`babel`과 `browserlist`의 설정도 잘 해 놓았는데 왜 이런일이 생기게 된걸까요? 그리고 어떻게 해결할 수 있을까요?

# 왜 발생하였는가?

`Vue CLI`에서 제공하는 webpack의 `babel-loader` 설정은 기본적으로 `node_modules` 에 있는 코드는 트랜스파일링 하지 않습니다. [Vue CLI 공식문서](https://cli.vuejs.org/config/#transpiledependencies)에는 아래와 같이 써 있습니다.

> By default babel-loader ignores all files inside node_modules. If you want to explicitly transpile a dependency with Babel, you can list it in this option.

제 생각에는 공식 문서가 약간 햇갈리게 기재한것 같은데, 정확히 말하면 Vue CLI의 babel-loader가 무시하는 것이지요. 실제로 Vue CLI가 아닌 webpack과 babel-loader로만 프로젝트를 설정하고 트랜스파일링 하면 `node_modules`도 트랜스파일링이 이루어 집니다.

Vue CLI에서는 `node_modules` 의 코드들이 기본적으로 원하는 브라우저 타겟에 맞춰서 트랜스파일링되어 배포 되었다고 생각을 하는 것 같습니다. 모든 `node_modules`를 트랜스파일링하는 것은 개발 속도와 빌드 속도에 영향을 미치니까요.(이 때문에 babel-loader에서는 `exclude`에 명시적으로 `node_modules`를 기재하여 트랜스파일링 무시를 가이드하고 있습니다.)

사용하는 패키지가 es5로 트랜스파일링하여 배포되었다면 아무런 문제가 되지 않지만, 간혹 es6으로 배포된 패키지가 있고 이 때문에 번들링을 하더라도 트랜스파일링이 이루어지지 않기 때문에 es5와 es6이 혼용된 상태로 번들링이 이루어지는 것입니다.

제가 겪었던 `query-string`을 상세하게 예로 들자면 배포된 코드가 `arrow function`을 사용하고 있었고 IE에서 `Syntax 1002` 구문에러를 발생시켰습니다.(똑같이 `arrow funcion`을 사용하지만 src안에 있는 소스코드는 설정에 맞춰서 트랜스파일링 됩니다. 즉 소스코드에 `arrow function`은 `function(){}`코드로 변환됩니다.)

**요약하자면 Vue CLI의 babel-loader의 기본 설정은 소스코드는 browserlist에 맞춰 트랜스파일링하지만, `node_modules`는 트랜스파일링하지 않는다. 따라서 es6로 배포된 패키지를 사용하게 되면 트랜스파일링이 이루어지지 않게 되고, 이것이 IE에서 문제를 일으킬 수 있다.** 정도가 되겠습니다.

# 어떻게 해결하는가?

## transpileDependencies

vue.config.js 문서를 보면 transpileDependencies 에 패키지 이름을 입력하면 해당 node_modules도 트랜스파일링을 시켜준다고 되어 있습니다.

[https://cli.vuejs.org/config/#transpiledependencies](https://cli.vuejs.org/config/#transpiledependencies)

```js
// vue.config.js
module.exports = {
  transpileDependencies: ["query-string"],
};
```

위와 같이 설정하고 어플리케이션을 재기동하면 될까요?

여전히 IE에서 `SCRIPT 1002` 에러가 발생하고 있습니다.

## 의존성의 의존성까지 해결해야 한다.

`transpileDependencies`에 선언해야 될 패키지는 내가 설치한 패키지 뿐만 아니라 해당 패키지가 가지고 있는 의존성 패키지까지도 트랜스파일링시켜줘야 하기 때문입니다.

그러면 어떤 패키지가 트랜스파일링되지 않았는지 어떻게 알 수 있을까요?

잠시 `vue.config.js` 파일을 아래와 같이 변경해봅니다.

```js
// vue.config.js
process.env.NODE_ENV = "production";

module.exports = {
  configureWebpack: {
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  },
};
```

설정을 변경하고 애플리케이션을 기동하면 패키지가 하나로 번들링 되는 것이 아니라 개별적 이름을 가지고 번들링되게 됩니다.

![asset](/assets/posts/2021/2021-06-01-3.png)

이 상태에서 애플리케이션을 기동하면 어떤 패키지에서 에러가 발생했는지 알 수 있습니다.
![asset](/assets/posts/2021/2021-06-01-4.png)

이 정보를 바탕으로 다시 `transpileDependencies`에 입력하면

```js
// vue.config.js
module.exports = {
  transpileDependencies: ["query-string", "split-on-first", "strict-uri-encode"],
};
```

원하는 의존성 패키지가 정상적으로 es5 문법으로 트랜스파일링 되어 IE에서 정상 기동 됨을 알 수 있습니다.
