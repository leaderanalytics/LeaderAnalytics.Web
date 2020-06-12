import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Community Support Forum");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Community Support Forum is a forum for inquiring about Leader Analytics products and interacting with other users." });
  }

  ngOnInit(): void {
  }

}
