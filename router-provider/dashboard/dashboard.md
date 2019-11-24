---
layout: atomics/scaffold
permalink: /dashboard
---

<h1> Check Using Google Analytics </h1>
<p>
 <!-- Google Analytics -->
{% if jekyll.environment == 'production' and site.use_google_analytics %}
  Google Analytics : On
{% else %}
  Google Analytics : Off
{% endif %}

</p>
