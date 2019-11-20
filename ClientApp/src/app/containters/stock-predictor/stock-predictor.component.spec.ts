import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPredictorComponent } from './stock-predictor.component';

describe('StockPredictorComponent', () => {
  let component: StockPredictorComponent;
  let fixture: ComponentFixture<StockPredictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPredictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
