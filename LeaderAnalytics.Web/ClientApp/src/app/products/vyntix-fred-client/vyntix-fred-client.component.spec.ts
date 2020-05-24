import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VyntixFredClientComponent } from './vyntix-fred-client.component';

describe('VyntixFredClientComponent', () => {
  let component: VyntixFredClientComponent;
  let fixture: ComponentFixture<VyntixFredClientComponent>;

  beforeEach(async(() => {
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
