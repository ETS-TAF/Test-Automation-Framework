import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmeterComponent } from './jmeter.component';

describe('JmeterComponent', () => {
  let component: JmeterComponent;
  let fixture: ComponentFixture<JmeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
