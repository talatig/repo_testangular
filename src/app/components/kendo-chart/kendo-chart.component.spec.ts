import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoChartComponent } from './kendo-chart.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('KendoChartComponent', () => {
  let component: KendoChartComponent;
  let fixture: ComponentFixture<KendoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoChartComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
