/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestApiComponent } from './test-api.component';

describe('TestApiComponent', () => {
  let component: TestApiComponent;
  let fixture: ComponentFixture<TestApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
