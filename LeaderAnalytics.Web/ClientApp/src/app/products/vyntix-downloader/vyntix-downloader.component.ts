import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-vyntix-downloader',
  templateUrl: './vyntix-downloader.component.html',
  styleUrls: ['./vyntix-downloader.component.css']
})
export class VyntixDownloaderComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Vyntix Downloader");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Vyntix Downloader is used to acquire economic and financial data.  It has the capability to acquire and store vintage data sets such as those maintained by the St. Louis Federal Reserve (FRED and ALFRED)." });
  }

  ngOnInit(): void {
  }

}
