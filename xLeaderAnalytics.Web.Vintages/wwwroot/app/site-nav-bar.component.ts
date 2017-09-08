import { Component, OnInit } from '@angular/core';
declare var showDialog: any;

@Component({
    selector: 'site-nav',
    templateUrl: './app/site-nav-bar.component.html'
})
export class SiteNavBar implements OnInit {

    ngOnInit()
    {
        showDialog();
    }
}