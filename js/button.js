$(document).ready(function(){
    setInterval(function(){
        var buttons = $('.glow');
        buttons.toggleClass('glow-on');
    }, 1500);
});
