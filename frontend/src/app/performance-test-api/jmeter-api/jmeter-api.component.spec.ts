import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmeterApiComponent } from './jmeter-api.component';

describe('JmeterApiComponent', () => {
  let component: JmeterApiComponent;
  let fixture: ComponentFixture<JmeterApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JmeterApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JmeterApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
