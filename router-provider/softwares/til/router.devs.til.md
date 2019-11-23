---
layout: default/with-nav
permalink: /router/devs/til
---

<div class="category-and-tag-filter" style="min-height: 100vh">
  <div>
    <a href="by-subject">By Subject</a>
    <a href="by-date">By Date</a>
    <div>
      <h1>Category 별 분류</h1>
      <ul>
        <li>
          <a href="css">CSS Tag에 속한 글들</a>
        </li>
        <li>
          <a href="vue">Vue Tag에 속한 글들</a>
        </li>
      </ul>
    </div>

    <h3>TIL Category 전체 글 목록</h3>
    <h3>count : {{ site.categories.til.size }}</h3>

    {%- for post in site.categories.til -%}
    <div>
      <ul>
        <li>
          <a href="{{ post.url }}"> {{ post.title }}</a>
        </li>
      </ul>
    </div>
    {%- endfor -%}

  </div>
</div>
