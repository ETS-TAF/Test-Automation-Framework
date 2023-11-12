/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerformanceTestApiService } from './performance-test-api.service';

describe('Service: PerformanceTestApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceTestApiService]
    });
  });

  it('should ...', inject([PerformanceTestApiService], (service: PerformanceTestApiService) => {
    expect(service).toBeTruthy();
  }));
});
