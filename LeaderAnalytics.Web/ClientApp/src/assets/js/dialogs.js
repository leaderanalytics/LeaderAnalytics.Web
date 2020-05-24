
class Dialogs {

    static ShowErrorDialog(msg, callback) {
        var dlg = '#error-dialog';
        $('#error-dialog-message').html(msg);
        $('#error-dialog-ok').click(() =>  Dialogs.CloseDialog(dlg, callback));
        $(dlg).modal('show');
    }

    static ShowOKDialog(msg, callback) {
        var dlg = '#ok-dialog';
        $('#ok-dialog-message').html(msg);
        $('#ok-dialog-ok').click(() => Dialogs.CloseDialog(dlg, callback));
        $(dlg).modal('show');
    }

    static ShowWaitDialog() {
        $('#wait-dialog').modal('show');
    }

    static ShowLoginDialog() {
        $('#login-dialog').modal('show');
    }

    static CloseDialog(dlg, callback) {

        $(dlg).modal('hide');

        if (typeof (callback) !== 'undefined' && callback !== null)
            callback();
    }

    NotStatic() {
        alert('NotStatic');
    }


}
export { Dialogs };