import { TestBed } from '@angular/core/testing';

import { ExplorerListService } from './explorer-list.service';

describe('ExplorerListService', () => {
  let service: ExplorerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplorerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
