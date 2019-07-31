import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../material/material.module';
import { ExcelService } from '../../core/services/excel.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule,MaterialModule,BrowserAnimationsModule],      
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ExcelService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("store length should be >= 3", () => {
    expect(component.Stores.length).toBeGreaterThanOrEqual(3);
  });  

  it("displayedColumns length should be >= 8", () => {
    expect(component.displayedColumns.length).toBeGreaterThanOrEqual(8);
  });    
});
