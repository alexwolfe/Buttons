$(document).ready(function(){

    //CREATE PAGE METHODS
    var page = {
        init: function() {
            this.buttons = $('#main-nav a');

            this.activateNav();
            this.disableDemoButtons();
            console.log('hello');
        },

        activateNav: function() {
            this.buttons.click(function(e) {
                e.preventDefault();
                var currentButton = $(e.currentTarget);
                var buttonId = currentButton.attr('href');

                //DESELECT ALL BUTTONS & SELECT CURRRENT ONE
                this.buttons.parent().removeClass('selected');
                currentButton.parent().addClass('selected');

                //ANIMATE SCROLL EFFECT
                $("html, body").animate({
                    scrollTop: $(buttonId).offset().top - 100
                }, 'slow');


            }.bind(this));
        },

        disableDemoButtons: function() {
            $('.showcase a').on('click', function(e) {
                e.preventDefault();
            });
        }
    };

    //INITIALIZE PAGE
    page.init();
});