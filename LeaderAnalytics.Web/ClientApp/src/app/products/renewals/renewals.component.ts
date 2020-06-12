import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-renewals',
  templateUrl: './renewals.component.html',
  styleUrls: ['./renewals.component.css']
})
export class RenewalsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Renewals");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Renewals is a SAAS subscription management and authentication service." });
  }

  ngOnInit(): void {
  }

}
