(function(){
    'use strict';

    /*globals Unicorn, Backbone, $ */

    //MENU BAR
    Unicorn.Views.Menu = Backbone.View.extend({

        initialize: function() {
            //REGISTER ELEMENTS
            this.listenTo(this.model, 'change', this.updateComplete);
            this.render();
        },

        render: function() {
            return this;
        },

        updateComplete: function() {
            var data = this.model.toJSON();
        }
    });
})();