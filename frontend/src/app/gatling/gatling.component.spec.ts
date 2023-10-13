import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatlingComponent } from './gatling.component';

describe('GatlingComponent', () => {
  let component: GatlingComponent;
  let fixture: ComponentFixture<GatlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
