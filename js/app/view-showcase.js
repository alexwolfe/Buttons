(function(){
    'use strict';

    /*globals Unicorn, Backbone, prettyPrint, _ */

    //CODE EXAMPLE VIEW
    Unicorn.Views.Showcase = Backbone.View.extend({
        template: _.template($('#template-code').html()),

        initialize: function() {
            this.name = this.$el.data('name');
            this.type = this.$el.data('type');

            //REGISTER ELEMENTS
            this.$examples = this.$('.showcase-examples');
            this.$code = this.$('code');

            //LISTEN FOR CHANGES ON THE MODEL THEN RE-RENDER
            this.listenTo(this.model, 'change:btn-namespace', this.updateNamespace, this);
            this.listenTo(this.model, 'change:btn-actions', this.updateActionName, this);

            //UPDATE VISIBILITY ON TYPE EVENT IF THIS IS A BUILD ELEMENT
            if(this.type === 'build') {
                this.listenTo(this.model, 'change:types', this.updateVisibility, this);
            }

            //RENDER
            this.render();
        },

        render: function() {
            this.updateCodePreview();

            return this;
        },

        updateNamespace: function() {
            //GET PREVIOUS and NEW NAMESPACES
            var prevNamespace = this.model.previous('btn-name');

            // CHECK FOR A PREVIOUS VALUE
            if (prevNamespace) {

                //GET NEW NAMESPACE
                var newNamespace = this.model.get('btn-name');
                var classname = '.' + prevNamespace;

                //NOW UPDATE CLASS NAMES
                this.updateClassName(classname, prevNamespace, newNamespace);
            }
        },

        updateActionName: function() {
            //GET PREVIOUS and NEW NAMESPACES
            var previousActions = this.model.previous('btn-actions');
            var newActions = this.model.get('btn-actions');
            var namespace = this.model.get('btn-name');

            //MAKE SURE THERE WERE PREVIOUS VALUES AND THEY'RE NOT THE SAME
            if(previousActions && previousActions !== newActions) {

                //PLUCK ARRAY OF PREVIOUS NAMES
                var previousNames = _.pluck(previousActions, 'name');

                //PLUCK ARRAY OF NEW NAMES
                var newNames = _.pluck(newActions, 'name');

                //ZIP THEM TOGETHER => [['primary', 'newprimary'], ['action', 'newaction'], ...]
                var pairs = _.zip(previousNames, newNames);

                _.each(pairs, function(pair){
                    //DON'T REPLACE IF IDENTICAL
                    if(pair[0] !== pair[1]) {

                        //CREATE A CONTAINER FOR CLASS NAMES
                        var classname = [];
                        var types = ['-', '-flat-', '-3d-', '-border-'];

                        //ADD CLASS NAMES TO LIST
                        _.each(types, function(type) {
                            classname.push('.' + namespace + type + pair[0]);
                        });

                        //FLATTEN THIS BIZNATCH
                        classname = classname.join(',');

                        //UPDATE CLASSNAMES
                        this.updateClassName(classname, pair[0], pair[1]);
                    }
                }, this);
            }
        },

        updateClassName: function(classname, prevNamespace, newNamespace) {
            var buttonsAndDropdowns = classname + ', [class^=' + prevNamespace + '-dropdown]';
            var elements = this.$examples.find(buttonsAndDropdowns);

            //CRETE A REGEX TO LOOK FOR PREVIOUS NAMESPACE
            var findPattern = new RegExp(prevNamespace, 'g');

            //LOOP THROUGH AND REPLACE CLASS NAMES ON ALL ELEMENTS
            _.each(elements, function(element) {

                //REGISTER ELEMENT
                var $element = $(element);

                //FIND CURRENT CLASS NAMES
                var classNames = $element.attr('class');

                //CREATE A STRING OF UPDATED CLASS NAMES
                var newClassNames = classNames.replace(findPattern, newNamespace);

                //NOW SET THE NEW CLASS NAMES ON ELEMENT
                $element.attr('class', newClassNames);
            }, this);

            //NOW UPDATE CODE PREVIEW
            this.updateCodePreview();
        },

        updateCodePreview: function() {
            var encodedHTML = this._encodeHTML(this.$examples.html());

            this.$code.html(this.template({code: encodedHTML}));

            prettyPrint();
        },

        updateVisibility: function() {
            var types = this.model.get('types');
            var isVisible = _.contains(types, this.name);

            if(isVisible) {
                this.updateNamespace();
                this.updateActionName();

                this.$el.fadeIn();
            }
            else {
                this.$el.fadeOut();
            }
        },

        _encodeHTML: function(str) {
            return String(str).replace(/<br>/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
    });
})();