{% assign vuePosts = posts | where_exp: "item", "item.category == 'til'" | where_exp: "item", "item.tag contains 'vue'" %}

{:id="vue"}

### Vue ({{vuePosts.size}})

{% for post in vuePosts %}

<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b></a>
</li>
{% endfor %}
