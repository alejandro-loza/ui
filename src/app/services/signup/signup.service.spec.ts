import { TestBed, inject } from         '@angular/core/testing';

import { SignupService } from           './signup.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from        '@angular/common/http';
import { FinerioService } from          '@app/services/shared/config.service';
import { MzToastService } from          'ngx-materialize';
import { environment } from             '@env/environment';
import { SignupData } from '@shared/dto/signupDto';

describe('SignupService', () => {
  let _signupService: SignupService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignupService, 
        FinerioService,
        MzToastService
      ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([SignupService], (service: SignupService) => {
    expect(service).toBeTruthy();
  }));

  describe (' #SignupFunction', () => {0
   let expectedData = new SignupData(
     "alanvhz.099@gmail.com",
     "contraseña",
     "contraseña",
     true, true
   );
    beforeEach( () => {
      _signupService = TestBed.get( SignupService );
      http = TestBed.get( HttpTestingController );
    });

    it(' Llamada al servicio ', () => {

      _signupService.signup( expectedData ) 
                    .subscribe( res => {
                      console.log(res);
                    });
        console.log( "signupTest "+ http);
        const req = http.expectOne(`${environment.backendUrl}/users`);
        expect(req.request.method).toEqual('POST');
        expect( _signupService ).toBeTruthy();
    });
  });
});
