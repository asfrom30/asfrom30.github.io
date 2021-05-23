{% assign gitPosts = posts | where_exp: "item", "item.tag contains 'git'" %}

{:id="git"}

### Git ({{gitPosts.size}})

{% for post in gitPosts %}

<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b></a>
</li>
{% endfor %}
