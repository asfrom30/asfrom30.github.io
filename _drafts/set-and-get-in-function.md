---
title: 클린코드 Command / Query Separation (CQS)
layout: draft
---

# 클린코드 : Command / Query Separation (CQS)

### 예시

```js
// simple example
```

함수는 뭔가 수행하거나 뭔가에 답하거나 둘 중 하나만 해야 한다. 둘 다 하면 안된다. 객체 상태를 변경하거나 아니면 객체 정보를 반환하거나 둘 중 하나다. 둘 다 하면 혼란을 초래한다. 클린코드 56p

이 원칙은 생각보다 적용할 곳이 많은데, 나도 에러를 핸들링 하기 위해 아래와 같은 패턴을 즐겨쓰곤 했는데, 아래 패턴은 `CQS` 원칙을 위배한 것이다.

```js
main() {
  const user = UserService.login(username, password);
  if(user === null) throw new Error('user login failed');
  ..
}

class UserService {
  static login(username, password) {
    ..
    return new User();
  }
}
```

위와 같은 코드는 함수 자체에서 에러를 처리해야 한다.

```js
main() {
  UserService.login(username, password); // command
  const user = UserService.getUser(); // query
  ..
}

class UserService {
  static login(username, password) {
    ..
  }
}
```

# 더 들어가기

### 에러 핸들링

변명을 하자면 `DB` 관련 API들이 보통 위와 같은 패턴을 띄었다고 착각했기 때문이다.

앞으로 에러를 핸들링한 코드는 아래와 같이 변경 될 것이다.

```js
main() {
  UserService.login(username, password);
  const user = UserService.getUser();
  ..
}

class UserService {
  static login(username, password) {
    ..
    if(failFlag) throw new Error('user login failed');
  }
}
```

### 예외 : Stateful query

상태를 변경하면서 쿼리를 수행한다.

```java
Element e = Stack<Element>.pop();
```

# 핵심

- Commands return void and queries return values.

```js
int m() // query
void n(); // command
```

- Use exceptions rather than returning and checking for error states.

# Extras

### 참고한 글

- https://hackernoon.com/oo-tricks-the-art-of-command-query-separation-9343e50a3de0

### 더 생각해보기

- https://hackernoon.com/oo-tricks-the-art-of-command-query-separation-9343e50a3de0

### 논의해볼만한 주제

- Command and Query Responsibility Segregation
