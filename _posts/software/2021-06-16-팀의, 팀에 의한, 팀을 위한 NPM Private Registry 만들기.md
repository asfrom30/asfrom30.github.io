---
category: [posts, sw]

title: 팀의, 팀에 의한, 팀을 위한 NPM Private Registry 만들기
subtitle:
description: 우리 팀만 가지고 있는 npm 저장소(https://www.npmjs.com)가 있다면 얼마나 좋을까요? 팀에서 만든 CLI나 컴포넌트를 npm package로 서로 공유하여 쉽게 다운로드 받아 사용할 수 있는 동시에 외부에 공개되지 않도록 하는 방법에 대해서 알아봅니다.

dev-category: sw
dev-tags: [cloud native, k8s]

assetUrl: /assets/posts/2020-03-01-reliable-component-1-settings
createdAt:
updatedAt:
---

> 주의 : npm install을 하고 build하고 deploy되는 과정에서 코드가 공개되는 것과 같은 휴먼에러는 누구도 막을 수 없습니다. 팀에서 사용하는 secret키나 비밀번호는 절대 저장하지 않도록 하며(이것은 애플리케이션에도 저장하지 않는 원칙과 동일합니다), 명령줄 도구를 공유하거나 원래 배포 목적으로 작성된 프론트엔드 공통 컴포넌트등을 공유하도록 합니다.

# 1. npm registry 띄우기

[verdaccio에서 제공하는 docker image](https://hub.docker.com/r/verdaccio/verdaccio)를 이용합니다.

먼저 팀 네트워크에서 접근 가능하지만 외부에서는 접근 불가능한 서버 인스턴스를 하나 준비합니다. 해당 인스턴스에 도커를 설치하도록 합니다.

```bash
$ docker run -it -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

외부 포트로 4873을 열었으니 해당 인스턴스에서도 보안규칙 또는 inbound룰에서 4873포트를 꼭 열어주시기 바랍니다. 만약 19500번 포트를 열고자 한다면 아래와 같이 포트 번호를 변경한 명령어로 도커이미지를 기동하고, 해당 인스턴스의 포트를 열어주시기 바랍니다.

```bash
$ docker run -it -d --name verdaccio -p 19500:4873 verdaccio/verdaccio
```

저는 편의상 격리된 서버 인스턴스가 아닌 로컬 도커의 포트 4873으로 진행하도록 하겠습니다.

```bash
$ docker run -it -d --name verdaccio -p 4873:4873 verdaccio/verdaccio

$ docker ps
> CONTAINER ID   IMAGE                 COMMAND                  CREATED      STATUS        PORTS                                       NAMES
2a7f20f794e2   verdaccio/verdaccio   "uid_entrypoint /bin…"   3 days ago   Up 1 second   0.0.0.0:4873->4873/tcp, :::4873->4873/tcp   verdaccio
```

# 2. registry에 계정 만들기

`npm publish` 명령어를 사용하기 위해서는 우리가 서빙하고 있는 `verdaccio`에도 계정을 만들어야 합니다.

```bash
$ npm adduser --registry http://localhost:4873
> npm adduser --registry http://localhost:4873
Username: root
Password:
Email: (this IS public) asfrom30@gmail.com
Logged in as root on http://localhost:4873/

$ npm set ca null
```

# 3. publish

저는 `$ myapp`으로 실행하는 명령줄 도구가 필요하였기 때문에 이를 작성했습니다. package 명은 `@asfrom30/linker`로 하였습니다.

npm 명령줄 도구를 만드는 것에 관심이 있으시다면 [이 npm 공식문서](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin)도 같이 보시기 바랍니다.

참고로 package.json은 아래와 같습니다.

```json
{
  "name": "@asfrom30/linker",
  "version": "1.2.0",
  "main": "main.js",
  "dependencies": {
    "execa": "^5.1.1",
    "inquirer": "^8.1.0"
  },
  "devDependencies": {},
  "scripts": {
    "start": "node src/main.js",
    "dev": "nodemon src/main.js",
    "publish-local": "npm publish --registry http://localhost:4873"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "bin": {
    "myapp": "./src/main.js"
  }
}
```

자 이제 소스코드가 준비되었으면 바로 배포하도록 합니다.

```bash
$ npm publish --registry http://localhost:4873

> npm notice
npm notice 📦  @asfrom30/linker@1.2.0
npm notice === Tarball Contents ===
npm notice 227B .eslintrc.js
npm notice 908B src/main.js
npm notice 195B src/data.json
npm notice 449B package.json
npm notice 479B README.md
npm notice === Tarball Details ===
npm notice name:          @asfrom30/linker
npm notice version:       1.2.0
npm notice package size:  1.3 kB
npm notice unpacked size: 2.3 kB
npm notice shasum:        189bb488ed4aa94c9c9f31974220abb0faa65bdb
npm notice integrity:     sha512-aonOYf66XhekI[...]E1bv9xHrBLd1g==
npm notice total files:   5
npm notice
+ @asfrom30/linker@1.2.0
```

웹 브라우저로 해당 NPM Private Registry의 주소로 들어가보면 아래와 같이 잘 publish가 되었음을 확인 할 수 있습니다.

![이미지](/assets/posts/2021/Screen Shot 2021-06-16 at 10.27.43 PM.png)

# 4. 사용하기 (install)

명령줄 도구이기 때문에 저는 global로 설치하도록 하겠습니다.

```bash
$ npm i -g @asfrom30/linker --registry http://localhost:4873
>  + @asfrom30/linker@1.2.0

$ myapp
> Welcome to Team CLI. Select Menu
```

잘 동작하는 것을 확인 할 수 있습니다.
