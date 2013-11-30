(function(){
    'use strict';

    /*globals Backbone, _, $ */


    ////////////////////////////////////////////////
    // BACKBONE CUSTOM SETTINGS ////////////////////
    ////////////////////////////////////////////////

    Backbone.emulateHTTP = true;

    Backbone.sync = function(method, model, options) {
        options = options || {};

        var params = {
            type: 'POST',
            dataType: 'jsonp',
            data: model.toJSON(method, model),
            url: model.url,
        };

        var data = _.extend(params, options);

        return $.ajax(data);
    };



    ////////////////////////////////////////////////
    // APP NAMESPACE ///////////////////////////////
    ////////////////////////////////////////////////
    window.Unicorn = {
        Models: {},
        Views: {},
        Options: {
            serverUrl: 'http://options-compiler.herokuapp.com',
            //serverUrl: 'http://localhost:5000',
            name: 'buttons',
            'btn-namespace': '.button',//MUST START OUT CONSISTENT WITH CLASS USED IN INITIAL MARKUP!
            'btn-name': 'button',
            'btn-glow-namespace': '.glow',
            'btn-glow-name': 'glow',
            'btn-font-color': '#666',
            'btn-font-size': '14px',
            'btn-font-weight': 300,
            'btn-font-family': ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
            'btn-actions': [
                {
                    name: 'primary',
                    background: '#00A1CB',
                    color: '#FFFFFF'
                },
                {
                    name: 'action',
                    background: '#7db500',
                    color: '#FFFFFF'
                },
                {
                    name: 'highlight',
                    background: '#F18D05',
                    color: '#FFFFFF'
                },
                {
                    name: 'caution',
                    background: '#E54028',
                    color: '#FFFFFF'
                },
                {
                    name: 'royal',
                    background: '#87318C',
                    color: '#FFFFFF'
                }
            ]
        }
    };

})();




