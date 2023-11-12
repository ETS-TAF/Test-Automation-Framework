import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTestApiComponent } from './performance-test-api.component';

describe('PerformanceTestApiComponent', () => {
  let component: PerformanceTestApiComponent;
  let fixture: ComponentFixture<PerformanceTestApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceTestApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceTestApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
