---
layout: router
title: My page
permalink: /router/devs/cheat-sheet
needFooter: false
---

{% assign posts = site.posts | where_exp: "item", "item.category == 'cheat-sheet'" %}

<div class="layout--center-focused">

<h3>All Posts ({{ posts.size }})</h3>
{% for post in posts %}
<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b></a>
</li>
{% endfor %}

{% assign macPosts = site.posts | where_exp: "item", "item.category == 'cheat-sheet'" | where_exp: "item", "item.tag == 'mac'" %}

<h3>Mac Short Cut ({{ macPosts.size }})</h3>
{% for post in macPosts %}
<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b>, {{ post.date | date: '%B %d, %Y' }}</a>
</li>
{% endfor %}

<h3>Vim Short Cut ({{ posts.size }})</h3>
{% assign vimPosts = site.posts | where_exp: "item", "item.category == 'cheat-sheet'" | where_exp: "item", "item.tag == 'vim'" %}
{% for post in vimPosts %}
<li>
  <a href="{{ post.url }}"> <b>{{post.title}}</b>, {{ post.date | date: '%B %d, %Y' }}</a>
</li>
{% endfor %}

</div>
