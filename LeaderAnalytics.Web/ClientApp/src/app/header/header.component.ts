import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(LoginComponent) loginComponent: LoginComponent;
  @Output() showLoginDialog = new EventEmitter<boolean>();
  public ActiveLinkName: string;

  constructor(private router: Router)
  {
    this.ActiveLinkName = 'home';
  }

  ngOnInit(): void {
  }


  LogIn() {

    this.showLoginDialog.emit(true);
  }

  SetActiveLinkName(linkname: string) {
    this.ActiveLinkName = linkname;
  }

}
