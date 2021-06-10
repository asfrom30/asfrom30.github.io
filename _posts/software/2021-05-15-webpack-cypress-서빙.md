---
category: [posts, sw]

title: Webpack x Cypress
subtitle:
description: npm run e2e 명령어로 Webpack Dev Server를 기동하고 이어서 Cypress까지 기동하는 테스트 환경을 구축해봅니다.

dev-category: sw
dev-tags: [cypress]
---

# 들어가며

## 목표

`npm e2e` 명령어로 webpack dev server를 기동하여 소스파일을 서빙하고 cypress로 어플리케이션 테스트를 자동화한다.

## 전략

`Webpack`과 `Cypress` 모두 CLI로는 많이 실행하였지만, 여기서는 `Programmatically` 하게 실행함으로써 도구 간 파라메터를 전송 가능하게 한다.

# Run webpack through NODE API

참고 : https://webpack.js.org/configuration/dev-server/#devserver

```sh
$ npm init -y
$ npm i -D webpack webpack-dev-server html-webpack-plugin
```

다음으로 `src/index.html`과 `src/main.js` 파일을 만든다

```js
alert("Hello Cypress. I am Webpack");
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cypress x Webpack</title>
  </head>
  <body>
    <h1>Hello Cypress. I am Webpack</h1>
  </body>
</html>
```

다음과 같이 `webpack.config.js`를 만든다.

```js
"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
```

cli 상에서 webpack을 서빙하는 것이 아니라 NODE API를 이용해서
`serve-using-webpack.js`를 만들어서 다음과 작성한다.

```js
"use strict";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  open: true,
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8080, "127.0.0.1", () => {
  console.log("Starting server on http://localhost:8080");
});
```

이제 `$ node server-using-webpack.js`를 실행하면 아래와 같이 될것이다.

![vue](/assets/posts/2021/Screen Shot 2021-05-15 at 10.13.43 PM.png)

# Run Cypress through NODE API

참고 : https://docs.cypress.io/guides/guides/module-api#cypress-run

```sh
$ npm i -D cypress execa
```

`run-cypress.js` 파일을 만들고 아래와 같이 작성한다.

```js
const path = require("path");
const execa = require("execa");

// CYPRESS
const cypressBinPath = path.join(__dirname, "node_modules", "cypress/bin/cypress");

const url = "http://localhost:8081";
const args = {
  headless: false,
  config: "watchForFileChanges=true",
};
const rawArgs = [];
const configs = typeof args.config === "string" ? args.config.split(",") : [];

const cyArgs = [
  args.headless ? "run" : "open", // open or run
  "--config",
  [`baseUrl=${url}`, ...configs].join(","),
  ...rawArgs,
];

const runner = execa(cypressBinPath, cyArgs, { stdio: "inherit" });
```

`$ node run-cypress.js`를 실행하면 `cypress`폴더가 생기면서 안에 꽤 많은 파일이 생기게 된다.
`cypress/integration/examples` 안에 들어 있는 샘플 테스트 파일을 모두 지우고

`sample.spec.js`라는 파일을 만들고 아래와 같이 작성한다.

```js
/// <reference types="cypress" />

describe("", () => {
  before(() => {
    cy.visit("/");
  });

  it("", () => {});
});
```

# Cypress x Webpack

자 이제 두개를 합칠 시간이다.

합치기 위해서는 `serve-using-webpack.js`과 `run-cypress.js`를 함수로 호출할 수 있게 변경해야 한다.

- `serve-using-webpack.js`

```js
"use strict";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");

module.exports = async (host, port) => {
  const compiler = Webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {});
  const server = new WebpackDevServer(compiler, devServerOptions);

  return new Promise((resolve, reject) => {
    server.listen(port, host, () => {
      console.log("Starting server on http://localhost:8080");
      resolve();
    });
  });
};
```

- `run-cypress.js`

```js
const path = require("path");
const execa = require("execa");

// CYPRESS
const cypressBinPath = path.join(__dirname, "node_modules", "cypress/bin/cypress");

module.exports = async (host, port) => {
  const url = `http://${host}:${port}`;
  const args = {
    headless: false,
    config: "watchForFileChanges=true",
  };
  const rawArgs = [];
  const configs = typeof args.config === "string" ? args.config.split(",") : [];

  const cyArgs = [
    args.headless ? "run" : "open", // open or run
    "--config",
    [`baseUrl=${url}`, ...configs].join(","),
    ...rawArgs,
  ];

  const runner = execa(cypressBinPath, cyArgs, { stdio: "inherit" });
};
```

그리고 다음과 같이 `e2e.js`를 작성하면 웹팩을 기동한 후에 cypress가 실행될 것이다.

```js
const serveUsingWebpack = require("./serve-using-webpack");
const runCypress = require("./run-cypress");

(async () => {
  const host = "127.0.0.1";
  const port = 8080;
  await serveUsingWebpack(host, port);
  await runCypress(host, port);
})();
```

```json
// package.json
{
  ...
  "scripts": {
    "e2e": "node e2e.js"
  }
  ...
}
```

```sh
$ npm e2e
```

다음과 같이 웹팩이 기동되고 자동으로 cypress가 서빙된다.
![screenshot](/assets/posts/2021/Screen Shot 2021-05-15 at 10.58.59 PM.png)

# 더 나아가기

아래와 같은 방법이 더 좋을 수 있겠지만 현재는 `Cypress` 인스턴스에서 쓸수 있는 api가 많지 않아서 매한가지 일 것 같다.

```js
const cypress = require("cypress");
cypress.run();
```
