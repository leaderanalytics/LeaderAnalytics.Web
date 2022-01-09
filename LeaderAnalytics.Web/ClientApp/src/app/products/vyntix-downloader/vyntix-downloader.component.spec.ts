import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VyntixDownloaderComponent } from './vyntix-downloader.component';

describe('VyntixDownloaderComponent', () => {
  let component: VyntixDownloaderComponent;
  let fixture: ComponentFixture<VyntixDownloaderComponent>;

  beforeEach(waitForAsync(() => {
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
