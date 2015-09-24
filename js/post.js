window.addEventListener("load",function(){
    (function(){
        function getScrollTop(){
                return (document.documentElement&&document.documentElement.scrollTop)||document.body.scrollTop;
        }
        var toTopDiv = document.getElementById("toTop");
        toTopDiv.addEventListener("click", function(){

                    this.timeInterval =  setInterval(function(){
                        var scrollTop = getScrollTop();
                        if(scrollTop == 0){
                            clearInterval(toTopDiv.timeInterval);
                        }
                        document.documentElement.scrollTop = document.body.scrollTop = Math.floor(scrollTop * 0.7);
                },80);
        });
    })();
});