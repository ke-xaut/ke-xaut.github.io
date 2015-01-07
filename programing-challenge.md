---
layout: page
title: 学习方法
---

<div class="index-content blog">
   
    <ul class="artical-list">
    {% for post in site.tags.programing %}
        <li>
            <div class="title-date"><p class="date">{{ post.date|date:"%Y-%m-%d" }}</p><p class="arrow"> >> </p></div>
            <h2>
                <a href="{{ post.url }}">{{ post.title }}</a>
            </h2>
            <div class="title-desc">{{ post.description }}</div>
        </li>
    {% endfor %}
    </ul>
</div>