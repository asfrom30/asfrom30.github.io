---
layout: post
title:  헤드퍼스트 디자인패턴
slug: head-first-design-pattern 
author: 에릭 프리먼
category: dev-book
bookCoverUrl : http://image.kyobobook.co.kr/images/book/large/409/l9788979143409.jpg
chapters: []
---

{% for index in page.chapters%}
{% include_relative contents/{{index}}-toc.md %}
{% endfor %}

{% for index in page.chapters%}
{% include_relative contents/{{index}}-chapter.md %}
{% endfor %}
