---
layout: router
permalink: /router/devs/til
needFooter: false
---

{% assign tilBySubjectPosts = site.tils | where_exp: "item", "item.category == 'by-subject'" %}
{% assign tilByDatePosts = site.tils | where_exp: "item", "item.category == 'by-date'" %}

<div class="layout--center-focused" style="min-height: 100vh; padding: 0">
  <div class="category-and-tag-filter">
      <div>
        <h1>
          <a href="by-subject">By Subject ({{tilBySubjectPosts.size}})</a>
        </h1>
        {% for post in tilBySubjectPosts %}
        <div>
          <ul>
            <li>
              <a href="{{ post.url }}"> {{ post.title }}</a>
            </li>
          </ul>
        </div>
        {%- endfor -%}
      </div>
      <div>
        <h1>
          <a href="by-date">By Date ({{tilByDatePosts.size}})</a>
        </h1>
        {% for post in tilByDatePosts %}
        <div>
          <ul>
            <li>
              <a href="{{ post.url }}"> {{ post.title }} TIL</a>
            </li>
          </ul>
        </div>
        {%- endfor -%}
      </div>
  </div>
</div>
