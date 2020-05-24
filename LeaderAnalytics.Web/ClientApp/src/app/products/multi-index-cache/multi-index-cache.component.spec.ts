import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiIndexCacheComponent } from './multi-index-cache.component';

describe('MultiIndexCacheComponent', () => {
  let component: MultiIndexCacheComponent;
  let fixture: ComponentFixture<MultiIndexCacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiIndexCacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiIndexCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
