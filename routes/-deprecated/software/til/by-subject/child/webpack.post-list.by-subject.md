{% assign webpackPosts = posts | where_exp: "item", "item.tag contains 'webpack'" %}

{:id="webpack"}

### Webpack ({{webpackPosts.size}})

{% for post in webpackPosts %}

<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b></a>
</li>
{% endfor %}
