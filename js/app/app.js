(function(){
    'use strict';

    /*globals Unicorn, Backbone, _, $, NProgress */


    //APP CONTROLLER
    Unicorn.Views.App = Backbone.View.extend({
        el: 'body',
        url: Unicorn.Options.serverUrl + '/download/' + Unicorn.Options.name + '?',
        showcaseNames: [],
        buildTypes: [],

        events: {
            'click .download': 'download',
            'click .customize': 'customize'
        },

        initialize: function() {
            this.listenTo(this.model, 'change:types', this.checkForSelectedTypes);
            this.listenTo(this.model, 'change:css', this.updateGlobalStyles);
            this.listenTo(this.model, 'invalid', this.showError);
            this.listenTo(this.model, 'options:update:started', this.optionsUpdateStarted);
            this.render();
        },

        optionsUpdateStarted: function() {
            //NOTE: We have to use global jquery to grab all .download classes on the page
            $('.download').addClass('disabled');
        },

        render: function() {

            //CREATE MENU BAR
            this.menubar = new Unicorn.Views.Menu({
                el: $('.menu-bar'),
                model: this.model
            });

            //ACTIVATE SHOWCASE VIEWS
            this.showcases = $('.showcase');
            _.each(this.showcases, this.createShowCase, this);

            //ADD SHOWCASE TYPES TO MODEL
            this.model.set({
                types: this.buildTypes,
                showcases: this.showcaseNames
            });

            //CREATE SIDE NAV
            this.createNav();

            return this;
        },

        createShowCase: function(showcase) {
            //GET TYPE OF SHOWCASE
            var type = $(showcase).data('type');
            var name = $(showcase).data('name');

            this.showcaseNames.push({
                name: name,
                type: type
            });

            //ADD BUILD TYPE MODULES TO ARRAY
            if(type === 'build') {
                this.buildTypes.push(name);
            }

            new Unicorn.Views.Showcase({
                model: this.model,
                el: showcase
            });
        },

        createNav: function() {
            new Unicorn.Views.Nav({
                model: this.model,
                el: $('.nav')
            });
        },

        updateGlobalStyles: function() {
            var css = this.model.get('css');
            var styleTag = $('#custom-styles');
            styleTag.text(css);
            this.model.trigger('styles:updated');
            NProgress.done();
            $('.download').removeClass('disabled');
        },


        build: function(e) {
            e.preventDefault();
            this.model.save();
        },

        customize: function(e) {
            e.preventDefault();

            //CREATE CUSTOMIZE MODAL
            var modal = new Unicorn.Views.Customizer({ model: this.model });

            //APPEND THEN RENDER
            this.$el.append(modal.el);
            modal.trigger('dom');
        },

        checkForSelectedTypes: function(model, types) {

            if(types.length > 0) {
                //ENABLE DOWNLOAD IF MORE THAN 1 TYPE IS SELECTED
                this.$('.download').removeClass('disabled');

                //REMOVE BLANK STATE
                this.$('.alert').remove();
            }
            else {
                //DISABLE DOWNLOAD, NO TYPES SELECTED
                this.$('.download').addClass('disabled');

                //SHOW BLANKSTATE
                this.showError('You need to select at least one button type.');
            }
        },

        showError: function(message) {
            var hero = $('.hero-call-to-action');

            //REMOVE EXISTING ERROR MESSAGES
            this.$('.alert').remove();

            //ADD MESSAGE
            hero.prepend('<div class="alert alert-error">' + message + '</div>');
        },

        download: function(e) {
            e.preventDefault();
            var types = this.model.get('types');

            // ONLY DOWNLOAD IF THEY HAVE AT LEAST ONE ITEM SELECTED
            if (types && types.length) {

                //CREATE A URL FROM MODEL VALUES
                var payload = this.model.getPayload();
                var url = this.url + payload;
                window.open(url, 'Download');
            }
        }
    });


})();



