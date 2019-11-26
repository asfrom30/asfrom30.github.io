---
layout: router
permalink: /router/devs/til
needFooter: false
---

<style>

</style>

{% assign tilBySubjectPosts = site.posts | where_exp: "item", "item.category == 'til'" | where_exp: "item", "item.tag contains 'til-by-subject'" %}
{% assign tilByDatePosts = site.posts | where_exp: "item", "item.category == 'til'" | where_exp: "item", "item.tag contains 'til-by-date'" %}

<div class="layout--center-focused" style="min-height: 100vh; padding: 0">
  <div class="category-and-tag-filter">
      <div>
        <h1>Workflow</h1>
        <ul>
          <li>TIL by date (Daily)</li>
          <li>TIL by subject (Bulk)</li>
          <li>Move to Wiki (Organize)</li>
        </ul>
      </div>
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
              <a href="{{ post.url }}"> {{ post.title }}</a>
            </li>
          </ul>
        </div>
        {%- endfor -%}
      </div>
  </div>
</div>

<!-- <div>
    <h1>Subject 별 분류</h1>
    <ul>
      <li>
        <a href="css">CSS에 속한 글들</a>
      </li>
      <li>
        <a href="vue">Vue에 속한 글들</a>
      </li>
    </ul>
  </div> -->
