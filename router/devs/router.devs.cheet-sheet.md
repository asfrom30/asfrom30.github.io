---
layout: default/with-nav
title: My page
permalink: /router/devs/cheet-sheet
---
{% assign posts = site.posts | where_exp: "item", "item.category == 'cheet-sheet'" | where_exp: "item", "item.tag == 'mac'" %}
<h3>Mac Short Cut ({{ posts.size }})</h3>
{% for post in posts %}
<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b>, {{ post.date | date: '%B %d, %Y' }}</a>
</li>
{% endfor %}


<h3>Vim Short Cut ({{ posts.size }})</h3>
{% assign vimPosts = site.posts | where_exp: "item", "item.category == 'cheet-sheet'" | where_exp: "item", "item.tag == 'vim'" %}
{% for post in vimPosts %}
<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b>, {{ post.date | date: '%B %d, %Y' }}</a>
</li>
{% endfor %}
