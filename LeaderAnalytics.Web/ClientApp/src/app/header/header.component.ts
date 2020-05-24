import { Component, OnInit,Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(LoginComponent) loginComponent: LoginComponent;
  @Output() showLoginDialog = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  LogIn() {
    //this.loginComponent.ShowLoginDialog();
    this.showLoginDialog.emit(true);
  }
}
