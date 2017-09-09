﻿(function ($, dialogs) {
    window.site = {
        _currentPage:"",

        Init: function () {
            this.Load('/navBar.html','header');
            this.LoadContent('/home.html');
            this.Load('/dialogs.html', 'dialog-container');
            this.Load('/footer.html', 'footer');
            //this.ShowWindowSize();
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
            $('html, body').animate({scrollTop:topPos, scrollLeft:0}, 1000);
        },

        ShowContactDialog:function() {
            this.Load('/contactform.html','dialog').then(function() {
                metroDialog.open('#dialog');                
            });
            return false;
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
                dialogs.ShowErrorDialog("Name is required.");
                return false;
            }

            if(phone.length === 0 && email.length === 0) {
                dialogs.ShowErrorDialog("Phone number or email address is required.");
                return false;
            }
            
            dialogs.ShowWaitDialog();    
            var json = JSON.stringify({name:name,phone:phone,email:email,requirement:req,comment:comment});
            $.ajax({headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                        type:'POST', url:'/Home/HandleContactRequest', data:json, dataType:'json'}).done(function() {
                dialogs.CloseDialog('#wait-dialog');
                dialogs.ShowOKDialog("Your request was sent successfully.",  function(){ metroDialog.close('#dialog'); });
            });
            return false;
        }
    }

    $(window.site.Init())
})($, window.dialogs)
