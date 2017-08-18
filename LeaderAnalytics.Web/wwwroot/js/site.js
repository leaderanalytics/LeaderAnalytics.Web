(function ($) {
    window.site = {
        _currentPage:"",

        Init: function () {
            // Load navbar
            $.ajax({
                url: '/navBar.html',
                dataType: 'html'
            }).done(function (data) { $('#header').html(data); });

            // Load home page
            this.LoadContent('/home.html');
            this.Load('/footer.html', 'footer');
            this.ShowWindowSize();
        },

        LoadContent: function (url) {
            this.Load(url, 'content');
        },

        LoadAndScroll: function (url, loadID, scrollID) {
            var site = this;
            var promise = this.Load(url, loadID);
            promise.then(function() {
                    site.ScrollTo(scrollID); 
                });
        
        },

        Load: function (url, id) {
            var deferred = $.Deferred();

            if(url === this._curentPage)
                deferred.resolve();
            else
            {
                this._currentPage = url;

                $.ajax({
                    url: url,
                    dataType: 'html'
                }).done(function (data) { 
                        $('#' + id).html(data);
                        deferred.resolve();
                     });
            }
            
            return deferred.promise();            
        },

        ShowWindowSize:function()
        {
            window.addEventListener('resize', function(event){
                var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
                document.title =  x + " x "+ y;
            });        

            
        },
        ScrollTo:function(elementID)
        {
            var myElement = document.getElementById(elementID);
            var barHeight = $('.app-bar').height();
            var topPos = myElement.offsetTop - barHeight;
            $('html, body').animate({scrollTop:topPos, scrollLeft:0});
        }
    }

    $(window.site.Init())
})($)
