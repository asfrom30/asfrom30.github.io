{% assign gulpPosts = posts | where_exp: "item", "item.category == 'til'" | where_exp: "item", "item.tag contains 'gulp'" %}

{:id="gulp"}

### Gulp ({{gulpPosts.size}})

{% for post in gulpPosts %}

<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b></a>
</li>
{% endfor %}
