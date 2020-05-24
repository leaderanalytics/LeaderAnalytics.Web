import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VyntixComponent } from './vyntix.component';

describe('VyntixComponent', () => {
  let component: VyntixComponent;
  let fixture: ComponentFixture<VyntixComponent>;

  beforeEach(async(() => {
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
