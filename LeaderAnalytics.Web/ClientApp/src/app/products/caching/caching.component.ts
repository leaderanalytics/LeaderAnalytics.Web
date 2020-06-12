import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-caching',
  templateUrl: './caching.component.html',
  styleUrls: ['./caching.component.css']
})
export class CachingComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Caching Library");
    this.metaService.updateTag({ name: "description", content: "Caching Library includes a global cache manager, a thread safe cache with various eviction strategies, and Multi-Index Cache, a thread-safe cache that allows you to retrieve objects using multiple keys." });
  }

  ngOnInit(): void {
  }

}
