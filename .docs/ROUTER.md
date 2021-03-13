- 어플리케이션 라우터 링크를 수정하려면 `routes.yml`을 수정
- `site.data.routes`로 접근 예시
  ```
  {% for mainRow in site.data.app.routes %}
  ```

### 현재 `site.data.routes`를 사용하는 곳은 두곳

- navigator.html
- home.html

### POST가 경로를 만드는 방법

1. 예시

```
---
...
category: [dev, sw]
...
---
```

/dev/sw/{createdUrl}

2. 예시

```
---
...
category: [dev, sw, foo, bar]
...
---
```

/dev/sw/foo/bar/{createdUrl}
