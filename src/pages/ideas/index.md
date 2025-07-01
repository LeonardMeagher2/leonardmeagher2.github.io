---
layout: base.njk
title: Ideas
folder: ideas
---

# Ideas 💭

This is my traditional blog section - thoughts, reflections, and dated entries about things I'm thinking about.

## Recent Ideas

{% if collections.ideas.length === 0 %}

<h3> Come back soon </h3>
{% else %}
{% for post in collections.ideas | reverse %}

<article class="idea-preview">
  <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
  <time>{{ post.data.date | dateDisplay }}</time>
  {% if post.data.excerpt %}
    <p>{{ post.data.excerpt }}</p>
  {% endif %}
</article>
{% endfor %}
{% endif %}
