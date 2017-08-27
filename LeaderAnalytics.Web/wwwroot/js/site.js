(function ($) {
    window.site = {
        _currentPage:"",

        Init: function () {
            
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
                        $('#' + id).empty().append(data).append(function(){
                            deferred.resolve();
                        });
                     });
            }
            
            return deferred.promise();            
        },

        ShowWindowSize:function()     {
            window.addEventListener('resize', function(event){
                var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
                document.title =  x + " x "+ y;
            });        
        },

        ScrollTo:function(elementID)  {
            var myElement = document.getElementById(elementID);
            var barHeight = $('.app-bar').height();
            var topPos = myElement.offsetTop - barHeight;
            $('html, body').animate({scrollTop:topPos, scrollLeft:0});
        },

        ShowContactDialog:function() {
            this.Load('/contactform.html','dialog').then(function() {
                metroDialog.open('#dialog');                
            });
        },

        SubmitContactForm:function() {
            var site = this;
            var formData = $('#contact-form').serializeArray();
            var name = formData[0].value;
            var phone = formData[1].value;            
            var email = formData[2].value;
            var req = formData[3].value;
            var comment = formData[4].value;
            
            if(name.length === 0) {
                this.ShowErrorDialog("Name is required.");
                return false;
            }

            if(phone.length === 0 && email.length === 0) {
                this.ShowErrorDialog("Phone number or email address is required.");
                return false;
            }
            
            this.ShowWaitDialog();    
            var json = JSON.stringify({name:name,phone:phone,email:email,requirement:req,comment:comment});
            $.ajax({headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                        type:'POST', url:'/Home/HandleContactRequest', data:json, dataType:'json'}).done(function() {
                site.CloseDialog('#wait-dialog');
                site.ShowOKDialog("Your request was sent successfully.",  function(){ metroDialog.close('#dialog'); });
            });
            return false;
        },

        ShowErrorDialog:function(msg, callback){
            var site = this;            
            var dlg = '#error-dialog';
            $('#error-dialog-message').html(msg);
            $('#error-dialog-ok').click(function(){ site.CloseDialog(dlg, callback); });
            metroDialog.open('#error-dialog');
        },

        ShowOKDialog:function(msg, callback){
            var site = this;
            var dlg = '#ok-dialog';
            $('#ok-dialog-message').html(msg);
            $('#ok-dialog-ok').click(function(){ site.CloseDialog(dlg, callback); });
            metroDialog.open('#ok-dialog');
        },

        ShowWaitDialog:function(){
            metroDialog.open('#wait-dialog');
        },

        CloseDialog: function(dlg, callback)
        {
            metroDialog.close(dlg);
            
            if(typeof(callback) !== 'undefined' && callback !== null)
                callback();
        }
    }

    $(window.site.Init())
})($)
