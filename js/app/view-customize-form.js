(function(){
    'use strict';

    /*globals Unicorn, Backbone, _, $, NProgress */


    //APP CONTROLLER
    Unicorn.Views.Customizer = Backbone.View.extend({
        tagName: 'form',

        template: _.template($('#template-customizer').html()),

        events: {
            'click .close': 'close'
        },

        initialize: function() {
            this.on('dom', this.activateValidation, this);

            this.render();
        },

        render: function() {
            this.data = this.model.getFormattedData();

            this.$el.append(this.template(this.data));
            this.createButtonList();

            this.selectedFontFamily();

            return this;
        },

        selectedFontFamily: function() {
            var currentFont = this.data.family[0];
            var name;

            switch(currentFont) {
                case 'Helvetica Neue Light':    name = '#helvetica';   break;
                case 'Cambria':                 name = '#times';       break;
                case 'Constantia':              name = '#georgia';     break;
                case 'Consolas':                name = '#monospace';   break;
                case 'Brush Script MT':         name = '#script';      break;
                default:  name = '#helvetica';
            }

            //SET SELECTED ATTRIBUTE ON DROPDOWN MENU
            this.$(name).attr('selected', 'selected');
        },

        activateValidation: function() {
            var self = this;

            $.validator.addMethod('cssCharset', function (value, element) {
                //Loose validation of alphas, digits, underscores, and hyphens
                return this.optional(element) || /^[A-Za-z0-9\-\_]+$/.test(value);
            }, 'Please only enter valid CSS characters.');

            //DEFAULT RULES
            var rules = {
                'btn-namespace': {required: true, cssCharset: true},
                'btn-font-size': {required: true},
                'name': {required: true, cssCharset: true}
            };

            //DYNAMIC RULES (ALL ACTIONS)
            _.each(this.data.actions, function(action) {
                rules['action-' + action.name] = {
                    cssCharset: true,
                    required: true
                };
            });

            this.$el.validate({
                rules: rules,
                submitHandler: function(form) {
                    self.update(form);
                }
            });

            this.updateColorPickers();
        },

        createButtonList: function() {
            var buttonList = this.$('.button-actions');
            var namespace = this.model.get('btn-name');

            _.each(this.data.actions, function(action) {
                action.namespace = namespace;

                var button = new Unicorn.Views.FormColorRow(action);
                buttonList.append(button.el);
            }, this);
        },

        updateColorPickers: function() {
            this.$('input[type="color"]').spectrum({
                preferredFormat: 'hex',
                showInput: true,
                clickoutFiresChange: true
            });
        },

        update: function(form) {
            this.model.trigger('options:update:started');

            //START PROGRESS INDICATOR
            NProgress.start();
            this.close();

            this.model.build(form);
        },

        close: function() {
            var self = this;
            this.$el.addClass('animated bounceOutUp').fadeOut(function(){
                self.remove();
            });
        }
    });
})();

