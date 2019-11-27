---
layout: router
title: Cheat Sheet
permalink: /router/devs/cheat-sheet
needFooter: false
---

{% assign groupedPostsByTag = site.posts | where_exp: "item", "item.category == 'cheat-sheet'" | group_by: "tag" %}

<div class="layout--center-focused">

<h1>All Cheat Sheets ({{ groupedPostsByTag.size }})</h1>

{% for group in groupedPostsByTag %}

<h3 class="f-tt-capital">{{group.name}}</h3>
  {% for post in group.items %}
  <li> <a href="{{ post.url }}"> <b>{{post.title}}</b></a> </li>
  {% endfor %}
{% endfor %}

</div>
