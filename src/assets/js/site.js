import { Home } from './home.js';
import { Dialogs } from './dialogs.js';

class Site  {

    constructor() {
        this._currentPage = "";
    }

    async Init() {
        var promises = [];
        promises.push(this.Load('header.html', 'header'));
        promises.push(this.LoadContent('home.html'));
        promises.push(this.Load('footer.html', 'footer'));
        promises.push(this.Load('dialogs.html', 'dialog-container'));
        await Promise.all(promises);
    }

    LoadContent(url) {
        this.Load(url, 'content');
    }

    LoadAndScroll(url, loadID, scrollID) {
        var site = this;
        var promise = this.Load(url, loadID);
        promise.then(function () {
            site.ScrollTo(scrollID);
        });
    }

    async Load(url, id) {
        var deferred = $.Deferred();
        var that = this;

        if (url === this._currentPage)
            deferred.resolve();
        else {
            this._currentPage = url;

            $.ajax({
                url: url,
                dataType: 'html'
            }).done(function (data) {
                $('#' + id).empty().append(data).append(async function () {
                    await that.InitPageJs(url);
                    deferred.resolve();
                });
            });
        }

        return deferred.promise();
    }

    async InitPageJs(url) {
        if (url === 'home.html')
            await new Home().Init();
    }

    ShowWindowSize() {
        window.addEventListener('resize', function (event) {
            var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
            document.title = x + " x " + y;
        });
    }

    ScrollTo(elementID) {
        var myElement = document.getElementById(elementID);
        var barHeight = $('#header').height();
        var topPos = myElement.offsetTop - barHeight;
        $('html, body').animate({ scrollTop: topPos, scrollLeft: 0 }, 1000);
    }

    ShowContactDialog() {
        this.Load('/contactform.html', 'dialog').then(function () {
            metroDialog.open('#dialog');
        });
        return false;
    }

    GetAPI_URL() {
        if (window.location.href.indexOf('localhost') > 0)
            return 'https://localhost:5001';
        else
            return 'https://leaderanalytics.com/api'
    }

    SubmitContactForm() {
        var site = this;
        var formData = $('#contact-form').serializeArray();
        var name = formData[0].value;
        var email = formData[1].value;
        var phone = formData[2].value;
        var req = formData[3].value;
        var comment = formData[4].value;

        if (name.length === 0) {
            Dialogs.ShowErrorDialog("Name is required.");
            return false;
        }

        if (phone.length === 0 && email.length === 0) {
            Dialogs.ShowErrorDialog("Phone number or email address is required.");
            return false;
        }

        Dialogs.ShowWaitDialog();
        var url = this.GetAPI_URL() + '/api/message/sendemail';
        var msg = 'Name: ' + name + '\r\nPhone: ' + phone + '\r\nEmail: ' + email + '\r\nRequirement: ' + req + '\r\nComment: ' + comment;
        var json = JSON.stringify({ "To": "leaderanalytics@outlook.com", "Msg": msg });
        $.ajax({
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            type: 'POST', url:url, data: json, dataType: 'json'
        }).done(async function () {
            // timeout is required to allow the wait dialog to render.
            setTimeout(() => {
                site.ClearContactForm();
                Dialogs.CloseDialog('#wait-dialog');
                Dialogs.ShowOKDialog("Your request was sent successfully.");
            }, 2000);
        }).fail(async function (jqXHR, textStatus, error) {
            // timeout is required to allow the wait dialog to render.
            setTimeout(() => {
                Dialogs.CloseDialog('#wait-dialog');
                Dialogs.ShowOKDialog("An error occurred while processing your request.  Please try again later.");
            }, 2000);
        });
        return false;
    }

    ClearContactForm() {
        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#requirement').val('custom');
        $('textarea#comments').val('');
    }
    
    LoginHandler() {

        var formData = $('#login-form').serializeArray();
        var email = formData[0].value;
        var password = formData[1].value;
        // Todo implement authentication
        Dialogs.ShowErrorDialog("Invalid login credentials.  Please try again.");
    }
}
export { Site };
