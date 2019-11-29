---
layout: book
title: 중급 개발자를 위한 MEAN Stack 공략
author: 아모스 하비브
slug: "Mean Web Development"
category: dev-book
bookCoverUrl: http://image.kyobobook.co.kr/images/book/xlarge/217/x9788960777217.jpg
hasSummary: true
---

# 2\_노드시작

### 자바스크립트 이벤트 구동 프로그래밍

```Java
System.out.print("What is your name");
String name = System.console.().readLine();
System.out.print("Your name is : " + name);
```

사용자가 이름을 입력하기 전까지 2행 이후를 실행하지 않을 것이다. 이는 I/O 연산이 프로그램 나머지 동작을 차단하는 동기식 프로그래밍 기법이다. .. 하지만 자바스크립트는 이렇게 동작하지 않느다. 자바스크립트는 원래 브라우저 연산을 지원하기 위해 작성되었으므로, 자바스크립트는 브라우저 이벤트를 중심으로 설계되었다. 심지어 초기부터 엄청나게 진화해왔음에도 불구하고, HTML 사용자 이벤트를 받아 이를 자바스크립트 코드에 위임한다는 아이디어는 변하지 않았다.

```JavaScript
showNameButton.addEventListener('click', function() {
    // alert...
})
```

이 예제는 단순하지만 자바스크립트가 명령 집합을 실행하기 위한 이벤트 사용 방식을 잘 보여준다. 브라우저는 단일 스레드이므로, 이 예제에서 동기식 프로그램을 사용할 경우에는 페이지에 있는 모든 것을 멈추게 만들어, 모든 웹페이지가 엄청나게 느리게 반응하도록 만들고 일반적인 웹 경험을 악화 시킬 것이다.
<br> &nbsp; 이벤트 루프는 단일 스레드 루프로 브라우저가 무한 실행한다. 이벤트가 전송될 때마다, 브라우저는 이를 큐에 추가한다. 그러면 루프가 큐에서 다음 이벤트를 가져와서 수행한다.
<br> &nbsp; 브라우저는 일반적으로 사용자가 생성한 이벤트를 처리하는 반면, 노드는 다양한 곳에서 생성된 다양한 이벤트 유형을 처리한다.

### 노드 이벤트 구동 프로그래밍

PHP데이터 베이스 상호작용을 관찰하면 쿼리를 질의한 후 결과를 얻기 전까지 기다리는 시간동안 프로세스 리소스가 낭비되고 있다.

```
$output = mysql_query(/* Query */);
echo($output);
```

이런 문제를 해결하기 위해, 많은 웹 플랫폼은 일반적으로 연결당 단일 스레드를 사용하는 스레드 풀 시스템을 구현해왔다. 이런 멀티스레드 유형은 처음에는 직관적일지도 모르지만, 다음과 같은 몇가지 심각한 단점이 존재한다.

- 스레드 관리가 복잡해진다.
- 놀고 있는 스레드가 시스템 자원을 낭비한다.
- 이런 유형의 애플리케이션을 확장하기란 쉽지 않다.

일방향 웹 어플리케이션을 개발하는 중이라면 이 정도는 참을만하다. 브라우저는 상당히 빨리 요청하며 서버 응답 역시 빠르다. 하지만 브라우저와 서버 사이에 수명이 긴 연결을 유지하는 실시간 애플리케이션 구측을 원할 때 어떤 일이 벌어질까?

<br> &nbsp; 이벤트 구동 아키텍처는 웹 애플리케이션을 구축하는 과정에서 자바스크립트의 비동기식 동작 방식을 지렛대로 삼아 서버의 부하를 엄청나게 줄일 것이다. 이런 접근 방법은 자바스크립트 개발자들이 클로저라 부르는 단순한 디자인 패턴 덕분에 가능해진다.

```JavaScript
function parent() {
  var message = 'Hello World';

  function child() {
    alert(message);
  }

  return child;
}

var childFN = parent();
childFN();
```

이런 코드가 몇몇 개발자에게 반직관적인 이유는 일반적으로 parent() 함수의 지역변수는 함수가 수행되는 동안에만 존재해야 마땅하기 때문이다. 이게 바로 클로저의 진가다. 클러저는 함수뿐만 아니라 함수가 생성된 환경이기도 하다.
<br> &nbsp; 클로저가 비동기식 프로그래밍에서 아주 중요한 이유는 자바스크립트 함수가 다른 함수에 인수로 전달 가능한 일등급 객체이기 때문이다. 이는 콜백 함수를 생성해 이를 이벤트 처리기에 인수로 전달할 수 있음을 의미한다. 이벤트가 전송될때 콜백함수가 호출되며, 심지어 부모 함수가 이미 수행되었더라도 콜백 함수를 생성할때 존재했던 어떤 변수도 조작할 수 있다. 이는 클로저 패턴이 이벤트 처리기에 영역상태를 전달할 필요 없이 이벤트 구동 프로그래밍을 활용하게 도와준다는 사실을 의미한다.

### 노드모듈

자바스크립트의 장점은 클로저 패턴과 이벤트 구동 동작 방식이지만 단점은 단일 전역 이름공간을 공유하는 정책이다.

### COMMONJS 모듈

CommonJS는 브라우저 외부에서 자바스크립트로 작업하는 방식을 표준화하기 위해 2009년에 시작된 프로젝트다. 격리된 자바스크립트 모듈을 작성하고 인클루드하는 단순한 명세를 활용해 여러 문제를 해결했다.

```JavaScript
// exports module
var message = 'Hello';
exports.sayHello = function() {
  console.log(message);
}

// main.js
var hello = requre('./hello');
hello.sayHello();
```

또 한가지 방식은 module 객체를 이용하는 방법인데, 이 객체는 원래 모듈에 대한 메타데이터 정보를 제공하기 위해 사용되었다. 또한 exports 객체의 포인터를 속성으로 포함한다. 하지만 단독형 객체로서 exports 객체의 인기있는 구현 방식은 module 객체의 사용사례를 사실상 바꾸어 버렸다.

```JavaScript
// exports module
module.exports = function(){
 var message = 'Hello';
 console.log(message);
}

// main.js
var hello = require('./hello.');
hello();
```

위 예에서 애플리케이션 파일은 hello 모듈의 속성으로 sayHello() 메소드를 사용하는 대신 hello 모듈을 함수로 직접 사용한다.

### 노드 핵심모듈

핵심 모듈은 노드 바이너리로 컴파일된 모듈이다. 핵심모듈은 파일 시스템 접근, HTTP/HTTPS 인터페이스와 같은 노드의 기본 기능 대부분을 제공한다. 핵심 모듈을 올리려면 파일에서 `require` 메소드만 사용하면 된다.

### 노드 외부 모듈

NPM에서 설치하고 `require('express');`

### 노드 파일 모듈

상대 경로와 절대경로의 파일을 지정하면 된다.

### 노드 폴더 모듈

폴더를 지정해도 된다. 해당 폴더에서 `package.json` 파일을 찾으면 해석하려 시도하고 main 속성을 찾는다. 폴더를 지정했을 경우 `package.json` 파일이 없거나 `main` 속성이 정의되어있지 않다면, 노드는 자옹으로 `index.js` 파일을 올리려 시도할 것이다.

### 노드 웹 어플리케이션 개발

```JavaScript
var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type' : 'text/plain'
    });
    res.end('Hello World');
}).liseten(3000);

console.log('Server runnint at 3000 port');
```

위와같이 특정한 기능을 달성하기 위해 저수준 API를 사용하는 노드 코딩스타일을 잘 보여준다. 이 예제가 멋지긴 하지만 저수준 API를 사용해 보충 코드를 상당히 많이 작성할 필요가 있다. 다행히 센차라는 회사가 커넥트라는 노드 모듈 형태의 코드 비계를 이미 만들어 놓았다.

### 커넥트 모듈 만나기

커넥트는 더욱 모듈화된 접근 방식으로 요청을 가로채는 지원 모듈이다. 만일 위 예제를 확장하고 싶으면, 서버로 전송되는 다양한 HTTP 요청을 관리하고 적절히 처리하고, 올바른 내용으로 각 요청에 응답하는 코드를 작성해야만 한다. 커넥트는 미들웨어라는 모듈화된 구성 요소를 사용해 애플리케이션 논리를 미리 정의된 HTTP 요청 시나리오에 간단히 등록하게 만든다. 커넥트 미들웨어는 기본적으로 콜백함수이며, HTTP 요청이 발생할때 실행된다. 미들웨어는 몇가지 논리를 수행하고 응답을 반환하거나 다음에 등록된 미들웨어를 호출한다. 대부분 애플리케이션 요구를 지원하기 위해 맞춤식 미들웨어를 작성하겠지만, 커넥트는 또한 로깅, 정적 파일 서비스등과 같은 몇가지 일반적인 미들웨어도 포함된다.
<br> &nbsp; 커넥트 애플리켜이션은 dispatcher객체를 사용해 동작한다. dispatcher 객체는 서버가 수신하는 각 HTTP 요청을 처리해 순차적인 방식으로 미들웨어 수행 순서를 결정한다.
<br> &nbsp; 익스프레스 동작 방식을 이해하기 위해 커넥트 애플리케이션 생성부터 시작할 것이다.

커넥트 미들웨어는 핵심 모듈이 아니므로 NPM으로 설치한다.

```
$ npm install connect
```

```JavaScript
var connect = require('connect');
var app = connect();
app.listen(3000);
console.log('server running at 3000 port');
```

커넥트 미들웨어는 자바스크립트 함수에 불과하다. 각 미들웨어 함수는 세 인수로 정의 된다. `req`, `res`, `next`. 미들웨어를 정의할 때 `app.use()` 메소드를 사용해 커넥트 애플리케이션에 이를 등록해야만 한다. 위예제에서 커넥트 미들웨어를 포함시켜 보자.

```JavaScript
var connect = require('connect');
var app = connect();

var helloWorld = function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Wordl')
}

app.use(helloWorld);
app.listen(3000);

console.log('server running at 3000 port');
```

커넥트의 가장 강력한 기능 중 하나는 원하는대로 미들웨어를 등록할 수 있는 능력이다. 애플리케이션을 작성할 때 최대의 유연성을 달성하게 한줄로 세워 수행 가능한 일련의 미들웨어 함수 집합을 app.use() 메소드를 사용해 설정할 수 있다. 커넥트는 next 인수를 사용해 현재 수행중인 미들웨어 함수에 다음 미들웨어 함수를 전달 할 것이다. 각 미들웨어 함수에서, 다음 미들웨어 함수를 호출할지 아니면 현재 미들웨어 함수를 중단할지를 결정할 수 있다. 각 커넥트 미들웨어 함수는 더 이상 실행할 미들웨어 함수가 없거나 아니면 다음 미들웨어 함수가 호출되지 않을때까지 next 인수를 사용해 FIFO 순서로 실행될 것임에 주목하자. 이를 제대로 이해하기 위해 서버에 전달되는 모든 명령을 기록하는 logger함수를 추가해보자.

```JavaScript
var connect = require('connect');
var app = connect();

var logger = function(req, res, next) {
  console.log(req.method, req.url);

  next();
}

var helloWorld = function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Wordl')
}

app.use(logger);
app.use(helloWorld);
app.listen(3000);

console.log('server running at 3000 port');
```

등록 순서가 중요한 이유는 각 미들웨어 가 어떤 순서로 실행될지를 결정하기 때문이다. 주목할 다른 항목은 `logger` 안에 있는 `next()` 함수인데 이를 제거하면 미들웨어 함수 실행을 멈출것이다. 이는 다음 미들웨어로 넘어가지 못하고 `res.end()`가 호출되지 못하면서 요청이 영원히 멈춰 있음을 의미한다.

커넥트 미들웨어 마운트를 등록해보자.

```JavaScript
var connect = require('connect');
var app = connect();

var logger = function(req, res, next) {
  console.log(req.method, req.url);

  next();
}

var helloWorld = function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Wordl')
}

var goodbyeWorld = function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('good bye world')
}

app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);
app.listen(3000);

console.log('server running at 3000 port');
```

위에서 logger는 모든 url 요청에 응답하고 `helloWorld`는 `/hello` 요청에만 응답하게 미들웨어를 특정 경로에 마운트 하였다.

<br> &npsp; 커넥트 미들웨어는 자바스크립트 스타일을 염두해 두고 엄청나게 단순하게 만들어졌다. 노드플랫폼의 날렵한 철학을 깨지 않고서도 애플리케이션 논리를 끝없이 확장하게 만든다. 커넥트가 웹 애플리케이션 기반 구조를 작성하는 과정에 엄청난 진보를 가져왔지만, 다른 웹 프레임워크를 사용해왔다면 몇가지 기본 기능이 부족하다고 느꼈을 것이다. 이렇게 된 이유는 노드 공동체의 기본 원칙중 하나에 기인한다. 바로 모듈을 최대한 가볍게 만들어 다른 개발자들이 이 모듈 상단에 자신들의 모듈을 구축할 수 있게 한다는 원칙이다. 노드 공동체는 독자 모듈로 커넥트를 확장해 독자적인 웹 기반 구조를 구축하기로 되어 있다.

# 3\_익스프레스

지금까지 애플리케이션을 생성하기 위해 단일 sever.js 파일을 사용해왔다. 하지만 익스프레스를 사용하면 더 나은 프로젝트 구조에 대해 많은 교훈을 배울 것이다. 애플리케이션을 적절히 구성하고, 애플리케이션 논리를 여러 모듈로 나누는 작업이 가능해진다. 또한 EJS 템플릿엔진사용법, 세션관리, 라우팅 메커니즘 추가 방법도 배울 것이다.

익스프레스에서 자주 사용하는 세가지 주요객체는 1. 익스프레스 애플리케이션의 인스턴스, 2. 요청객체, 3. 응답객체

### 애플리케이션 객체는 다음 메소드를 포함한다.

- app.set(name, value) : 익스프레스가 구성에서 사용할 환경변수를 설정한다.
- app.get(name) : 익스프레스가 구성에서 사용할 환경 변수를 얻는다.
- app.engine(ext, callback) : 특정 파일 타입을 출력하기 위해 필요한 템플릿 엔진을 정의한다. 예를들어 HTML 파일을 템플릿으로 사용하게 EJS 템플릿 엔진에 알리려면 다음처럼 지정한다.

```JavaScript
app.engine('html', require('ejs').renderFile)
```

- app.locals : 애플리케이션 수준의 변수를 출력하기 위해 모든 템플릿에 전송한다.
- app.use([path], callback) : 서버로 전송된 HTTP 요청을 처리하기 위해 익스프레스 미들웨어를 생성한다. 옵션으로, 특정 경로에 응답하는 미들웨어를 마운트할 수도 있다.
- app.VERB(path, [callback...], callback) : 선언된 HTTP VERB가 특정 경로와 연결된 HTTP 요청에 응답하기 위한 미들웨어 함수를 하나 이상 정의한다. 예를들어 GET 동사를 사용하는 요청에 응답하기를 원할 때 app.get() 메소드를 사용해서 미들웨어를 할당할 수 있다. POST 요청에 대해서는 app.post()를 사용하며, 나머지도 유사하다.
- app.route(path).VERB([Callback...], callback)여러 HTTP VERB가 특정 경로와 연결된 HTTP 요청에 응답하기위한 미들웨어 함수를 하나 이상 정의한다. 예를들어, GET과 POST 동사를 사용하는 요청에 응답하기를 원할 때 app.route(path).get(callback).post(callback)을 사용해 적절한 미들웨어 함수를 할당할 수 있다.
- app.param([name], callback) : 특정 라우팅 매개변수를 포함한 경로로 들어오는 요청에 특정 기능을 붙인다. 예를들어 app.param('userId', callback)을 사용해 userId 매개변수를 포함한 요청에 특정 논리를 붙일 수 있다.

사용 가능한 더 많은 애플리케이션 메소드와 속성이 있지만, 이런 기본적인 메소드만 사용해도 개발자가 합리적이라 생각하는 선에서 익스프레스를 확장할 수 있다.

### 요청객체

- req.query : 해석된 query-string 매개변수를 포함한다.
- req.params : 해석된 라우팅 매개변수를 포함한다.
- req.body : 해석된 요청 내용을 인출하기 위해 사용되는 객체다. 이 속성은 bodyParser() 미들웨어에 포함된다.
- req.param(name) : 요청 매개변수 값을 인출한다. 매개변수는 query-string 매개변수, 라우팅 매개변수, JSON 요청 내용에서 얻은 속성이 될 수 있다는 사실에 주목한다.
- req.path, req.host, req.ip : 현재 요청 경로, 호스트 이름, 원격 IP를 인출한다.
- req.cookies: user-agent가 전송한 쿠키를 인출하기 위해 cookieParser() 미들웨어와 함께 사용한다.

요청 객체는 이 책 후반에 더 많은 메소드와 속성을 포함하지만 일반적인 웹 애플리케이션에 흔히 사용하는 메소드와 속성은 위에 제시한 목록 정도면 충분하다.

### 응답객체

응답 객체를 익스프레스 개발 과정에서 자주 사용하는 이유는 이런 응답 객체 메소드를 사용해 서버로 전송된 모든 요청을 처리하며 응답하기 때문이다. 몇가지 핵심 메소드는 다음과 같다.

- res.status(code) : 응답 HTTP 상태 코드를 설정한다.
- res.set(filed, [value]) : 응답 HTTP 해더를 설정한다.
- res.cookie(name,value,[options]) : 응답 쿠키를 설정한다. options 인수는 maxAge 속성과 같은 일반적인 쿠키 구성을 정의하는 객체를 전달하기 위해 사용된다.
- res.redirect([status], url) : 주어진 URL로 요청을 리디렉트한다. 응답에 HTTP 상태 코드를 추가할 수 있다는 사실에 주목하자. 상태 코드를 전달하지 않으면 기본 값으로 '302 FOUND'를 설정할 것이다.
- res.send([body|status], [body]) : 스트리밍이 아닌 응답에 사용한다. 이 메소드는 Content-Type과 Content-Length 헤더를 설정하고 적절한 캐시 해더에 반응하는 등 상당히 많은 배경 작업을 수행한다.
- res.json([body|status], [body]) : 객체나 배열을 전송할 때 res.send() 메소드와 동일하다. 대부분, 개발 편의성을 위해 사용되지만 때로는 null이나 undefined와 같은 비객체를 JSON 응답으로 강제할 경우에 사용할 필요가 있을지도 모른다.
- res.render(view, [locals], callback) : 뷰를 생성하고 HTML 응답을 전송한다.

### 외부 미들웨어

인기 있는 익스프레스 미들웨어는 다음과 같다.

- morgan : HTTP 요청 로거 미들웨어다.
- body-parser : 요청 내용을 해석하는 미들웨어로 다양한 요청 타입을 지원한다.
- method-override : 클라이언트가 지원하지 않는 곳에서 PUT이나 DELETE와 같은 HTTP 동사를 적절히 제공하는 미들웨어다.
- compression : gzip/deflate를 사용해 응답 데이터를 압축하는 미들웨어다.
- express.static : 정적파일을 서비스하는 미들웨어다.
- cookie-parser : req.cookies 객체를 채우기 위한 쿠키 해석용 미들웨어다.
- session : 영속적인 세션을 지원하기 위해 사용하는 미들웨어다.

### MVC 패턴 구현

익스프레스 프레임워크는 패턴에 중립적이다. 이는 다른 웹 프레임워크처럼 미리 정해진 구문이나 구조를 전혀 지원하지 않음을 의미한다.

# 10_MEAN 어플리케이션 테스트

예를들어 개발자는 ORM 메소드가 적절히 동작하고 출력으로 올바른 검증 오류를 제공하는지를 검증하기 위해 단위 테스트를 작성할지도 모른다. 상당히 자주 개발자들은 더 큰 코드 단위를 검증하기 위해 단위 테스트를 작성하는 방식을 선택한다. 이렇게 하는 이유는 대부분 큰 코드 단위가 격리된 연산을 함께 실행하기 때문이다. 결합된 많은 소프트웨어 구성 요소를 포함한 과정을 개발자가 테스트하고 싶다면 E2E 테스트를 작성할 것이다. E2E테스트는 교차 애플리케이션 기능을 검증하기 위해 작성된다. 이런 테스트는 종종 개발자가 둘 이상의 도구를 사용하고 동일 테스트로 UI, 서버, 데이터베이스 구성 요소를 포함해 애플리케이션의 다양한 부분을 검토하게끔 강제한다. 가입 과정을 검증하는 E2E 테스트를 예로 들 수 있다.

### TDD, BDD, 단위테스트

TDD는 소프트웨어 공학도이자 애자일 방법론 옹호자인 켄트 벡이 개발한 소프트웨어 개발 패러다임이다. TDD에서 개발자는 격리된 코드 단위에서 기대되는 요구 사항을 정의한 (초기에 실패하는) 테스트 작성부터 시작한다. 그러고 나서, 개발자는 테스트를 통과하는 최소 코드를 구현할 필요가 있다. 테스트를 성공적으로 통과하면, 개발자는 코드를 깨끗하게 정리하고 모든 테스트를 통과하는지 검증한다. 다음 그림은 시각적인 방식으로 TDD 주기를 기술한다.
