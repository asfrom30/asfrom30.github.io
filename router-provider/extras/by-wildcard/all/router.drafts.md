---
layout: router
permalink: /router/drafts
needFooter: false
---

{% assign posts = site.posts | where_exp: "item", "item.draft == true" | where_exp: "item", "item.category != 'til'" %}

{%- if page.title -%}

<h1 class="page-heading">{{ page.title }}</h1>
{%- endif -%}

{% for post in posts %}
{% assign currentdate = post.date | date: "%Y" %}
{% if currentdate != date %}
{% unless forloop.first %}</ul>{% endunless %}

<h2 id="y{{post.date | date: "%Y"}}">{{ currentdate }} Draft</h2>
<ul>
{% assign date = currentdate %}
{% endif %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% if forloop.last %}</ul>{% endif %}
{% endfor %}

{% assign tilPosts = site.posts | where_exp: "item", "item.draft == true" | where_exp: "item", "item.category == 'til'" %}

<h1>TIL Draft ({{tilPosts.size}})</h1>
<!-- This count should exactly match _drafts/tils files count -->
<h5>Not organized TIL by Date </h5>
<ul>
{% for post in tilPosts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
