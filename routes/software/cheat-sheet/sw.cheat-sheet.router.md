---
layout: router
title: Cheat Sheet
permalink: /router/devs/cheat-sheet
needFooter: false
---

<!-- TODO: Cheat Sheet는 tag를 하나만 쓰게 설계 되어 있네. 수정하자 -->

{% assign groupedPostsByTag = site.posts | where_exp: "item", "item.category == 'cheat-sheet'" | group_by: "tag" %}

<div class="layout--center-focused">

<h1>All Cheat Sheets ({{ groupedPostsByTag.size }})</h1>

{% for group in groupedPostsByTag %}

<h3 class="f-tt-capital">{{group.name}}</h3>
  <ul>
  {% for post in group.items %}
  <li> <a href="{{ post.url }}"> <b>{{post.title}}</b></a> </li>
  {% endfor %}
  </ul>
{% endfor %}

</div>
