---
layout: home
---

<div class="index-content project">
    <div class="section1" >
        <ul class="artical-cate">
            <li class="on" style="text-align:center"><a href="/notice"><span>通知</span></a></li>
        </ul>

        <div class="cate-bar"><span id="cateBar"></span></div>

        <ul class="artical-list">
        {% for post in site.categories.notice %}
            <li>
                <h2>
                    <a href="{{ post.url }}">{{ post.title }}</a>
                </h2>
                <div class="title-desc">{{ post.description }}</div>
            </li>
        {% endfor %}
        </ul>
    </div>
    </div>
