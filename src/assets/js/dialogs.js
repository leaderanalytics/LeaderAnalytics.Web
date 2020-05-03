(function ($) {

    window.dialogs = {

        ShowErrorDialog: function (msg, callback) {
            var site = this;
            var dlg = '#error-dialog';
            $('#error-dialog-message').html(msg);
            $('#error-dialog-ok').click(function () { site.CloseDialog(dlg, callback); });
            metroDialog.open('#error-dialog');
        },

        ShowOKDialog: function (msg, callback) {
            var site = this;
            var dlg = '#ok-dialog';
            $('#ok-dialog-message').html(msg);
            $('#ok-dialog-ok').click(function () { site.CloseDialog(dlg, callback); });
            metroDialog.open('#ok-dialog');
        },

        ShowWaitDialog: function () {
            metroDialog.open('#wait-dialog');
        },

        CloseDialog: function (dlg, callback) {
            metroDialog.close(dlg);

            if (typeof (callback) !== 'undefined' && callback !== null)
                callback();
        }
    }
})($)