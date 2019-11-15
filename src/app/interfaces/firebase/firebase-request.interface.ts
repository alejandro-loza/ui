import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {FirebaseTokenResponseInterface} from '@interfaces/firebase/firebase-token-response.interface';


export interface FirebaseRequestInterface {
  getFirebaseToken(): Observable<HttpResponse<FirebaseTokenResponseInterface>>;
}
