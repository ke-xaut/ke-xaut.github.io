window.onload = function () {

            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var len = 3;
            var animateFlag = false;
            var loopTime = 3800;
            var timer;
            var listWidth = 800;

            function animate(offset){
                animateFlag = true;
                var changeTime = 400;
                var speed = offset/(changeTime/10);
                var left = parseInt(list.style.left) + offset;
                function go(){
                    if((speed<0&&parseInt(list.style.left)>left)||(speed>0&&parseInt(list.style.left)<left)){
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go,changeTime/10);
                    }else{
                        animateFlag = false;
                        if(list.style.left == '0px'){
                            list.style.left = '-' + len*listWidth + 'px';
                        }else if(list.style.left == '-'+ (len+1)*listWidth +'px'){
                            list.style.left = '-' + listWidth + 'px';
                         }
                    }
                }
                showButton();
                go();
            }

            next.onclick=function(){
                if(animateFlag){
                    return;
                }
                index = index==len ? 1 : index+1; 
                animate(-listWidth);
            }
            prev.onclick=function(){
                if(animateFlag){
                    return;
                }
                index = index==1 ? len : index-1; 
                animate(listWidth);
            }
            
            function showButton(){
                for(var i=0;i<buttons.length;i++){
                    if(buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index-1].className = 'on';
            }

            for(var i=0;i<buttons.length;i++){
                buttons[i].onclick=function(){
                    if(animateFlag){
                        return;
                    }
                    var myindex = parseInt(this.getAttribute('index'));
                    if(myindex == index){
                        return;
                    }else{
                        animate(-(myindex - index)*listWidth);
                        index = myindex;
                        showButton();
             /*         console.log(index);*/
                    }
                }
            }

            function play(){
                timer = setInterval(function(){
                    next.onclick();
                },loopTime);
            }
            function stop(){
                clearInterval(timer);
            }
            container.onmouseover = stop;
            container.onmouseout = play;
            play();


/*                                                      notice scroll                                   */
             var area = document.getElementById('moocBox');
             var con1 = document.getElementById('con1');
             var con2 = document.getElementById('con2');
             var speed2 = 50;
             area.scrollTop = 0;
             con2.innerHTML = con1.innerHTML;

             function scrollUp(){
                 if(area.scrollTop >= con1.scrollHeight) {
                     area.scrollTop = 0;
                     }else{
                       area.scrollTop ++; 
                     } 
           }
             var myScroll = setInterval(function(){
                scrollUp();
             },speed2);

             area.onmouseover = function(){
                 clearInterval(myScroll);
                }
            area.onmouseout = function(){
                 myScroll = setInterval(function(){
                scrollUp();
             },speed2);
                }

}


