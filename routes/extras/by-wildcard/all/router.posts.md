---
title: All Posts
layout: router
permalink: /router/posts
---

{% assign excludeDraftPosts = site.posts | where_exp: "item", "item.draft == false" %}
{% assign posts = excludeDraftPosts | where_exp: "item", "item.category != 'til-by-date'" | where_exp: "item", "item.category != 'til-by-subject'" %}

{%- if page.title -%}

<h1 class="page-heading">{{ page.title }} {{posts.size}}</h1>
{%- endif -%}

{% for post in posts %}
{% assign currentdate = post.date | date: "%Y" %}
{% if currentdate != date %}
{% unless forloop.first %}</ul>{% endunless %}

<h2 id="y{{post.date | date: "%Y"}}">{{ currentdate }}</h2>
<ul>
{% assign date = currentdate %}
{% endif %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% if forloop.last %}</ul>{% endif %}
{% endfor %}

<!-- TIL 빼고 모든 포스트 년도 별로 정리하기  -->
<!-- <div class="home layout--center-focused">
  {%- if page.title -%}
  <h1 class="page-heading">{{ page.title }}</h1>
  {%- endif -%}

  <h3>2019</h3>
  <h3>2018</h3>

  {%- if site.posts.size > 0 -%}
  <h2 class="post-list-heading">{{ page.list_title | default: "Posts" }}</h2>
  <ul class="post-list">
    {%- for post in site.posts -%}
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <h3>
      <a class="post-link" href="{{ post.url | relative_url }}"> {{ post.title | escape }} </a>
    </h3>
    <li>
      <span class="post-meta">{{ post.date | date: date_format }}</span>
    </li>
    {%- if site.show_excerpts -%} {{ post.excerpt }} {%- endif -%}
    {%- endfor -%}
  </ul>

  {%- endif -%}
</div> -->

<!-- <p class="rss-subscribe">subscribe
    <a href="{{ " /feed.xml " | relative_url }}">via RSS</a>
  </p> -->
