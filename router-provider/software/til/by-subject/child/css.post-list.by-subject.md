{% assign cssPosts = posts | where_exp: "item", "item.tag contains 'css'" %}

{:id="css"}

### CSS ({{cssPosts.size}})

{% for post in cssPosts %}

<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b></a>
</li>
{% endfor %}
