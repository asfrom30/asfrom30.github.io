---
layout: router
title: Quotes
permalink: /router/about-me/words
---

<!-- liquid syntax for javascript -->
<script>
var all =[
{% for post in site.categories.words %}
  {
    "title": "{{post.title}}",
    "author": "{{post.author}}",
    "url": "{{post.url}}"
  }
  {% if forloop.last == false %} , {% endif %}
{% endfor %}
];

var quotes = [
{% for post in site.categories.words-quotes %}
  {
    "title": "{{post.title}}",
    "author": "{{post.author}}",
    "url": "{{post.url}}"
  }
  {% if forloop.last == false %} , {% endif %}
{% endfor %}
];

var bibles = [
{% for post in site.categories.words-bibles %}
  {
    "title": "{{post.title}}",
    "author": "{{post.author}}",
    "url": "{{post.url}}"
  }
  {% if forloop.last == false %} , {% endif %}
{% endfor %}
]

var poets = [
{% for post in site.categories.words-poets %}
  {
    "title": "{{post.title}}",
    "author": "{{post.author}}",
    "url": "{{post.url}}"
  }
  {% if forloop.last == false %} , {% endif %}
{% endfor %}
]

var articles = [
{% for post in site.categories.words-articles %}
  {
    "title": "{{post.title}}",
    "author": "{{post.author}}",
    "url": "{{post.url}}"
  }
  {% if forloop.last == false %} , {% endif %}
{% endfor %}
]

var words = {
  all: all,
  bibles: bibles,
  poets: poets,
  articles: articles,
  quotes: quotes,
}
</script>

<style>
  {% include_relative about-me.words.router.css %}
</style>

<script>
  {% include_relative about-me.words.router.js %}
</script>

{% include_relative about-me.words.router.html %}
