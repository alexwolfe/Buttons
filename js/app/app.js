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
            this.listenTo(this.model, 'sync', this.updateGlobalStyles);
            this.listenTo(this.model, 'invalid', this.showError);
            this.listenTo(this.model, 'options:update:started', this.optionsUpdateStarted);
            this.render();
        },

        optionsUpdateStarted: function() {
            //NOTE: We have to use global jquery to grab all .download classes on the page
            $('.download').addClass('disabled');
            $('.customize').addClass('disabled');

            //Track GA Event
            // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
            var d = new Date();
            var customizedAt = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear() + '__' + d.getHours() + ':' + d.getMinutes();
            _gaq.push(['_trackEvent', 'Customize', 'Customized-Buttons-Options', 'Customized-At--' + customizedAt]);
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
                allTypes: _.clone(this.buildTypes),
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
            //UPDATE CSS WITH STYLES WITH CUSTOM BUTTON CSS FROM SERVER
            var css = this.model.get('css');
            var styleTag = $('#custom-styles');
            styleTag.text(css);

            //TRIGGER STYLES UPDATED EVENT
            this.model.trigger('styles:updated');
            NProgress.done();

            //ENABLE BUTTONS ON CALLBACK
            $('.download').removeClass('disabled');
            $('.customize').removeClass('disabled');
        },


        build: function(e) {
            e.preventDefault();
            this.model.save();
        },

        customize: function(e) {
            e.preventDefault();
            var button = $(e.currentTarget);

            if(!button.hasClass('disabled')) {
                //CREATE CUSTOMIZE MODAL
                var modal = new Unicorn.Views.Customizer({ model: this.model });

                //APPEND THEN RENDER
                this.$el.append(modal.el);
                modal.trigger('dom');
            }
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
            var button = $(e.currentTarget);

            // ONLY DOWNLOAD IF THEY HAVE AT LEAST ONE ITEM SELECTED
            if (types && types.length && !button.hasClass('disabled')) {

                //CREATE A URL FROM MODEL VALUES
                var payload = this.model.getPayload();
                var url = this.url + payload;
                var start = new Date().getTime();
                window.open(url, 'Download');
                var finished = new Date().getTime();
                var timeItTook = finished - start;

                //Track GA Event and append -<TIME IT TOOK>
                // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
                // _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
                _gaq.push(['_trackEvent', 'Downloads', 'Downloaded-Buttons-Zip', 'Download-Time', timeItTook, true]);

            }
        }
    });


})();



