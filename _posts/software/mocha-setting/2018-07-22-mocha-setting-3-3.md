---
layout: post
author: asfrom30
title:  "Mocha Test Framework Basic - 3/3"
categories: []
tags: []
dev-category: 'sw'
dev-tags: ['javscript', 'testing', 'env']
---

# Npm script에 등록
매번 `mocha` 명령어를 `--require`, 파일 패턴 옵션과 사용하기 번거롭기 때문에 `npm script`에 등록한다.

```json
//package.json
{
  "scripts": {
    "test": "mocha app/**/*.spec.js --require app/mocha.config.js"
  }
}
```

# 파일로 분리

타이핑이 쉬워 졌지만 여전히 `npm script`는 지저분하다. 또 `package.json`에 묶여 있기 때문에 재사용을 하려면 해당 부분을 복사나 잘라내서 사용해야 한다.

따라서 파일 형태로 만들어 보겠다. 결과물은 다음과 같을 것이다.

```json
//package.json
{
  "scripts": {
    "test": "mocha --opts mocha.opts"
  }
}
```

`pakcage.json`과 같은 폴더에 `mocha.opts` 파일을 만든다.

```
// mocha.opts
# target test 
server/**/*.spec.js

# watch option
--watch

# set-up global config
--require app/mocha.config.js
```

`#`은 주석으로 처리된다. target 패턴을 추가하고 싶으면 아래에 계속해서 추가하면된다.