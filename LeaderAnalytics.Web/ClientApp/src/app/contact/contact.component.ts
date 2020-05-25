import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogsComponent, Dialog } from '../dialogs/dialogs.component';
import { ContactRequest, AsyncResult } from '../model/model';
import { EmailServiceService } from '../services/email-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild(DialogsComponent) dialogs: DialogsComponent;
  public ContactRequest: ContactRequest;


  constructor(private emailService: EmailServiceService) {
    this.ClearContactForm();
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
    this.emailService.SendContactRequest(this.ContactRequest).subscribe(x => this.CallbackHandler(x));
  }

  ClearContactForm() {
    this.ContactRequest = new ContactRequest();
    this.ContactRequest.Requirement = 'custom';
  }


  CallbackHandler(result: AsyncResult) {
    this.dialogs.CloseDialog(Dialog.Wait, true);
    // todo:  result should never be null. Fix emailservice.
    if (result == null || result.Success) {
      this.ClearContactForm();
      this.dialogs.ShowDialog(Dialog.Info, "Your message was sent successfully.", null);
    }
    else {
      this.dialogs.ShowDialog(Dialog.ErrorMsg, "An error occurred while processing your message.  Please try again later.", null);
    }

  }
}