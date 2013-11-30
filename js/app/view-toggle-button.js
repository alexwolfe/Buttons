(function(){
    'use strict';

    /*globals Unicorn, Backbone, _ */

    //CODE EXAMPLE VIEW
    Unicorn.Views.ToggleButton = Backbone.View.extend({
        template: _.template($('#template-toggle').html()),
        tagName: 'li',
        included: true,

        events: {
            'click .nav-toggle-button': 'updateTypes',
            'touchstart .nav-toggle-button': 'updateTypes' //iPad
        },

        initialize: function(options) {
            this.name = options.name;
            this.type = options.type;

            this.render();
        },

        render: function() {
            var status = this.included ? 'Included' : 'Removed';

            //RENDER TEMPLATE
            this.$el.html(this.template({
                status: status,
                included: this.included,
                name: this.name,
                type: this.type
            }));

            return this;
        },

        updateTypes: function(e) {
            e.preventDefault();
            var included = $(e.currentTarget).data('included');

            //TOGGLE VALUE
            this.included = !included;

            //UPDATE MODEL
            this.updateModel();

            this.render();
        },

        updateModel: function() {
            //CLONE TYPES SO YOU'RE NOT EDITING PROPERTIES DIRECTLY
            var types = _.clone(this.model.get('types'));

            // ADD TYPE THEN REMOVE DUPLICATES
            if(this.included === true) {
                types.push(this.name);
                types = _.uniq(types);
            }
            // REMOVE TYPE FROM ARRAY
            else {
                types = _.without(types, this.name);
            }

            //SET MODEL WITH NEW ARRAY
            this.model.set({types: types});
        }
    });
})();