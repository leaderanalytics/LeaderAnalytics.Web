import { Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-adaptive-client',
  templateUrl: './adaptive-client.component.html',
  styleUrls: ['./adaptive-client.component.css']
})
export class AdaptiveClientComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Adaptive Client");
    this.metaService.updateTag({ name: "description", content: "Build a scalable, loosely coupled service layer across multiple platforms and transports." });
  }

  ngOnInit(): void {
  }
}
