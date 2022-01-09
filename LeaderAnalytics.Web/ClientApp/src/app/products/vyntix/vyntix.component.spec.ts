import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VyntixComponent } from './vyntix.component';

describe('VyntixComponent', () => {
  let component: VyntixComponent;
  let fixture: ComponentFixture<VyntixComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VyntixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VyntixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
