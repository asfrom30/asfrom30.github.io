---
layout: router
permalink: /router/drafts
needFooter: false
---

{% assign posts = site.posts | where_exp: "item", "item.draft == true" %}

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
