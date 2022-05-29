import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuiteComponent } from './add-suite.component';

describe('AddSuiteComponent', () => {
  let component: AddSuiteComponent;
  let fixture: ComponentFixture<AddSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
