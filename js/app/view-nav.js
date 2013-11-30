(function(){
    'use strict';

    /*globals Unicorn, Backbone */

    Unicorn.Views.Nav = Backbone.View.extend({
        events: {
            'click .mobile-menu': 'toggleMobileMenu',
            'click ul li a': 'scrollToLink',
            'click h1 a': 'scrollToLink'
        },

        initialize: function() {
            //GET UPDATED ATTRIBUTES
            this.showcases = this.model.get('showcases');

            //REGISTER ELEMENTS
            this.listContainer = this.$('ul');

            this.render();
        },

        render: function() {


            //CREATE LIST TOGGLE BUTTONS
            this.createToggleButtons();

            return this;
        },

        createToggleButtons: function() {
            for (var i = 0, l = this.showcases.length; i < l; i++) {
                this.createButton(this.showcases[i]);
            }
        },

        scrollToLink: function(e)  {
            e.preventDefault();

            //REMOVE MOBILE CLASS
            this.listContainer.toggleClass('nav-show');

            //CREATE VARS
            var currentButton = $(e.currentTarget);
            var buttonId = currentButton.attr('href');
            var offset = (buttonId === '#home') ? 0 : 60;


            //ANIMATE SCROLL EFFECT
            $('html, body').animate({
                scrollTop: $(buttonId).offset().top - offset
            }, 'slow');
        },

        createButton: function(data) {

            //CREATE A TOGGLE BUTTON
            var toggleButton = new Unicorn.Views.ToggleButton({
                model: this.model,
                name: data.name,
                type: data.type
            });

            this.listContainer.append(toggleButton.el);
        },

        toggleMobileMenu: function() {
            this.listContainer.toggleClass('nav-show');
        }
    });
})();