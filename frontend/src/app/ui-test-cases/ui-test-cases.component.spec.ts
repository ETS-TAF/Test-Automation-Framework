import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTestCasesComponent } from './ui-test-cases.component';

describe('UiTestCasesComponent', () => {
  let component: UiTestCasesComponent;
  let fixture: ComponentFixture<UiTestCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTestCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTestCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
