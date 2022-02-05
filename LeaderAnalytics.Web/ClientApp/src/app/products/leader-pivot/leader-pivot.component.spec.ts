import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderPivotComponent } from './leader-pivot.component';

describe('LeaderPivotComponent', () => {
  let component: LeaderPivotComponent;
  let fixture: ComponentFixture<LeaderPivotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderPivotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderPivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
