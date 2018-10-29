import { TestBed, inject } from                   '@angular/core/testing';

import { RecoveryService } from           './recovery.service';
import { HttpClientTestingModule, 
         HttpTestingController } from     '@angular/common/http/testing';
import { HttpClientModule } from          '@angular/common/http';
import { environment } from               '@env/environment';

describe('RecoveryService', () => {
  let http: HttpTestingController;
  let _recoveryService: RecoveryService;
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RecoveryService
    ],
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', inject([ RecoveryService ], ( service: RecoveryService ) => {
    expect(service).toBeTruthy();
  }));

  describe(' #RecoveryFunction', () => {
    let expectedData:string = "alanvhz.09@gmail.com";

    beforeEach( () => {
      _recoveryService  = TestBed.get( RecoveryService );
      http = TestBed.get( HttpTestingController );
    });

    it( 'llamda a la API', () => {
      _recoveryService.passwordRecovery( expectedData ).subscribe( res => {

      });
      const req = http.expectOne(`${environment.backendUrl}/security/passwordrecovery`);
      expect(req.request.method).toEqual('POST');
      expect( _recoveryService ).toBeTruthy();
    });
  });
});
