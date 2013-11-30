(function(){
    'use strict';

    /*globals Unicorn, Backbone, _, $ */

    //APP CONTROLLER
    Unicorn.Views.FormColorRow = Backbone.View.extend({
        tagName: 'li',
        className: 'color-row',
        template: _.template($('#template-color-row').html()),

        initialize: function(data) {
            this.data = data;
            this.render();

            //REGISTER ELEMENTS
            this.$button = this.$('.button');
            this.$color = this.$('input[name=color]');
            this.$namespace = this.$('.action-name');
            this.$background = this.$('input[name=background]');

            //LISTEN FOR CHANGES
            this.$('input').change(_.bind(this.updateButtonPreview, this));
        },

        render: function() {
            this.$el.html(this.template(this.data));

            return this;
        },

        updateButtonPreview: function() {
            var color = this.$color.val();
            var background = this.$background.val();
            var namespace = this.$namespace.val();

            this.$button.css({
                background: background,
                color: color
            }).text(namespace);
        }
    });
})();

