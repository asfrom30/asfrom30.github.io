### Request using https

```js
const baseUrl = '/api/posts/dev' // case 1
const baseUrl = '/api/posts/dev/' // case 2

function fetchAllPosts() {
  $.ajax(baseUrl).done(function(data) {
    const res = JSON.parse(data);
    setGlobalPosts(res);
  });
}
```

trailing `/` is important. case 1 will call http url. missing trailing `/`. You must declare `/`