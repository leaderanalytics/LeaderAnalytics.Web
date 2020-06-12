import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Product Documentation");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Downloads for Vyntix, Vyntix FRED Client, Adaptive Client and other Leader Analytics products." });
  }

  ngOnInit(): void {
  }

}
