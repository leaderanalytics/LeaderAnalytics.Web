import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-vyntix',
  templateUrl: './vyntix.component.html',
  styleUrls: ['./vyntix.component.css']
})
export class VyntixComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Vyntix");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Vyntix is a platform for acquiring and managing economic and financial data.  Vyntix downloads, stores, and retrieves vintage data sets.  Vyntix supports many data providers, one of which is the St. Louis Federal Reserve (FRED and ALFRED)." });
  }

  ngOnInit(): void {
  }

}
