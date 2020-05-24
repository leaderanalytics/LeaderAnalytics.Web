import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  public Message: string;
  private callback: IConfirmation;

  constructor() { }

  ngOnInit(): void {
  }


  ShowDialog(dlg: Dialog, msg, callback: IConfirmation) {
    this.Message = msg;
    this.callback = callback;
    let name: string = null;

    if (dlg === Dialog.ErrorMsg)
      name = '#error-dialog';
    else if (dlg === Dialog.Wait)
      name = '#wait-dialog';
    else if (dlg === Dialog.Confirm)
      name = '#confirm-dialog';
    else if (dlg === Dialog.Info)
      name = '#info-dialog';
    

    ($(name) as any).modal('show');
  }

  CloseDialog(dlg: Dialog, result: boolean) {
    let name: string = null;

    if (dlg === Dialog.ErrorMsg)
      name = '#error-dialog';
    else if (dlg === Dialog.Wait)
      name = '#wait-dialog';
    else if (dlg === Dialog.Confirm)
      name = '#confirm-dialog';
    else if (dlg === Dialog.Info)
      name = '#info-dialog';
    

    ($(name) as any).modal('hide');

    if (typeof (this.callback) !== 'undefined' && this.callback !== null)
      this.callback(result);
  }
}
export enum Dialog { None, ErrorMsg, Wait, Confirm, Info };
export interface IConfirmation {
  (result: boolean): void;
}
