define(["jquery"], function($){

    /**
     * @constructor
     */
    function Accordeon(el){
        this.$el = $(el);

        this.allToggles = this.$el.find('h3');
        this.allToggables = this.$el.find('h3 + dl');

        bindEvents(this);
        init(this);
    }

    Accordeon.prototype.toggle = function($toggable){
        this.allToggables.hide();
        $toggable.show();
    }

    /**
     * @private
     * @param {Accordeon} inst
     */
    function bindEvents(inst){
        inst.$el.on('click', inst.allToggles, function(e){
            e.preventDefault();
            e.stopPropagation();
            inst.toggle($(e.target).closest('h3').next('dl'));
        });
    }

    /**
     * @private
     * @param {Accordeon} inst
     */
    function init(inst){
        inst.allToggles.each(function(){
            var $this = $(this),
                html = $this.html(),
                $span = $('<span />').css({'cursor':'pointer','border-bottom':'1px dashed black'});

            $span.html(html);
            $this.html($span);
        })
        inst.allToggables.not(':first').hide();
    }

    return Accordeon;

});