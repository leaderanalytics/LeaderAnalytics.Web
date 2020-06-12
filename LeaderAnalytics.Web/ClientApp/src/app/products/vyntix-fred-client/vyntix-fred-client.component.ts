import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-vyntix-fred-client',
  templateUrl: './vyntix-fred-client.component.html',
  styleUrls: ['./vyntix-fred-client.component.css']
})
export class VyntixFredClientComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Vyntix FRED Client");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Vyntix FRED client is a special purpose utility for downloading data from the St.Louis Federal Reserve FRED API and ALFRED.  Vyntix FRED client has the ability to download vintage data sets." });
  }

  ngOnInit(): void {
  }

}
