import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdaptiveClientComponent } from './adaptive-client.component';

describe('AdaptiveClientComponent', () => {
  let component: AdaptiveClientComponent;
  let fixture: ComponentFixture<AdaptiveClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptiveClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptiveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
