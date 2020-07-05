import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  public IsLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    this.IsLoggedIn = new BehaviorSubject(false);
  }

  public SetLoginStatus(isLoggedIn: boolean) {
    this.IsLoggedIn.next(isLoggedIn);
  }
}
