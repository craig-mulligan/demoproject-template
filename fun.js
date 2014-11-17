$.fn.activate = function() {
        this.addClass("active").siblings().removeClass("active");
        this.parents('.body').siblings('.header').find('.title').text(this.data('title'));
        return this;
    }

$(function() {
    var iframe = $('#player1')[0];
    var player = $f(iframe);
    var status = $('.status');
    var copied = $('.copied');

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        status.text('ready');
        
        player.addEvent('pause', onPause);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', onPlayProgress);
    });

    // Call the API when a button is pressed
    $('button').bind('click', function() {
        player.api($(this).text().toLowerCase());
    });

    function onPause(id) {
        status.text('paused');
        copied.fadeIn('fast').delay(500).fadeOut('slow');

    }

    function onFinish(id) {
        status.text('finished');
    }


    function onPlayProgress(data, id) {
        status.text(data.seconds + 's played');
        var nextStamp = $('.code-block.active').next().data('time');
        console.log(nextStamp);
        if (data.seconds > nextStamp) {
            $('.code-block.active').next('.code-block').activate();
        }
    }

    $('.skip').click(function(event) {
         $('.code-block.active').next('.code-block').activate();
    });
});