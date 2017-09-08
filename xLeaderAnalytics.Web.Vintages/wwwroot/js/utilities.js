
(function ($) {
    window.showDialog = function () {
        $("#createWindow").on('click', function () {
            alert('boo');
            $.Dialog({
                flat: false,
                shadow: true,
                title: 'Test window',
                content: 'Test window content',
                height: 200
            });
        });
    }
})($)