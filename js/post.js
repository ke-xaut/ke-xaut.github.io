$(document).ready(function(){

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
        ,BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        ,iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        ,Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        ,Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        }
        ,any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    $('pre').addClass('prettyprint linenums'); //添加Google code Hight需要的class

    $('.entry a').each(function(index,element){   //add _blank
        var href = $(this).attr('href');
        if(href){
            if(href.indexOf('#') == 0){
            }else if ( href.indexOf('/') == 0 || href.toLowerCase().indexOf('wy-ei.com')>-1 ){
            }else if ($(element).has('img').length){
            }else{
                $(this).attr('target','_blank');
                $(this).addClass('external');
            }
        }
    });

    (function(){
        var ie6 = ($.browser.msie && $.browser.version=="6.0") ? true : false;

        function initHeading(){
            var h2 = [];
            var h3 = [];
            var h2index = 0;

            $.each($('.entry h2, .entry h3'),function(index,item){
                if(item.tagName.toLowerCase() == 'h2'){
                    var h2item = {};
                    h2item.name = $(item).text();
                    h2item.id = 'menuIndex'+index;
                    h2.push(h2item);
                    h2index++;
                }else{
                    var h3item = {};
                    h3item.name = $(item).text();
                    h3item.id = 'menuIndex'+index;
                    if(!h3[h2index-1]){
                        h3[h2index-1] = [];
                    }
                    h3[h2index-1].push(h3item);
                }
                item.id = 'menuIndex' + index;
            });

            return {h2:h2,h3:h3}
        }

        function genTmpl(){
                var h1txt = $('h1').text();
                var tmpl = '<p>文章目录</p><ul>';

                var heading = initHeading();
                var h2 = heading.h2;
                var h3 = heading.h3;

                for(var i=0;i<h2.length;i++){
                    tmpl += '<li><a href="#" data-id="'+h2[i].id+'">'+h2[i].name+'</a></li>';

                    if(h3[i]){
                        for(var j=0;j<h3[i].length;j++){
                            tmpl += '<li class="h3"><a href="#" data-id="'+h3[i][j].id+'">'+h3[i][j].name+'</a></li>';
                        }
                    }
                }
                tmpl += '</ul>';

                return tmpl;
        }

        function genIndex(){
                var tmpl = genTmpl();
                var indexCon = '<div id="menuIndex" class="sidenav"></div>';
                $('.index').append(indexCon);

                $('#menuIndex').append($(tmpl)).delegate('a','click',function(e){
                    e.preventDefault();

                    var selector = $(this).attr('data-id') ? '#'+$(this).attr('data-id') : 'h1'
                    var scrollNum = $(selector).offset().top;

                    $('body, html').animate({ scrollTop: scrollNum-20 }, 400, 'swing');
                });
        }
        if($('.entry h2').length > 2 ){

                genIndex();
        }
    })();


    $.getScript('/js/prettify/prettify.js',function(){
        prettyPrint();
    });


    if(/css3-animation/.test(location.href)){
        $("head").append("<link rel='stylesheet' type='text/css' href='/css/css3-ani.css'/>");
        $.getScript('/js/css3-ani.js',function(){});
    }
});
