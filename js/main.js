$(document).ready(function(){

    'use strict';

    //CREATE PAGE METHODS
    var page = {
        init: function() {
            this.disableDemoButtons();
        },


        disableDemoButtons: function() {
            $('.showcase [href^=#]').on('click', function(e) {
                e.preventDefault();
            });
        }
    };

    //INITIALIZE PAGE
    page.init();
});