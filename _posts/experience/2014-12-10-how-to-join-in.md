---
layout: post
title: 如何参与维护该网站
category: exp
tag: 博客
description: 看似很难的东西，当你去尝试，去请教多次之后你会发现，它并没有那么难。
author: wy
---


## 如何参与维护该网站

+ 了解git的使用
+ 了解github
+ 了解github pages
+ 了解markdown
+ 了解jekyll

我们的github pages 不同于传统的wordpress博客系统，wordpress这类系统，提供了管理员登陆的功能，你可以登陆到后台去发布文章，编辑文章，所以wordpress这类系统的入门要求比较低。但是github 作为程序员的社区，都是聪明人，提供了更酷的一种方式。我么的网站内容就是存在于我们文件夹里面的文件，你修改了这些内容之后，可以立刻同步到github上，github可以帮你解析。本网站的资源可以见[xautkx的资源](https://github.com/ke-xaut/ke-xaut.github.io)，你需要修改为网站内容的话，可以将内容下载到本地做完修改之后，上传上来。

Github Pages有以下几个优点：


+ 轻量级的博客系统，没有麻烦的配置
+ 使用标记语言，比如[Markdown](http://markdown.tw)
+ 无需自己搭建服务器
+ 根据Github的限制，对应的每个站有300MB空间
+ 可以绑定自己的域名

当然他也有缺点：

* 使用[Jekyll][]模板系统，相当于静态页发布，适合博客，文档介绍等。
* 动态程序的部分相当局限，比如没有评论，不过还好我们有解决方案。
* 基于Git，很多东西需要动手，不像Wordpress有强大的后台


### Git
Git 是一个版本控制软件，网站的所有资源都由这个软件控制。[教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

### github 
github是一个托管代码的网站，就是当前这个网站。它提供了一个叫做github pages 的功能，运行一个服务器，可以帮你解析提交的网页源代码。

### github pages
github pages 就是github替你解析的这个网页，原始域名是 `用户名.github.io` 可以绑定自己的域名，这就是该[网站](http://xautkx.com)的原理，所以是免费的，我们不需要自己花钱租借服务器。

### markdown

我们写下的文章，是纯文本的内容，不需要加入任何html 标签，它采用了另外一种标记手段--markdown，了解更多[markdown](http://www.jianshu.com/p/468f111d8fd3).

### jekyll
大家都知道，网站要想工作，那需要有一个服务器软件，这个jekyll就是github使用的服务器软件。可以点击[这里了解更多](http://jekyllrb.com/) 也可以搜索jekyll了解更多。

我假设你已经明白了，html，以及网站工作的基本知识。下面谈一谈该如果参与，我希望这能开始你参与开源软件创作的第一步。

## 克隆本本网站资源所在的[资源](https://github.com/ke-xaut/ke-xaut.github.io)

**做法：**

## 1. 打开git，进入到一个空的文件夹输入下面的命令：

`git clone https://github.com/ke-xaut/ke-xaut.github.io.git`

下面这个方法需要将公钥添加到仓库所在的github账号上。

`git clone git@github.com:ke-xaut/ke-xaut.github.io.git`

其中`git clone` 后面跟着的网址可以在下图显示的地方查看到
![clone](http://xautkx.com/images/blog/howto/clone.png)
这一步可能会花费一点时间，约5分钟，由于是国外的网站，所以网速较慢。也可以

## 2. 修改网站

打开clone下来的文件夹以后你就可以看见,文件夹大致是这个样子


	|-- _config.yml
    |-- _includes
    |-- _layouts
    |   |-- default.html
    |   `-- post.html
    |-- _posts
    |   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
    |   `-- 2009-04-26-barcamp-boston-4-roundup.textile
    |-- _site
    `-- index.html

简单介绍一下他们的作用：
####_config.yml
配置文件，用来定义你想要的效果，设置之后就不用关心了。

####_includes
可以用来存放一些小的可复用的模块，方便通过`{ % include file.ext %}`（去掉前两个{中或者{与%中的空格，下同）灵活的调用。这条命令会调用_includes/file.ext文件。

####_layouts
这是模板文件存放的位置。模板需要通过[YAML front matter][9]来定义，后面会讲到，`{ { content }}`标记用来将数据插入到这些模板中来。

####_posts
你的动态内容，一般来说就是你的博客正文存放的文件夹。他的命名有严格的规定，必须是`2012-02-22-artical-title.MARKUP`这样的形式，MARKUP是你所使用标记语言的文件后缀名，根据_config.yml中设定的链接规则，可以根据你的文件名灵活调整，文章的日期和标记语言后缀与文章的标题的独立的。

####_site
这个是Jekyll生成的最终的文档，不用去关心。最好把他放在你的`.gitignore`文件中忽略它。

所以你发布文章的话，可以在_post 这个文件夹下添加文本，值得注意的是，文章的文件名需要是`2014-12-10-hello.md` 这样的。之后你就可以在`http://xautkx.com/hello` 这个页面访问该页面了。

你如果要修改网站外观，那么可以通过，修改_layout里面的内容来改变。

下来看一下_post/blog下面的文本的内容

	---
	layout: post
	title: 如何成为一名黑客？(转)
	description: 有一群人大声嚷嚷着自己是黑客，但他们不是。
	category: blog
	tag: 学习方法
	---

这个layout指明使用_layout文件夹中的那个模板。title指明文章的标题，其他的都顾名思义了吧。


## 3.发布修改

现在你准备要修改了，你需要做的是，打开git 输入下面的第一条命令。输完之后一直回车就好了。（用你自己的邮箱替换下面的邮箱地址）

 	$ ssh-keygen -t rsa -C "邮件地址@youremail.com"
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<回车就好>

然后，在你的用户跟目录下，也就是这个目录`C:\Users\wangyu` 里面有一个叫做`.ssh`的文件夹。打开看到一个名叫做`id_rsa.pub`的文件，你可以将其中的内容发给管理员`ke_xaut@163.com` ，当管理员将这个公钥添加到github上面以后你就可以提交内容了。（因为必须取得管理员信任才可以修改，所以必须添加这样一个公钥）


这个时候，你可以修改内容，然后使用git里面的push操作将修改推送到github的仓库中。然后你就完成了修改了。

有一点我需要补充的是，这个确实不难，但是需要知道的东西比较多，有感兴趣的同学可以当面找管理员。邮箱[ke_xaut@163.com]。针对上面的内容，许多地方考虑时间问题，不能一一详细说明，针对不了解的地方，可以上网搜索。也欢迎大家，补充以上内容。
