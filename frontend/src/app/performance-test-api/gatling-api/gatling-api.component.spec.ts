import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatlingApiComponent } from './gatling-api.component';

describe('GatlingApiComponent', () => {
  let component: GatlingApiComponent;
  let fixture: ComponentFixture<GatlingApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatlingApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatlingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
