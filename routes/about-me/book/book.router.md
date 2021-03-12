---
layout: router
title: Books
category: book
permalink: /router/about-me/book
years: ["2018", "2017", "2016"]

slideCount: 2
slideShowUrls: ["/assets/images/slide-show/nature-grass-leaf-green.jpg", "/assets/images/slide-show/black-and-white-book-child-256548.jpg"]
slideQuotes: ["Read Everyday, Lead a Better Life", "배우고 때때로 익히면 어찌 기쁘지 않을손가"]
---

<style>
  {% include_relative book.router.css %}
</style>

{%- include atomic/slide-show/index.html -%}

{% include_relative book.router.html %}
