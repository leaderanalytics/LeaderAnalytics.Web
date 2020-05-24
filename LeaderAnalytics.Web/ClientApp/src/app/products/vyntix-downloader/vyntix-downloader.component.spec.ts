import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VyntixDownloaderComponent } from './vyntix-downloader.component';

describe('VyntixDownloaderComponent', () => {
  let component: VyntixDownloaderComponent;
  let fixture: ComponentFixture<VyntixDownloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VyntixDownloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VyntixDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
