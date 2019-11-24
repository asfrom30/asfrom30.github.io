---
layout: router
permalink: /router/devs/til/by-date
---

<h1>By Date</h1>

{% assign posts = site.posts | where_exp: "item", "item.category == 'til'" | where_exp: "item", "item.tag == 'by-date'" %}

<h3>Total : {{ posts.size }}</h3>

<h3>List</h3>
{% for post in posts %}
<li>
  <a href="{{ post.url }}"> date: [{{ post.date | date: '%B %d, %Y' }}], title: [{{ post.title }}]</a>
</li>
{% endfor %}
