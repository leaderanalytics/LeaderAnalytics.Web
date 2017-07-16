(function ($) {
    window.site = {
        Init: function () {
            // Load navbar
            $.ajax({
                url: '/navBar.html',
                dataType: 'html'
            }).done(function (data) { $('#header').html(data); });

            // Load home page
            this.LoadContent('/home.html');
        },

        LoadContent: function (url) {
            this.Load(url, 'content');
        
        },

        Load: function (url, id) {
            $.ajax({
                url: url,
                dataType: 'html'
            }).done(function (data) { $('#' + id).html(data); });
        }
    }

    $(window.site.Init())
})($)
