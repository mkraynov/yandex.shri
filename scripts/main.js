require(["jquery"], function($){

    $(function(){

        require(["libs/highlight/highlight.pack"], function(hljs){
            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        });

        require(["modules/Accordeon"], function(A){
            $('.wrapper').each(function(){
                new A(this);
            })
        });

    });

});