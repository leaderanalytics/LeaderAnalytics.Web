import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Product Documentation");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics Documentation for Vyntix, Vyntix FRED Client, Adaptive Client and other Leader Analytics products." });
  }

  ngOnInit(): void {
  }

}
