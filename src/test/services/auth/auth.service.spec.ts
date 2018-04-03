import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './../../../app/services/auth/auth.service';
describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [AuthService ]
    });
  });

  it('should be created',
  	async(inject([ HttpClientTestingModule, AuthService ], ( httpClient:HttpClientTestingModule, service: AuthService ) => {
    	expect(service).toBeTruthy();
  	}))
  );
});
