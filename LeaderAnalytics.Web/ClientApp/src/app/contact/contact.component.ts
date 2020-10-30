import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogsComponent, Dialog } from '../dialogs/dialogs.component';
import { ContactRequest, AsyncResult } from '../model/model';
import { SiteServicesService } from '../services/site-services.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild(DialogsComponent) dialogs: DialogsComponent;
  public ContactRequest: ContactRequest;
  public ErrorMessage: string;
  captchaImgUrl = environment.api_url + "/webapi/captchaImage" + '?d=' + new Date().getTime().toString();

  constructor(private siteServices: SiteServicesService) {
    this.ClearContactForm();
    this.ErrorMessage = "";
  }

  ngOnInit(): void {

  }

  SubmitForm() {

    if (this.ContactRequest.Name.length === 0) {
      this.dialogs.ShowDialog(Dialog.ErrorMsg, "Name is required.", null);
      return false;
    }

    if (this.ContactRequest.Phone.length === 0 && this.ContactRequest.EMail.length === 0) {
      this.dialogs.ShowDialog(Dialog.ErrorMsg, "Phone number or email address is required.", null);
      return false;
    }
    this.dialogs.ShowDialog(Dialog.Wait, "", null);
    setTimeout(() => {
      this.siteServices.SendContactRequest(this.ContactRequest).subscribe(x => this.CallbackHandler(x));
    }, 1500);
  }

  ClearContactForm() {
    this.ContactRequest = new ContactRequest();
    this.ContactRequest.Name = '';
    this.ContactRequest.EMail = '';
    this.ContactRequest.Phone = '';
    this.ContactRequest.Requirement = 'custom';
    this.ContactRequest.Message = '';
    this.ContactRequest.Captcha = '';
    this.captchaImgUrl = environment.api_url + "/webapi/captchaImage" + '?d=' + new Date().getTime().toString();
  }


  CallbackHandler(result: AsyncResult) {
    this.dialogs.CloseDialog(Dialog.Wait, true);
    
    if (result !== null && result.Success) {
      this.ClearContactForm();
      this.dialogs.ShowDialog(Dialog.Info, "Your message was sent successfully.", null);
    }
    else {
      this.dialogs.ShowDialog(Dialog.ErrorMsg, result.ErrorMessage, null);
      console.log("Error sending contact email.");
      console.log(result.ErrorMessage);
    }
  }
}
