import { TestBed } from '@angular/core/testing';

import { BooksRepositoryService } from './books-repository.service';

describe('BooksRepositoryService', () => {
  let service: BooksRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
