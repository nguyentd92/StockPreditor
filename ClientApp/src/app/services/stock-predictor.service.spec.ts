import { TestBed } from '@angular/core/testing';

import { StockPredictorService } from './stock-predictor.service';

describe('StockPredictorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockPredictorService = TestBed.get(StockPredictorService);
    expect(service).toBeTruthy();
  });
});
