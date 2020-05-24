import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() visibleEvent: EventEmitter<boolean>;
  public IsVisible: boolean;
  public EMail: string;
  public Password: string;

  constructor() {
    
  }

  ngOnInit(): void {
    this.visibleEvent.subscribe(x => this.ShowLoginDialog());
  }
  
  // If this method is called directly from parent
  // none of the bindings work because the control
  // has not been rendered.  Listening to 
  public ShowLoginDialog() {
    this.IsVisible = true;
    setTimeout(() =>
    {
      // wait till after the dom is updated
      // note ViewChild/ElementRef do not work as the
      // element is not visible and is not rendered when
      // this control is created.

      $('#loginemail').focus();
    }, 500);
  }

  Login() {

    let e: string = this.EMail;
    let p: string = this.Password;

    this.IsVisible = false;
  }

  Cancel() {
    this.IsVisible = false;
  }
}
