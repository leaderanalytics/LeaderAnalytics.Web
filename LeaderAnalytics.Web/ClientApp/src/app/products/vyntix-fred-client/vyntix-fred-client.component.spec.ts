import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VyntixFredClientComponent } from './vyntix-fred-client.component';

describe('VyntixFredClientComponent', () => {
  let component: VyntixFredClientComponent;
  let fixture: ComponentFixture<VyntixFredClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VyntixFredClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VyntixFredClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
