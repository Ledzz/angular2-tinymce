import { TestBed, inject } from '@angular/core/testing';

import { Angular2TinymceLibService } from './angular2-tinymce-lib.service';

describe('Angular2TinymceLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Angular2TinymceLibService]
    });
  });

  it('should be created', inject([Angular2TinymceLibService], (service: Angular2TinymceLibService) => {
    expect(service).toBeTruthy();
  }));
});
