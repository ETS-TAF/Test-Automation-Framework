/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestApiService } from './test-api.service';

describe('Service: TestApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestApiService]
    });
  });

  it('should ...', inject([TestApiService], (service: TestApiService) => {
    expect(service).toBeTruthy();
  }));
});
