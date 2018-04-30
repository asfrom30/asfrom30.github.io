# Disqus
# shortname setting
* https://desiredpersona.com/disqus-comments-jekyll/
* https://help.disqus.com/installation/whats-a-shortname

디스커스 홈페이지에서 홈페이지를 등록할 때 shortname이 생성된다.jekyll에서는 `_config`에서 설정한다.
```
disqus:
    # Leave shortname blank to disable comments site-wide.
    # Disable comments for any post by adding `comments: false` to that post's YAML Front Matter.
    shortname: your short name
```

```
# Disqus Comments
disqus:
    # Leave shortname blank to disable comments site-wide.
    # Disable comments for any post by adding `comments: false` to that post's YAML Front Matter.
    shortname: http-asfrom30-github-io
```

# Edit the RECOMMENDED CONFIGURATION VARIABLES
### modify `_config.yml`

```ini
url: "https://asfrom30.github.io"
```
### js code
```js
var disqus_config = function () {
    this.page.url = "{{site.url}}{{page.url}}";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = "{{site.url}}{{page.url}}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
```

