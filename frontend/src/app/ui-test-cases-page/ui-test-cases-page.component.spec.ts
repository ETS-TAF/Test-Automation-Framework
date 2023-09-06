import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTestCasesPageComponent } from './ui-test-cases-page.component';

describe('UiTestCasesPageComponent', () => {
  let component: UiTestCasesPageComponent;
  let fixture: ComponentFixture<UiTestCasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTestCasesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTestCasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
